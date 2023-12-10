import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
const MessageCard = ({index,message,sender,userName}) => {
  return (
    <View style={{paddingVertical:'5',marginVertical:1,marginRight:10,backgroundColor:Colors.Primary,paddingVertical:10,paddingHorizontal:10,borderTopRightRadius:20,borderBottomRightRadius:20}}>
    <Text style={[styles.btn_text,{fontSize:12,letterSpacing:1,color:sender===userName?"#C576F6":"#E1E195"}]}>{sender===userName?"ME":sender.toUpperCase()}</Text>
    <View
    style={{backgroundColor:Colors.Black,height:1,width:'100%',marginVertical:5}}
    />
  <Text 
  style={styles.btn_text}
  key={index}>
    {message}
  </Text>
  </View>
  )
}

export default MessageCard
const styles = StyleSheet.create({})