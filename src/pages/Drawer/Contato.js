import React from 'react'
import { WebView } from 'react-native-webview'

export default function Contato() {
  return(
    <>
      <WebView
        style={{ backgroundColor: '#222' }}
        source={{uri: 'http://www.radioregionalfm.com.br/contatoApp/app=true'}}
        allowsBackForwardNavigationGestures={true}
        overScrollMode={'never'}
        mediaPlaybackRequiresUserAction={false}
      />
    </>
  )
}