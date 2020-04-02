import React from 'react'
import { WebView } from 'react-native-webview'

export default function Inicial() {
  return(
    <>
      <WebView
        style={{ backgroundColor: '#222' }}
        source={{uri: 'http://www.radioregionalfm.com.br/Backstage/app=true'}}
        allowsBackForwardNavigationGestures={true}
        overScrollMode={'never'}
        mediaPlaybackRequiresUserAction={false}
      />
    </>
  )
}