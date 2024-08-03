import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootNavigation from '../navigation';


const App=()=> {
      const Stack=createNativeStackNavigator();
  return (
    <NavigationContainer>
    <RootNavigation />

    </NavigationContainer>

  );
}

const styles = StyleSheet.create({

});

export default App;
