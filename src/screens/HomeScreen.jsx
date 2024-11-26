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
  const handleSubmitSearch = () => {};

  const categories = ["Prato Principal", "Sobremesa"];

  useEffect(() => {
    const recipesResponse = [
      {
        title: "Tapioca de Pizza",
        recipe_picture:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfcgLmsPLBvCxzLPwfbvsfOPHrsYHReUpZHA&s",
        ingredients: [
          "1 xícara de goma de tapioca",
          "150g de queijo mussarela",
          "100g de presunto",
          "Molho de tomate",
          "Orégano",
        ],
        instructions: "Prepare a goma de tapioca e adicione os ingredientes de sua preferência.",
      },
      {
        title: "Strogonoff",
        recipe_picture:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgbNX6ux-vMGoRAgShXxqk_j08gF3bXFEA6A&s",
        ingredients: [
          "500g de peito de frango ou carne bovina",
          "1 lata de creme de leite",
          "1 lata de molho de tomate",
          "Cebola e alho",
          "1 colher de sopa de mostarda",
        ],
        instructions:
          "Corte o frango ou carne em tiras e refogue com cebola e alho. Adicione molho de tomate, mostarda, e o creme de leite. Cozinhe até ficar cremoso.",
      },
      {
        title: "Pastel Cremoso",
        recipe_picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqm-L58nuCz2dB8u13N8B_i4xU7ybW5qhXjQ&s",
        ingredients: [
          "1 pacote de massa para pastel",
          "200g de chocolate meio amargo",
          "100g de leite condensado",
          "1 colher de sopa de manteiga",
          "Açúcar para polvilhar",
        ],
        instructions:
          "Derreta o chocolate com a manteiga e misture com o leite condensado. Recheie a massa com o chocolate derretido e feche o pastel. Frite até dourar e polvilhe açúcar por cima.",
      },
    ];

    const newRecipesResponse = [
      {
        title: "Ovo cozido",
        recipe_picture:
          "https://conteudo.imguol.com.br/c/entretenimento/52/2020/07/06/ovo-1594070430431_v2_1x1.jpg",
        category: "Café da Manhã",
      },
      {
        title: "Miojo com ovo 😋",
        recipe_picture:
          "https://i.ytimg.com/vi/8r0GkMe-I-Y/maxresdefault.jpg",
        category: "Prato Principal",
      },
      {
        title: "Brigadeiro",
        recipe_picture:
          "https://i0.wp.com/blog.madrugashop.com/wp-content/uploads/2022/09/oqueebrisadeirocomofazeressareceitacanbica.jpg?fit=600%2C429&ssl=1",
        category: "Sobremesa",
      },
    ];

    setRecipesNew(newRecipesResponse);
    setRecipes(recipesResponse);
  }, []);

  const getIconNameForCategory = (category) => {
    switch (category) {
      case "Prato Principal":
        return "food";
      case "Sobremesa":
        return "cupcake";
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
              <Icon name="magnify" size={24} color="#ed8115" />
            </TouchableOpacity>
          )}
        />

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Receitas populares</Text>
          <Text style={styles.sectionSubtitle}>Receitas mais curtidas</Text>
          <ScrollView horizontal>
            {recipes.map((item) => (
              <TouchableOpacity
                key={item.title}
                onPress={() =>
                  navigation.navigate("RecipeDetails", { recipe: item })
                }
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
              <Card style={styles.popularRecipeCard} key={item.title}>
                <TouchableOpacity
                  key={item.title}
                  onPress={() => navigation.navigate("RecipeDetails", { recipe: item })}
                >
                  <Card.Cover
                    source={{ uri: item.recipe_picture }}
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
