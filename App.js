import React from 'react';
import { StatusBar, Platform} from 'react-native';
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
      // console.log(response);
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
  console.log(`>> starting process`);
  let token;

  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    console.log(`>> asking for permissions`);
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  
  if (finalStatus !== 'granted') { console.log(`>> no permissions granted`); return; }
  console.log(`>> permissions granted`);

  console.log(`>> fetching token`);
  token = (await Notifications.getExpoPushTokenAsync()).data;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C'
    });
  }

  console.log(`>> starting subscribe with ${token}`);
  await fetch('https://push-services.herokuapp.com/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      application: "2",
      token: token,
      platform: Platform.OS
    })
  }).then((response) => {
    response.json().then((data) => {
      switch(data.code) {
        case 'success-subscribe': console.log('>> subscribed'); break;
        case 'already-subscribed': console.log('>> already subscribed'); break;
        case 'error-subscribe': 
          console.log('>> error on subscribing'); 
          Alert.alert('Erro', 'Erro ao inscrever-se para notificações', [{ text: 'Ok' }]);
          break;
        default:
          console.log('>> default escope');
          console.log(data);
          break;
      }
    });
  });

  return token;
}
