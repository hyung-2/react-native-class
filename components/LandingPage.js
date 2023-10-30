import React from 'react'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'

function LandingPage({ width, height, title, description, source }){
  return(
    <View style={{width, height}}>
      <ImageBackground source={source} style={{width, height}}>
        <View style={[styles.textContent, {width, height}]}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  textContent: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 85,
  },
  title: {
    fontFamily: 'Hahmlet-VariableFont_wght',
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    fontFamily: 'NanumPenScript-Regular',
    fontSize: 33,
    fontWeight: 'normal',
    marginTop: 10,
    color: '#fff',
    textAlign: 'center'
  }
})

export default LandingPage