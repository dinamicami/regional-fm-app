import styled from 'styled-components';

export const Container = styled.View`
  background-color: #111;
  flex: 1;
`;

export const Image = styled.Image`
  align-self: center;
  height: 300px;
  margin-top: 40px;
  width: 300px;
`;

export const Touchable = styled.TouchableOpacity`
  align-self: center;
  flex-direction: row;
  justify-content: center;
`;

export const Whatsapp = styled.Text`
  color: #fff;
  font-size: 18px;
  margin-left: 10px;
`;

export const Row = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
`;
