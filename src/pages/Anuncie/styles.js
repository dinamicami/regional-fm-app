import React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-native-elements';

export const Container = styled.ScrollView`
  background-color: #111;
  flex: 1;
  padding: 15px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 20px;
  margin-bottom: 10px;
  text-align: center;
`;

export const DescriptionContainer = styled.View`
  background-color: #222;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
`;

export const Label = styled.Text`
  color: #ccc;
`;

export const MainContent = styled.View`
  flex: 1;
`;

export const ExampleView = styled.View`
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 10px;
`;

export const Legend = styled.Text`
  color: #fff;
  flex: 1;
  font-size: ${props => props.size}px;
  justify-content: center;
  text-align: center;
  text-align-vertical: center;
 `
export const Button = styled.TouchableOpacity`
  align-items: center;
  min-width: 80px;
  justify-content: center;
`;

export const ConfirmButton = styled.TouchableOpacity`
  align-items: center;
  background-color: #F24401;
  border-radius: 4px;
  height: 40px;
  justify-content: center;
  margin-top: 10px;
`;

export const Break = styled.View`
  height: 50px;
`;

export const PlayImage = styled.Image`
  height: 70px;
  width: 70px;
`;

export const VideoControls = ({ playIcon, onPlayPress, onReplayPress }) => (
  <VideoControlsContainer>
    <PlayTouchable size={40} onPress={onPlayPress}>
      <Icon name={playIcon} type="material-community" color="#fff" />
    </PlayTouchable>

    <PlayTouchable size={30} style={{ marginLeft: 5 }} onPress={onReplayPress}>
      <Icon name="replay" type="material-community" color="#fff" />
    </PlayTouchable>
  </VideoControlsContainer>
)

export const VideoControlsContainer = styled.View`
  height: 40px;
  flex-direction: row;
  margin-top: 10px;
  padding: 0px 20px;
  align-items: center;
`;

export const PlayTouchable = styled.TouchableOpacity`
  background-color: rgba(255, 255, 255, 0.3);
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;