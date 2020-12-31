import React from 'react';
import { StyleSheet, View } from 'react-native';

import Authenticate from './src/authentication/Authenticate'
import LoginScreen from './src/screens/Login/LoginScreen'

function App() {
  return <LoginScreen />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App