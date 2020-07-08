import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';
import React, { useRef, useState } from 'react';
import { View, Text } from 'react-native';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  Page,
  Header,
} from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ConfEntrega() {
  const [id, setId] = useState('');
  const passwordRef = useRef();
  const [password, setPassword] = useState('');
  return (
    <Container>
      <Header></Header>
      <Page>
        <RNCamera
          ref={passwordRef}
          type={RNCamera.Constants.Type.back}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          flashMode={RNCamera.Constants.FlashMode.off}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={
            'We need your permission to use your camera phone'
          }
        />
        <TouchableOpacity
          onPress={async () => {
            useCamera();
          }}
        >
          <Text>Tirar Foto</Text>
        </TouchableOpacity>
        {/* <SubmitButton>Enviar</SubmitButton> */}
      </Page>
    </Container>
  );
}
