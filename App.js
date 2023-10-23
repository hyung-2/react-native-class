import React, {useState} from 'react';
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

// const Stack = createNativeStackNavigator() //stack이라는 컴포넌트(모듈) 반환.객체
const Tab = createBottomTabNavigator()

function App(){

  const [caretType, setCaretType] = useState(false)

 return (
  <NavigationContainer>
    <Tab.Navigator initialRouteName = "Home" screenOptions={{
        tabBarActiveTintColor: '#a8c8ffff', //사용자가 탭메뉴 터치했을때 액티브 색상
        // tabBarStyle:{ //탭 메뉴 배경색
        //   backgroundColor: '#ffffff'
        // }
      }}>
      {/* <Tab.Screen name="Home" component={HomeScreen} options={{
        title:'홈',
        tabBarIcon:({color, size}) => <Icon name="home" color={color} size={size}/>
      }}></Tab.Screen> */}

      <Tab.Screen 
      name="Home" 
      children={(props) => <HomeScreen {...props} caretType={caretType} setCaretType={setCaretType}/>}
      options={{
        title:'홈',
        tabBarIcon:({color, size}) => <Icon name="home" color={color} size={size}/>,
        headerTitle: (props) => <DropdownCategory {...props} caretType={caretType} setCaretType={setCaretType}/>,
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