import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    // Get the access token for the storage
    const tokenToGet = await AsyncStorage.getItem(`${this.namespace}: tokens`,);
    // console.log(tokenToGet);
    return tokenToGet;
  }

  async setAccessToken(accessToken) {
    // Add the access token to the storage
    await AsyncStorage.setItem(
      `${this.namespace}: tokens`,
      accessToken,
    );
  }

  async removeAccessToken() {
    // Remove the access token from the storage
    await AsyncStorage.removeItem(`${this.namespace}: tokens`);
  }
}

export default AuthStorage;
