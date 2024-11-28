import axios from "axios";
import { useCallback, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusEffect } from '@react-navigation/native';

function Home({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [recipesNew, setRecipesNew] = useState([]);

  const categories = [
    "Prato Principal",
    "Lanche",
    "Sobremesa",
    "Salada",
    "Bebida",
    "Café da Manhã",
  ];

  useFocusEffect(
    useCallback(() => {
      axios.get(`${API_URL}/recipes`).then(response =>
        setRecipes(response.data)
      )

      axios.get(`${API_URL}/recipes?order_by=created_at&sort=desc`).then(response =>
        setRecipesNew(response.data)
      )
    }, []))


  const getIconNameForCategory = (category) => {
    switch (category) {
      case "Prato Principal":
        return "food";
      case "Lanche":
        return "hamburger";
      case "Sobremesa":
        return "cupcake";
      case "Salada":
        return "carrot";
      case "Bebida":
        return "coffee";
      case "Café da Manhã":
        return "bread-slice";
      default:
        return "food";
    }
  };

  const onPressCategory = (category) => {
    navigation.navigate("CategoryScreen", { category });
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.container}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Explore</Text>
          <ScrollView horizontal>
            {recipes.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigation.navigate("RecipeDetails", { recipe: item })
                }
              >
                <ImageBackground
                  source={{ uri: item.image_url }}
                  style={styles.recipeCard}
                  imageStyle={styles.recipeCardImage}
                >
                  <View>
                    <Text style={styles.recipeCardTitle} numberOfLines={1}>
                      {item.title}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categorias</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.recipeCategoryContainer}>
              {categories.map((category) => (
                <View style={styles.recipeCategory} key={category}>
                  <TouchableOpacity onPress={() => onPressCategory(category)}>
                    <Icon
                      name={getIconNameForCategory(category)}
                      size={50}
                      color="white"
                      style={styles.recipeCategoryAvatar}
                    />
                    <Text style={styles.recipeCategoryTitle}>{category}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Novas receitas</Text>
          <Text style={styles.sectionSubtitle}>
            Receitas adicionadas recentemente
          </Text>

          <ScrollView horizontal>
            {recipesNew.map((item) => (
              <Card style={styles.popularRecipeCard} key={item.id}>
                <TouchableOpacity
                  key={item.id}
                  onPress={() => navigation.navigate("RecipeDetails", { recipe: item })}
                >
                  <Card.Cover
                    source={{ uri: item.image_url }}
                    style={styles.popularRecipeCardImage}
                  />
                  <Card.Content style={styles.popularRecipeCardContent}>
                    <Text style={styles.popularRecipeCardTitle}>
                      {item.title}
                    </Text>
                    <Text style={styles.popularRecipeCardBody} numberOfLines={1}>
                      {item.category}
                    </Text>
                  </Card.Content>
                </TouchableOpacity>
              </Card>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EEEEEE",
    padding: 10,
  },
  searchbar: {
    backgroundColor: "#DDDDDD",
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 35,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  sectionSubtitle: {
    fontSize: 13,
    fontWeight: "200",
    marginBottom: 10,
  },
  recipeCard: {
    height: 150,
    justifyContent: "flex-end",
    padding: 10,
    width: 250,
    marginRight: 10,
  },
  recipeCardImage: {
    borderRadius: 6,
    resizeMode: "cover",
    position: "absolute",
    top: 0,
  },
  recipeCardTitle: {
    color: "#fff",
  },
  recipeCategoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  recipeCategory: {
    alignItems: "center",
    marginEnd: 10,
  },
  recipeCategoryAvatar: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#ed8115",
  },
  recipeCategoryTitle: {
    textAlign: "center",
    marginTop: 5,
  },
  popularRecipeCard: {
    width: 250,
    marginRight: 15,
  },
  popularRecipeCardImage: {
    height: 150,
    borderRadius: 0,
  },
  popularRecipeCardContent: {
    paddingTop: 10,
  },
  popularRecipeCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  popularRecipeCardBody: {
    fontSize: 14,
  },
});

export default Home;
