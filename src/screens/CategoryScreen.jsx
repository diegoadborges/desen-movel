import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View, ImageBackground } from "react-native";
import { Text, Card } from "react-native-paper";

function CategoryScreen({ route, navigation }) {
  const { category } = route.params;
  const [recipesInCategory, setRecipesInCategory] = useState([]);

  useEffect(() => {
    const allRecipes = [
      {
        title: "Tapioca de Pizza",
        recipe_picture:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfcgLmsPLBvCxzLPwfbvsfOPHrsYHReUpZHA&s",
        category: "Prato Principal",
      },
      {
        title: "Strogonoff",
        recipe_picture:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgbNX6ux-vMGoRAgShXxqk_j08gF3bXFEA6A&s",
        category: "Prato Principal",
      },
      {
        title: "Brigadeiro",
        recipe_picture:
          "https://i0.wp.com/blog.madrugashop.com/wp-content/uploads/2022/09/oqueebrisadeirocomofazeressareceitacanbica.jpg?fit=600%2C429&ssl=1",
        category: "Sobremesa",
      },
    ];

    const filteredRecipes = allRecipes.filter(recipe => recipe.category === category);
    setRecipesInCategory(filteredRecipes);
  }, [category]);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.container}>
      <Text style={styles.categoryTitle}>{category}</Text>
      <View style={styles.recipesList}>
        {recipesInCategory.map((item) => (
          <Card key={item.title} style={styles.recipeCard}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RecipeDetails", { recipe: item })
              }
            >
              <Card.Cover source={{ uri: item.recipe_picture }} style={styles.recipeCardImage} />
              <Card.Content style={styles.recipeCardContent}>
                <Text style={styles.recipeCardTitle}>{item.title}</Text>
              </Card.Content>
            </TouchableOpacity>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EEEEEE",
    padding: 10,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  recipesList: {
    marginBottom: 35,
  },
  recipeCard: {
    marginBottom: 15,
    borderRadius: 6,
  },
  recipeCardImage: {
    height: 200,
    borderRadius: 6,
  },
  recipeCardContent: {
    paddingTop: 10,
  },
  recipeCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CategoryScreen;
