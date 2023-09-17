import { ImageBackground, StatusBar, StyleSheet, Text, View, Image, Button, Pressable, Alert, TouchableOpacity } from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import { Colors } from '../constants/Colors'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { useRoute } from '@react-navigation/native';
import MessageCard from '../components/MessageCard';


const ChatRoom = ({ navigation }) => {

  const route = useRoute()
  const {socket,roomName,userName,roomPassword}=route?.params
  const [chat,setChat]=useState('')
  const [messages,setMessages]=useState([])

  const sendmessage = useCallback(async (chat) => {
    if(chat.length<1){
      return;
    }
    socket.emit('chat message', { roomName:route.params?.roomName, message:chat, sender: route.params?.userName });
    setChat('')
  }, [chat])

  useEffect(() => {
    socket.on('chat:message', ({ sender, message }) => {
      console.log(message)
      setMessages((prevMessages) => [...prevMessages, { sender, message }]);
    });
    return () => {
      socket.off('chat:message', ({ sender, message }) => {
        setMessages((prevMessages) => [...prevMessages, { sender, message }]);
      });
    };
  },[socket]);

  
  return (
    <View style={styles.main_screen}>
      {/* {console.log(messages)} */}
      <StatusBar barStyle="light-content" backgroundColor={Colors.Primary} translucent={false} />
      <View style={styles.header}>
        <Text style={styles.btn_text}>Room : {route?.params?.roomName}</Text>
      </View>
      <View style={styles.back_image}>
        <Image
          // source={require('../assets/Images/background_img.jpg')}
        source={require('../assets/Images/background_img_new.jpg')}
          resizeMode='cover'
        />
      </View>

      <ScrollView
        style={{ flex: 1, width: '100%', marginTop: 10, paddingHorizontal: 10 }}
      >
        {messages.map(({ sender, message }, index) => (
         <MessageCard
          index={index}
          message={message}
          sender={sender}
          userName={userName}
         />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TextInput
          style={styles.text_input}
          value={chat}
          onChangeText={(text)=>setChat(text)}
          placeholder='Write message!'
          placeholderTextColor={Colors.White}
        />
        <TouchableOpacity 
        onPress={()=>sendmessage(chat)}
        style={styles.button}>
          <Text style={styles.btn_text}>Send</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default ChatRoom

const styles = StyleSheet.create({
  main_screen: {
    flex: 1, backgroundColor: Colors.Primary, alignItems: "center", paddingVertical: 10
  },
  back_image: {
    justifyContent: 'center',
    position: 'absolute',
  },
  container: {
    backgroundColor: Colors.Primary,
    width: "95%", alignItems: 'center', justifyContent: "space-around", flex: 1, marginTop: 150, alignSelf: 'flex-end', borderTopLeftRadius: 100, borderBottomLeftRadius: 20, elevation: 20
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
    elevation: 10,
    width: '80%'
  },
  button: {
    paddingHorizontal: 15,
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
  },
  header: {
    backgroundColor: Colors.Black,
    height: 50,
    width: '90%',
    zIndex: 100,
    elevation: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%'
  }
})