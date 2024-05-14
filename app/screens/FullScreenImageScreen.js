import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width > 600 ? width : 900;
const AUTOPLAY_INTERVAL = 3000;

const FullScreenImageScreen = ({ navigation, route }) => {
  const { images } = route.params.images;
  console.log(images);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef();

  const scrollToItem = (index) => {
    scrollViewRef.current.scrollTo({ x: index * ITEM_WIDTH, animated: true });
    setActiveIndex(index);
  };

  const advanceCarousel = () => {
    const newIndex = (activeIndex + 1) % images.length;
    scrollToItem(newIndex);
  };

  useEffect(() => {
    const autoplayTimer = setTimeout(advanceCarousel, AUTOPLAY_INTERVAL);
    return () => clearTimeout(autoplayTimer);
  }, [activeIndex]);

  return (
    <View style={styles.container} width="100%" height="100%">
      <TouchableOpacity
        style={styles.smallImageContainer}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require("../assets/Vector.png")}
          style={styles.smallImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x / ITEM_WIDTH
          );
          setActiveIndex(newIndex);
        }}
      >
        {images.map((item) => (
          <View key={item.id} style={[styles.item, { width: ITEM_WIDTH }]}>
            <Image
              source={{ uri: item.image }}
              resizeMode="contain"
              style={styles.image}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    width: "100%",
    height: "100%",
  },
  item: {
    margin: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    marginLeft: 10,
  },
  smallImageContainer: {
    top: 20,
    left: 40,
    zIndex: 1,
  },
  smallImage: {
    width: 30,
    height: 30,
  },
});

export default FullScreenImageScreen;
