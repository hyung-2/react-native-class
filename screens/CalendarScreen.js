import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, StatusBar, Button } from 'react-native'

function CalendarScreen({navigation}){
  const testDate = '2023-10-24'
  const getTodoForDate = () => {
    navigation.navigate('Home', {date: testDate})
  }
  return(
    <SafeAreaView style={styles.block}>
      <StatusBar backgroundColor="#a8c8ffff"></StatusBar>{/* 상태바를 안보이게 하고싶으면 추가를 안하면 됨 */}
      <View>
        <Text>캘린더</Text>
        <Button title='날짜선택' onPress={getTodoForDate}/>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  block:{
    flex:1,
  },
})



export default CalendarScreen