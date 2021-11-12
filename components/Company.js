import React from 'react';
import {StyleSheet,View,Text,TouchableHighlight,ScrollView} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import ProductCard from './ProductCard'

import {
  useFonts, Pacifico_400Regular
} from "@expo-google-fonts/pacifico";
import {
  PaytoneOne_400Regular
} from "@expo-google-fonts/paytone-one";
import {
  Poppins_500Medium,Poppins_700Bold
} from "@expo-google-fonts/poppins";

const Drawer = createDrawerNavigator();
 
const HomeDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Company} />
      <Drawer.Screen name="Account" component={Company} />
    </Drawer.Navigator>
  );
};

export default function Company({navigation})
{
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
    PaytoneOne_400Regular,
    Poppins_700Bold,
    Poppins_500Medium
  });

  return(
    <ScrollView style={styles.container}>
        <TouchableHighlight
        underlayColor="none"
        onPress={() => navigation.navigate('home')}>
        <FontAwesome
          style={{ fontSize: 30,marginHorizontal:20, marginBottom: 20,color:'#2E2E2E' }}
          name="arrow-circle-left"
        />
      </TouchableHighlight>
      <View style={{marginHorizontal:20,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <Text style={{fontSize:18,fontFamily:'Poppins_700Bold'}}>Ajit Opticals</Text>
        <TouchableHighlight style={{backgroundColor:'#FFE4D1',borderRadius:15}}>
          <View style={{flexDirection:'row',alignItems:'center',padding:10,}}>
          <FontAwesome style={{fontSize:15,color:'#FFA434'}} name='star' />
          <Text style={{color:'#FFA434'}}>1289</Text>
          </View>
        </TouchableHighlight>
      </View>
      <View style={styles.section}>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:60,
    marginHorizontal:0,
    // backgroundColor:'#DBE7FF'
  },
  button: {
    width:100,
    textAlign:"center",
    fontFamily:"Poppins_500Medium",
    borderRadius:5,
    fontSize:15,
    backgroundColor: "#FFA434",
    padding: 5
  },
  section:{
    flex:1,
    marginVertical:20,
    flexDirection:'row',
    justifyContent:'space-around',
    flexWrap: 'wrap',
    paddingTop:5,
  }
})
