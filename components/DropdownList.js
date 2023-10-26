import React from 'react'
import { View, FlatList, StyleSheet, Dimensions } from 'react-native'

import DropdownItem from './DropdownItem'

function DropdownList({ categories, selectCategory, top, left, rate=1 }){
  //rate는 전체화면 높이에서 드롭다운메뉴의 최대높이를 얼마만큼의 비율로 설정할지 정해줌
  return(
    <View 
      style={[styles.dropdownShadow, {top, left, maxHeight: Dimensions.get('window').height * rate}]}  
      onTouchStart = {(e) => { //터치 시작점 설정 : 캡쳐링 방지
        console.log('여기를 지나침')
        e.stopPropagation() //터치 버블링 방지
        }}
    >
      <FlatList
        data={categories}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <DropdownItem
            category={item}
            selectCategory={(e) => selectCategory(item, e)} //아이템 각각의 뷰 화면 : 카테고리 선택시 이벤트핸들러 함수 등록
          />
        )}
        style={styles.dropdownList}
      />
    </View>
  )
}

const styles = StyleSheet.create({
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
    borderRadius: 5,
    margin: 15
  },
})


export default DropdownList