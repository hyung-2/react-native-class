import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from 'react-native'

function DashBoardScreen({navigation}){
  return(
    <SafeAreaView style={styles.block}>
      <StatusBar backgroundColor="#a8c8ffff"></StatusBar>{/* 상태바를 안보이게 하고싶으면 추가를 안하면 됨 */}
      <View>
        <Text>대쉬보드</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  block:{
    flex:1,
  },
})



export default DashBoardScreen