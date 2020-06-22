import React from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { WebView } from 'react-native-webview';

export default function Inicial() {
  async function LockScreen() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL)
  }

  React.useEffect(() => {
    LockScreen();
  }, []);

  return(
    <>
      <WebView
        style={{ backgroundColor: '#111' }}
        source={{uri: 'http://www.radioregionalfm.com.br/Backstage/app=true'}}
        allowsBackForwardNavigationGestures={true}
        overScrollMode={'never'}
        mediaPlaybackRequiresUserAction={false}
      />
    </>
  )
}