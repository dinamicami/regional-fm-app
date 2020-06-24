import React from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { WebView } from 'react-native-webview';
import { FloatingButton } from '../../Components/FloatingPlayer/styles';

export default function Formulario() {
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
        source={{uri: 'http://radioregionalfm.com.br/Contato/app=true'}}
        allowsBackForwardNavigationGestures={true}
        overScrollMode={'never'}
        mediaPlaybackRequiresUserAction={false}
      />
    </>
  )
}