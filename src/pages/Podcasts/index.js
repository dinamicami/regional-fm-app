import React from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { WebView } from 'react-native-webview';
import { FloatingButton } from '../../Components/FloatingPlayer/styles';

export default function Podcasts() {
  async function LockScreen() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
  }

  React.useEffect(() => {
    LockScreen();
  }, []);

  return(
    <>
      <FloatingButton />
      <WebView
        style={{ backgroundColor: '#111' }}
        source={{uri: 'http://www.radioregionalfm.com.br/Podcast/app=true'}}
        allowsBackForwardNavigationGestures={true}
        overScrollMode={'never'}
        mediaPlaybackRequiresUserAction={false}
      />
    </>
  )
}