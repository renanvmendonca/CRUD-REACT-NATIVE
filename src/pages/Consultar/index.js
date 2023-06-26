import React, { useState } from 'react';
import { Alert, View, ScrollView, Text, Image, Button, StyleSheet, TextInput } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';

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

// Inicialize o app Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

export default function Consultar() {
  const [vinilEscolhido, setVinilEscolhido] = useState(null);
  const [nomeVinil, setNomeVinil] = useState(null);
  const [erroBusca, setErroBusca] = useState(null);

  const getVinil = (nomeVinil) => {
    const vinilRef = ref(db, 'vinil');

    onValue(vinilRef, (snapshot) => {
      const vinil = snapshot.val();

      if (vinil) {
        const vinilEncontrado = Object.values(vinil).find((vinil) => vinil.nome === nomeVinil);

        if (vinilEncontrado) {
          setVinilEscolhido(vinilEncontrado);
          setErroBusca(null);
        } else {
          setVinilEscolhido(null);
          setErroBusca('Não encontrei nenhum vinil com este nome!');
        }
      } else {
        setVinilEscolhido(null);
        setErroBusca('Não encontrei nenhum vinil cadastrado!');
      }
    }, (error) => {
      setVinilEscolhido(null);
      setErroBusca('Ocorreu um erro ao buscar os vinis.');
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.topo}>
          <Text style={styles.topoTitulo}>Toca do Vinil</Text>
        </View>

        {vinilEscolhido != null && (
          <View style={styles.cardContainer}>
            <Text style={styles.linha}>Nome do vinil: {vinilEscolhido.nome}</Text>
            <Text style={styles.linha}>Compositor: {vinilEscolhido.compositor}</Text>
          </View>
        )}

        <View style={styles.cardContainer}>
          {vinilEscolhido == null && (
            <>
              <Text>Digite o nome do vinil no campo abaixo:</Text>
              <TextInput
                style={styles.TextInputt}
                onChangeText={setNomeVinil}
                value={nomeVinil}
                keyboardType="text"
              />
            </>
          )}

          <Button title="Consultar" onPress={() => getVinil(nomeVinil)} />
        </View>

        {erroBusca && (
          <View style={styles.cardContainer}>
            <Text style={styles.erro}>{erroBusca}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },

  topo: { height: 80, padding: 20, paddingTop: 40, marginBottom: 20, backgroundColor: '#00008B' },
  topoTitulo: { fontSize: 22, marginBottom: -10, color: '#fff', textAlign: 'center' },

  cardContainer: { borderWidth: 1, borderColor: '#d5d5d5', borderRadius: 4, marginBottom: 10, marginHorizontal: 20, padding: 10 },
  cardTitle: { fontSize: 22, marginBottom: 20, textAlign: 'center', color: '#656565' },

  Box: { alignItems: 'center' },

  linha: { fontSize: 18, marginBottom: 10, borderRadius: 4, paddingLeft: 10, paddingBottom: 2, paddingTop: 2 },
  erro: { fontSize: 18, marginBottom: 10, borderRadius: 4, paddingLeft: 10, paddingBottom: 2, paddingTop: 2, color: 'red' },

  TextInputt: {
    backgroundColor: '#DCDCDC',
    borderRadius: 4,
    marginBottom: 15,
    marginTop: 5,
    color: '#4F4F4F',
    paddingLeft: 10,
  },
});
