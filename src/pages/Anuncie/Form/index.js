import React from 'react';
import { Alert, Linking, ScrollView } from 'react-native';

import * as ScreenOrientation from 'expo-screen-orientation';
import { Break, Button, Container, DateInput, Info, LabelRadio, PhoneInput, PriceInfo, PriceLabel, RadioAudioButton, RadioOption, SubTitle, Text, Textarea, TextInput, Title, Vertical } from './styles';

export default function Form() {
  const [announcement, setAnnouncement] = React.useState({ name: '', surname: '', whatsapp: '', enterprise: '', enterpriseMail: '', initialDate: '', finalDate: '', description: '', quantity: '1', type: 80 });

  // Lock orientation
  React.useEffect(() => {
    async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
    }
  }, []);

  const handleSubmit = () => {
    if (
      announcement.name !== '' && announcement.surname !== '' && announcement.whatsapp !== '' &&
      announcement.enterprise !== '' && announcement.enterpriseMail !== '' && announcement.initialDate !== '' &&
      announcement.finalDate !== '' && announcement.description !== '' && announcement.quantity !== '0' && announcement.quantity !== ''
    ) {
      const baseUrl = 'https://regionalfm-api-mercadopago.herokuapp.com/payments/checkpay';
      const url = (`${baseUrl}/${announcement.whatsapp}/${announcement.enterpriseMail}/${announcement.name}/${announcement.surname}/${announcement.quantity}/${announcement.type}/${announcement.description}/${announcement.enterprise}/${announcement.initialDate.substring(0, 2)}-${announcement.initialDate.substring(3, 5)}-${announcement.initialDate.substring(6, 8)}/${announcement.finalDate.substring(0, 2)}-${announcement.finalDate.substring(3, 5)}-${announcement.finalDate.substring(6, 8)}`).split(' ').join('%20');

      Linking.openURL(url);
    } else {
      Alert.alert(
        'Atenção',
        'É necessário fornecer todas as informações corretamente.',
        [
          {
            text: 'Ok'
          }
        ]
      );
    }
  }

  return(
    <Container>
      <ScrollView style={{ padding: 15, paddingBottom: 0 }}>
        <Title>Anuncie na Regional</Title>
        <Info>
          Agora você pode impulsionar a sua empresa com a Rádio Regional FM. Neste espaço você pode 
          criar um comercial personalizado para passar na rádio.
        </Info>
        <SubTitle>Suas informações</SubTitle>
        <TextInput
          autoCompleteType="name"
          autoFocus
          placeholder="Nome" value={announcement.name}
          onChangeText={name => setAnnouncement({ ...announcement, name })}
        />
        <TextInput
          placeholder="Sobrenome" value={announcement.surname}
          onChangeText={surname => setAnnouncement({ ...announcement, surname })}
        />
        <TextInput
          placeholder="Empresa" value={announcement.enterprise}
          onChangeText={enterprise => setAnnouncement({ ...announcement, enterprise })}
        />
        <TextInput
          autoCompleteType="email" keyboardType="email-address"
          placeholder="E-mail da empresa" value={announcement.enterpriseMail}
          onChangeText={enterpriseMail => setAnnouncement({ ...announcement, enterpriseMail })}
        />
        <PhoneInput
          autoCompleteType="tel" keyboardType="phone-pad"
          placeholder="Whatsapp" value={announcement.whatsapp}
          onChangeText={whatsapp => setAnnouncement({ ...announcement, whatsapp })}
        />
        <Break />
        <SubTitle>Sobre o anúncio</SubTitle>
        <DateInput
          keyboardType="numeric"
          placeholder="Início da vinculação de anúncio" value={announcement.initialDate}
          onChangeText={initialDate => setAnnouncement({ ...announcement, initialDate })}
        />
        <DateInput
          keyboardType="numeric"
          placeholder="Fim da vinculação" value={announcement.finalDate}
          onChangeText={finalDate => setAnnouncement({ ...announcement, finalDate })}
        />
        <Textarea
          placeholder="O que você quer no anúncio?" value={announcement.description}
          onChangeText={description => setAnnouncement({ ...announcement, description })}
        />
        <Break />
        <SubTitle>Quantidade</SubTitle>
        <TextInput
          keyboardType="numeric"
          placeholder="Quant." value={announcement.quantity}
          onChangeText={quantity => setAnnouncement({ ...announcement, quantity })}
        />
        <Vertical>
          <RadioOption
            selected={ announcement.type === 80 }
            onPress={() => setAnnouncement({ ...announcement, type: 80 })}
          >
            <LabelRadio>R$ 80,00 - Spots de 15 segundos</LabelRadio>
          </RadioOption>
        </Vertical>
        <Vertical>
          <RadioOption
            selected={ announcement.type === 150 }
            onPress={() => setAnnouncement({ ...announcement, type: 150 })}
          >
            <LabelRadio>R$ 150,00 - Spots de 30 segundos</LabelRadio>
          </RadioOption>
        </Vertical>
        <PriceLabel>
          Valor final
        </PriceLabel>
        <PriceInfo>
          R$ { (announcement.quantity * announcement.type).toFixed(2).replace('.', ',') }
        </PriceInfo>
        <Info>
          Ao clicar em "Realizar pagamento", você será redirecionado à uma página web para seu pagamento seguro através do Mercado Pago,
          você não precisa criar uma conta e pode optar por pagar pelo cartão de crédito ou boleto.
        </Info>
        <Button onPress={() => handleSubmit()}>
          <Text>Realizar pagamento</Text>
        </Button>
        <Break />
        <Break />
      </ScrollView>
    </Container>
  )
}