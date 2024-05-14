import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import colors from "../config/color";
import useGetHook from "../customHooks/useGetHook";
import color from "../config/color";
function ViewImageScreen({ navigation }) {
  const id = "";
  const { data, loading, refetch } = useGetHook(id);

  const splitData = [data.slice(0, 4), data.slice(4)];
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Settings")}
          style={styles.settings}
        >
          <Image
            resizeMode="contain"
            source={require("../assets/settings.png")}
            style={styles.settingIcon}
          />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image
            resizeMode="contain"
            source={require("../assets/dibtech.jpg")}
            style={styles.logo}
          />
          <Text style={styles.heading}>Select Your TV</Text>

          <FlatList
            data={splitData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item: rowData }) => (
              <View style={styles.rowContainer}>
                {rowData.map((item) => (
                  <View key={item.id} style={styles.imageContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("SlideScreens", { user: item.id })
                      }
                    >
                      <ImageBackground
                        style={styles.image}
                        resizeMode="contain"
                        source={require("../assets/Television.jpg")}
                      >
                        <Text style={styles.name}>{item.name}</Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title="Save"
          color={color.primary}
          onPress={() => navigation.navigate("Settings")}
        />
      </View>
    </>
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
    width: 200,
    height: 100,
  },
  imageContainer: {
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 40,
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
  button: {
    // backgroundColor: "black",
  },
  buttonContainer: {
    backgroundColor: colors.primary,
    width: "20%",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    bottom: "5%",
    left: "40%",
  },
  settingIcon: {
    top: 7,
    left: 15,
  },
});

export default ViewImageScreen;
