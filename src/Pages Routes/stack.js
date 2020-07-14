import React from 'react';
import { View, Image, StatusBar, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerActions } from '@react-navigation/native';

import Inicial from '../pages/Inicial'
import News from '../pages/News'
import Backstage from '../pages/Backstage'
import Anuncie from '../pages/Anuncie'
import Form from '../pages/Anuncie/Form';

import Contato from '../pages/Contato'
import Programacao from '../pages/Programacao'
import Podcasts from '../pages/Podcasts'
import Streaming from '../pages/Streaming'
import Formulario from '../pages/Formulario'
import MaisTocadas from '../pages/MaisTocadas';
import Desenvolvedor from '../pages/Desenvolvedor';

const Stack = createStackNavigator();

const options = ({ navigation }) => ({
  title: 'Regional FM', 
  headerLeft: () => {

    return (
    <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()); }}>
      <Icon name="menu" size={30} color="#FFF" />
    </TouchableOpacity>
  )},
  
  headerLeftContainerStyle: {
    marginLeft: 10,
  },
  headerTitle: '',
  headerStyle: {
    elevation: 0
  },
  headerBackground: () => (
    <View
      style={{ flex: 1, paddingTop: 5, backgroundColor: '#0f0f0f' ,justifyContent: 'center', alignItems: 'center', }}
    >
      <Image
        style={{ resizeMode: 'contain', width: 90, marginTop: StatusBar.currentHeight }}
        source={require('../../assets/images/logo-regional-fm.png')}
      />
    </View>
  )
})

const optionsWithoutMenuButton = ({ navigation }) => ({
  title: 'Regional FM', 
  headerLeft: () => {

    return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="arrow-back" size={30} color="#FFF" />
    </TouchableOpacity>
  )},
  
  headerLeftContainerStyle: {
    marginLeft: 10,
  },
  headerTitle: '',
  headerStyle: {
    elevation: 0
  },
  headerBackground: () => (
    <View
      style={{ flex: 1, paddingTop: 5, backgroundColor: '#0f0f0f' ,justifyContent: 'center', alignItems: 'center', }}
    >
      <Image
        style={{ resizeMode: 'contain', width: 90, marginTop: StatusBar.currentHeight }}
        source={require('../../assets/images/logo-regional-fm.png')}
      />
    </View>
  )
})


export function DesenvolvedorStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen  name="Desenvolvedor" component={Desenvolvedor} options={options} />
    </Stack.Navigator>
  )
}
export function FormularioStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen  name="Formulario" component={Formulario} options={options} />
    </Stack.Navigator>
  )
}
export function MaisTocadasStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen  name="Mais Tocadas" component={MaisTocadas} options={options} />
    </Stack.Navigator>
  )
}
export function ProgramacaoStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen  name="Programacao" component={Programacao} options={options} />
    </Stack.Navigator>
  )
}
export function ContatoStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen  name="Contato" component={Contato} options={options} />
    </Stack.Navigator>
  )
}
export function StreamingStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen  name="Streaming" component={Streaming} options={options} />
    </Stack.Navigator>
  )
}
export function PodcastsStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen  name="Podcasts" component={Podcasts} options={options} />
    </Stack.Navigator>
  )
}
export function HomeStack() {
  return(
    <Stack.Navigator >
      <Stack.Screen  name="Home" component={Inicial} options={options} />
    </Stack.Navigator>
  )
}
export function NewsStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="O que está acontecendo" component={News} options={options} />
    </Stack.Navigator>
  )
}
export function BackstageStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Backstage" component={Backstage} options={options} />
    </Stack.Navigator>
  )
}
export function AnuncieStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Anuncie" component={Anuncie} options={options} />
      <Stack.Screen name="Formulário" component={Form} options={optionsWithoutMenuButton} />
    </Stack.Navigator>
  )
}
