import axios from "axios";
import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, Card } from "react-native-paper";

function CategoryScreen({ route, navigation }) {
  const { category } = route.params;
  const [recipesInCategory, setRecipesInCategory] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/recipes?category=${category}`).then(response =>
      setRecipesInCategory(response.data)
    )
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
              <Card.Cover source={{ uri: item.image_url }} style={styles.recipeCardImage} />
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
