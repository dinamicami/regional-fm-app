import React from 'react';

import { Container, Advertise, Banner, BannerScrollView, Title, ProgramsContainer, ProgramsContainerScrollView, ProgramItem, ProgramItemDescription } from './styles';

export default function Home({ navigation }) {
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
        <ProgramsContainer>
          <ProgramItem source={{ uri: 'http://www.radioregionalfm.com.br/midias/acontecendo_na_regional/Imagens/tb_post-106-e-sucesso-v1.png' }} />
          <ProgramItemDescription>AO VIVO</ProgramItemDescription>
        </ProgramsContainer>
        <ProgramsContainer>
          <ProgramItem source={{ uri: 'http://www.radioregionalfm.com.br/midias/acontecendo_na_regional/Imagens/tb_ding_ding_quarta_e_sabado.png' }} />
        </ProgramsContainer>
        <ProgramsContainer>
          <ProgramItem source={{ uri: 'http://www.radioregionalfm.com.br/midias/acontecendo_na_regional/Imagens/tb_post-106-e-sucesso-v1.png' }} />
        </ProgramsContainer>
        <ProgramsContainer>
          <ProgramItem source={{ uri: 'http://www.radioregionalfm.com.br/midias/acontecendo_na_regional/Imagens/tb_ding_ding_quarta_e_sabado.png' }} />
        </ProgramsContainer>
        <ProgramsContainer>
          <ProgramItem source={{ uri: 'http://www.radioregionalfm.com.br/midias/acontecendo_na_regional/Imagens/tb_post-106-e-sucesso-v1.png' }} />
        </ProgramsContainer>
        <ProgramsContainer>
          <ProgramItem source={{ uri: 'http://www.radioregionalfm.com.br/midias/acontecendo_na_regional/Imagens/tb_ding_ding_quarta_e_sabado.png' }} />
        </ProgramsContainer>
        <ProgramsContainer>
          <ProgramItem source={{ uri: 'http://www.radioregionalfm.com.br/midias/acontecendo_na_regional/Imagens/tb_post-106-e-sucesso-v1.png' }} />
        </ProgramsContainer>
        <ProgramsContainer>
          <ProgramItem source={{ uri: 'http://www.radioregionalfm.com.br/midias/acontecendo_na_regional/Imagens/tb_ding_ding_quarta_e_sabado.png' }} />
        </ProgramsContainer>
      </ProgramsContainerScrollView>

      <Advertise title="Anuncie" subtitle="na regional" onPress={() => navigation.navigate('Anuncie') } />
    </Container>
  );
}
