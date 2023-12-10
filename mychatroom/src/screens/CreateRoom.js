import { ImageBackground, StatusBar, StyleSheet, Text, View, Image, Button, Pressable, Alert } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Colors } from '../constants/Colors'
import { TextInput } from 'react-native-gesture-handler'
import io from 'socket.io-client';

const socket = io('https://chatroom-backend-4h6u.onrender.com');
const CreateRoom = ({navigation}) => {


  const [roomnumber, setRoom] = useState('')
  const [roompass, setPass] = useState('')

  const handlecreateroom = useCallback(async () => {
    if (roomnumber.length === 0 || roompass.length === 0) {
      Alert.alert('please enter valid room id and password')
    }
    else {
      await socket.emit("createRoom", { roomName: roomnumber, roomPassword: roompass },(error)=>{
        Alert.alert(error)
      })
      setRoom('')
      setPass('')
      navigation.navigate('JoinRoom')
    }
  }, [roomnumber, roompass])

  return (
    <View style={styles.main_screen}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.Primary} translucent={false} />

      {/* <Image
        source={require('../assets/Images/background_img_new.jpg')}
        style={styles.back_image}
        resizeMode='cover'
      /> */}
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.text_input}
            placeholder='Enter Unique Room Number...'
            keyboardType='numeric'
            onChangeText={(text)=>setRoom(text)}
            value={roomnumber}
            placeholderTextColor={Colors.White}
          />
          <TextInput
            style={styles.text_input}
            placeholder='Set Password'
            value={roompass}
            placeholderTextColor={Colors.White}
            onChangeText={(text)=>setPass(text)}
          />
          <Pressable
            onPress={()=>handlecreateroom()}
            style={styles.button}>
            <Text style={styles.btn_text}>Create</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default CreateRoom

const styles = StyleSheet.create({
  main_screen: {
    flex: 1, backgroundColor: Colors.Primary, alignItems: "center", justifyContent: "center"
  },
  back_image: {
    justifyContent: 'center',
    position: 'absolute',
  },
  container: {
    backgroundColor: Colors.Black,
    width: "95%", alignItems: 'center', justifyContent: "space-around", flex: 1, marginTop: 10, alignSelf: 'flex-end', borderTopLeftRadius: 100, borderBottomLeftRadius: 50,marginBottom:20
  },
  text_input: {
    backgroundColor: Colors.Black,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: Colors.White,
    borderWidth: 1,
    color: Colors.White,
    elevation: 10
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.Black,
    borderRadius: 20,
    elevation: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn_text: {
    color: Colors.White,
    fontSize: 16,
    letterSpacing: 0.6
  }
})