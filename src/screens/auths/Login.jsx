import axios from 'axios';
import API_URL from "../../config.js"
import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, Pressable, TouchableHighlight, ImageBackground, Alert } from 'react-native';
import Error from "../../components/error.jsx"

function LoginScreen({ navigation }) {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [isEmailActive, setIsEmailActive] = useState(false);
  const [isPasswordActive, setIsPasswordActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("");

  const inputEmailStyle = isEmailActive ? styles.inputActive : styles.input;
  const inputPasswordStyle = isPasswordActive ? styles.inputActive : styles.input;

  const handleLogin = () => {
    setError(null);
    setIsLoading(true);

    axios.post(`${API_URL}/auth/login`, { "email": email, "password": password })
      .then(() => {
        navigation.navigate('Home');
      }
      ).catch(err => {
        if (err.response.status == 400) {
          setError("Entrada de texto inválida")
        }
        if (err.response.status == 401) {
          setError("Usuário ou senha incorretos")
        }
      })
  };

  const backgroundImage = { uri: 'https://i.pinimg.com/236x/84/f2/1e/84f21eebd64c49fbb627065117af4ea1.jpg' };

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.title}>Bem-vindo!</Text>
          <Text style={styles.buttonText}>Faça login na sua conta.</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={inputEmailStyle}
            onChangeText={onChangeEmail}
            onFocus={() => setIsEmailActive(true)}
            onBlur={() => setIsEmailActive(false)}
            value={email}
            placeholder="Email"
          />
          <TextInput
            style={inputPasswordStyle}
            onChangeText={onChangePassword}
            onFocus={() => setIsPasswordActive(true)}
            onBlur={() => setIsPasswordActive(false)}
            value={password}
            secureTextEntry={true}
            placeholder="Senha"
          />
          <View style={styles.buttonContainer}>
            <TouchableHighlight underlayColor="white" style={styles.buttonHighlight} onPress={handleLogin}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>ENTRAR</Text>
              </View>
            </TouchableHighlight>
          </View>
          {error ? (
            <Error message={error} />
          ) : <View />}
        </View>
        <Text style={styles.signUpText}>
          Não tem uma conta?{' '}
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signUpLink}>Cadastre-se</Text>
          </Pressable>
        </Text>
      </ScrollView>
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
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  title: {
    fontSize: 30,
    color: '#EFC81A',
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
  signUpText: {
    textAlign: 'center',
    paddingBottom: 20,
    color: 'white',
  },
  signUpLink: {
    color: '#EFC81A',
  },
});

export default LoginScreen;
