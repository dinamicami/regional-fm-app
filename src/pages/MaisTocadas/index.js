import React from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import MusicItems from '../../Components/MusicItems';
import { Container, CenteredContainer, Spinner, Title } from './styles';

import { maisPedidasApi } from '../../Services/MaisPedidas';

export default function MaisTocadas() {
  const [songs, setSongs] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  
  async function LockScreen() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
  }

  React.useEffect(() => {
    async function getFromApi() {
      const response = await maisPedidasApi();

      if (response !== null) {
        setSongs(response);
        setIsLoading(false);
      }
    }
    LockScreen();
    getFromApi();
  }, []);

  return (
    <Container>
      { 
        isLoading ? (
          <CenteredContainer>
            <Spinner />
          </CenteredContainer>
        ) : (
          <>
            <Title>Mais Pedidas</Title>
            <MusicItems items={songs} />
          </>
        )
      }
    </Container>
  )
}
