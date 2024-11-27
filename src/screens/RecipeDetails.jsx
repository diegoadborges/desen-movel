import React from "react";
import { ScrollView, StyleSheet, Text, Image } from "react-native";

  const RecipeDetails = ({ route }) => {
    const { recipe } = route.params; 
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: recipe.recipe_picture }} style={styles.recipeImage} />
        <Text style={styles.recipeTitle}>{recipe.title}</Text>
  
        <Text style={styles.sectionTitle}>Ingredientes:</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.ingredientText}>
            - {ingredient}
          </Text>
        ))}
  
        <Text style={styles.sectionTitle}>Instruções:</Text>
        <Text style={styles.instructionsText}>{recipe.instructions}</Text>
      </ScrollView>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  recipeImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  ingredientText: {
    fontSize: 16,
    marginVertical: 5,
  },
  instructionsText: {
    fontSize: 16,
    marginVertical: 10,
  },
});

export default RecipeDetails;
