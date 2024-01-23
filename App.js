import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './src/components/Header';
import Body from './src/components/Body';
import { useState } from 'react';

export default function App() {
  const [todoList, setTodoList] = useState([]);

  const addTodo = (e) => {
    setTodoList([...todoList, {tid:e.tid, text:e.text, completed:e.completed, isEditing:e.isEditing}]);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Todo List!</Text>
      <Header addTodo={addTodo} />
      <Body todoList={todoList}/>
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
