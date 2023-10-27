import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { getDayWithoutTime } from '../utils/time'

function DateHeader({ date, reAlign, done}){
  const { year, month, day } = getDayWithoutTime(date)

  return(
    <View style={styles.container}>
      <Text style={styles.dateText}>{`${year}년 ${month}월 ${day}일`}</Text>
      <Pressable 
        style={[styles.button]}
        onPress={reAlign}
      >
        <Text style={styles.textStyle}>{done ? '미완료' : '전체'}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#a8c8ffff',
    flexDirection: 'row',
    elevation: 2,
  },
  dateText: {
    fontSize: 30,
    color: 'white',
    marginVertical: 5,
  },
  button: {
    width: 70,
    height: 40,
    borderRadius: 10,
    padding: 0,
    elevation: 2,
    marginTop: 10,
    marginLeft: 60,
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: '#a8c8ffff',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }
})

export default DateHeader