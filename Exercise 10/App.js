import React from 'react';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
// import Constants from 'expo-constants';
import AuthStorage from './src/utils/authStorage';
import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';
const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);
//we want to give the useSignIn hook access to the token storage instance
import AuthStorageContext from './src/components/contexts/AuthStorageContext';
// console.log(Constants.manifest);
import { Provider as PaperProvider } from 'react-native-paper';

const App = () => {
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <PaperProvider>
              <Main />
            </PaperProvider>
          </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;
