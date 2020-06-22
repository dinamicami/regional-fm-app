import React, { useEffect } from 'react';

import { Row, MusicItem, CenteredContainer } from './styles';

export default function MusicItems({ items }) {
  // Essa função recebe um array de objetos: { id: number, source: require('../music.mp3') || { uri: 'http://music.com/music.mp3' }}
  const [actualPlaying, setActualPlayer] = React.useState(null);
  const [isPreparated, setIsPreparated] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsPreparated(true);
    }, 200);
  }, []);

  return (
    <Row>
      {
        isPreparated ?
        items.map((item, index) => (
          <MusicItem
            key={index}
            id={index}
            image={{ uri: `http://radioregionalfm.com.br/${item.imagePath}` }}
            actualPlaying={actualPlaying}
            setActualPlayer={() => setActualPlayer(index)}
            source={{ uri: `http://radioregionalfm.com.br/${item.audioPath}` }}
            description={item.musica}
          />
        )) : <CenteredContainer />
      }
    </Row>
  );
}
