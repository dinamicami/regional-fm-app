import React from 'react';
import moment from 'moment';
import { tz } from "moment-timezone";
import * as ScreenOrientation from 'expo-screen-orientation';
import { Linking, Dimensions } from "react-native";

import { Button, Spinner, LoadingBanner, Container, Advertise, Banner, BannerScrollView, Title, SpacedView } from './styles';
import RadioPlayer from '../../Components/RadioPlayer';

import { programacaoApi } from '../../Services/Programacao';
import { midiasApi } from '../../Services/Midias';

export default function Home({ navigation }) {
  const [banners, setBanners] = React.useState([]);
  const [program, setProgram] = React.useState({});
  const bannerScrollView = React.useRef(null);

  // Actual Program Filter
  function verifyActuallyProgram(data) {
    const today = moment().tz('America/Sao_Paulo').format('d');
    const todayPrograms = data.map(item => {
      if (item !== undefined && item !== null) {
        const { dias } = item;
  
        if (dias !== undefined && dias !== null) {
          if (dias.includes(today)) {
            return ({ name: item.programa, image: item.image, startingAt: item.inicio });
          }
        }
      }
    });
  
    const programsSinceNow = todayPrograms.map(item => {
      if (item !== undefined) {
        const horary = item.startingAt.substring(0,2);
        const now = moment().tz('America/Sao_Paulo').format('HH');
  
        if (parseInt(horary) <= parseInt(now)) {
          return item;
        }
      } 
    });
  
    const orderedPrograms = programsSinceNow.sort(function (a, b) {
      if (a !== undefined && b !== undefined) {
        return (a.startingAt < b.startingAt) ? 1 : (( b.startingAt < a.startingAt) ? -1 : 0);
      }
    });
  
    return orderedPrograms[0];
  }

  React.useEffect(() => {
    // Get Banners and Actual Program
    async function getInitialData() {
      const banners = await midiasApi(null, 'banners', null, null, true, null);
      Promise.all(banners).then((data) => {
        if (data !== undefined) {
          setBanners(data);
        }
      });

      const programs = await programacaoApi();
      Promise.all(programs).then((data) => {
        if (data !== undefined) {
          const actualProgram = verifyActuallyProgram(data);
          setProgram(actualProgram);
        }
      });
    }
    getInitialData();
  }, []);


  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      // Lock portrait orientation
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

      // Get actual program
      const response = await programacaoApi();
      Promise.all(response).then((data) => {
        if (data !== undefined) {
          const actualProgram = verifyActuallyProgram(data);
          setProgram(actualProgram);
        }
      });
    })

    return unsubscribe;
  }, [navigation]);

  return (
    <Container>
      <BannerScrollView
        ref={bannerScrollView}
      >
        {
          banners[0] ? (
            <>
              {
                banners.map((item, index) => (
                  <Banner key={index} source={{ uri: `http://radioregionalfm.com.br/${item.endereco}` }} />
                ))
              }
            </>
          ) : (
            <LoadingBanner><Spinner /></LoadingBanner>
          )
        }
      </BannerScrollView>
      <Title>
        Agora na Regional
      </Title>

      <RadioPlayer item={program} navigation={navigation} />
      <Advertise title="Anuncie" subtitle="na regional" onPress={() => navigation.navigate('Anuncie') } />
      <SpacedView />
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
