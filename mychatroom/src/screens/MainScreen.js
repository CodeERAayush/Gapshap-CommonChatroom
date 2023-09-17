import { ImageBackground, StatusBar, StyleSheet, Text, View, Image, Button, Pressable } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'

const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.main_screen}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.Primary} translucent={false} />

      <Image
        // source={require('../assets/Images/background_img.jpg')}
        source={require('../assets/Images/background_img_new.jpg')}
        style={styles.back_image}
        resizeMode='cover'
      />
      <View style={styles.container}>
        <View>
          <Pressable
            onPress={() => navigation.navigate('CreateRoom')}
            style={styles.button}>
            <Text style={styles.btn_text}>Create Room</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('JoinRoom')}
            style={styles.button}>
            <Text style={styles.btn_text}>Join Room</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default MainScreen

const styles = StyleSheet.create({
  main_screen: {
    flex: 1, backgroundColor: Colors.Primary, alignItems: "center", justifyContent: "center"
  },
  back_image: {
    justifyContent: 'center',
    position: 'absolute',
  },
  container: {
    backgroundColor: Colors.Primary,
    width: "95%", alignItems: 'center', justifyContent: "space-around", flex: 1, marginTop: 150, alignSelf: 'flex-end', borderTopLeftRadius: 100, borderBottomLeftRadius: 20, elevation: 20
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