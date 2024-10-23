import { useEffect, useState, useContext } from 'react';
import { Text, Button, Avatar } from 'react-native-paper';
import { View, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

function DetailScreen({ navigation, route }) {
  const { recipe } = route.params || {};
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const [type, setType] = useState('ingredients');

  useEffect(() => {
    const currentSlug = recipe.slug;

    axios.get(`https://rich-blue-shrimp-wig.cyclic.app/recipe/detail/${currentSlug}`, {
      headers: headers,
    })
      .then((result) => {
        setComments(result.data?.data?.comments)
        setLiked(result.data?.data?.isLiked)
        setSaved(result.data?.data?.isSaved)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleLikeButton = () => {
    if (!user.id) {
      return Alert.alert(
        'Falha',
        'Faça login para curtir',
        [{ text: 'OK', onPress: () => { } }],
        { cancelable: false }
      );
    }

    const url = liked
      ? 'https://rich-blue-shrimp-wig.cyclic.app/recipe/unlike'
      : 'https://rich-blue-shrimp-wig.cyclic.app/recipe/like';

    axios.post(url, {
      userId: user.id,
      recipeId: recipe.id,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setLiked(!liked);
      })
      .catch((error) => {
        Alert.alert(
          'Falha',
          liked ? 'Falha ao descurtir a receita' : 'Falha ao curtir a receita',
          [{ text: 'OK', onPress: () => { } }],
          { cancelable: false }
        );
      });
  };

  const handleSaveButton = () => {
    if (!user.id) {
      return Alert.alert(
        'Erro',
        'Por favor faça o login para salvar',
        [{ text: 'OK', onPress: () => { } }],
        { cancelable: false }
      );
    }

    const url = saved
      ? 'https://rich-blue-shrimp-wig.cyclic.app/recipe/unsave'
      : 'https://rich-blue-shrimp-wig.cyclic.app/recipe/save';

    axios.post(url, {
      userId: user.id,
      recipeId: recipe.id,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setSaved(!saved);
      })
      .catch((error) => {
        Alert.alert(
          'Falha',
          saved ? 'Falha ao remover receita' : 'Falha ao salvar receita',
          [{ text: 'OK', onPress: () => { } }],
          { cancelable: false }
        );
      });
  };

  return (
    <>
      <View style={{ flex: 1, alignItems: 'flex-start' }}>
        {/* Header Background */}
        <View style={{ flex: 0.8, width: '100%' }}>
          <ImageBackground
            source={{ uri: recipe.recipe_picture }}
            style={{
              height: '100%',
              justifyContent: 'flex-end',
              width: '100%',
            }}
            imageStyle={{
              borderRadius: 6,
              resizeMode: 'cover',
              position: 'absolute',
              top: 0,
            }}>
            <View style={{ position: 'absolute', top: 20, marginLeft: 20 }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrowleft" size={30} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={{ marginBottom: 25, padding: 20 }}>
              <Text
                variant="titleLarge"
                style={{
                  color: '#fff',
                  fontSize: 25,
                  marginBottom: 2,
                  textShadowColor: 'rgba(0, 0, 0, 0.75)',
                  textShadowOffset: { width: -1, height: 1 },
                  textShadowRadius: 10,
                }}
                numberOfLines={1}>
                {recipe.title}
              </Text>

              <View style={{ position: 'absolute', top: 10, right: 20, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={handleSaveButton}>
                  <View style={[styles.actContainer, { backgroundColor: saved ? '#EEC302' : 'white' }]}>
                    <Icon name="save" size={20} color={saved ? 'white' : '#EEC302'} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLikeButton}>
                  <View style={[styles.actContainer, { backgroundColor: liked ? '#EEC302' : 'white' }]}>
                    <Icon name="hearto" size={20} color={liked ? 'white' : '#EEC302'} style={{ alignSelf: 'center' }} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
        {/* End of Header Background */}

        {/* Main Content */}
        <View style={{ flex: 1, minWidth: '100%', backgroundColor: 'white', marginTop: -20, borderRadius: 20, borderTopRightRadius: 20, padding: 20 }}>
          {/* Button Switch */}
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <Button
              labelStyle={type === 'ingredients' ? styles.buttonActive : styles.buttonNonActive}
              onPress={() => setType('ingredients')}>
              Ingredients
            </Button>
            <Button
              labelStyle={type === 'video' ? styles.buttonActive : styles.buttonNonActive}
              onPress={() => setType('video')}>
              Video Step
            </Button>
          </View>

          <ScrollView>
            {/* Ingredients View */}
            {type === 'ingredients' ? (
              <View style={{ backgroundColor: '#FAF7ED', borderRadius: 10, padding: 20 }}>
                <Text>{recipe.ingredients}</Text>
              </View>
            ) : (
              <TouchableOpacity onPress={() => Linking.openURL(recipe.video_link)}>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: '#FAF7ED',
                    padding: 10,
                    borderRadius: 15,
                    alignItems: 'center',
                    gap: 25,
                    marginBottom: 15,
                  }}>
                  <Avatar.Image
                    size={60}
                    style={{ borderRadius: 20, backgroundColor: '#efc81a' }}
                  />

                  <View>
                    <Text style={{ fontSize: 18, color: '#B6B6B6' }}>Video</Text>
                    <Text>Click for video step</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
        {/* End Of Main Content */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttonActive: {
    color: '#18172B',
    borderBottomWidth: 2,
    borderBottomColor: '#EEC302',
    fontSize: 16,
  },
  buttonNonActive: { color: '#666666', fontSize: 16 },
  actContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 16,
    marginEnd: 3,
  }
});

export default DetailScreen;
