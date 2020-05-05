import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Dimensions, ActivityIndicator, useWindowDimensions } from 'react-native'
import { WebView } from 'react-native-webview'
import axios from 'axios'

export default function App () {
  const [ liveURL, setLiveURL ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(() => {
    async function prepareURL() {
      let url = [];
      // url[0] = await loadVideoURL(0)
      
      setLiveURL(url)
      setIsLoading(false)
    }

    async function loadVideoURL(index) {
      const response = await axios.get('https://graph-video.facebook.com/130508740362732/live_videos?fields=id,title,embed_html&access_token=EAAlqGxT0SQwBAJIBjRAnVfBuDZCCglo51U3wbOol9Mm5U7czVrV849jVE2ZBl5bGVSX9obqdX458YJh8s7ZB6YaNL5Vf84pdXyzSEugMubbHdPQ59PO9GZB5bemxtvuv5hYFoIpGVBy10ZCmfbH12j2bcbT5cO8vMc5hJByROw5tR3nEZAbZCtW')
      let iframe = response.data.data[index].embed_html
      
      let first = iframe.indexOf("\"");
      let second = iframe.indexOf("\"", first+1);
      let url = iframe.substring(first+1, second);

      return url
    }

    // Calling main function
    prepareURL()
  }, []);

  return(
    <>
    {
      !isLoading ? (
        <ScrollView style={styles.container}>
          <Text style={styles.text}>
            Live Streaming
          </Text>

          <View style={{ backgroundColor: "#fff", width: Dimensions.get('window').width, height: Dimensions.get('window').width }}>
            {/* <WebView 
              style={styles.video}
              source={{ uri: liveURL[0] }}
              mediaPlaybackRequiresUserAction={false}
              allowsFullscreenVideo={true}
              hideKeyboardAccessoryView={true}
            /> */}
          </View>
            
          <View style={{ marginTop: 10, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ backgroundColor: "#fff", width: Dimensions.get('window').width/2 -20, height: Dimensions.get('window').width/2 -80 }}></View>
            <View style={{ backgroundColor: "#fff", width: Dimensions.get('window').width/2 -20, height: Dimensions.get('window').width/2 -80 }}></View>
            <View style={{ marginTop: 10, backgroundColor: "#fff", width: Dimensions.get('window').width/2 -20, height: Dimensions.get('window').width/2 -80 }}></View>
            <View style={{ marginTop: 10, backgroundColor: "#fff", width: Dimensions.get('window').width/2 -20, height: Dimensions.get('window').width/2 -80 }}></View>
          </View>
          
        </ScrollView>

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
    flex: 1,
    paddingBottom: 30
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