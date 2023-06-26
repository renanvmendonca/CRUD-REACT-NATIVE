import React, { useState } from "react";
import { View, Text, ScrollView, Alert, Button, TextInput, StyleSheet } from "react-native";
import Result from "./Result";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBRiUIShQvOUBx6tsc7RxmO4xCYrCIB2iY",
  authDomain: "crud-vinil-9a417.firebaseapp.com",
  databaseURL: "https://crud-vinil-9a417-default-rtdb.firebaseio.com",
  projectId: "crud-vinil-9a417",
  storageBucket: "crud-vinil-9a417.appspot.com",
  messagingSenderId: "511550129489",
  appId: "1:511550129489:web:ad2e1bb13d0b9b9ed63f70",
  measurementId: "G-L6C4NQ7KDQ"
};



export default function Form() {
  const app = initializeApp(firebaseConfig);
  const db = getDatabase();
  const vinilRef = ref(db, 'vinil');
  const [nome, setNome] = useState("");
  const [compositor, setCompositor] = useState("");
  const [message, setMessage] = useState("Preencha as informações do Vinil");
  const [textButton, setTextButton] = useState("Cadastrar");

  const cadastrarVinil = async () => {
    try {
      const newVinilRef = push(vinilRef);

      await set(newVinilRef, {
        nome,
        compositor
      });

      Alert.alert("Cadastro", "Vinil cadastrado com sucesso");
    } catch (error) {
      console.error("Erro ao cadastrar o Vinil:", error);
    }
  };

  const validation = () => {
    if (nome && compositor) {
      cadastrarVinil();
      setNome("");
      setCompositor("");
      setTextButton("Cadastro finalizado");
      return;
    }
    setTextButton("Cadastrar");
    setMessage("Preencha no mínimo as informações: Nome do Vinil e o compositor");
  }

  return (
    <ScrollView>
      <View style={styles.topo}>
        <Text style={styles.topoTitulo}>Toca do Vinil</Text>
      </View>


      <Result messageResult={message} />

      <View style={styles.container}>
        <Text style={styles.Textt}>Nome do Vinil:</Text>
        <TextInput
          style={styles.TextInputt}
          onChangeText={setNome}
          value={nome}
          keyboardType="text"
        />

        <Text style={styles.Textt}>Nome do compositor:</Text>
        <TextInput
          style={styles.TextInputt}
          onChangeText={setCompositor}
          value={compositor}
          keyboardType="text"
        />

        <Button title={textButton} onPress={validation} />
      </View>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    borderWidth: 1,
    borderColor: "#d5d5d5",
    borderRadius: 4,
    marginBottom: 10,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: "#fafafa",
  },
  Textt: {
    fontSize: 15,
    color: "#363636",
  },
  TextInputt: {
    backgroundColor: "#DCDCDC",
    borderRadius: 4,
    marginBottom: 15,
    color: "#4F4F4F",
    paddingLeft: 10,
  },
  TextTitle: {
    fontSize: 22,
    marginTop: 25,
    textAlign: "center",
    color: "black",
    backgroundColor: "white",
    marginLeft: 80,
    marginRight: 80,
    borderRadius: 5,
  },
  topo: {
    height: 80,
    padding: 20,
    paddingTop: 40,
    marginBottom: 20,
    backgroundColor: "#00008B",
  },
  topoTitulo: {
    fontSize: 22,
    marginBottom: -10,
    color: "#fff",
    textAlign: "center",
  },
});
