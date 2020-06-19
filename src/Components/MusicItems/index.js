import React from 'react';

import { Row, MusicItem } from './styles';

export default function MusicItems({ items }) {
  // Essa função recebe um array de objetos: { id: number, source: require('../music.mp3') || { uri: 'http://music.com/music.mp3' }}
  const [actualPlaying, setActualPlayer] = React.useState(null);

  return (
    <Row>
      {
        items.map((item, index) => (
          <MusicItem
            key={index}
            id={index}
            image={{ uri: `http://radioregionalfm.com.br/${item.imagePath}` }}
            actualPlaying={actualPlaying}
            setActualPlayer={() => setActualPlayer(index)}
            source={{ uri: `http://radioregionalfm.com.br/${item.audioPath}` }}
          />
        ))
      }
    </Row>
  );
}
