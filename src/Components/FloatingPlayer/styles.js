import React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-native-elements';

import PlayerContext from '../../context';

export const FloatingButton = () => {
  const { playerStatus, setPlayerStatus } = React.useContext(PlayerContext);

  return (
    <Button onPress={() => setPlayerStatus(!playerStatus)}>
      <Player name={ playerStatus ? 'pause' : 'play' } type="material-community" />
    </Button>
  )
};

const Button = styled.TouchableOpacity`
  background-color: #F24401;
  border-radius: 50px;
  bottom: 20px;
  elevation: 10;
  padding: 10px;
  position: absolute;
  right: 20px;
  z-index: 2;
`;
const Player = styled(Icon).attrs({
  color: 'white',
  size: 40
})`
`;
