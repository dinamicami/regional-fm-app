// Routes file
// Here's the navigation controller and the Screens Stacks.

// The App is constituted by four stack navigators whose each one has a drawer inside.
// These four Stacks and also a fake screen that keeps behind the play button
// are rendered inside a Bottom Tab Navigation, that's rendered in the main function.

// On this file bottom are the navigators settings up 

import React from 'react'
import { Image, TouchableOpacity, StyleSheet, View } from 'react-native'
import { Icon } from 'react-native-elements'

// React Navigation

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'

// Screens Imports

import Inicial from './pages/Inicial'
import News from './pages/News'
import Backstage from './pages/Backstage'
import Anuncie from './pages/Anuncie'

import Contato from './pages/Drawer/Contato'
import Programacao from './pages/Drawer/Programacao'
import Podcasts from './pages/Drawer/Podcasts'
import Streaming from './pages/Drawer/Streaming'
import Formulario from './pages/Drawer/Formulario'

import Player from './Components/Player'

// Navigators Functions

const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

// Drawers

function HomeDrawer() {
  return(
    <Drawer.Navigator
      drawerStyle={ drawerStyle } 
      drawerContentOptions={ drawerContentOptions }
      drawerPosition={ drawerPosition }
      drawerType={ drawerType }
      screenOptions={screenOptions}
      drawerPosition={drawerPosition}
    >
      <Drawer.Screen name="Home" component={Inicial} options={{ title: 'Página Inicial' }} />
      <Drawer.Screen name="Podcasts" component={Podcasts} options={{ title: 'Podcasts' }}  />
      <Drawer.Screen name="Streaming" component={Streaming} options={{ title: 'Regional Lives' }}  />
      <Drawer.Screen name="Contato" component={Contato} options={{ title: 'Contato' }} />
      <Drawer.Screen name="Programacao" component={Programacao} options={{ title: 'Programação' }}  />
      <Drawer.Screen name="Feedback" component={Formulario} options={{ title: 'Feedback' }}  />

    </Drawer.Navigator>
  )
}
function NewsDrawer() {
  return(
    <Drawer.Navigator
      drawerStyle={ drawerStyle } 
      drawerContentOptions={ drawerContentOptions }
      drawerPosition={ drawerPosition }
      drawerType={ drawerType }
      screenOptions={screenOptions}      
      drawerPosition={drawerPosition}

    >
      <Drawer.Screen name="News" component={News} options={{ title: 'Acontecendo agora' }} />
      <Drawer.Screen name="Podcasts" component={Podcasts} options={{ title: 'Podcasts' }}  />
      <Drawer.Screen name="Streaming" component={Streaming} options={{ title: 'Regional Lives' }}  />
      <Drawer.Screen name="Contato" component={Contato} options={{ title: 'Contato' }} />
      <Drawer.Screen name="Programacao" component={Programacao} options={{ title: 'Programação' }}  />
      <Drawer.Screen name="Feedback" component={Formulario} options={{ title: 'Feedback' }}  />

    </Drawer.Navigator>
  )
}
function BackstageDrawer() {
  return(
    <Drawer.Navigator
      drawerStyle={ drawerStyle } 
      drawerContentOptions={ drawerContentOptions }
      drawerPosition={ drawerPosition }
      drawerType={ drawerType }
      screenOptions={screenOptions}
      drawerPosition={drawerPosition}

    >
      <Drawer.Screen name="Backstage" component={Backstage} />
      <Drawer.Screen name="Podcasts" component={Podcasts} options={{ title: 'Podcasts' }}  />
      <Drawer.Screen name="Streaming" component={Streaming} options={{ title: 'Regional Lives' }}  />
      <Drawer.Screen name="Contato" component={Contato} options={{ title: 'Contato' }} />
      <Drawer.Screen name="Programacao" component={Programacao} options={{ title: 'Programação' }}  />
      <Drawer.Screen name="Feedback" component={Formulario} options={{ title: 'Feedback' }}  />

    </Drawer.Navigator>
  )
}
function AnuncieDrawer() {
  return(
    <Drawer.Navigator
      drawerStyle={ drawerStyle } 
      drawerContentOptions={ drawerContentOptions }
      drawerPosition={ drawerPosition }
      drawerType={ drawerType }
      screenOptions={screenOptions}
      drawerPosition={drawerPosition}

    >
      <Drawer.Screen name="Anuncie" component={Anuncie} />
      <Drawer.Screen name="Podcasts" component={Podcasts} options={{ title: 'Podcasts' }}  />
      <Drawer.Screen name="Streaming" component={Streaming} options={{ title: 'Regional Lives' }}  />
      <Drawer.Screen name="Contato" component={Contato} options={{ title: 'Contato' }} />
      <Drawer.Screen name="Programacao" component={Programacao} options={{ title: 'Programação' }}  />
      <Drawer.Screen name="Feedback" component={Formulario} options={{ title: 'Feedback' }}  />

    </Drawer.Navigator>
  )
}

// Stacks

function HomeStack() {
  return(
    <Stack.Navigator >
      <Stack.Screen  name="Home" component={HomeDrawer} options={options} />
    </Stack.Navigator>
  )
}
function NewsStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="O que está acontecendo" component={NewsDrawer} options={options} />
    </Stack.Navigator>
  )
}
function BackstageStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Backstage" component={BackstageDrawer} options={options} />
    </Stack.Navigator>
  )
}
function AnuncieStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Streaming" component={AnuncieDrawer} options={options} />
    </Stack.Navigator>
  )
}

// Main Function

export default function Routes() {
  return(
    <NavigationContainer>
      <Tab.Navigator screenOptions={tabScreenOptions} tabBarOptions={tabBarOptions} >
        <Tab.Screen name="Home" component={HomeStack} options={{ unmountOnBlur: true }}/>
        <Tab.Screen name="News" component={NewsStack} options={{ unmountOnBlur: true }} />
        <Tab.Screen name="Player" component={Player} options={{ title: ''}} />
        <Tab.Screen name="Backstage" component={BackstageStack} options={{ unmountOnBlur: true }} />
        <Tab.Screen name="Anuncie" component={AnuncieStack} options={{ unmountOnBlur: true }} />
      </Tab.Navigator>
    </NavigationContainer>
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
      iconName = 'today'
    } else if (route.name === 'Backstage') {
      iconName = 'collections'
    } else if (route.name === 'Anuncie') {
      iconName = 'share'
    }

    return <Icon name={iconName} size={size} color={color} />;
  },
}) 
const tabBarOptions = {
  activeTintColor: 'tomato',
  inactiveTintColor: '#ddd',
  showLabel: false,
  style: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: 'black'
  },
  keyboardHidesTabBar: true,
}

// Drawer Default Configurations

const drawerStyle = {
  backgroundColor: '#151515'
}
const drawerContentOptions = {
  activeTintColor: 'tomato',
  inactiveTintColor: '#ddd'
}
const drawerPosition = 'right'
const drawerType = 'back'

const screenOptions = ({ route }) => ({
  drawerIcon: ({ color, size }) => {
    let iconName

    if (route.name === 'Backstage') {
      iconName = 'star'
    } else if (route.name === 'Contato') {
      iconName = 'local-phone'
    } else if (route.name === 'Programacao') {
      iconName = 'today'
    } else if (route.name === 'Feedback') {
      iconName = 'question-answer'
    } else if (route.name === 'Podcasts') {
      iconName = 'mic'
    } else if (route.name === 'Streaming') {
      iconName = 'live-tv'
    } else if (route.name === 'Home') {
      iconName = 'home'
    } else if (route.name === 'News') {
      iconName = 'today'
    } else if (route.name === 'Backstage') {
      iconName = 'collection'
    } else if (route.name === 'Anuncie') {
      iconName = 'share'
    }
    
    return <Icon name={iconName} size={size} color={color} />
  }
})

// Stack Default Configurations

import { DrawerActions } from '@react-navigation/native';

const options = ({ navigation }) => ({
  title: 'Regional FM', 
  headerRight: () => {

    return (
    <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()); }}>
      <Icon name="menu" size={25} color="#FFF" />
    </TouchableOpacity>
  )},
  
  headerRightContainerStyle: {
    marginRight: 10,
  },
  headerLeftContainerStyle: {
    marginLeft: 10,
  },
  headerTitle: '',
  headerStyle: {
    elevation: 0
  },
  headerBackground: () => (
    <View
      style={{ flex: 1, paddingTop: 5, backgroundColor: '#111' ,justifyContent: 'center', alignItems: 'center', }}
    >
      <Image
        style={{ resizeMode: 'contain', width: 90 }}
        source={require('../assets/images/logo-regional-fm.png')}
      />
    </View>
  )
})
const feedbackOptions = ({ navigation }) => ({
  title: 'Feedback',
  headerLeft: () => (
    <TouchableOpacity onPress={() => { navigation.goBack()}} >
      <Icon name="arrow-back" size={25} color="#FFF" />
    </TouchableOpacity>
  ),
  headerLeftContainerStyle: {
    marginLeft: 10,
  },
  headerTitleAlign: 'center',
  headerTitleStyle: {
    color: 'tomato',
    fontWeight: 'bold'
  },
  headerStyle: {
    backgroundColor: '#222',
    elevation: 0
  }
})