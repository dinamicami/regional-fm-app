import React from 'react';
import { Dimensions, Alert } from 'react-native';
import { Audio, Video } from 'expo-av';
import PlayerContext from '../../context';
import { Break, Button, Container, ConfirmButton, ExampleView, Label, Legend, MainContent, PlayImage, Title, VideoControls } from './styles';

export default function Anuncie({ navigation }) {
  const { setPlayerStatus } = React.useContext(PlayerContext);

  const [isFiftyAudioPlaying, setIsFiftyAudioPlaying] = React.useState(false);
  const [isThirtyAudioPlaying, setIsThirtyAudioPlaying] = React.useState(false);

  // Audio Loading
  const fiftyAudio = React.useMemo(async () => {
    const response = new Audio.Sound();
    await response.loadAsync({ uri: 'http://radioregionalfm.com.br/arquivos/audioEx15.mp3' });
    return response;
  }, []);

  const thirtyAudio = React.useMemo(async () => {
    const response = new Audio.Sound();
    await response.loadAsync({ uri: 'http://radioregionalfm.com.br/arquivos/audioEx30.mp3' });
    return response;
  }, []);

  const handleFiftyAudioPlay = async () => {
    if (!isFiftyAudioPlaying) {
      try {
        await (await thirtyAudio).pauseAsync();
        await (await fiftyAudio).replayAsync();
        setIsThirtyAudioPlaying(false);
        setIsFiftyAudioPlaying(true);
        // Stop music player
        setPlayerStatus(false);
      } catch {
        Alert.alert(
          'Erro',
          'Ocorreu algum erro ao tentar reproduzir este áudio',
          [
            { text: 'Ok' }
          ]
        );
      }
    } else {
      try {
        await (await fiftyAudio).pauseAsync();
        setIsFiftyAudioPlaying(false);
      } catch {
        Alert.alert(
          'Erro',
          'Ocorreu algum erro ao tentar reproduzir este áudio',
          [
            { text: 'Ok' }
          ]
        );
      }
    }
  }

  const handleThirtyAudioPlay = async () => {
    if (!isThirtyAudioPlaying) {
      try {
        await (await fiftyAudio).pauseAsync();
        await (await thirtyAudio).replayAsync();
        setIsFiftyAudioPlaying(false);
        setIsThirtyAudioPlaying(true);
        // Stop music player
        setPlayerStatus(false);
      } catch {
        Alert.alert(
          'Erro',
          'Ocorreu algum erro ao tentar reproduzir este áudio',
          [
            { text: 'Ok' }
          ]
        );      }
    } else {
      try {
        await (await thirtyAudio).pauseAsync();
        setIsThirtyAudioPlaying(false);
      } catch {
        Alert.alert(
          'Erro',
          'Ocorreu algum erro ao tentar reproduzir este áudio',
          [
            { text: 'Ok' }
          ]
        );
      }
    }
  }

  const videoRef = React.createRef();
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);

  return (
    <Container>
      <MainContent>
        <Title>Anuncie na Regional!</Title>
        <Video
          ref={videoRef}
          shouldPlay={false}
          resizeMode={Video.RESIZE_MODE_CONTAIN}
          source={{ uri: 'http://radioregionalfm.com.br/arquivos/bomdiaregional.mp4' }}
          posterSource={require('../../../assets/images/cover.png')}
          posterStyle={{
            width: Dimensions.get('screen').width-30,
            height: 200,
          }}
          style={{
            borderRadius: 10,
            elevation: 10,
            width: Dimensions.get('screen').width-30,
            height: 200,
            backgroundColor: '#000'
          }}
          usePoster={true}
        />
        <VideoControls
          playIcon={isVideoPlaying ? 'pause' : 'play'}
          onPlayPress={() => {
            setIsVideoPlaying(!isVideoPlaying);
            isVideoPlaying ? 
              videoRef.current.pauseAsync() : () => {
                setPlayerStatus(false);
                videoRef.current.playAsync();
              }
          }}
        />
        
        <Legend size={17}>
          {'Ouça os exemplos de comerciais \n de 15 e 30 segundos.'}
        </Legend>
        <ExampleView>
          <Button onPress={() => handleFiftyAudioPlay()}>
            <Legend size={14}>15 seg</Legend>
            <PlayImage source={require('../../../assets/images/play.png')} />
          </Button>
          <Button onPress={() => handleThirtyAudioPlay()}>
            <Legend size={14}>30 seg</Legend>
            <PlayImage source={require('../../../assets/images/play.png')} />
          </Button>
        </ExampleView>

        <ExampleView>
        </ExampleView>
      </MainContent>


      <ConfirmButton onPress={() => navigation.navigate('Formulário')}>
        <Label>Anunciar na Regional</Label>
      </ConfirmButton>

      <Break />
    </Container>
  );
}
