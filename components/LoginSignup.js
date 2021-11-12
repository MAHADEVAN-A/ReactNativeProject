import React,{useState,useEffect} from 'react';
import {StyleSheet,View,Text,TouchableHighlight,Image,TextInput,ScrollView} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  useFonts, Pacifico_400Regular
} from "@expo-google-fonts/pacifico";
import {
  PaytoneOne_400Regular
} from "@expo-google-fonts/paytone-one";
import {
  Poppins_500Medium,Poppins_700Bold
} from "@expo-google-fonts/poppins";



const LoginSignup = ({route,navigation})=>{

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [cpname,setCpname]=useState("")
  const [error,setError]=useState(false)

  let [fontsLoaded] = useFonts({
        Pacifico_400Regular,
        PaytoneOne_400Regular,
        Poppins_700Bold,
        Poppins_500Medium
      });

  const Sbutton =()=>{
    let imgg = require('../assets/signup.png');
    return (
      <TouchableHighlight style={{margin:0,padding:0}} underlayColor="none" onPress={() => navigation.navigate('login',{btitle:'Sign Up',cname:"true",pass:false,img:imgg})}>
          <Text style={styles.footertext}>New User SignUp!</Text>
      </TouchableHighlight>
    )
  }

  const handleSubmit = async()=>{
    const data = { email: email,company_name: cpname,password: password };
    if(JSON.parse(JSON.stringify(btitle))=='Sign Up')
    {
      await fetch('https://strapiii.herokuapp.com/companies', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        setEmail("")
        setPassword("")
        setCpname("")
        navigation.navigate('product',{data})
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
    else{
      await fetch('https://strapiii.herokuapp.com/companies')
      .then(response => response.json())
      .then(data =>{
        const [bsheep] = data.filter((dt)=>{
          return dt.email == email;
        })
        // console.log(bsheep)
    
        if(typeof(bsheep) !== 'undefined' && bsheep != null)
        {
          if(bsheep.password == password){
            // console.log("success")
            navigation.navigate('product',{data:bsheep})
            setError(false)
          }
          else
          {
            setError(true)
          }
        }
        else
        setError(true)
      
        if(!pass)
        console.log('email or password is wrong')
      })
    }
  }
  
  const { btitle,cname,pass,img } = route.params;
  
  return(
    <ScrollView style = {{flex:1,marginTop:50,backgroundColor: 'white',paddingHorizontal:20,}}>
      <View style={styles.logheader}>
        <TouchableHighlight underlayColor="none" onPress={() => navigation.navigate('home')}>
        <FontAwesome style={{fontSize:30,padding:10,color:'#2E2E2E'}} name='angle-left' />
        </TouchableHighlight>
        {/* <Text style={{fontSize:20,marginTop:10,fontFamily:'Poppins_500Medium'}}>{btitle}</Text>*/}
      </View>

      <View style={styles.section}>
        <View style={styles.imgcont}>
          <Image style={styles.hero_img} source={img} />
        </View>

        <View style={{alignItems:"center"}}>
          <TextInput style={styles.input} onChangeText={(text)=>{setEmail(text)}} placeholder="Enter your mailid" />
          <TextInput style={styles.input} onChangeText={(pass)=>setPassword(pass)} secureTextEntry={true} placeholder="Enter your password" />
          {JSON.parse(JSON.stringify(cname)) && <TextInput style={styles.input} placeholder="Enter your company name" onChangeText={(name)=>setCpname(name)}  />}
          {error && <Text>Invalid email or password</Text>}
        </View>

        <TouchableHighlight underlayColor="none" onPress={handleSubmit}  style={{alignItems:"center",marginTop:20,}}>
        <Text style={styles.button}>{JSON.parse(JSON.stringify(btitle))}</Text>
        </TouchableHighlight>

        {JSON.parse(JSON.stringify(pass)) && <View style={styles.footer}>
          <Text style={styles.footertext}>Forget my password</Text>
          <Sbutton/>
        </View>}
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  section:{
    marginTop:30,
    justifyContent:"center",
  },
  button: {
    width:250,
    textAlign:"center",
    fontFamily:"Poppins_500Medium",
    borderRadius:5,
    fontSize:15,
    backgroundColor: "#FFA434",
    padding: 5
  },
  logheader:{
    marginHorizontal:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hero_img:{
    width:250,
    height:250,
  },
  imgcont:{
    marginTop:10,
    alignItems:"center",
  },
  input: {
    height: 40,
    width:238,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
  },
  footer:{
    marginTop:30,
    height:100,
    justifyContent:'space-evenly',
    marginHorizontal:30,
  },
  footertext:{
    fontFamily:"Poppins_500Medium",
  },
})

{/*onPress={() => navigation.navigate('product')}*/}

export default LoginSignup;