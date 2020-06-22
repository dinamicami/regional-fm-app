import React from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Linking } from "react-native";

import { Button, Container, Advertise, Banner, BannerScrollView, Title, ProgramsContainer, ProgramsContainerScrollView, ProgramItem, SpacedView, ProgramItemDescription } from './styles';

import { programacaoApi } from '../../Services/Programacao';

export default function Home({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [programs, setPrograms] = React.useState([]);
  async function LockScreen() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
  }

  React.useEffect(() => {
    async function getFromAPI() {
      const response = await programacaoApi();
      Promise.all(response).then((data) => {
        setPrograms(data);
        setIsLoading(false);
      })
    }
    LockScreen();
    getFromAPI();
  }, []);


  const bannerScrollView = React.useRef(null);

  // Banner Scroll Animation
  React.useEffect(() => {
    if(bannerScrollView !== null) {
      setTimeout(() => {
        bannerScrollView.current.scrollTo({ x: 30, y: 0, animated: true });
        setTimeout(() => {
          bannerScrollView.current.scrollTo({ x: 0, y: 0, animated: true });        
        }, 300);        
      }, 200);
    }
  }, [bannerScrollView]);

  return (
    <Container>
      <BannerScrollView ref={bannerScrollView}>
        <Banner source={{ uri: 'http://radioregionalfm.com.br/midias/banners/Imagens/sem_titulo-1.png' }} />
        <Banner source={{ uri: 'http://radioregionalfm.com.br/midias/banners/Imagens/banner_podcasts3.jpg' }} />
        <Banner source={{ uri: 'http://radioregionalfm.com.br/midias/banners/Imagens/banner_site_beto_carreiro4.jpg' }} />
      </BannerScrollView>
      <Title>
        Acontecendo Na Regional
      </Title>

      <ProgramsContainerScrollView>
        {
          isLoading === true || programs[0].image === undefined ? (
            <ProgramsContainer>
              <ProgramItem source={{ uri: 'https://cdn.dribbble.com/users/1417337/screenshots/5750630/bubble-loader.gif' }} />
              <ProgramItemDescription>Carregando</ProgramItemDescription>
            </ProgramsContainer>
          ) : (
            <>
              {
                programs.map((item, index) => {
                  
                  return (
                  <ProgramsContainer key={index}>
                    <ProgramItem source={{ uri: `http://radioregionalfm.com.br/${item.image}` }} />
                    {
                      index === 1 ? (
                        <ProgramItemDescription>AO VIVO</ProgramItemDescription>
                      ) : <></>
                    }
                  </ProgramsContainer>
                )})
              }
            </>
          )
        }
        

        
      </ProgramsContainerScrollView>

      <Advertise title="Anuncie" subtitle="na regional" onPress={() => navigation.navigate('Anuncie') } />


      <Title>
        Contato
      </Title>
      
      <Button index="Locutor" icon="whatsapp" title="(48) 99177 2494" onPress={() => Linking.openURL('https://wa.me/5548991772494') } />
      <Button index="Promoções" icon="whatsapp" title="(48) 99182 2320" onPress={() => Linking.openURL('https://wa.me/5548991772494') } />
      <Button index="Ao Vivo" icon="phone" title="(48) 3222 0268" onPress={() => Linking.openURL('tel:4832220268') } />
      <Button index="Depto. Comercial" icon="phone" title="(48) 3222 1065" onPress={() => Linking.openURL('tel:32221065') } />

      <SpacedView />
    </Container>
  );
}
