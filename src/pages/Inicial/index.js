import React from 'react';
import moment from 'moment';
import { tz } from 'moment-timezone';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Linking, TouchableOpacity, ActivityIndicator, Image, View } from 'react-native';

import {
  Button, Spinner, LoadingBanner, Container, Advertise, LastSpaceScrollview, Banner, BannerScrollView, Title, SpacedView, MaisPedidas, MaisPedidasPlus, HorizontalWrap,
} from './styles';
import RadioPlayer from '../../Components/RadioPlayer';

import { programacaoApi } from '../../Services/Programacao';
import { maisPedidasApi } from '../../Services/MaisPedidas';
import { midiasApi } from '../../Services/Midias';
import { Icon } from 'react-native-elements';

export default function Home({ navigation }) {
  const [banners, setBanners] = React.useState([]);
  const [program, setProgram] = React.useState({});
  const [songs, setSongs] = React.useState([]);

  const bannerScrollView = React.useRef(null);

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
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
      const programs = await programacaoApi();
      Promise.all(programs).then((data) => {
        if (data !== undefined) {
          const actualProgram = verifyActuallyProgram(data);
          setProgram(actualProgram);
        }
      });
      
      const banners = await midiasApi(null, 'banners', null, null, true, null);
      Promise.all(banners).then((data) => {
        if (data !== undefined) {
          shuffle(data)
          setBanners(data);
        }
      });

      const response = await maisPedidasApi();
      Promise.all(response).then((data) => {
        setSongs(data);
      })
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

      const scrollviewEffect = () => {
        if (bannerScrollView !== null) {
          bannerScrollView.current.scrollTo({ x: 30, y: 0, animated: true })
          setTimeout(() => {
            bannerScrollView.current.scrollTo({ x: 0, y: 0, animated: true });        
          }, 300);
        }
      }
      scrollviewEffect();
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
      
      <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
        <Title thin>
          Agora na
        </Title>
        <Image source={require('../../../assets/images/logo-min.png')} style={{ resizeMode: 'contain', height: 40, marginTop: -15 }} />
      </View>
      
      <RadioPlayer item={program} navigation={navigation} />
      <Advertise title="Anuncie" subtitle="na regional" onPress={() => navigation.navigate('Anuncie') } />
      {/* <AdvertiseBanner onPress={() => navigation.navigate('Anuncie')}>
        <Icon
          name="bullhorn"
          color="#f24401"
          type="material-community"
          size={30}
          iconStyle={{ marginRight: 10, transform: [{ rotateZ: "-30deg" }] }}
        />
        <AdvertiseText color="#F24401" fontSize={16}>
          Anuncie na Regional
        </AdvertiseText>
      </AdvertiseBanner> */}

      <SpacedView />
      <Title thin>
        Mais pedidas
      </Title>

      <BannerScrollView>
        {
          songs[0] ? (
            <>
              {songs.map(item => (
                <TouchableOpacity key={item.imagePath} onPress={() => navigation.navigate('MaisTocadas')}>
                  <MaisPedidas
                    source={{ uri: `http://radioregionalfm.com.br/${item.imagePath}` }}
                  />
                </TouchableOpacity>
              ))}
            </>            
          ) : (
            <MaisPedidasPlus>
              <ActivityIndicator color="#F24401" size="small" />
            </MaisPedidasPlus>
          )
        }
        <LastSpaceScrollview />
      </BannerScrollView>

      <SpacedView />
      <Title thin>
        Contatos
      </Title>
      
      <HorizontalWrap>
        <Button index="Locutor" icon="whatsapp" title="(48) 99177 2494" onPress={() => Linking.openURL('https://wa.me/5548991772494') } />
        <Button index="Promoções" icon="whatsapp" title="(48) 99182 2320" onPress={() => Linking.openURL('https://wa.me/5548991772494') } />
        <Button index="Ao Vivo" icon="phone" title="(48) 3222 0268" onPress={() => Linking.openURL('tel:4832220268') } />
        <Button index="Depto. Comercial" icon="phone" title="(48) 3222 1065" onPress={() => Linking.openURL('tel:32221065') } />
      </HorizontalWrap>

    </Container>
  );
}
