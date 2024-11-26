import React from "react";
import { ScrollView, StyleSheet, Text, Image } from "react-native";

const RecipeDetails = ({ route }) => {
    const { recipe } = route.params;
  
    // Verifique os dados recebidos
    console.log(recipe);
  
    // Adicione os detalhes de cada receita (ingredientes e instruções)
    if (recipe.title === "Ovo cozido") {
      recipe.ingredients = [
        "Ovos",
        "Água",
      ];
      recipe.instructions = "Coloque os ovos em uma panela com água. Deixe ferver por 10 minutos. Retire da água e sirva.";
    }
  
    if (recipe.title === "Miojo com ovo") {
      recipe.ingredients = [
        "1 pacote de miojo",
        "1 ovo",
        "Água",
        "Temperos a gosto",
      ];
      recipe.instructions = "Cozinhe o miojo conforme as instruções do pacote. Em uma frigideira, frite um ovo. Misture o ovo frito com o miojo e adicione os temperos de sua preferência.";
    }
  
    if (recipe.title === "Brigadeiro") {
      recipe.ingredients = [
        "1 lata de leite condensado",
        "2 colheres de sopa de manteiga",
        "7 colheres de sopa de achocolatado em pó",
        "Chocolate granulado",
      ];
      recipe.instructions = "Misture o leite condensado, a manteiga e o achocolatado em pó em uma panela. Cozinhe em fogo baixo, mexendo sempre, até desgrudar do fundo. Deixe esfriar, enrole e passe no granulado.";
    }
  
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
