import React from 'react'
import { WebView } from 'react-native-webview'

export default function News() {
  return(
    <>
      <WebView
        style={{ backgroundColor: '#222' }}
        source={{uri: 'http://www.radioregionalfm.com.br/Acontecendo-na-Regional-FM-app/app=true'}}
        allowsBackForwardNavigationGestures={true}
        overScrollMode={'never'}
        mediaPlaybackRequiresUserAction={false}
      />
    </>
  )
}