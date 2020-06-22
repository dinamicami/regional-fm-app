import React from 'react';

const PlayerContext = React.createContext({
  playerStatus: true,
  setPlayerStatus: () => {},
});

export const PlayerContextProvider = ({ children }) => {
  const [playerStatus, setPlayerStatus] = React.useState(true);
  
  return (
    <PlayerContext.Provider value={{ playerStatus, setPlayerStatus }}>
      { children }
    </PlayerContext.Provider>
  );
}

export default PlayerContext;