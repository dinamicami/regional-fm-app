import React from 'react';
import { View } from 'react-native';

export default function Player({ navigation }) {
  React.useEffect(() => {
    navigation.goBack();
  }, [])
  return (
    <View style={{ flex: 1, backgroundColor: '#111' }} />
  )
}
