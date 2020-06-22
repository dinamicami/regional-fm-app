import styled from 'styled-components';

export const Container = styled.View`
  background-color: #111;
  flex: 1;
  padding: 15px;
`;

export const CenteredContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
`;

export const Spinner = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#fff'
})``;

export const Title = styled.Text`
  color: #F24401;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;