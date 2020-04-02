// Player Button Component
// Imported by ../../App.js

import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { Icon } from 'react-native-elements'
import { WebView } from 'react-native-webview'
import { LinearGradient } from 'expo-linear-gradient';

// Main function
export default function Player() {
  const [ count, setCount ] = useState(0)
  const [ iconName, setIconName ] = useState('play-arrow')
  const [ stream, setStream ] = useState('')

  // Play/pause function
  function setPlayerStatus() {
    switch(count) {
      case 0:
        setStream('http://11.fm5.com.br:8104/stream')
        setIconName('pause')
        setCount(1)
        break
      case 1: 
        setStream('https://www.google.com/')
        setIconName('play-arrow')
        setCount(0)
        break
    }
  }

  // Body
  return(
    <View style={styles.container}>
      <View style={styles.controls}>

        {/* Platform adaptation */}
          {
            Platform.select({
                // iOS devices doesn't allow the Expo's Linear gradient component
              ios: (
                <TouchableOpacity 
                  style={styles.button} 
                  onPress={() => { setPlayerStatus() }}
                >
                    <Icon name={iconName} size={40} color="#fff"/>
                </TouchableOpacity>
              ),

                // Android
              android: (
                <TouchableOpacity onPress={() => { setPlayerStatus() }}>
                  <LinearGradient
                    colors={['#ed2024', '#ffaa00']}
                    style={styles.button}
                  >
                    <Icon name={iconName} size={40} color="#fff"/>
                  </LinearGradient>
                </TouchableOpacity>
              )
            })
          }
      </View>

      {/* Invisible WebView */}

      <WebView
        source={{uri: stream}}
        mediaPlaybackRequiresUserAction={false}
        style={{
          opacity: 0
        }}
      />
    </View>
  )
}

// Default StyleSheet

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column-reverse',
  },
  controls: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  button: {
    // This backgroundColor just is rendered in iOS devices
    // android devices are using the Expo's Linear gradient
    backgroundColor: 'tomato',
    borderRadius: 100,
    padding: 10
  }
})