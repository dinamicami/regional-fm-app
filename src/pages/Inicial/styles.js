import React from 'react';
import { Dimensions } from "react-native";
import styled from 'styled-components';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #111;
  padding-top: 15px;
`;

export const Banner = styled.Image`
  background-color: #222;
  border-radius: 10px;
  height: 160px;
  width: ${ Dimensions.get('screen').width-30 }px;
  margin: 0px 15px 15px;
`;

export const Title = styled.Text`
  color: #F24401;
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  padding: 0px 20px 10px;
`;

export const BannerScrollView = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  overScrollMode: 'never',
  disableIntervalMomentum: true,
  pagingEnabled: false,
})``;

export const ProgramsContainerScrollView = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: { paddingLeft: 10, paddingRight: 20 },
  showsHorizontalScrollIndicator: false,
})``;

export const ProgramsContainer = styled.View`
  margin-left: 10px;
`;

export const ProgramItem = styled.Image`
  width: 150px;
  height: 150px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 10px;
`;

export const ProgramItemDescription = styled.Text`
  background-color: #F24401;
  border-radius: 20px;
  color: #fff;
  font-size: 14px;
  margin: 5px auto 0px;
  text-align: center;
  text-transform: uppercase;
  padding: 0px 5px;
`;

export const Advertise = ({ title, subtitle, onPress }) => (
  <Touch onPress={onPress}>
    <ButtonContainer>
      <ButtonText pos="first" color="#F24401" fontSize={40}>
        { title }
      </ButtonText>
      <ButtonText pos="second" color="#FFFFFF" fontSize={18}>
        { subtitle }
      </ButtonText>
    </ButtonContainer>
  </Touch>
)

const Touch = styled.TouchableOpacity``;

const ButtonContainer = styled.View`
  align-items: center;
  border-color: #fff;
  border-width: 1px;
  height: 50px;
  justify-content: center;
  margin: 40px 15px; 0px
`;

const ButtonText = styled.Text`
  background-color: #111;
  padding: ${props => props.pos === 'first' ? '20px 50px 0px' : '0px 80px 20px' };
  color: ${props => props.color};
  font-size: ${props => props.fontSize}px;
  font-weight: bold;
  text-transform: uppercase;
`;
