import { useState } from "react";
import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, Searchbar, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function Home({ navigation }) {
  const [recipesNew, setRecipesNew] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  const handleSubmitSearch = () => {
    if (searchQuery !== "") {
      navigation.navigate("ListRecipe", {
        searchKeyword: searchQuery,
        searchMode: "search",
      });
    } else {
      Alert.alert("Please enter a search keyword");
    }
  };

  const categories = [
    "Main Dish",
    "Snack",
    "Dessert",
    "Salad",
    "Beverage",
    "Breakfast",
  ];

  const getIconNameForCategory = (category) => {
    switch (category) {
      case "Main Dish":
        return "food";
      case "Snack":
        return "hamburger";
      case "Dessert":
        return "cupcake";
      case "Salad":
        return "carrot";
      case "Beverage":
        return "coffee";
      case "Breakfast":
        return "bread-slice";
      default:
        return "food";
    }
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.container}>
        <Searchbar
          placeholder="Search Pasta, Bread, etc"
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

        {/* Popular Recipes */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Popular Recipes</Text>
          <Text style={styles.sectionSubtitle}>
            Check this out most liked recipes
          </Text>
          <ScrollView horizontal>
            {recipes.map((item, key) => (
              <TouchableOpacity
                key={key}
                onPress={() => navigation.navigate("Detail", { recipe: item })}
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
        {/* End of Popular Recipes */}

        {/* New Recipes */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Category</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.recipeCategoryContainer}>
              {categories.map((category, key) => (
                <View style={styles.recipeCategory} key={key}>
                  <TouchableOpacity onPress={() => onPressCategory(category)}>
                    <Icon
                      name={getIconNameForCategory(category)} // Implement a function to map category to icon name
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
        {/* End of New Recipes */}

        {/* Popular For You */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>New Recipes</Text>
          <Text style={styles.sectionSubtitle}>
            Keep updated with new recipes
          </Text>

          <ScrollView horizontal>
            {recipesNew.map((item, key) => (
              <Card style={styles.popularRecipeCard} key={key}>
                <TouchableOpacity
                  key={key}
                  onPress={() =>
                    navigation.navigate("Detail", { recipe: item })
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
        {/* End of Popular For You */}
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
