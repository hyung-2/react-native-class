import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import moment from 'moment-timezone'

import { updateData } from '../apis/firebase'

let lastTap = null

function TodoItem({ id, title, category, isDone, createdAt, pickCategory, removeTodo, done }){ //todo속성(props) 풀어헤치기
  
  const [doubleTabbed, setDoubleTabbed] = useState(false)
  const [text, setText] = useState('')
  const inputRef = useRef(null)

  
  //한국시간으로 포맷
  const getKrTime = () => {
    let krTime = moment(createdAt.toDate()).tz('Asia/Seoul')
    return krTime.format('YY-MM-DD HH:mm:ss')
  }
  console.log('할일 생성시각: ', title, createdAt, getKrTime())

  // //오전오후 구분, 정렬하려다 미룸
  // if(getKrTime().slice(9,11) < 12){
  //   console.log(getKrTime().slice(9,11), '오전')
  // }else{
  //   console.log(getKrTime().slice(9,11), '오후')
  // }

  const handleDoubleTab = (e) => {
    console.log(inputRef.current)
    setDoubleTabbed(!doubleTabbed)
    setText(title)
  }

  const ishandleDoubleTap = () => {
    const now = Date.now() // ms초
    const delay = 300
    if(lastTap && (now - lastTap) < delay ){
      return true
    }else{
      lastTap = now
      return false
    }
  }

  const handleTap = () => {
    updateData('todos', id, {isDone: !isDone})
  }
  
  const handlePress = (e) => {
    if(ishandleDoubleTap()){
      handleDoubleTab()
      console.log('더블탭')
      handleTap()
    }else{
      handleTap()
      console.log('-----------탭------------')
    }
  }

  const handleBlur = (e) => {
    e.stopPropagation()
    console.log('블러')
    setDoubleTabbed(!doubleTabbed)
    Keyboard.dismiss()
    updateData('todos', id, {title: text.trim()})
  }

  const handleChange = (text) => {
    setText(text)
  }

  const hideKeyboard = (e) => {
    Keyboard.dismiss()
  }

  const handleRemove = (e) => {
    console.log('길게탭')
    e.stopPropagation()
    removeTodo(id, title)
  }

  useEffect(() => {
    if(inputRef.current){
      inputRef.current.focus()
    }
  })

  if(pickCategory === category){ //카테고리 선택시 해당카테고리 할일만 보여줌
    return(
      done && isDone ? 
      ''
      :
      <TouchableWithoutFeedback onPress={handlePress} onLongPress={handleRemove}>
        <View style={[styles.item, styles.line]}>
          <View style={styles.titleMargin} onTouchStart={(e) => {e.stopPropagation()}}>
            {doubleTabbed ? (
              <TouchableWithoutFeedback>
                <TextInput
                  value={text}
                  onBlur={handleBlur}
                  ref={inputRef}
                  onChangeText={handleChange} //입력창에 글자 입력시
                  onSubmitEditing={hideKeyboard} //키보드닫기
                  />
              </TouchableWithoutFeedback>
            ) 
            :
            <Text style={[styles.title, {textDecorationLine: (isDone && !doubleTabbed) ? 'line-through' : 'none'}]}>{title}</Text>
            }
          </View>
          <View>
            <Text>{category} ({isDone ? '종료':'진행중'})</Text>
            <Text style={styles.dateText}>{createdAt && getKrTime()}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      )
    
  }else if(pickCategory === '카테고리' || pickCategory == ''){
    return(
      done && isDone ? 
        ''
        :
        <TouchableWithoutFeedback onPress={handlePress} onLongPress={handleRemove}>
          <View style={[styles.item, styles.line]}>
            <View style={styles.titleMargin} onTouchStart={(e) => {e.stopPropagation()}}>
              {doubleTabbed ? (
                <TouchableWithoutFeedback>
                  <TextInput
                    value={text}
                    onBlur={handleBlur}
                    ref={inputRef}
                    onChangeText={handleChange} //입력창에 글자 입력시
                    onSubmitEditing={hideKeyboard} //키보드닫기
                    />
                </TouchableWithoutFeedback>
              ) 
              :
              <Text style={[styles.title, {textDecorationLine: (isDone && !doubleTabbed) ? 'line-through' : 'none'}]}>{title}</Text>
              }
            </View>
            <View>
              <Text>{category} ({isDone ? '종료':'진행중'})</Text>
              <Text style={styles.dateText}>{createdAt && getKrTime()}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
    )
  }
    
    

}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingVertical: 10,
  },
  line: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  titleMargin: {
    marginRight: 10
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  dateText: {
    fontSize: 12
  },
})


export default React.memo(TodoItem) //컴포넌트 캐싱-해당 할일이 변경되지않으면 새로랜더링x ->업뎃된 할일컴포넌트만 새로 랜더링