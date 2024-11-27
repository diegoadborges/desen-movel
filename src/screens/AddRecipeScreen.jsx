import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list'
import { FlatList } from 'react-native-web';

const AddRecipeScreen = ({ navigation }) => {
  const [recipeTitle, setRecipeTitle] = useState('');
  const [category, setCategory] = React.useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inputStrings, setInputStrings] = useState(['']);


  const addInputField = () => {
    setInputStrings([...inputStrings, '']);
  };

  const updateInputField = (index, text) => {
    const updatedInputs = [...inputStrings];
    updatedInputs[index] = text;
    setInputStrings(updatedInputs);
  };

  const removeInputField = (index) => {
    const filteredInputs = inputStrings.filter((_, i) => i !== index);
    setInputStrings(filteredInputs);
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

    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('Home')
      setRecipeTitle('');
      setImageUrl('');
    }, 500);
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
      {inputStrings.length > 1 && (
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
        label="Link da foto"
        value={imageUrl}
        onChangeText={text => setImageUrl(text)}
        style={styles.input}
        mode="outlined"
        outlineColor='#EFC81A'
        activeOutlineColor='#EFC81A'

      />
      <FlatList
        data={inputStrings}
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
