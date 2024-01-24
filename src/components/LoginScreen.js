import axios from "axios";
import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { setStorage } from "../util/storage";

export default function LoginScreen({ navigation }){
  const [username,setUsername] = useState();
  const [password,setPassword] = useState();
  const handleLogin = ()=>{
    axios.post('http://192.168.50.31:8000/login',{id:username,pass:password})
    .then(result=>{
      if(result.data.login_result){
        setStorage("token",result.data.token)
        setStorage("autoLogin",true)
        navigation.navigate('TodoScreen')
      }else{
        alert('로그인에 실패하셨습니다.')
      }
    })
  }
  return(
    <View style={styles.container}>
      <TextInput  style={styles.input} placeholder="User Name"  onChangeText={(text)=>{setUsername(text)}} />
      <TextInput style={styles.input} secureTextEntry placeholder="Password"  onChangeText={(text)=>{setPassword(text)}} />
      <Button title="Login" onPress={handleLogin}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding:16,
  },
  input :{
    width:'90%',
    height:40,
    borderColor:'gray',
    borderWidth:1,
    marginBottom:12,
    paddingLeft:8,
    paddingRight:8,
  }
})