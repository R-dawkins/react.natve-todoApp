import { View, TextInput, Text, StyleSheet, TouchableOpacity, TextInputComponent } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function Body(props) {
  const [todoList, setTodoList] = useState([]);
  const [todoText, setTodoText] = useState("");
  const handleCheck = (tid) => {
    const updateCheck = props.todoList.filter(todo => todo.tid === tid ? todo.completed = !todo.completed : todo.completed)
    setTodoList(updateCheck) //setTodoList에 변경되었다는 신호만 줄 뿐이라서 불필요한 렌더링이 일어남 (깜빡임)
  }

  const handleRemove = (tid) => {
    const removeIndex = props.todoList.findIndex(todo => todo.tid === tid)
    const removeList = props.todoList.splice(removeIndex,1)
    setTodoList([])
  }
  const handleEdit = (tid) => {
    const updateCheck = props.todoList.filter(todo => todo.tid === tid ? todo.isEditing = !todo.isEditing : todo.isEditing)
    setTodoList(updateCheck)
  }
  const handleUpdate = (tid) => {
    const updateList = todoList.filter(todo=>{
      if(todo.tid === tid){
        todo.text = todoText
        todo.isEditing = !todo.isEditing;
      }
    })
    setTodoList(updateList)
  }

  useEffect(() => {
    console.log("updated");
    setTodoList(props.todoList)
    axios.get('http://192.168.50.31:8000/todo').then(result=>{console.log(result.data)})
    // https://stackoverflow.com/questions/33704130/react-native-android-fetch-failing-on-connection-to-local-api
    //
  })
  


  return (
    <View style={styles.container}>
      {todoList.map((todo) =>
        <View key={todo.tid} style={styles.todo}>
          <View style={styles.todoLeft}>
            {todo.completed ?
              <TouchableOpacity onPress={() => handleCheck(todo.tid)}>
                <MaterialCommunityIcons
                  style={styles.icons}
                  name="checkbox-outline"
                  size={24}
                  color="black" />
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => handleCheck(todo.tid)}>
                <MaterialCommunityIcons
                  style={styles.icons}
                  name="checkbox-blank-outline"
                  size={24}
                  color="black" />
              </TouchableOpacity>
            }

            {todo.isEditing ?
              <TextInput onChangeText={setTodoText}> {todo.text} </TextInput>
              :
              <TextInput style={{color:"black"}} editable={false}> {todo.text} </TextInput>
            }
          </View>
          <View style={styles.todoLeft}>
            {todo.isEditing ?
              <TouchableOpacity onPress={() => handleUpdate(todo.tid)}>
                <MaterialIcons style={styles.icons} name="check" size={24} color="black" />
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => handleEdit(todo.tid)}>
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
