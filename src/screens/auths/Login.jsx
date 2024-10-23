import React, { useState, useContext } from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, Pressable, TouchableHighlight, ImageBackground, Alert } from 'react-native';
import axios from 'axios';
import SweetAlert from 'react-native-sweet-alert';

function LoginScreen({ navigation }) {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [isEmailActive, setIsEmailActive] = useState(false);
  const [isPasswordActive, setIsPasswordActive] = useState(false);
  const { setToken, setUser } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  const inputEmailStyle = isEmailActive ? styles.inputActive : styles.input;
  const inputPasswordStyle = isPasswordActive ? styles.inputActive : styles.input;

  const handleLogin = () => {
    setIsLoading(true);

    axios
      .post('https://rich-blue-shrimp-wig.cyclic.app/auth/login', {
        email: email,
        password: password,
      })
      .then(response => {
        setIsLoading(false);
        SweetAlert.showAlertWithOptions({
          title: 'Sucesso',
          subTitle: 'Login realizado com sucesso!',
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#EFC81A',
          style: 'success',
        });

        // Login success
        setToken(response.data.data.token);
        setUser(response.data.data.user);

        // Redirect to the desired screen
        navigation.navigate('Main');
      })
      .catch(error => {
        setIsLoading(false);
        SweetAlert.showAlertWithOptions({
          title: 'Erro',
          subTitle: 'Email ou senha incorretos',
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
        <View style={styles.logoContainer}>
          <Text style={styles.title}>Bem-vindo!</Text>
          <Text>Faça login na sua conta.</Text>
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