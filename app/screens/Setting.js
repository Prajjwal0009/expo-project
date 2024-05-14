import React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Button,
} from "react-native";
import colors from "../config/color";
import color from "../config/color";
export default function Settings({ navigation }) {


  
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
        <Text style={styles.heading}>Select Your TV</Text>
        <View style={styles.horizontalline} />
        <View style={styles.verticalline} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("ViewImageScreen")}>
        <ImageBackground
          resizeMode="contain"
          source={require("../assets/Television.jpg")}
          style={styles.television}
        >
          <Text style={styles.name}>Change Screen</Text>
        </ImageBackground>
      </TouchableOpacity>
      <View style={styles.formContainer}>
        <View>
          <Text style={styles.text}>Change Web Socket URL</Text>
          <TextInput style={styles.input} placeholder="Select Screen" />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.text}>Change Domain</Text>
          <TextInput style={styles.input} placeholder="Select Screen" />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            title="Save"
            color={color.primary}
            onPress={() => navigation.navigate("ViewImageScreen")}
          />
        </View>
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
  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    marginTop: 0,
    padding: 4,
  },
  logoContainer: {
    position: "absolute",
    top: 30,
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    backgroundColor: colors.primary,
    width: "40%",
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    top: 40,
  },
  logo: {
    width: 40,
    height: 40,
  },
  television: {
    width: 200,
    height: 130,
    left: -230,
    top: 120,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 30,
  },
  name: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 50,
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
    top: 12,
    left: 25,
  },
  horizontalline: {
    width: "90%",
    height: 1,
    backgroundColor: "gray",
  },
  verticalline: {
    width: 1,
    height: "70%",
    backgroundColor: "gray",
  },
  formContainer: {
    right: -250,
    bottom: 40,
    width: "40%",
  },
});
