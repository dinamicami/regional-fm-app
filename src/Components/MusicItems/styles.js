import React from 'react';
import styled from 'styled-components';
import { Audio } from 'expo-av';

import PlayerContext from '../../context';

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
`;

export const MusicItem = ({ id, source, actualPlaying, setActualPlayer, image, description }) => {
  const { playerStatus, setPlayerStatus } = React.useContext(PlayerContext);
  const [isPlaying, setIsPlaying] = React.useState(false);
  
  const sound = async () => {
    const soundObject = new Audio.Sound();
    await soundObject.loadAsync(source);
    return soundObject
  }

  React.useEffect(() => {
    setActualPlayer(null);
  }, [playerStatus])

  React.useEffect(() => {
    sound().then(sound => {
      if (actualPlaying !== id) {
        setIsPlaying(false);
        sound.pauseAsync();
      }
    })

  }, [actualPlaying])

  function player() {
    sound().then(sound => {
      if (isPlaying) {
      try {
        sound.pauseAsync();
        setIsPlaying(false);
        setActualPlayer(null);
      } catch (err) {
        alert('Hum, algo deu errado.')
        console.log(err);
      }
      } else {
        try {
          sound.replayAsync();
          setPlayerStatus(false);
          setIsPlaying(true);
          setActualPlayer(id);
        } catch (err) {
          alert('Hum, algo deu errado.')
          console.log(err);
        }
      }
    })
  }

  return (
    <MusicContainer onPress={() => player()}>
      <MusicBackground source={image} />
      <Description>
        { description }
      </Description>
    </MusicContainer>
  )
}

const MusicContainer = styled.TouchableOpacity`
  elevation: 5;
  margin: 5px;
  width: 100px;
`;

const MusicBackground = styled.Image`
  border-radius: 8px;
  height: 100px;
  overflow: hidden;
`;

export const Description = styled.Text`
  color: #fff;
  text-align: center;
`;

export const CenteredContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
`;