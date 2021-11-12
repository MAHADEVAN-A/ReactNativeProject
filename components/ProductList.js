import React, { useState,useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import { PaytoneOne_400Regular } from '@expo-google-fonts/paytone-one';
import { Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';


const Item = ({ title, id }) => {
  return (
    <TouchableHighlight
      style={styles.item}
      onPress={() => alert('Pressed!')}
      underlayColor="#FFA434">
      <View style={styles.list}>
        <Text>{id}</Text>
        <View style={{ width: 200 }}>
          <Text
            style={{
              fontFamily: 'Poppins_500Medium',
            }}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const ProductList = ({ route,navigation }) => {
  
  const [search, setSearch] = useState('');
  const [masterDataSource,setMasterDataSource]=useState([])
  const [filteredDataSource, setFilteredDataSource] = useState(
    masterDataSource
  );
  const {data} = route.params;
  const companyId = data.id;
  const companyName = data.company_name
  
  useEffect(()=>{
    const callApi = async()=>{
        await fetch('https://strapiii.herokuapp.com/products')
        .then(response => response.json())
        .then(data => {
          const dummy = data.filter((para) => {
            return para.company.id == companyId
          })
          setMasterDataSource(dummy)
          setFilteredDataSource(dummy)
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    callApi()
  },[])

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
    PaytoneOne_400Regular,
    Poppins_700Bold,
    Poppins_500Medium,
  });
  const renderItem = ({ item }) => <Item title={item.title} id={item.id} />;
  return (
    <View style={styles.container}>
      <View style={styles.moveApart}>
        <TouchableHighlight
          underlayColor="none"
          onPress={() => navigation.navigate('home')}>
          <FontAwesome
            style={{ fontSize: 30, marginBottom: 40,color:'#2E2E2E' }}
            name="arrow-circle-left"
          />
        </TouchableHighlight>
        <Text style={styles.cname}>{companyName}</Text>
      </View>
      <View style={styles.nav}>
        <Text style={styles.heading}>Product List</Text>
        <TextInput
          style={styles.input}
          value={search}
          onChangeText={(text) => searchFilterFunction(text)}
          placeholder="search"
        />
      </View>
      <FlatList
        style={{ marginTop: 30 }}
        data={filteredDataSource}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={{ alignItems: 'flex-end' }}>
        <TouchableHighlight underlayColor="none" onPress={() => navigation.navigate('upload')}>
          <FontAwesome
            style={{ fontSize: 40, padding: 10, color:'#2E2E2E' }}
            name="plus-circle"
          />
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    marginTop: 80,
    marginHorizontal: 40,
  },
  heading: {
    fontSize: 18,
    fontFamily: 'Poppins_500Medium',
  },
  cname:{
    fontSize:18,
    fontFamily:'Poppins_700Bold'
  },
  moveApart:{justifyContent:'space-between',flexDirection:'row'},
  nav: {
    width: 260,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    width: 108,
    borderRadius: 15,
    borderWidth: 1,
    padding: 10,
  },
  list: {
    width: 270,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    width: 250,
    borderRadius: 10,
    marginTop: 15,
    padding: 10,
  },
});

export default ProductList;
