import React, { useEffect, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StyleSheet, ScrollView, View, Text, Dimensions, ActivityIndicator, FlatList, SafeAreaView } from 'react-native'
import { WebView } from 'react-native-webview';
import axios from 'axios';

import { FloatingButton } from '../../Components/FloatingPlayer/styles';

export default function App () {
  async function LockScreen() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
  }

  React.useEffect(() => {
    LockScreen();
  }, []);

  const [ livesURL, setLivesURL ] = useState([]);
  const [ lastLivesURL, setLastLivesURL ] = useState({});
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {

    async function loadVideoURL() {
      const response = await axios.get('https://graph-video.facebook.com/130508740362732/live_videos?fields=id,title,embed_html.limit(21)&access_token=EAAlqGxT0SQwBACPNpOxd9rYva1FpYZC8PnmuNLB9cZBZCjWqJfUoclNnVFyGGbqfOzZCQYsGMdxYgUr7Kf3QdWfBfxgDXK6y7WOrugtKY6rICzg77K5JNVYSVvZB1ANrDUW4pcR0Qy2wVsvCECNuydRfH08zzdc6QeH0bMpcinAZDZD')
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
    <FloatingButton />
    {
      !isLoading ? (
        <ScrollView style={styles.container}>
          <Text style={styles.text}>
            Live Streaming
          </Text>

          <View style={{ backgroundColor: "#fff", width: Dimensions.get('window').width, height: Dimensions.get('window').width/2 }}>
            <WebView 
              style={styles.video}
              source={{ uri: lastLivesURL.url }}
              mediaPlaybackRequiresUserAction={false}
              allowsFullscreenVideo={true}
              hideKeyboardAccessoryView={true}
            />
          </View>
            
          
          <View style={{ marginTop: 60, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.text}>Outras lives</Text>
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