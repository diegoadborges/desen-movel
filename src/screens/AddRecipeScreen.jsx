import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list'
import { FlatList } from 'react-native-web';
import axios from 'axios';

const AddRecipeScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = React.useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [isLoading, setIsLoading] = useState(false);


  const addInputField = () => {
    setIngredients([...ingredients, '']);
  };

  const updateInputField = (index, text) => {
    const updatedInputs = [...ingredients];
    updatedInputs[index] = text;
    setIngredients(updatedInputs);
    console.log(ingredients)
  };

  const removeInputField = (index) => {
    const filteredInputs = ingredients.filter((_, i) => i !== index);
    setIngredients(filteredInputs);
  };


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

    axios.post(`${API_URL}/recipes`, { category, title, ingredients, image_url: imageUrl, instructions }).then(respose => {
      if (respose.status != 200) {
        setIsLoading(false)
        return
      }
      setIsLoading(false)
      setCategory('')
      setTitle('');
      setImageUrl('');
      setInstructions('');
      navigation.navigate('Home')
    })


  };
  const renderInputField = ({ item, index }) => (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={item}
        onChangeText={(text) => updateInputField(index, text)}
        placeholder={"Ingrediente"}
      />
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => addInputField(index)}
      >ADD</Button>
      {ingredients.length > 1 && (
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => removeInputField(index)}
        >DEL</Button>
      )}
    </View>
  );


  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Adicione sua receita</Title>
      <TextInput
        label="Título da receita"
        value={title}
        mode="outlined"
        onChangeText={text => setTitle(text)}
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
        label="Link da foto"
        value={imageUrl}
        onChangeText={text => setImageUrl(text)}
        style={styles.input}
        mode="outlined"
        outlineColor='#EFC81A'
        activeOutlineColor='#EFC81A'
      />
      <TextInput
        label="Instruções"
        value={instructions}
        onChangeText={text => setInstructions(text)}
        style={styles.input}
        mode="outlined"
        outlineColor='#EFC81A'
        activeOutlineColor='#EFC81A'
      />
      <FlatList
        data={ingredients}
        renderItem={renderInputField}
        keyExtractor={(_, index) => index.toString()}
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default AddRecipeScreen;
