import React, { useState, useCallback } from 'react'
import { SafeAreaView, View, Text, StyleSheet, StatusBar, Button, FlatList, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { getFullCalendar } from '../utils/time'

import DropdownList from '../components/DropdownList'

function CalendarScreen({navigation, yearCaret, setYearCaret, monthCaret, setMonthCaret}){

  const today = getFullCalendar(new Date())
  const week = ['일', '월', '화', '수', '목', '금', '토'] 
  const [selectedYear, setSelectedYear] = useState(today.year) //현재 선택한 연도
  const [selectedMonth, setSelectedMonth] = useState(today.month) //현재 선택한 달

  const N = 10 // +-10년 범위
  const offset = today.year - N
  const yearsRange = Array(2*N).fill(0).map((_, id) => `${id+offset}년`)
  const monthRange = Array(12).fill(0).map((_, id) => `${id+1}월`)

  const daysOfMonth = new Date(selectedYear, selectedMonth, 0).getDate() //선택된 연도, 달의 마지막 날짜
  const day = new Date(selectedYear, selectedMonth - 1, 1).getDay() //첫째날 요일
  const lastDay = new Date(selectedYear, selectedMonth - 1, daysOfMonth).getDay() //마지막날 요일
  const days = [...Array(day).fill(""), ...Array(daysOfMonth).fill(0).map((_, id) => id+1), ...Array(week.length-(lastDay+1)).fill("")]

  console.log('캘린더1',daysOfMonth, selectedYear, selectedMonth, day, week[day], lastDay, week[lastDay])
  console.log('캘린더2',days, days.length)

  const prevMonth = useCallback(() => { //이전달 보기
    if(selectedMonth === 1){
      setSelectedMonth(12)
      setSelectedYear(selectedYear - 1)
    }else{
      setSelectedMonth(selectedMonth - 1)
    }
  },[selectedMonth])

  const nextMonth = useCallback(() => { //다음달 보기
    if(selectedMonth === 12){
      setSelectedMonth(1)
      setSelectedYear(selectedYear + 1)
    }else{
      setSelectedMonth(selectedMonth + 1)
    }
  },[selectedMonth])

  const selectCategory = (item, e) => { //드롭다운으로 날짜 선택시
    console.log('날짜:', item )
    const lastChr = item[item.legnth-1]
    if(lastChr === '년'){
      setSelectedYear(parseInt(item))
    }else if(lastChr === '월'){
      setSelectedMonth(parseInt(item))
    }
    closeDropdown()
  }

  const closeDropdown = () => {
    yearCaret && setYearCaret(false)
    monthCaret && setMonthCaret(false)
  }

  const handleOutSideOfMenu = (e) => {
    console.log('캘린더 화면을 터치하셨습니다.')
    closeDropdown()
  }

  const setDate = (selectedDate) => {
    console.log(`${selectedYear}-${selectedMonth}-${selectedDate}`)
    navigation.navigate('Home', {date: `${selectedYear}-${selectedMonth}-${selectedDate}`})
  }

  return(
    <SafeAreaView style={styles.block} onTouchStart={handleOutSideOfMenu}>
      <StatusBar backgroundColor="#a8c8ffff"></StatusBar>{/* 상태바를 안보이게 하고싶으면 추가를 안하면 됨 */}
      {yearCaret && <DropdownList categories={yearsRange} top={-15} rate={2/3} selectCategory={selectCategory} selectedYear={selectedYear}/>}
      {monthCaret && <DropdownList categories={monthRange} top={-15} rate={70} selectCategory={selectCategory} selectedMonth={selectedMonth}/>}
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}
          onTouchStart={(e) => { //터치 시작점 설정: 캡쳐링 방지
            console.log('캘린더 이전/다음')
            // e.stopPropagation() 버블링허용-해당 버튼 클릭전 드롭다운 닫기
          }}
        >
          <Button title='◀︎' onPress={prevMonth}></Button>
          <Text style={styles.calendarHeaderText}>{selectedYear}년 {selectedMonth}월</Text>
          <Button title='▶︎' onPress={nextMonth}></Button>
        </View>
        <FlatList
          data={week}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <View style={styles.day}>
              <Text>{item}</Text>
            </View>
          )}
          //엘리먼트 7개를 수평나열해서 보여줌
          numColumns={7} 
          horizontal={false}
        />
        <FlatList
          data={days}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <View 
              style={[
                styles.day, 
                (selectedYear === today.year && selectedMonth === today.month && item === today.date) && styles.today
              ]}
              onTouchStart={(e) => { //터치 시작점 설정: 캡쳐링방지
                console.log('날짜선택 이벤트')
                // e.stopPropagation() 버블링허용-해당 버튼 클릭전 드롭다운 닫기
                setDate(item)
              }}
            >
              <Text
                style={[
                  styles.weekday,
                  new Date(selectedYear, selectedMonth - 1, item).getDay() === 0 && styles.sunday,
                  new Date(selectedYear, selectedMonth - 1, item).getDay() === 6 && styles.saturday
                ]}
              >{item}</Text>
            </View>
          )}
          numColumns={7}
          horizontal={false}
          contentContainerStyle={{justifyContent: 'flex-start'}}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  block:{
    flex:1,
  },
  calendarContainer: {
    width: Dimensions.get('window').width * 0.9, //80%
    backgroundColor: '#777',
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  calendarHeader: {
    flexDirection: 'row'
  },
  calendarHeaderText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#a8c8ffff',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  day: {
    backgroundColor: '#fff',
    margin: .2,
    flex: 1, //7칸 균등분배
    alignItems: 'center',
    padding: 3,
  },
  today: {backgroundColor: '#a8c8ffff'},
  weekday: {color: '#333'},
  sunday: {color: '#de1738'},
  saturday: {color: '#4169e1'}
})



export default React.memo(CalendarScreen)