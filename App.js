import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import HomeScreen from './components/HomeScreen';
import LoginSignup from './components/LoginSignup';
import ProductList from './components/ProductList';
import Upload from './components/Upload';
import Company from './components/Company';
import ProductCard from './components/ProductCard';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import { PaytoneOne_400Regular } from '@expo-google-fonts/paytone-one';
import { Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(255, 255, 255)',
  },
};


export default function App() {
  
  const img = require('./assets/frame1.jpg')
  const dummyData = {
     "id": 3,
      "email": "balaji@gmail.com",
      "password": "heroworld",
      "company_name": "Balaji Opticals",
      "published_at": "2021-10-07T06:39:53.666Z",
      "created_at": "2021-10-07T06:39:53.668Z",
      "updated_at": "2021-10-07T06:39:53.668Z"
  }
  
  const imgg = require(`./assets/login.png`);
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          initialRouteName="upload"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="product"  component={ProductList} />
          <Stack.Screen name="upload" initialParams={{id:'4',price:1000,title:'Chase googles',description:'product description',img}} component={Upload} />
          <Stack.Screen name="company" component={Company} />
          <Stack.Screen name="card" component={ProductCard} />

          <Stack.Screen
            name="login"
            // initialParams={{ btitle: 'Sign Up', cname:true, pass: false,img: imgg }}
            initialParams={{ btitle: 'Login', cname:false, pass: true,img: imgg }}
            component={LoginSignup}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
// initialParams={{data:dummyData}}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
