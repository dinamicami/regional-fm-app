import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { WebView } from 'react-native-webview'
import axios from 'axios'

export default function App () {
  const [ liveURL, setLiveURL ] = useState({})
  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(() => {
    async function prepareURL() {
      let iframe = await loadVideoURL()

      // Treat URL
      let first = iframe.indexOf("\"");
      let second = iframe.indexOf("\"", first+1);
      let url = iframe.substring(first+1, second);

      setLiveURL(url)

      setIsLoading(false)
    }

    async function loadVideoURL() {
      const response = await axios.get('https://graph-video.facebook.com/130508740362732/live_videos?fields=id,title,embed_html&access_token=EAAlqGxT0SQwBAJIBjRAnVfBuDZCCglo51U3wbOol9Mm5U7czVrV849jVE2ZBl5bGVSX9obqdX458YJh8s7ZB6YaNL5Vf84pdXyzSEugMubbHdPQ59PO9GZB5bemxtvuv5hYFoIpGVBy10ZCmfbH12j2bcbT5cO8vMc5hJByROw5tR3nEZAbZCtW')
      return response.data.data[0].embed_html
    }

    // Calling main function
    prepareURL()
  }, []);

  return(
    <>
    {
      !isLoading ? (
        <View style={styles.container}>
          <Text style={styles.text}>
            Live Streaming
          </Text>

          <WebView 
            style={styles.video}
            source={{ uri: liveURL }}
            mediaPlaybackRequiresUserAction={false}
            allowsFullscreenVideo={true}
            hideKeyboardAccessoryView={true}
          />
        </View>
      ) : (
        <View style={{ flex: 1, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color="tomato" />
        </View>
      )
    }
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    padding: 15,
    flex: 1
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 15
  },
  video: { 
    backgroundColor: '#111',
    flex: 1
  },
})