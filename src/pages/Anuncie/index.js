import React from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { WebView } from 'react-native-webview';

export default function Anuncie() {
  async function LockScreen() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
  }

  React.useEffect(() => {
    LockScreen();
  }, []);

  return(
    <>
      <WebView
        incognito={true}
        style={{ backgroundColor: '#111' }}
        source={{uri: 'https://radioregionalfm-payment.herokuapp.com/'}}
        allowsBackForwardNavigationGestures={true}
        overScrollMode={'never'}
        mediaPlaybackRequiresUserAction={true}
      />
    </>
  )
}