import React from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

import { PlayerContextProvider } from './src/context';
import Routes from './src/routes'

export default function App () {
  async function LockScreen() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
  }

  React.useEffect(() => {
    LockScreen();
  }, []);


  return (
    <PlayerContextProvider>
      <Routes/>
    </PlayerContextProvider>
  );
}