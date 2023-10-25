import React from 'react'
import { FlatList, View, Text, StyleSheet } from 'react-native'

import TodoItem from './TodoItem'

function TodoList({ todos, pickCategory, removeTodo, done }){
  return(
    <FlatList
      data={todos}
      style={styles.container}
      keyExtractor={item => item.id} //리액트의 key 역할
      // ItemSeparatorComponent={() => <View style={styles.line}></View>} //아이템 사이에 구분선 추가 or 구분하는 뷰 필요할때 사용
      renderItem={({item}) => (
          <TodoItem {...item} pickCategory={pickCategory} removeTodo={removeTodo} done={done}/>
      )}
    />
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingVertical: 10,
  },
  titleMargin: {
    marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  dateText: {
    fontSize: 12,
  },
})

export default TodoList