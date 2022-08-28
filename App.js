import { NativeBaseProvider } from 'native-base';
import React from 'react';
import AuthContextProvider from './src/contexts//AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import {customTheme} from './src/themes'
export default function App() {
  return (
    <AuthContextProvider>
      <NativeBaseProvider  theme={customTheme}>
      <AppNavigator />
      </NativeBaseProvider>
      
    </AuthContextProvider>
  )
}