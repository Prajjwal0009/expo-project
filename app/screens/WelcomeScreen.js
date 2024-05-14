import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View, Text, Button, TextInput } from "react-native";
import colors from "../config/color";
import * as SQLite from "expo-sqlite";
import useGetHook from "../customHooks/useGetHook";
import color from "../config/color";

function WelcomeScreen({ navigation }) {
  const db = SQLite.openDatabase("example.db");
  const [names, setNames] = useState([]);
  const [currentNames, setCurrentNames] = useState(undefined);
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS domainName (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255))"
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM domainName",
        null,
        (txObj, resultSet) => setNames(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
  }, []);

  const addDomainName = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO domainName(name) values (?)",
        [currentNames],
        (txObj, resultSet) => {
          let existingNames = [...names];
          existingNames.push({ id: resultSet.insertId, name: currentNames });
          setNames(existingNames);
          setCurrentNames(undefined);
          navigation.navigate("ViewImageScreen");
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const deleteDomainName = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM domainName WHERE id =?",
        [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingNames = [...names].filter((name) => name.id !== id);
            setNames(existingNames);
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };
  const showNames = () => {
    return names.map((name, index) => {
      return (
        <View key={index} style={styles.rows}>
          <Text>{name.name}</Text>
          <Button title="Delete" onPress={() => deleteDomainName(name.id)} />
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.flexBox}>
        <View style={styles.logoContainer}>
          <Image
            resizeMode="contain"
            source={require("../assets/dibtech.jpg")}
            style={styles.logo}
          />
          <Text>Dibtech Bussiness Solutions</Text>
          <Text style={{ fontWeight: "bold" }}>TV SCREEN</Text>
          <Text style={styles.screen}>Enter Domain</Text>
          <TextInput
            style={styles.input}
            placeholder="https://diberp.dibsolutions.com.au"
            value={currentNames}
            onChangeText={setCurrentNames}
          />
          <View style={styles.buttonContainer}>
            <Button title="Setup" 
            color={color.primary}
            
            onPress={addDomainName} />
          </View>
        </View>
        {showNames()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  flexBox: {
    width: "60%",
    height: 260,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 30,
    height: 30,
  },
  logoContainer: {
    position: "absolute",
    top: 30,
    alignItems: "center",
  },
  screen: {
    marginTop: 20,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#fff",
    marginTop: 5,
    textAlign: "center",
  },

  buttonContainer: {
    backgroundColor: colors.primary,
    width: "70%",
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    borderRadius: 10,
  },
});

export default WelcomeScreen;
