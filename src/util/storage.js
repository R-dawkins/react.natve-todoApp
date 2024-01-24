import AsyncStorage from "@react-native-async-storage/async-storage";

//get promise타입으로 반환하기 때문에 .then(result=>result) 필요하다

export const getStorage = async (key) => {
  const result = await AsyncStorage.getItem(key);
  return result && JSON.parse(result);
};

//set

export const setStorage = async (key, value) => {
  return await AsyncStorage.setItem(key, JSON.stringify(value));
};

//remove

export const removeStorage = async (key) => {
  return await AsyncStorage.removeItem(key);
};