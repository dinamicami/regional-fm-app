import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Dimensions, ActivityIndicator, useWindowDimensions, FlatList, SafeAreaView } from 'react-native'
import { WebView } from 'react-native-webview'
import axios from 'axios'

export default function App () {
  const [ livesURL, setLivesURL ] = useState([])
  const [ lastLivesURL, setLastLivesURL ] = useState({})
  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(() => {

    async function loadVideoURL() {
      const response = await axios.get('https://graph-video.facebook.com/130508740362732/live_videos?fields=id,title,embed_html.limit(21)&access_token=EAAlqGxT0SQwBAJIBjRAnVfBuDZCCglo51U3wbOol9Mm5U7czVrV849jVE2ZBl5bGVSX9obqdX458YJh8s7ZB6YaNL5Vf84pdXyzSEugMubbHdPQ59PO9GZB5bemxtvuv5hYFoIpGVBy10ZCmfbH12j2bcbT5cO8vMc5hJByROw5tR3nEZAbZCtW')
      let urls = [];
      let lastLive = {};
      let firstLive = true;
      let first;
      let second;
      let url;
      
      let iframe = response.data.data.map(ifr => {
        
        first = ifr.embed_html.indexOf("\"");
        second = ifr.embed_html.indexOf("\"", first+1);
        url = ifr.embed_html.substring(first+1, second);
        if(firstLive){
          firstLive = false;
          lastLive = {
            id: ifr.id,
            url: url
          }
        }else{
          urls.push({
            id: ifr.id,
            url: url
          })
        }
        return ifr;
      });
      
      setLastLivesURL(lastLive)
      setLivesURL(urls);
      setIsLoading(false);
    }

    // Calling main function
    loadVideoURL()
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
            <WebView 
              style={styles.video}
              source={{ uri: lastLivesURL.url }}
              mediaPlaybackRequiresUserAction={false}
              allowsFullscreenVideo={true}
              hideKeyboardAccessoryView={true}
            />
          </View>
            
          <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
            <SafeAreaView>
              <FlatList
                data={livesURL}
                keyExtractor={item => item.id}
                numColumns={2}
                renderItem={({ item }) => {
                  return (
                    <View style={{ margin: 5, backgroundColor: "#fff", width: Dimensions.get('window').width/2 -20, height: Dimensions.get('window').width/2 -80 }}>
                      <WebView 
                        style={styles.video}
                        source={{ uri: item.url }}
                        mediaPlaybackRequiresUserAction={false}
                        allowsFullscreenVideo={true}
                        hideKeyboardAccessoryView={true}
                      />
                    </View>
                  );
                }}
              />
            </SafeAreaView> 
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
  item: {
    alignItems: "center",
    backgroundColor: "#111",
    flexGrow: 1,
    margin: 4,
    padding: 20,
    flexBasis: 0,
    borderRadius: 10, 

  },
})