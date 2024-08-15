import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Importa GestureHandlerRootView
import AppNavigation from './navigation/appNavigation';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}> 
      <AppNavigation />
    </GestureHandlerRootView>
  );
}

export default App;
