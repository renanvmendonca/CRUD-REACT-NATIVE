import React, { useState } from 'react';
import { Alert, View, ScrollView, Text, Button, StyleSheet, TextInput } from 'react-native';
import { getDatabase, ref, remove } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { get, orderByChild, equalTo } from 'firebase/database';
import { onValue } from 'firebase/database';

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

export default function Alterar() {
  const [vinilEscolhido, setVinilEscolhido] = useState(null);
  const [nome, setNome] = useState(null);
  const [compositor, setCompositor] = useState(null);
  const [mensagem, setMensagem] = useState(null);

  const deletarVinil = () => {
    if (!vinilEscolhido) {
      Alert.alert('Exclusão', 'Nenhum vinil selecionado para exclusão.');
      return;
    }

    const vinilRef = ref(db, `vinil/${vinilEscolhido.id}`);

    remove(vinilRef)
      .then(() => {
        Alert.alert('Exclusão', 'Vinil excluído com sucesso!');
        setVinilEscolhido(null);
        setCompositor(null);
        setMensagem(null);
      })
      .catch(() => {
        Alert.alert('Exclusão', 'Não foi possível excluir o vinil.');
      });
  };

  const buscarVinil = (nome) => {
    const vinilRef = ref(db, 'vinil');

    onValue(vinilRef, (snapshot) => {
      const vinil = snapshot.val();

      if (vinil) {
        const vinilEncontrado = Object.entries(vinil).find(([id, vinil]) => vinil.nome === nome);

        if (vinilEncontrado) {
          const [id, vinil] = vinilEncontrado;
          setVinilEscolhido({ id, ...vinil });
        } else {
          setMensagem('Não foi encontrado nenhum vinil com este nome.');
          setVinilEscolhido(null);
        }
      } else {
        setMensagem('Não há vinis cadastrados.');
        setVinilEscolhido(null);
      }
    });
  };
  

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.topo}>
          <Text style={styles.topoTitulo}>Toca do Vinil</Text>
        </View>

        {vinilEscolhido != null && (
          <View style={styles.Box}>
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
                onChangeText={setNome}
                value={nome}
                keyboardType="text"
                placeholder="Digite o nome do vinil"
              />
              <Button title="Selecionar um vinil para exclusão" onPress={() => buscarVinil(nome)} />
            </>
          )}

          {vinilEscolhido != null && (
            <>
              <Text>Confira o vinil que deseja excluir e confirme no botão abaixo:</Text>
              <Button title="Excluir" onPress={() => deletarVinil()} />
            </>
          )}
        </View>
        {mensagem && <Text style={styles.mensagem}>{mensagem}</Text>}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topo: { height: 80, padding: 20, paddingTop: 40, marginBottom: 20, backgroundColor: '#00008B' },
  topoTitulo: { fontSize: 22, marginBottom: -10, color: '#fff', textAlign: 'center' },
  cardContainer: { borderWidth: 1, borderColor: '#d5d5d5', borderRadius: 4, marginBottom: 10, marginHorizontal: 20, padding: 10 },
  Box: { alignItems: 'center' },
  linha: { fontSize: 18 },
  mensagem: { fontSize: 16, color: 'red', marginBottom: 10, textAlign: 'center' },
  TextInputt: {
    backgroundColor: '#DCDCDC',
    borderRadius: 4,
    marginBottom: 15,
    marginTop: 5,
    paddingLeft: 10,
    color: '#4F4F4F'
  },
  mensagem: { color: 'red', textAlign: 'center', marginTop: 10 }
});
