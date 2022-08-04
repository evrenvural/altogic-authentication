import AsyncStorage from "@react-native-async-storage/async-storage"

class Storage {
  constructor() {
    this.KEY_AUTH = "@auth"
  }

  set = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {}
  }

  get = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {}
  }

  remove = async (key) => {
    await AsyncStorage.removeItem(key)
  }
}

export default new Storage()
