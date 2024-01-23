import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import axios from 'axios';

export default function Header(props){
  const [todo, setTodo] = useState('');

  const handleAddtodo = () => {
    const tid = Math.round(Math.random() * 1E9);
    console.log(`todo ==>> ${todo}, ${tid}`);
    props.addTodo({tid:tid, text:todo, completed:false, isEditing:false});
    setTodo('');
  }

  return(
    <View style={styles.container}>
      <View style={styles.input}>
        <TextInput 
          style={styles.inputText}
          onChangeText={setTodo}
          value={todo}
          placeholder='할일을 적어주세요'
        />
        <TouchableOpacity onPress={handleAddtodo}>
          <MaterialCommunityIcons 
            style={styles.addBtn} 
            size={35} 
            name='plus-circle' />
          </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex:1,
    backgroundColor: '#fff'
  },
  input: {
    borderRadius: 10,
    backgroundColor: "#e9e9e9",
    paddingLeft: 20,
    paddingRight: 10,
    height: 50,
    alignItems: "center",
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputText: {
    flex: 1,
    fontSize: 15
  },
  addBtn: {
    color: 'mediumseagreen'
  }
});
