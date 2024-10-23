import { useState, useEffect } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, Searchbar, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function Home({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [recipesNew, setRecipesNew] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  const handleSubmitSearch = () => { };

  const categories = [
    "Prato Principal",
    "Lanche",
    "Sobremesa",
    "Salada",
    "Bebida",
    "Café da Manhã",
  ];
  useEffect(() => {
    response = [
      {
        title: "hahahah",
        recipe_picture:
          "https://img.freepik.com/free-photo/top-view-food-ingredients-with-pumpkin-soup_23-2148834714.jpg",
        category: "Prato Principal"
      }, {
        title: "hahahah2",
        recipe_picture:
          "https://img.freepik.com/free-photo/top-view-food-ingredients-with-pumpkin-soup_23-2148834714.jpg",
        category: "Prato Principal"
      }, {
        title: "hahahah3",
        recipe_picture:
          "https://img.freepik.com/free-photo/top-view-food-ingredients-with-pumpkin-soup_23-2148834714.jpg",
        category: "Prato Principal"
      },
    ];

    setTimeout(() => {
      setRecipesNew(response);
      setRecipes(response);
    }, 500);
  }, []);

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

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.container}>
        <Searchbar
          placeholder="Buscar"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchbar}
          onSubmitEditing={handleSubmitSearch}
          icon={() => (
            <TouchableOpacity onPress={handleSubmitSearch}>
              <Icon name="magnify" size={24} color="#EEC302" />
            </TouchableOpacity>
          )}
        />

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Receitas populares</Text>
          <Text style={styles.sectionSubtitle}>
            Receitas mais curtidas
          </Text>
          <ScrollView horizontal>
            {recipes.map(item => (
              <TouchableOpacity
                key={item.title}
                onPress={() => navigation.navigate("")}
              >
                <ImageBackground
                  source={{ uri: item.recipe_picture }}
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
            <Text style={styles.sectionTitle}>Category</Text>
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
            {recipesNew.map(item => (
              <Card style={styles.popularRecipeCard} key={item.title}>
                <TouchableOpacity
                  key={item.title}
                  onPress={() =>
                    navigation.navigate("")
                  }
                >
                  <Card.Cover
                    source={{ uri: item.recipe_picture }}
                    style={styles.popularRecipeCardImage}
                  />
                  <Card.Content style={styles.popularRecipeCardContent}>
                    <Text style={styles.popularRecipeCardTitle}>
                      {item.title}
                    </Text>
                    <Text
                      style={styles.popularRecipeCardBody}
                      numberOfLines={1}
                    >
                      {item.category}
                    </Text>
                  </Card.Content>
                </TouchableOpacity>
              </Card>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView >
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
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  sectionLink: {
    color: "#6D61F2",
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
    backgroundColor: "#EFC81A",
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
