import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

import HomeScreen from './screens/HomeScreen';
import CalendarScreen from './screens/CalendarScreen';
import DashBoardScreen from './screens/DashBoardScreen';
import SettingsScreen from './screens/SettingsScreen';

import DropdownCategory from './components/DropdownCategory'
import { getCollection } from './apis/firebase'

// const Stack = createNativeStackNavigator() //stack이라는 컴포넌트(모듈) 반환.객체
const Tab = createBottomTabNavigator()

function App({navigation}){

  const [caretType, setCaretType] = useState(false) //카테고리 선택유무
  const [pickCategory, setPickCategory] = useState('') //선택한 카테고리 이름 저장
  const [todos, setTodos] = useState([]) //할일목록 상태
  const [loading, setLoading] = useState(true) //할일목록 상태
  const [yearCaret, setYearCaret] = useState(false)
  const [monthCaret, setMonthCaret] = useState(false)
  const [pickYear, setPickYear] = useState('')
  const [pickMonth, setPickMonth] = useState('')
  const [numOfTodosToday, setNumOfTodosToday] = useState(0)

  console.log('어디서안들어오는가-',pickYear, pickMonth, )

  useEffect(() => { //할일목록 조회
    function onResult(querySnapshot){
      const list = []
      querySnapshot.forEach(doc => {
        console.log(doc.data())
        list.push({...doc.data(), id: doc.id,})
      })
      setTodos(list)
      setLoading(false)
    }
    function onError(error){
      console.error(`${error} occured when reading todos`)
    }
    return getCollection('todos', onResult, onError, null, null, null)
  },[])

  const onSwipeLeft = (gestureState) => {
    console.log('왼쪽ㅇㅇ')
  }

  const onSwipeRight = (gestureState) => {
    console.log('오른쪽ㅇㅇ')
  }

  if(loading){
    return(
      <View style={styles.bolck}>
        <ActivityIndicator size='large' color='#0047AB'/>
        <Text style={styles.loadingText}>Loading ...</Text>
      </View>
    )
  }

 return (
  <>
    <Tab.Navigator initialRouteName = "Home" screenOptions={{
        tabBarActiveTintColor: '#a8c8ffff', //사용자가 탭메뉴 터치했을때 액티브 색상
        tabBarStyle:{ //탭 메뉴 배경색
          backgroundColor: '#ffffff'
        }
      }}>
        <Tab.Screen
          name="Home"
          children={(props) =>
            <HomeScreen
              {...props}
              caretType={caretType} setCaretType={setCaretType}
              pickCategory={pickCategory} setPickCategory={setPickCategory}
              todos={todos} loading={loading}
              setNumOfTodosToday={setNumOfTodosToday}
            />
          }
          options={{
            title:'홈',
            tabBarIcon:({color, size}) => <Icon name="home" color={color} size={size}/>,
            headerTitle: (props) => <DropdownCategory {...props} caretType={caretType} setCaretType={setCaretType} pickCategory={pickCategory} setPickCategory={setPickCategory} categoryTitle='카테고리'/>,
            // categoryTitle을 주어 DropdownCategory컴포넌트 재활용
            headerStyle:{
              backgroundColor: '#a8c8ffff',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#fff',
            },
            tabBarBadge: numOfTodosToday
          }}
        />
      <Tab.Screen 
        name="Calendar" 
        children={(props) => 
          <CalendarScreen
            {...props}
            yearCaret={yearCaret} setYearCaret={setYearCaret}
            monthCaret={monthCaret} setMonthCaret={setMonthCaret}
            pickYear={pickYear} setPickYear={setPickYear}
            pickMonth={pickMonth} setPickMonth={setPickMonth}
          />
        }
        options={{
          title:'달력',
          tabBarIcon: ({color, size}) => <Icon name='calendar-month' color={color} size={size}/>,
          headerTitle: (props) => (
            <View style={{flexDirection: 'row'}}>
              <DropdownCategory {...props} caretType={yearCaret} setCaretType={setYearCaret} pickYear={pickYear} setPickYear={setPickYear} categoryTitle='년'/>
              <DropdownCategory {...props} caretType={monthCaret} setCaretType={setMonthCaret} pickMonth={pickMonth} setPickMonth={setPickMonth} categoryTitle='월'/>
            </View>
          ),
          headerStyle:{
            backgroundColor: '#a8c8ffff',
          },
          headerTitleStyle:{
            fontWeight: 'bold',
            color: '#fff'
          }
        }}
      />
      <Tab.Screen 
        name="DashBoard" 
        children={(props) => 
          <DashBoardScreen todos={todos}/>
        }
        options={{
          title:'통계',
          tabBarIcon: ({color, size}) => <Icon name='dashboard' color={color} size={size}/>,
          headerStyle:{
            backgroundColor: '#a8c8ffff'
          },
          headerTitleStyle:{
            fontWeight: 'bold',
            color: '#666'
          },
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
          title:'설정',
          tabBarIcon: ({color, size}) => <Icon name='settings' color={color} size={size}/>,
          headerStyle:{
            backgroundColor: '#a8c8ffff'
          },
          headerTitleStyle:{
            fontWeight: 'bold',
            color: '#666'
          },
        }}
      />
    </Tab.Navigator>
  </>
 )
}

const styles = StyleSheet.create({
  bolck:{
    flex: 1,
    backgroundColor: '#a8c8ffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    textAlign: 'center'
  }
})

export default App;