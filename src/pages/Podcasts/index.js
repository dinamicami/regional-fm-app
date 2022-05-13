import React from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { WebView } from 'react-native-webview';
import { FloatingButton } from '../../Components/FloatingPlayer/styles';
import PlayerContext from '../../context';

export default function Podcasts({navigation}) {
  const { playerStatus, setPlayerStatus } = React.useContext(PlayerContext);

  async function LockScreen() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
  }

  React.useEffect(() => {
    LockScreen();

    const unsubscribe = navigation.addListener('focus', () => {
      setPlayerStatus(!playerStatus)
    })

    return () => unsubscribe;
  }, []);

  return(
    <>
      <FloatingButton />
      <WebView
        style={{ backgroundColor: '#111' }}
        source={{uri: 'https://www.radioregionalfm.com.br/Podcast'}}
        allowsBackForwardNavigationGestures={true}
        overScrollMode={'never'}
        mediaPlaybackRequiresUserAction={false}
      />
    </>
  )
}