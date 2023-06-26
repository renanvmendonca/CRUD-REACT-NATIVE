import React, { useState } from 'react';
import { Alert, View, ScrollView, Text, Button, StyleSheet, TextInput } from 'react-native';
import { getDatabase, ref, update, onValue } from 'firebase/database';
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

export default function Alterar() {
  const [VinilEscolhido, setVinilEscolhido] = useState(null);
  const [nome, setNome] = useState(null);
  const [compositor, setCompositor] = useState(null);
  const [mensagem, setMensagem] = useState(null);

  const atualizarVinil = () => {
    if (!VinilEscolhido) {
      setMensagem('Não há Vinil selecionado para atualizar.');
      return;
    }

    if (!nome || !compositor) {
      setMensagem('Por favor, preencha todos os campos para atualizar o Vinil.');
      return;
    }

    const vinilRef = ref(db, `vinil/${VinilEscolhido.id}`);

    update(vinilRef, {
      nome: nome,
      compositor: compositor,
    })
      .then(() => {
        setMensagem('Vinil alterado com sucesso!');
        setVinilEscolhido(null);
        setNome(null);
        setCompositor(null);
      })
      .catch(() => {
        setMensagem('Não foi possível alterar o Vinil.');
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

        {VinilEscolhido != null && (
          <View style={styles.Box}>
            <Text style={styles.linha}>Nome do Vinil: {VinilEscolhido.nome}</Text>
            <TextInput
              style={styles.TextInputtt}
              onChangeText={setNome}
              // value={nome}
              keyboardType="text"
              placeholder="Digite o nome do Vinil"
            />

            <Text style={styles.linha}>Compositor: {VinilEscolhido.compositor}</Text>
            <TextInput
              style={styles.TextInputtt}
              onChangeText={setCompositor}
              value={compositor}
              keyboardType="text"
              placeholder="Digite o novo compositor do Vinil"
            />
          </View>
        )}

        <View style={styles.cardContainer}>
          {VinilEscolhido == null && (
            <>
              <Text>Digite o nome do Vinil no campo abaixo:</Text>
              <TextInput
                style={styles.TextInputt}
                onChangeText={setNome}
                value={nome}
                keyboardType="text"
                placeholder="Digite o nome do Vinil"
              />
              <Button title="Buscar por um Vinil" onPress={() => buscarVinil(nome)} />
            </>
          )}

          {VinilEscolhido != null && (
            <>
              <Text>Digite novamente todos para fazer a alteração e evitar que um campo fique nulo:</Text>
              <Button title="Atualizar registro" onPress={() => atualizarVinil()} />
            </>
          )}
        </View>

        <View style={styles.container}>
          <View style={styles.cardContainer}>
            {mensagem && <Text style={styles.mensagem}>{mensagem}</Text>}
            {/* ... */}
          </View>
        </View>
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
  linha: { fontSize: 18, fontStyle: 'italic' },
  mensagem: { fontSize: 16, color: 'red', marginBottom: 10, textAlign: 'center' },
  TextInputt: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#DCDCDC',
    borderRadius: 4,
    marginBottom: 15,
    marginTop: 5,
    color: '#4F4F4F',
    paddingLeft: 10,
  },
  TextInputtt: {
    marginTop: 5,
    backgroundColor: '#DCDCDC',
    borderRadius: 4,
    marginBottom: 15,
    marginTop: 5,
    paddingLeft: 100,
    paddingRight: 100,
    color: '#4F4F4F',
  },
});
