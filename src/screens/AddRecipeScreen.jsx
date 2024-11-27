import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list'

const AddRecipeScreen = ({ navigation }) => {
  const [recipeTitle, setRecipeTitle] = useState('');
  const [category, setCategory] = React.useState('');
  const [ingredients, setIngredients] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const categories = [
    { "key": "1", "value": "Prato Principal" },
    { "key": "2", "value": "Lanche" },
    { "key": "3", "value": "Sobremesa" },
    { "key": "4", "value": "Salada" },
    { "key": "5", "value": "Bebida" },
    { "key": "6", "value": "Café da Manhã" }
  ]



  const handleSubmit = () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append('title', recipeTitle);
    formData.append('category', category);
    formData.append('ingredients', ingredients);
    formData.append('videoLink', videoLink);


    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('Home')
      setRecipeTitle('');
      setIngredients('');
      setVideoLink('');
    }, 500);
  };


  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Adicione sua receita</Title>
      <TextInput
        label="Título da receita"
        value={recipeTitle}
        mode="outlined"
        onChangeText={text => setRecipeTitle(text)}
        style={styles.input}
        outlineColor='#EFC81A'
        activeOutlineColor='#EFC81A'
      />
      <SelectList
        style={styles.input}
        setSelected={(val) => setCategory(val)}
        data={categories}
        boxStyles={{
          borderColor: '#EFC81A',
          borderRadius: 2,
        }}
        save="value"
      />
      <TextInput
        label="Ingredientes"
        value={ingredients}
        onChangeText={text => setIngredients(text)}
        style={styles.input}
        multiline
        numberOfLines={7}
        mode="outlined"
        outlineColor='#EFC81A'
        activeOutlineColor='#EFC81A'
      />
      <TextInput
        label="Link do video"
        value={videoLink}
        onChangeText={text => setVideoLink(text)}
        style={styles.input}
        mode="outlined"
        outlineColor='#EFC81A'
        activeOutlineColor='#EFC81A'

      />
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
        disabled={isLoading}
      >
        {isLoading ? 'Enviando...' : 'Enviar'}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FEFEFE',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ed8115',
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'transparent',
    borderColor: '#EFC81A',
  },
  button: {
    backgroundColor: "#ed8115",
    marginBottom: 25,
  },
  image: {
    width: "70%",
    height: 200,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 5,
    borderColor: '#EEC242',
    borderRadius: 30,
    alignSelf: 'center',
  },
});

export default AddRecipeScreen;
