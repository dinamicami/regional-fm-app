import React from 'react';
import { Linking } from 'react-native';
import { Icon } from 'react-native-elements';
import { Container, Image, Row, Touchable, Whatsapp } from './styles';

export default function Desenvolvedor() {
  return (
    <Container>
      <Image source={require('../../../assets/images/din.png')} />
      <Row>
        <Touchable onPress={() => Linking.openURL('https://wa.me/554799359991')}>
          <Icon name="whatsapp" color="#fff" type="material-community" />
          <Whatsapp>(47) 99935 9991</Whatsapp>
        </Touchable>

        <Touchable onPress={() => Linking.openURL('https://www.dinamicami.com.br')}>
          <Whatsapp>
            www.dinamicami.com.br
          </Whatsapp>
        </Touchable>
      </Row>
    </Container>
  );
}
