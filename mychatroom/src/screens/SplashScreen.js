import { ActivityIndicator, Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const SplashScreen = ({navigation}) => {

    useEffect(()=>{
        setTimeout(()=>{
            navigation.replace("MainScreen")
        },3000)
    },[])

  return (
    <View style={{flex:1,backgroundColor:'black',justifyContent:'center'}}>
        <StatusBar
        backgroundColor={'black'}
        />
      <Image
      style={{height:'30%',width:'95%',alignSelf:'center'}}
      resizeMode='contain'
      source={require('../assets/Images/billi_back2.png')}
      />
      <ActivityIndicator
      size={'large'}
      color={'white'}
      />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({

})