import React, { useState, useEffect, useRef } from 'react'
import { addData, getCollection, getCurrentTime } from '../apis/firebase'
import { getToday, getTomorrow } from '../utils/time'
import { SafeAreaView, View, Text, StyleSheet, StatusBar, Keyboard, FlatList, TouchableHightlight } from 'react-native'

import DateHeader from '../components/DateHeader'
import Default from '../components/Default'
import TodoInsert from '../components/TodoInsert'
import TodoList from '../components/TodoList'
import DropdownItem from '../components/DropdownItem'

function HomeScreen({ navigation, caretType, setCaretType, pickCategory, setPickCategory, todos, loading, route }){
  // const date = new Date()
  const categories = ['자기계발', '업무', '오락', '여행', '연애', 'IT', '취미']

  const [todoText, setTodoText] = useState('')
  const [warning, setWarning] = useState(false)

  const category = useRef('') //직접적으로 랜더링하지 않는값이고 변경되는 값이기 때문에 useRef사용
  const date = (route.params && route.params.date) ? new Date(route.params.date) : new Date()
  const today = getToday(date) //시간제외
  const tomorrow = getTomorrow(getToday(date))
  const todosToday = todos.filter(todo => todo.createdAt?.toDate() >= today && todo.createdAt?.toDate() < tomorrow)
  const todosTodayLatest = [...todosToday] //원본복사
  todosTodayLatest.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds) //최신순 정렬

  console.log('현재 선택 날짜:', date)
  console.log('날짜비교:', date.getTime(), today.getTime() != getToday(new Date()).getTime())

  const onInsertTodo = async(trimedText) => {
    if(!category.current){ //카테고리를 선택하지 않은 경우
      setTodoText('카테고리를 먼저 선택해주세요!')
      setWarning(true)
      return
    }
    if(trimedText && trimedText.length > 3){ //최소 글자수 제한
      // const nextId = todos.length + 1
      // const todoContents = trimedText.split(',')
      // const createdTime = new Date()

      if(todos.filter(todo => todo.title === trimedText).length > 0){
        setTodoText('중복된 할일입니다.')
        setWarning(true)
      }else{
        const newTodo = {
          title: trimedText,
          category: category.current || '자기계발',
          isDone: false,
          createdAt: getCurrentTime() //서버 기준 저장시각
        }
        await addData('todos', newTodo) //firestore에 새로운 할일 추가
        Keyboard.dismiss() //추가버튼 클릭시 키보드 감추기
        setTodoText('') //입력창 초기화
        category.current = '' //카테고리 초기화
        setPickCategory('') //화면에 보이는 카테고리값 초기화
      }

      // const newTodo = {
      //   id: todos.length + 1,
      //   title: todoContents[0],
      //   category: category.current || '자기계발',
      //   createdAt: `${createdTime.getFullYear()}-${createdTime.getMonth()+1}-${createdTime.getDate()}`
      // }
    }else{
      console.log('3글자 이상 입력하세요!')
      setTodoText('3글자 이상 입력하세요!')
      setWarning(true)
    }
  }

  const closeDropdown = () => { //드롭다운 숨기기
    caretType && setCaretType(false)
  }
  
  const selectCategory = (item, e) => { //카테고리 드롭다운 선택시
    console.log('카테고리:', item)
    closeDropdown()
    category.current = item
    setPickCategory(item)
  }

  const handleOutSideOfMenu = () => { //드롭다운 메뉴 이외 영역 터치시 드롭다운 숨기기
    console.log('홈화면을 터치하셨습니다.')
    closeDropdown()
  }

  //에러텍스트 초기화시키기-target이 바뀔때가 있었음 이유는 모름
  const whatis = () => {
    if(todoText === '카테고리를 먼저 선택해주세요!' || todoText ==='중복된 할일입니다.' || todoText === '3글자 이상 입력하세요!'){
      console.log('텍스트초기화테스트')
      setTodoText('')
    }
  }

  useEffect(() => navigation.addListener('focus', () => console.log('페이지 로딩')),[])
  useEffect(() => navigation.addListener('blur', () => console.log('페이지 벗어남')),[])

  if(loading){ //로딩화면 
    return(
      <View>
        <Text>로딩중...</Text>
      </View>
    )
  }

  return(
    <SafeAreaView style={styles.block} onTouchStart={handleOutSideOfMenu} onTouchEnd={whatis}>
      <StatusBar backgroundColor="#a8c8ffff"></StatusBar>{/* 상태바를 안보이게 하고싶으면 추가를 안하면 됨 */}
      {caretType && //드롭다운 보여주기
      (
        <View 
        style={styles.dropdownShadow}
        onTouchStart={(e) => { //터치 시작점 설정:캡쳐링 방지
          console.log('여기를 지나침')
          // console.log(e.nativeEvent)
          e.stopPropagation() //터치 버블링 방지
        }}
        >
          <FlatList
            data={categories}
            keyExtractor={item => item}
            renderItem={({item}) => (
              <DropdownItem 
              category={item} 
              selectCategory={(e) => selectCategory(item,e)} //아이템 각각의 뷰 화면 : 카테고리 선택시 이벤트핸들러 함수 등록
              />
            )}
            style={styles.dropdownList}
            />
        </View>
      )}
      <DateHeader date={date}></DateHeader>
      {/* 해당날짜의 최신순으로 정렬된 할일 목록 */}
      {todosTodayLatest.length === 0 ? <Default/> : <TodoList todos={todosTodayLatest} pickCategory={pickCategory}/>}
      {/* 필터링한 할일목록의 날짜가 현재 날짜와 동일하지 않은 경우 - 입력창,추가버튼 비활성화 */}
      <TodoInsert 
        onInsertTodo={onInsertTodo} 
        todoText={todoText} 
        setTodoText={setTodoText}
        warning={warning} setWarning={setWarning}
        disabled={today.getTime() !== getToday(new Date()).getTime()}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  block:{
    flex:1,
  },
  dropdownList: { //드롭다운 컨테이너 스타일
    padding: 5,
  },
  dropdownShadow: { //드롭다운 메뉴 그림자 스타일
    shadowOffset: {width: 0, height: 20},
    shadowColor: '#000',
    shadowOpacity: 0.25,
    backgroundColor: '#fff',
    zIndex: 1,
    elevation: 1,
    position: 'absolute',
    top: -15,
    borderRadius: 5,
    margin: 15
  }
})



export default HomeScreen