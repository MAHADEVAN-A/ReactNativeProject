import React,{useState,useEffect} from 'react';
import { View, Text, Image, TextInput, FlatList,TouchableHighlight,ScrollView, StyleSheet } from 'react-native';
import AppLoading from 'expo-app-loading';

import {
  useFonts, Pacifico_400Regular
} from "@expo-google-fonts/pacifico";
import {
  PaytoneOne_400Regular
} from "@expo-google-fonts/paytone-one";
import {
  Poppins_500Medium,Poppins_700Bold
} from "@expo-google-fonts/poppins";





export default function HomeScreen({ route,navigation }){

  const [search, setSearch] = useState('');
  const [data,setData] = useState([]);
  const [filteredData,setFilteredData] = useState(data);
  useEffect(()=>{
    const callApi = async()=>{
        await fetch('https://strapiii.herokuapp.com/companies')
        .then(response => response.json())
        .then(data => {
          setData(data)
          setFilteredData(data)
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    callApi()
  },[])
 
  const Item = ({title})=>{
    return(
      <TouchableHighlight style={styles.item} onPress={() => navigation.navigate('company')} underlayColor="#FFA434">
      <Text style={{
      fontFamily:'Poppins_500Medium'}}>{title}</Text>
      </TouchableHighlight>
    )
  }

  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
    PaytoneOne_400Regular,
    Poppins_700Bold,
    Poppins_500Medium
  });

  const renderItem = ({ item }) => (
    <Item  title={item.company_name} />
  );

    const searchFilterFunction = (text) => {
      // Check if searched text is not blank
      if (text) {
        // Inserted text is not blank
        // Filter the masterDataSource
        // Update FilteredDataSource
        const newData = data.filter(
          function (item) {
            const itemData = item.company_name? item.company_name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setFilteredData(newData);
        setSearch(text);
      } else {
        // Inserted text is blank
        // Update FilteredDataSource with masterDataSource
        setFilteredData(data);
        setSearch(text);
      }
    };

  if(!fontsLoaded)
  return <AppLoading/>
  else
  return(
    <ScrollView>
    <View style={styles.container}>
    
      <View style={styles.heading}>
        <Text style={{fontFamily:'Pacifico_400Regular',fontSize:20,}}>ShowroomKit</Text>
        <TouchableHighlight underlayColor="none" onPress={() => navigation.navigate('login',{btitle:'Login',cname:false,pass:true})}>
          <Text style={{fontFamily:'Poppins_700Bold',marginTop:12,}}>Login</Text>
        </TouchableHighlight>
      </View>
      
      <View style={styles.imgcont}>
        <Image style={styles.hero_img} source={require('../assets/heroimg.png')} />
      </View>

      <Text style={styles.title}>Search the company</Text>

      <View style={{alignItems:"center"}}>
        <TextInput style={styles.input} value={search}    onChangeText={(text) => searchFilterFunction(text)} placeholder="search here" />
      </View>


      <FlatList style={{marginTop:10,}}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    marginTop:50,
    marginHorizontal:30,
  },
  heading:{
    flexDirection: 'row',
    justifyContent:'space-between',
    fontSize:20,
  },
  hero_img:{
    width:200,
    height:200,
  },
  input: {
    height: 40,
    width:238,
    marginTop: 20,
    borderWidth: 1,
    padding: 10,
  },
  item: {
    width:250,
    borderRadius:10,
    marginTop: 15,
    padding: 10,
  },
  imgcont:{
    marginTop:50,
    alignItems:"center",
  },
  title:{
    marginTop:50,
    marginBottom:20,
    fontSize:20,
    textAlign: 'center',
    fontFamily: 'PaytoneOne_400Regular'
  }
});