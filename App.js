import React, { useEffect } from 'react';
import { ScreenOrientation } from 'expo';

// Here's where is the most part of the application 
import Routes from './src/routes'

// Player button on the bottom tab 
import Player from './src/Components/Player'

export default function App () {

  // Allowing all the orientations modes
  useEffect(() => {
    async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL)
    }
    changeScreenOrientation()
  }, []);

    return(
      <>
        <Routes/>
        <Player/>
      </>
    )
}