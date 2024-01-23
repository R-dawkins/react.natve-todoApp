import { View, TextInput, Text, StyleSheet, TouchableOpacity, TextInputComponent } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function Body(props) {
  const [todoList, setTodoList] = useState([]);
  const [todoText, setTodoText] = useState("");
  
  const handleCheck = (tid,isCompleted) => {
    axios.put(`http://192.168.50.31:8000/todo/${isCompleted}/${tid}`)
    .then(result=>{props.setUpdate(!props.update)})

  }

  const handleRemove = (tid) => {
    axios.delete(`http://192.168.50.31:8000/todo/${tid}`)
    .then(result=>{props.setUpdate(!props.update)})
  }
  const handleEdit = (tid,isEditing) => {
    axios.put(`http://192.168.50.31:8000/todo/edit/${isEditing}/${tid}`)
    .then(result=>{props.setUpdate(!props.update)})
  }

  const handleUpdate = (tid,isEditing) => {
    axios.put(`http://192.168.50.31:8000/todo/edit/${isEditing}/${tid}/${todoText}`)
    .then(result=>{props.setUpdate(!props.update)})
  }

  useEffect(() => {
    axios.get('http://192.168.50.31:8000/todo').then(result=>{setTodoList(result.data);})
  },[props.update])
  


  return (
    <View style={styles.container}>
      {todoList.map((todo) =>
        <View key={todo.tid} style={styles.todo}>
          <View style={styles.todoLeft}>
            {todo.isCompleted === 1 ?
              <TouchableOpacity onPress={() => handleCheck(todo.tid,todo.isCompleted)}>
                <MaterialCommunityIcons
                  style={styles.icons}
                  name="checkbox-outline"
                  size={24}
                  color="black" />
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => handleCheck(todo.tid,todo.isCompleted)}>
                <MaterialCommunityIcons
                  style={styles.icons}
                  name="checkbox-blank-outline"
                  size={24}
                  color="black" />
              </TouchableOpacity>
            }

            {todo.isEditing ?
              <TextInput onChangeText={setTodoText}> {todo.content} </TextInput>
              :
              <TextInput style={{color:"black"}} editable={false}> {todo.content} </TextInput>
            }
          </View>
          <View style={styles.todoLeft}>
            {todo.isEditing === 1 ?
              <TouchableOpacity onPress={() => handleUpdate(todo.tid,todo.isEditing,todo.content)}>
                <MaterialIcons style={styles.icons} name="check" size={24} color="black" />
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => handleEdit(todo.tid,todo.isEditing)}>
                <MaterialIcons style={styles.icons} name="edit" size={24} color="black" />
              </TouchableOpacity>
            }
            <TouchableOpacity onPress={() => handleRemove(todo.tid)}>
              <MaterialCommunityIcons style={styles.icons} name="delete" size={24} color="black" />
            </TouchableOpacity>
          </View>

        </View>
      )}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  todo: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',
    height: 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  todoLeft: {
    flexDirection: 'row'
  },
  icons: {
    marginHorizontal: 5
  }
});
