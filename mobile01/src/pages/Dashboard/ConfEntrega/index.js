import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { RNCamera, takePictureAsync } from 'react-native-camera';

import api from '../../../services/api';
import { ramdomName } from '../../../functions/global';

export default function ConfEntrega({ navigation }) {
  const entrega = navigation.getParam('id');
  const cameraRef = useRef();

  const profile = useSelector((state) => state.auth.user);

  async function takePicture() {
    const options = { quality: 0.5, base64: true };
    const data1 = await cameraRef.current.takePictureAsync(options);

    const FormData1 = new FormData();

    FormData1.append('file', {
      uri: data1.uri,
      type: 'image/jpeg',
      name: 'picture.jpg',
    });

    retorno = await api.post('/files', FormData1);

    const signature_id = retorno.data.id;

    try {
      let urlED = `deliverymans/${profile.id}/deliverys/${entrega}/end`;
      const encomendasData = await api.put(urlED, { signature_id });

      alert('Entrega finalizada!');
      navigation.navigate('Dashboard');
    } catch (error) {
      alert('Algo deu errado, tente novamente mais tarde!');
    }
  }

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        flashMode={RNCamera.Constants.FlashMode.off}
        permissionDialogTitle={'Permissão para usar a câmera'}
        permissionDialogMessage={
          'Precisamos da sua permissão para usar o telefone com câmera'
        }
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={takePicture} style={styles.capture}>
          <Text style={styles.buttonText}> Enviar </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  preview: {
    flexDirection: 'column',
    backgroundColor: 'black',
    height: 450,
    display: 'flex',
  },
  buttonContainer: {},
  capture: {
    flex: 0,
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',

    margin: 20,
    marginTop: 5,
    backgroundColor: '#7d40e7',
    width: '80%',
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
});
