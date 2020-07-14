import styled from 'styled-components';
import { TextInputMask } from 'react-native-masked-text';

export const Break = styled.View`
  height: 20px;
`;

export const Button = styled.TouchableOpacity`
  align-items: center;
  background-color: #F24401;
  border-radius: 4px;
  height: 40px;
  justify-content: center;
`;

export const Info = styled.Text`
  background-color: #222;
  border-radius: 8px;
  color: #666;
  font-size: 16px;
  margin-bottom: 15px;
  padding: 5px 8px;
`;

export const Text = styled.Text`
  color: #fff;
`;

export const Container = styled.SafeAreaView`
  background-color: #111;
  flex: 1;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const SubTitle = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: '#ccc'
})`
  background-color: #222;
  border-color: #ccc;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  height: 40px;
  margin-bottom: 10px;
  padding: 0px 10px;
`;

export const DateInput = styled(TextInputMask).attrs({
  placeholderTextColor: '#666',
  type: 'custom',
  options: {
    mask: '99/99/9999',
  }
})`
  background-color: #222;
  border-color: #ccc;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  height: 40px;
  margin-bottom: 10px;
  padding: 0px 10px;
`;

export const PhoneInput = styled(TextInputMask).attrs({
  placeholderTextColor: '#666',
  type: 'custom',
  options: {
    mask: '99 (99) 99999-9999'
  }
})`
  background-color: #222;
  border-color: #ccc;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  height: 40px;
  margin-bottom: 10px;
  padding: 0px 10px;
`;

export const Textarea = styled.TextInput.attrs({
  placeholderTextColor: '#666',
  multiline: true,
  numberOfLines: 3,
})`
  background-color: #222;
  border-color: #ccc;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  height: 120px;
  margin-bottom: 10px;
  padding: 10px 10px;
  text-align-vertical: top
`;

export const Vertical = styled.View`
  flex-direction: row;
  margin: 0px -5px;
`;

export const RadioOption = styled.TouchableOpacity`
  align-items: center;
  background-color: ${ props => props.selected ? '#666' : '#222' };
  border-radius: 4px;
  flex: 1;
  height: 40px;
  justify-content: center;
  margin: 0px 5px 10px;
`;

export const RadioAudioButton = styled.TouchableOpacity`
  align-items: center;
  background-color: ${ props => props.selected ? '#666' : '#222' };
  border-radius: 4px;
  height: 40px;
  min-width: 40px;
  justify-content: center;
  margin: 0px 5px 10px;
`;

export const LabelRadio = styled.Text`
  color: #fff;
`;

export const PriceLabel = styled.Text`
  color: #ccc;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
`;

export const PriceInfo = styled.Text`
  color: white;
  font-size: 30px;
  margin-bottom: 10px;
`;
