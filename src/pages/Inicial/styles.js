import React from 'react';
import { Icon } from 'react-native-elements';
import { Dimensions } from "react-native";
import styled from 'styled-components';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #111;
  padding: 40px 0px;
`;

export const SpacedView = styled.View`
  height: 20px;
`;

export const Title = styled.Text`
  color: #F24401;
  font-size: 22px;
  font-weight: ${props => props.thin ? 'normal' : 'bold'};
  margin-top: 20px;
  padding: 0px 20px 10px;
  text-align: center;
`;

export const MaisPedidas = styled.Image`
  border-radius: 10px;
  height: 170px;
  width: 170px;
  margin-left: 15px;
`;

export const MaisPedidasPlus = styled.TouchableOpacity`
  align-items: center;
  background-color: #222;
  border-radius: 10px;
  height: 150px;
  justify-content: center;
  margin: 0px 15px;
  width: 150px;
`;

export const LoadingBanner = styled.View`
  align-items: center;
  background-color: #222;
  border-radius: 10px;
  ${ Dimensions.get('screen').width > 450 ? 'height: 300px;'  : 'height: 160px;' }
  justify-content: center;
  margin: 0px 15px 15px;
  width: ${ Dimensions.get('screen').width-30 }px;
`;

export const Spinner = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#F24401'
})``;

export const Banner = styled.Image`
  background-color: #222;
  border-radius: 10px;
  ${ Dimensions.get('screen').width > 450 ? 'height: 300px;'  : 'height: 160px;' }
  width: ${ Dimensions.get('screen').width-30 }px;
  margin: 0px 15px 15px;
`;


export const BannerScrollView = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  overScrollMode: 'never',
  disableIntervalMomentum: true,
  decelerationRate: 'fast',
  snapToAlignment: 'end',
  snapToStart: true,
  snapToOffesets: [1, 2, 3]
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
  width: 250px;
  height: 250px;
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
    <AdvertiseContainer>
      <AdvertiseText pos="first" color="#F24401" fontSize={40}>
        { title }
      </AdvertiseText>
      <AdvertiseText pos="second" color="#FFFFFF" fontSize={18}>
        { subtitle }
      </AdvertiseText>
    </AdvertiseContainer>
  </Touch>
)

const Touch = styled.TouchableOpacity``;

const AdvertiseContainer = styled.View`
  align-items: center;
  border-color: #fff;
  border-width: 1px;
  height: 50px;
  justify-content: center;
  margin: 40px 15px 0px;
  overflow: visible;
`;

const AdvertiseText = styled.Text`
  background-color: #111;
  padding: ${props => props.pos === 'first' ? '0px 50px 0px' : '0px 80px 0px' };
  color: ${props => props.color};
  font-size: ${props => props.fontSize}px;
  font-weight: bold;
  text-transform: uppercase;
  overflow: visible;
`;

export const Button = ({ icon, index, title, onPress }) => (
  <ButtonContainer onPress={onPress}>
    <Icon name={icon} type="material-community" color={ icon === 'whatsapp' ? 'green' : 'white' } size={26} />    
    <Agroup>
      <ButtonText size={14} color="#F24401" >
        { title }
      </ButtonText>
      <ButtonText size={12} color="#FFFFFF" >
        { index }
      </ButtonText>
    </Agroup>
  </ButtonContainer>
);
const Agroup = styled.View`
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.TouchableOpacity`
  align-items: center;
  background-color: #222;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
  margin: 0px 5px 10px;
  padding: 10px 10px;
  flex: 1 0 auto;
`;

const ButtonText = styled.Text`
  color: ${props => props.color};
  font-size: ${props => props.size}px;
  font-weight: bold;
`;

export const HorizontalWrap = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 5px;
  height: 200px;
`;


export const AdvertiseBanner = styled.TouchableOpacity`
  align-items: center;
  background-color: #222;
  border-radius: 10px;
  flex-direction: row;
  margin: 15px;
  justify-content: center;
  padding: 15px;
`;

export const LastSpaceScrollview = styled.View`
  width: 15px;
`;