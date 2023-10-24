import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons'

import HomeScreen from './screens/HomeScreen';
import CalendarScreen from './screens/CalendarScreen';
import DashBoardScreen from './screens/DashBoardScreen';
import SettingsScreen from './screens/SettingsScreen';

import DropdownCategory from './components/DropdownCategory'
import { getCollection } from './apis/firebase'

// const Stack = createNativeStackNavigator() //stack이라는 컴포넌트(모듈) 반환.객체
const Tab = createBottomTabNavigator()

function App(){

  const [caretType, setCaretType] = useState(false) //카테고리 선택유무
  const [pickCategory, setPickCategory] = useState('') //선택한 카테고리 이름 저장
  const [todos, setTodos] = useState([]) //할일목록 상태
  const [loading, setLoading] = useState(true) //할일목록 상태

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

 return (
  <NavigationContainer>
    <Tab.Navigator initialRouteName = "Home" screenOptions={{
        tabBarActiveTintColor: '#a8c8ffff', //사용자가 탭메뉴 터치했을때 액티브 색상
        tabBarStyle:{ //탭 메뉴 배경색
          backgroundColor: '#ffffff'
        }
      }}>
      {/* <Tab.Screen name="Home" component={HomeScreen} options={{
        title:'홈',
        tabBarIcon:({color, size}) => <Icon name="home" color={color} size={size}/>
      }}></Tab.Screen> */}

      <Tab.Screen 
      name="Home" 
      children={(props) => 
        <HomeScreen 
          {...props} 
          caretType={caretType} setCaretType={setCaretType} 
          pickCategory={pickCategory} setPickCategory={setPickCategory} 
          todos={todos} loading={loading}/>
      }
      options={{
        title:'홈',
        tabBarIcon:({color, size}) => <Icon name="home" color={color} size={size}/>,
        headerTitle: (props) => <DropdownCategory {...props} caretType={caretType} setCaretType={setCaretType} pickCategory={pickCategory} setPickCategory={setPickCategory}/>,
        headerStyle:{
          backgroundColor: '#a8c8ffff',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#fff',
        }
      }}>
      </Tab.Screen>

      <Tab.Screen name="Calendar" component={CalendarScreen} options={{
        title:'달력',
        tabBarIcon: ({color, size}) => <Icon name='calendar-today' color={color} size={size}/>
      }}
      ></Tab.Screen>
      <Tab.Screen name="DashBoard" component={DashBoardScreen} options={{
        title:'통계',
        tabBarIcon: ({color, size}) => <Icon name='dashboard' color={color} size={size}/>
      }}></Tab.Screen>
      <Tab.Screen name="Settings" component={SettingsScreen} options={{
        title:'설정',
        tabBarIcon: ({color, size}) => <Icon name='settings' color={color} size={size}/>
      }}></Tab.Screen>
    </Tab.Navigator>
  </NavigationContainer>
 )
}


export default App;