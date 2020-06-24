import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';

const extractDays = (days) => {
  var firstEqual = days.indexOf('=');
  var lastEqual = days.lastIndexOf('=');
  var lastBraket = days.lastIndexOf(']');

  var firstWord = days.substring(0, firstEqual)
  var lastWord = days.substring(lastBraket+1, lastEqual-2)

  if(firstWord === 'Domingo' && lastWord === 'Sábado') {
    return 'Todos os dias';
  } else if (firstWord === lastWord) {
    return firstWord;
  }

  return firstWord + ' à ' + lastWord;

  // switch(days) {
  //   case 'Domingo===0':
  //     return 'Aos domingos'
  //     break;
  //   case 'Segunda===1[Mm-Sep]Terça===2[Mm-Sep]Quarta===3[Mm-Sep]Quinta===4[Mm-Sep]Sexta===5[Mm-Sep]Sábado===6':
  //     return 'De segunda à sábado';
  //     break;
  //   default:
  //     return days;
  //     break;
  // }
}

export const Container = styled.View`
  background-color: #111;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 15px;
`;

export const ScrollView = styled.ScrollView`
  background-color: #111;
`;

export const Image = ({ source, days, title, id, focused, setFocused, start }) => {
  const [selected, setSelected] = React.useState(false);

  React.useEffect(() => {
    if (focused === id) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [focused])


  function select() {
    if (!selected) {
      setFocused(id);

      setTimeout(() => {
        if (selected) {
          setFocused(null);
        }
      }, 3000);
    } else {
      setFocused(null);
    }
  }
  return (
    <Touch selected={selected} onPress={() => select()}>
      <ImageBox selected={selected} source={source} />

      <Description visible={selected}>
        <Text size={18} bold>
          { title }
        </Text>
        <Text size={16}>
          { extractDays(days) } - { start.substring(0,5) }
        </Text>
      </Description>
    </Touch>
  );
}

const Description = styled.View`
  display: ${props => props.visible ? 'flex' : 'none' };
`;

const Text = styled.Text`
  color: #fff;
  font-size: ${ props => props.size }px;
  font-weight: ${ props => props.bold ? 'bold' : 'normal' }
`;

const Touch = styled.TouchableOpacity`
  ${props => props.selected ? `
    width: ${Dimensions.get('screen').width-30}px;
    background-color: #222;
    border-radius: 10px;
    padding: 15px;
    flex-direction: row;
    `
  : ''}
`;

const ImageBox = styled.Image`
  border-radius: 4px;
  height: 100px;
  width: 100px;
  margin: ${props => props.selected ? '0px 15px 0px 0px' : '10px 5px' };
`;