import React from 'react';
import { Player } from './styles';

export default function RadioPlayer({ item, navigation }) {
  return (
    <Player program={item} navigation={navigation} />
  );
}