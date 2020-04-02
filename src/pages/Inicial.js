import React from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'

export default function Inicial({ navigation }) {  

  return(
    <WebView
      style={{ backgroundColor: '#222' }}
      source={{uri: 'http://radioregionalfm.com.br/app=true'}}
      allowsBackForwardNavigationGestures={true}
      overScrollMode={'never'}
      mediaPlaybackRequiresUserAction={false}
    />
  )
}