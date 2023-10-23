import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function DateHeader({date}){
  
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  return(
    <View style={styles.container}>
      <Text style={styles.dateText}>{`${year}년 ${month}월 ${day}일`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#a8c8ffff',
  },
  dateText: {
    fontSize: 30,
    color: 'white',
  },
})

export default DateHeader