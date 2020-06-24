import React from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

import { FloatingButton } from '../../Components/FloatingPlayer/styles';
import { Container, Image, ScrollView } from './styles';

import { programacaoApi } from '../../Services/Programacao';

export default function Programacao() {
  const [programs, setPrograms] = React.useState([]);
  const [focused, setFocused] = React.useState(null);

  async function LockScreen() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
  }

  React.useEffect(() => {
    async function getFromApi() {
      const response = await programacaoApi();
      Promise.all(response).then((data) => {
        if (data !== undefined) {
          setPrograms(data);
        }
      });
    }

    LockScreen();
    getFromApi();
  }, []);

  return(
    <>
      <FloatingButton />
      <ScrollView>
        <Container>
          { 
            programs.map((item) => (
              <Image
                key={item.image}
                id={item.id}
                focused={focused}
                setFocused={setFocused}
                title={item.programa}
                days={item.dias}
                start={item.inicio}
                source={{ uri: `http://radioregionalfm.com.br/${item.image}` }}
              />
            ))
          }
      </Container>
    </ScrollView>
    </>
  )
}