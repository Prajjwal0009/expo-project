import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
} from "react-native";
import useGetHook from "../customHooks/useGetHook";
function SlideScreens({ navigation, route }) {
  const { user } = route.params;
  const id = user;
  const { data, loading, refetch } = useGetHook(id);
  const slides = data.slides || [];
  const allImages = slides.reduce((images, slide) => {
    if (slide.image && slide.image.length > 0) {
      images.push({
        slideName: slide.name,
        images: slide.image,
      });
    }
    return images;
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ViewImageScreen")}
        style={styles.settings}
      >
        <Image
          resizeMode="contain"
          source={require("../assets/play.png")}
          style={styles.settingIcon}
        />
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Image
          resizeMode="contain"
          source={require("../assets/dibtech.jpg")}
          style={styles.logo}
        />
        <Text style={styles.heading}>Select Your Slide</Text>
        <FlatList
          data={allImages}
          numColumns={4}
          keyExtractor={(item) => item.slideName}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.name}>{item.slideName}</Text>
              {item.images.length > 0 && (
                <TouchableOpacity
                  style={styles.imageContainer}
                  onPress={() =>
                    navigation.navigate("FullScreenImageScreen", {
                      images: item,
                    })
                  }
                >
                  <ImageBackground
                    style={styles.image}
                    resizeMode="contain"
                    source={{ uri: item.images[0].image }}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  rowContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  image: {
    width: 190,
    height: 100,
  },
  name: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 0,
  },
  imageContainer: {
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
  },

  back: {
    top: -150,
    left: -400,
    fontSize: "16px",
  },
  logoContainer: {
    position: "absolute",
    top: 30,
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 30,
  },
  settings: {
    position: "absolute",
    top: 0,
    right: 0,
    fontSize: 16,
    backgroundColor: "#444E81",
    borderBottomLeftRadius: 60,
    width: 55,
    height: 65,
  },
  settingIcon: {
    top: 15,
    left: 25,
  },
});

export default SlideScreens;
