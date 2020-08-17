import React from 'react';
import { SafeAreaView, StatusBar} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

import { PlayerContextProvider } from './src/context';
import Routes from './src/routes'

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  })
});

export default function App () {
  const [expoPushToken, setExpoPushToken] = React.useState('');
  const [notification, setNotification] = React.useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  React.useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token);
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  async function LockScreen() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
  }

  React.useEffect(() => {
    LockScreen();
  }, []);


  return (
    <PlayerContextProvider>
      <StatusBar backgroundColor="#111111" barStyle="light-content" />
      <Routes/>
    </PlayerContextProvider>
  );
}

async function registerForPushNotificationsAsync() {
  let token;

  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await Permission.askAsync(Permission.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== 'granted') { return; }

  token = (await Notifications.getExpoPushTokenAsync()).data;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C'
    });
  }

  console.log(token)

  fetch('https://push-services.herokuapp.com/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      application: "2",
      token: token.data,
    })
  }).then((response) => {
    response.json().then((data) => {
      switch(data.code) {
        case 'success-subscribe': break;
        case 'already-subscrived': break;
        case 'error-subscribe': 
          Alert.alert('Erro', 'Erro ao inscrever-se para notificações', [{ text: 'Ok' }]);
          break;
      }
    });
  });

  return token;
}
