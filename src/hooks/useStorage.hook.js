import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useStorage() {
  async function storeObject(key, value) {
    try {
      console.log(`saving ${value} in ${key}`, value);
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      throw new Error(`failed to store data, ${e}`);
    }
  }

  async function getObject(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      console.log(`getting ${jsonValue} from ${key}`, JSON.parse(jsonValue));
      if (!jsonValue) {
        throw new Error(`failed to find a value stored in key ${key}`);
      }
      return JSON.parse(jsonValue);
    } catch (e) {
      throw new Error(`failed to get data from storage, ${e}`);
    }
  }

  return {storeObject, getObject};
}
