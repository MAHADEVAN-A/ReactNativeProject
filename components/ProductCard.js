import React from 'react'
import {StyleSheet,View,Text,Image,TouchableHighlight} from 'react-native'
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import { PaytoneOne_400Regular } from '@expo-google-fonts/paytone-one';
import { Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';

import FontAwesome from 'react-native-vector-icons/FontAwesome';


const ProductCard = ()=>{
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
    PaytoneOne_400Regular,
    Poppins_700Bold,
    Poppins_500Medium
  });
  const img = require('../assets/frame1.jpg')
  return(
    <View style={styles.container}>
      <View style={styles.imgcont}>
          <Image style={styles.hero_img} source={img} />
      </View>
      <View style={{padding:9,flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{fontFamily:'Poppins_500Medium',}}>Mandarina</Text>
        <TouchableHighlight >
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <FontAwesome style={{fontSize:15,color:'#FFA434'}} name='star' />
          <Text style={{color:'#FFA434',fontFamily:'Poppins_500Medium',marginTop:4,}}>1289</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    width:170,
    marginBottom:40,
  },
  hero_img:{
    width:170,
    height:170,
  },
})

export default ProductCard;