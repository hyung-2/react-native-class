import React, { useState } from 'react'
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { removeData } from '../apis/firebase'
import { SwipeListView } from 'react-native-swipe-list-view'

import TodoItem from './TodoItem'

function TodoList({ todos, pickCategory, removeTodo, done, handleRemove }){

  const [itemKey, setItemKey] = useState('')

  //스와이프로 나타난 delete키로 삭제하기
  const clickDelete = () => {
    removeData('todos', itemKey)
  }

  const renderHiddenItem = () => {
    return(
      <View style={styles.rowBack}>
        <TouchableOpacity style={styles.deleteBtn} onPress={clickDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const onRowDidOpen = (rowKey) => {
    console.log('row open', rowKey)
    setItemKey(rowKey)
  }

  return(
    <SwipeListView
      data={todos}
      style={styles.container}
      keyExtractor={item => item.id} //리액트의 key 역할
      // ItemSeparatorComponent={() => <View style={styles.line}></View>} //아이템 사이에 구분선 추가 or 구분하는 뷰 필요할때 사용
      renderItem={({item}) => (
          <TodoItem {...item} pickCategory={pickCategory} removeTodo={removeTodo} done={done}/>
      )}
      renderHiddenItem={renderHiddenItem}
      rightOpenValue={-70}
      previewRowKey={'0'}
      previewOpenValue={-40}
      previewOpenDelay={2000}
      onRowDidOpen={onRowDidOpen}
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
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    height: 0,
  },
  deleteBtn: {
    backgroundColor: 'red',
    right: 0,
    height: '100%',
    padding: 10,
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',

  }

})

export default TodoList