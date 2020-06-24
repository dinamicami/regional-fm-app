import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';

export const Player = ({ program, navigation }) => {
  return (
    <Container>
      {
        program.image ? (
          <Image source={{ uri: `http://radioregionalfm.com.br/${program.image}` }} />
        ) : (
          <ImagePlaceholder>
            <Spinner />
          </ImagePlaceholder>
        )

      }
      <RightContainer>
        <TopInformations>
          <Title>
            Rádio Regional FM
          </Title>
          <Title>
            { program.name ? program.name : 'Carregando...' }
          </Title>
        </TopInformations>
        <TopInformations>
          <Touch onPress={() => navigation.navigate('Programacao')}>
            <Badge>
              Programação Completa
            </Badge>
          </Touch>
          
        </TopInformations>
      </RightContainer>      
    </Container>
  );
}

const Touch = styled.TouchableOpacity``;

const Container = styled.View`
  background-color: #222;
  border-radius: 4px;
  flex-direction: row;
  margin: 0px 15px;
  padding: 10px;
`;

const Spinner = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#F24401'
})``;

const ImagePlaceholder = styled.View`
  align-items: center;
  background-color: #222;
  border-radius: 4px;
  ${ Dimensions.get('screen').width > 450 ? 'height: 200px; width: 200px;'  : 'height: 120px; width: 120px;' }
  justify-content: center;
  width: 100px;
`;
const Image = styled.Image`
  border-radius: 4px;

  ${ Dimensions.get('screen').width > 720 ? (
    'height: 300px; width: 300px;'
  ) : Dimensions.get('screen').width > 450 ? (
    'height: 200px; width: 200px;'
  ) : (
    'height: 120px; width: 120px;'
  ) }
`;
const TopInformations = styled.View`
  align-items: flex-start;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const RightContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  margin: 0px 15px;
`;
const Title = styled.Text`
  color: #fff;
  ${ Dimensions.get('screen').width > 450 ? 'font-size: 26px;'  : 'font-size: 18px;' }
  font-weight: bold;
`;
const Badge = styled.Text`
  background-color: #F24401;
  border-radius: 10px;
  color: #fff;
  flex: 0 1 auto;
  ${ Dimensions.get('screen').width > 450 ? 'font-size: 18px;'  : 'font-size: 12px;' }
  padding: 0px 5px;
`;