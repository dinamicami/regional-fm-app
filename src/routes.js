// Routes file
// Here's the navigation controller and the Screens Stacks.

// The App is constituted by four stack navigators whose each one has a drawer inside.
// These four Stacks and also a fake screen that keeps behind the play button
// are rendered inside a Bottom Tab Navigation, that's rendered in the main function.

// On this file bottom are the navigators settings up 

import React from 'react';
import { Audio } from "expo-av";
import { TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Icon } from 'react-native-elements';

import PlayerContext from './context';

import {
  AnuncieStack,
  BackstageStack,
  ContatoStack,
  FormularioStack,
  HomeStack,
  MaisTocadasStack,
  NewsStack,
  PodcastsStack,
  ProgramacaoStack,
  StreamingStack,
  DesenvolvedorStack,
} from './Pages Routes/stack';

// React Navigation

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'

import Player from './Components/Player'

// Navigators Functions

const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

// Drawers

export default function Routes() {
  return(
    <NavigationContainer>
      <Drawer.Navigator
        drawerStyle={ drawerStyle } 
        drawerContentOptions={ drawerContentOptions }
        drawerPosition={ drawerPosition }
        drawerType={ drawerType }
        screenOptions={screenOptions}
        drawerPosition={drawerPosition}
      >
        <Drawer.Screen name="Home" component={TabBar} options={{ title: 'Página Inicial' }} />
        <Drawer.Screen name="MaisTocadas" component={MaisTocadasStack} options={{ title: 'Mais Pedidas' }}  />
        <Drawer.Screen name="Podcasts" component={PodcastsStack} options={{ title: 'Podcasts' }}  />
        <Drawer.Screen name="Streaming" component={StreamingStack} options={{ title: 'Regional Lives' }}  />
        <Drawer.Screen name="Contato" component={ContatoStack} options={{ title: 'Contato' }} />
        <Drawer.Screen name="Programacao" component={ProgramacaoStack} options={{ title: 'Programação' }}  />
        <Drawer.Screen name="Avalie o aplicativo" component={FormularioStack} options={{ title: 'Avalie o aplicativo' }}  />
        <Drawer.Screen name="Desenvolvedor" component={DesenvolvedorStack} options={{ title: 'Desenvolvedor' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

// Main Function

function TabBar() {
  const { playerStatus, setPlayerStatus } = React.useContext(PlayerContext);
  // http://11.fm5.com.br:8104/stream
  const radio = React.useMemo(async () => {
    const audio = new Audio.Sound();

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      staysActiveInBackground: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });

    
    await audio.loadAsync({ uri: 'http://11.fm5.com.br:8104/stream' });
    
    return audio;
  }, []);

  React.useEffect(() => {
    async function radioPlayer() {
      if (playerStatus === true) {
        await (await radio).replayAsync();
      } else {
        await (await radio).pauseAsync();
      }
    }

    if (radio) {
      radioPlayer();
    }
  }, [playerStatus]);


  return(
    <Tab.Navigator screenOptions={tabScreenOptions} tabBarOptions={tabBarOptions} >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="News" component={NewsStack} options={{ unmountOnBlur: true }} />
      <Tab.Screen
        name="Player"
        component={Player}
        options={{
          title: '',
          tabBarIcon: () => (
            <SafeAreaView>
              <TouchableOpacity style={{ justifyContent: 'center', flex: 1 }} onPress={() => setPlayerStatus(!playerStatus)}>
                <Icon
                  name={ playerStatus ? "pause" : "play"}
                  containerStyle={{
                    alignItems: 'center',
                    backgroundColor: '#F24401',
                    borderRadius: 100,
                    height: 60,
                    justifyContent: 'center',
                    marginBottom: 10,
                    width: 60,
                  }}
                  size={40}
                  type="material-community"
                  color="#fff"
                />
              </TouchableOpacity>
            </SafeAreaView>
          ),
        }}
      />
      <Tab.Screen name="Backstage" component={BackstageStack} options={{ unmountOnBlur: true }} />
      <Tab.Screen name="Anuncie" component={AnuncieStack} options={{ unmountOnBlur: true }} />
    </Tab.Navigator>
  )
}

// Navigation's Settings
// Bottom Tab Default Configurations

const tabScreenOptions = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    let iconName
    size = 30

    if (route.name === 'Home') {
      iconName = 'home'
    } else if (route.name === 'News') {
      iconName = 'calendar'
    } else if (route.name === 'Backstage') {
      iconName = 'image-multiple'
    } else if (route.name === 'Anuncie') {
      iconName = 'bullhorn'
    } 

    return <Icon type="material-community" name={iconName} size={size} color={color} />;
  },
}) 
const tabBarOptions = {
  activeTintColor: '#F24401',
  inactiveTintColor: '#ddd',
  showLabel: false,
  style: {
    backgroundColor: '#050505',
    overflow: 'visible',
    height: 50,
  },
  keyboardHidesTabBar: true,
}

// Drawer Default Configurations

const drawerStyle = {
  backgroundColor: '#151515'
}
const drawerContentOptions = {
  activeTintColor: '#F24401',
  inactiveTintColor: '#ddd'
}
const drawerPosition = 'left'
const drawerType = 'back'

const screenOptions = ({ route }) => ({
  drawerIcon: ({ color, size }) => {
    let iconName

    if (route.name === 'Backstage') {
      iconName = 'star'
    } else if (route.name === 'Contato') {
      iconName = 'phone'
    } else if (route.name === 'Programacao') {
      iconName = 'calendar-check'
    } else if (route.name === 'Avalie o aplicativo') {
      iconName = 'star'
    } else if (route.name === 'Podcasts') {
      iconName = 'podcast'
    } else if (route.name === 'Streaming') {
      iconName = 'video-wireless'
    } else if (route.name === 'Home') {
      iconName = 'backburger'
    } else if (route.name === 'News') {
      iconName = 'calendar'
    } else if (route.name === 'Backstage') {
      iconName = 'image-multiple'
    } else if (route.name === 'Anuncie') {
      iconName = 'bullhorn'
    } else if (route.name === 'MaisTocadas') {
      iconName = 'music-note-eighth'
    } else if (route.name === 'Desenvolvedor') {
      iconName = 'laptop';
    }
    
    return <Icon type="material-community" name={iconName} size={size} color={color} />
  }
})
