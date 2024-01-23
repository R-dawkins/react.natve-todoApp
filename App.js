import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './src/components/Header';
import Body from './src/components/Body';
import { useState } from 'react';

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [update,setUpdate] = useState(false);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Todo List!</Text>
      <Header setUpdate={setUpdate} update={update} />
      <Body todoList={todoList} setUpdate={setUpdate} update={update}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    marginLeft: 30,
    marginBottom : 20
  }
});
