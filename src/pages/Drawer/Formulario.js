import React from 'react'
import { WebView } from 'react-native-webview'

export default function Formulario() {
  return(
    <>
      <WebView
        style={{ backgroundColor: '#222' }}
        source={{uri: 'http://radioregionalfm.com.br/Contato/app=true'}}
        allowsBackForwardNavigationGestures={true}
        overScrollMode={'never'}
        mediaPlaybackRequiresUserAction={false}
      />
    </>
  )
}