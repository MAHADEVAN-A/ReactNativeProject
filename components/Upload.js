import React,{useState,useEffect} from 'react'
import {StyleSheet,Text,TextInput,View,TouchableHighlight,Image,TouchableOpacity} from 'react-native'
import {
  useFonts, Pacifico_400Regular
} from "@expo-google-fonts/pacifico";
import {
  PaytoneOne_400Regular
} from "@expo-google-fonts/paytone-one";
import {
  Poppins_500Medium,Poppins_700Bold
} from "@expo-google-fonts/poppins";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

const UselessTextInput = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={40}
    />
  );
}

const Upload = ({route,navigation}) => {
  
  const [title,setTitle]= useState(route.params.title)
  const [price,setPrice]= useState(route.params.price)
  const [description,setDescription]= useState(route.params.description)
  const [img,setImg] = useState(route.params.img)
  
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    setImg(pickerResult.uri)
  }
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
    PaytoneOne_400Regular,
    Poppins_700Bold,
    Poppins_500Medium
  });

  const handleSubmit = async()=>{
    const data = {
      ...(price!="")&&{price},
      ...(title!="")&&{title},
      ...(description!="")&&{description},
      ...(img!=1)&&{image:img}
    }
    console.log(data)

    await fetch(`https://strapiii.herokuapp.com/products/${route.params.id}`,{
        method: 'PUT', // or 'PUT'
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
  }

  return (
    <View style={styles.container}>
      <View style={{justifyContent:'space-between',flexDirection:'row'}}>
        <TouchableHighlight
          underlayColor="none"
          onPress={() => navigation.navigate('product')}>
          <FontAwesome
            style={{ fontSize: 30, marginBottom: 40,color:'#2E2E2E' }}
            name="arrow-circle-left"
          />
        </TouchableHighlight>
        <TextInput onChangeText={setPrice} style={{borderWidth:1,width:90,paddingLeft:5,height:30}} placeholder={price} />
      </View>
      <View style={{alignItems:'center'}}>
        {/*<Text style={styles.heading}>Product name</Text>*/}
        <TextInput onChangeText={setTitle} style={styles.input} placeholder={title} />
        {/*<Text style={styles.heading}>Product description</Text>*/}
        <View
          style={{
            borderBottomColor: '#000000',
            borderWidth: 1,
            marginTop:20,
            width:240
          }}>
          <UselessTextInput
            multiline
            numberOfLines={4}
            onChangeText={setDescription}
            placeholder={description}
            style={{padding: 10}}
          />
        </View>
        <Text style={styles.heading}>Product image</Text>
        <View style={styles.imgcont}>
            <Image style={styles.hero_img} source={img} />
        </View>
        <View style={{marginTop:30,flexDirection:'row',width:250,justifyContent:'space-between'}}>
          <TouchableHighlight style={styles.btn} onPress={openImagePickerAsync}>
            <Text style={{ fontSize:15,fontFamily:'Poppins_500Medium'}}>Upload</Text>
          </TouchableHighlight>
          <TouchableOpacity onPress={handleSubmit} activeOpacity={0} style={[styles.btn,{backgroundColor:"#7F7F7F",}]}>
            <Text style={{ fontSize:15,fontFamily:'Poppins_500Medium'}}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginTop:80,
    marginHorizontal:30,
  },
  hero_img:{
    width:250,
    height:250,
  },
  imgcont:{
    marginTop:20,
  },
  heading:{
    fontFamily:'Poppins_700Bold',
    marginTop:40,
    fontSize:20,
  },
  btn:{
    width:100,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    padding:10,
    backgroundColor:"#FFA434",
  },
  input: {
    height: 40,
    width:238,
    fontFamily:'Poppins_500Medium',
    fontSize:13,
    marginVertical: 20,
    borderWidth: 1,
    paddingHorizontal:10,
  },
})

export default Upload;