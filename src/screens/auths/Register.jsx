import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, Pressable, TouchableHighlight, ImageBackground } from 'react-native';
import axios from 'axios';
import SweetAlert from 'react-native-sweet-alert';

function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeInput, setActiveInput] = useState('');

  const inputNameStyle = activeInput === 'name' ? styles.inputActive : styles.input;
  const inputEmailStyle = activeInput === 'email' ? styles.inputActive : styles.input;
  const inputPasswordStyle = activeInput === 'password' ? styles.inputActive : styles.input;
  const inputConfirmPasswordStyle = activeInput === 'confirmPassword' ? styles.inputActive : styles.input;

  const handleRegister = () => {
    if (password !== confirmPassword) {
      SweetAlert.showAlertWithOptions({
        title: 'Erro',
        subTitle: 'A senha e a confirmação da senha não coincidem',
        confirmButtonTitle: 'OK',
        confirmButtonColor: '#EFC81A',
        style: 'error',
      });
      return;
    }

    axios
      .post('https://rich-blue-shrimp-wig.cyclic.app/auth/register', {
        email: email,
        fullname: name,
        password: password,
      })
      .then(response => {
        SweetAlert.showAlertWithOptions({
          title: 'Sucesso',
          subTitle: 'Cadastro realizado com sucesso',
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#EFC81A',
          style: 'success',
        });
        navigation.navigate('Login');
      })
      .catch(error => {
        console.error('Erro:', error);
        SweetAlert.showAlertWithOptions({
          title: 'Erro',
          subTitle: 'Falha no cadastro',
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#EFC81A',
          style: 'error',
        });
      });
  };

  const backgroundImage = { uri: 'https://wallpapers.com/images/featured/plano-de-fundo-de-culinaria-1o4w0sphb7r1fgx9.jpg' };

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Ana Maria Brega</Text>
          <Text style={styles.subHeaderText}>Receitas para quem não sabe</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={inputNameStyle}
            onChangeText={setName}
            onFocus={() => setActiveInput('name')}
            value={name}
            placeholder="Nome"
          />
          <TextInput
            style={inputEmailStyle}
            onChangeText={setEmail}
            onFocus={() => setActiveInput('email')}
            value={email}
            placeholder="Email"
          />
          <TextInput
            style={inputPasswordStyle}
            onChangeText={setPassword}
            onFocus={() => setActiveInput('password')}
            value={password}
            secureTextEntry={true}
            placeholder="Insira a Senha"
          />
          <TextInput
            style={inputConfirmPasswordStyle}
            onChangeText={setConfirmPassword}
            onFocus={() => setActiveInput('confirmPassword')}
            value={confirmPassword}
            secureTextEntry={true}
            placeholder="Confirme a Senha"
          />
          <View style={styles.buttonContainer}>
            <TouchableHighlight underlayColor="white" style={styles.buttonHighlight} onPress={handleRegister}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>CRIAR</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
      <Text style={styles.loginText}>
        Já tem cadastro?{' '}
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Faça Login Aqui</Text>
        </Pressable>
      </Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 15,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 30,
    color: '#EFC81A',
  },
  subHeaderText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
  },
  formContainer: {
    paddingBottom: 100,
  },
  input: {
    height: 50,
    margin: 12,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  inputActive: {
    height: 50,
    margin: 12,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: '#EFC81A',
  },
  buttonContainer: {
    margin: 12,
  },
  buttonHighlight: {
    borderRadius: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ed8115',
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    padding: 12,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  loginText: {
    textAlign: 'center',
    paddingBottom: 20,
    color: 'white',
  },
  loginLink: {
    color: '#EFC81A',
  },
});

export default RegisterScreen;