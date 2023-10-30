import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, StatusBar, Button, Image, TouchableHighlight } from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'

function SettingsScreen({navigation}){

  const [userInfo, setUserInfo] = useState(null)

  const googleSigninConfigure = () => {
    GoogleSignin.configure({
      webClientId:
      '816380613780-8n10crh1p5bgik76sq8ae9qc90hftdq2.apps.googleusercontent.com',
    })
  }

  const signOutWithGoogle = async () => {
    try{
      await GoogleSignin.signOut()
      setUserInfo(null)
      navigation.navigate('Landing')
    }catch(error){
      console.error('failed to logout, errer:', error)
    }
  }

  getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser()
    setUserInfo(currentUser)
  }

  useEffect(() => {
    googleSigninConfigure()
    getCurrentUser()
  }, [])

  return(
    <SafeAreaView style={styles.block}>
      <StatusBar backgroundColor="#a8c8ffff"></StatusBar>{/* 상태바를 안보이게 하고싶으면 추가를 안하면 됨 */}
      <View>
        {userInfo && userInfo.user && (
          <View style={styles.profileInfo}>
            <View>
              <Image source={{uri: userInfo.user.photo}} style={styles.profileImg}/>
            </View>
            <View style={styles.profileText}>
              <Text style={[styles.info, {fontWeight: 'bold', fontSize: 20}]}>{userInfo.user.name}</Text>
              <Text style={styles.info}>{userInfo.user.email}</Text>
            </View>
          </View>
        )}
      </View>
      <TouchableHighlight onPress={signOutWithGoogle} style={styles.logoutBtnWrapper}>
        <View style={[styles.logoutBtn, { backgroundColor: "#a8c8ffff" }]}>
          <Text style={styles.logoutBtnText}>로그아웃</Text>
        </View>
      </TouchableHighlight>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  block:{
    flex:1,
    justifyContent: 'flex-start',
  },
  profileInfo: {
    marginHorizontal: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#eee',
    elevation: 2,
  },
  profileText: {
    // backgroundColor: '#eee',
    borderRadius: 10,
    padding: 20,
  },
  info: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  logoutBtnWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0
  },
  logoutBtn: {
    flex: 1,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logoutBtnText: {
    color: '#fff',
    letterSpacing: 3,
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },

})



export default SettingsScreen