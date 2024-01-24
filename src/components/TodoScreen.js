import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import Header from './Header';
import Body from './Body';
import { useState, useEffect } from 'react';
import { getStorage, removeStorage } from '../util/storage';

export default function TodoScreen({navigation}) {
  const [todoList, setTodoList] = useState([]);
  const [update,setUpdate] = useState(false);
  const [isLogin,setIsLogin] = useState(false);
  const getLogin = async () => {
    await getStorage("autoLogin").then(result=>{console.log(result);})
      setIsLogin(true);
  }
  const handleLogout = () => {
    removeStorage("autoLogin")
    navigation.navigate('LoginScreen')
  }
  useEffect(()=>{
    getLogin();
  },[])
  if(isLogin){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Todo List!</Text>
        <Header setUpdate={setUpdate} update={update} />
        <Body todoList={todoList} setUpdate={setUpdate} update={update}/>
        <Button onPress={handleLogout} title='logout'></Button>
      </View>
    );
  }else{
    <View style={styles.container}>
      <Text style={styles.title}>로그인이 필요합니다.</Text>
    </View>
  }
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
