import React from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import MusicItems from '../../Components/MusicItems';
import { Container, SpacedView, CenteredContainer, Spinner, Title } from './styles';

import { maisPedidasApi } from '../../Services/MaisPedidas';
import { FloatingButton } from '../../Components/FloatingPlayer/styles';

export default function MaisTocadas() {
  const [songs, setSongs] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  async function LockScreen() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
  }

  React.useEffect(() => {
    async function getFromAPI() {
      const response = await maisPedidasApi();
      Promise.all(response).then((data) => {
        setSongs(data);
        setIsLoading(false);
      })
    }
    LockScreen();
    getFromAPI();
  }, []);

  return (
    <>
      <FloatingButton />
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
        <SpacedView />
      </Container>
    </>
  )
}
