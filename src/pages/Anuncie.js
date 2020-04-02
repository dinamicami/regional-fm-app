import React from 'react'
import { WebView } from 'react-native-webview'

export default function Anuncie() {
  return(
    <>
      <WebView
        style={{ backgroundColor: '#222' }}
        source={{uri: 'https://radioregionalfm-payment.herokuapp.com/'}}
        allowsBackForwardNavigationGestures={true}
        overScrollMode={'never'}
        mediaPlaybackRequiresUserAction={false}
      />
    </>
  )
}