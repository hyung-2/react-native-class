import React from 'react'
import { FlatList, View, Text, StyleSheet } from 'react-native'

import TodoItem from './TodoItem'

function TodoList({ todos }){
  return(
    <FlatList
      data={todos}
      style={styles.container}
      keyExtractor={item => item.id} //리액트의 key 역할
      ItemSeparatorComponent={() => <View style={styles.line}></View>} //아이템 사이에 구분선 추가 or 구분하는 뷰 필요할때 사용
      renderItem={({item}) => (
        <TodoItem {...item}/>
        //아이템 각각의 뷰 화면
        // <View style={styles.item}>
        //   <View style={styles.titleMargin}>
        //     <Text style={styles.title}>{item.title}</Text>
        //   </View>
        //   <View>
        //     <Text>{item.category}</Text>
        //     <Text style={styles.dateText}>{item.createdAt}</Text>
        //   </View>
        // </View>
      )}
    />
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  line: {
    backgroundColor: '#ddd',
    height: 1,
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