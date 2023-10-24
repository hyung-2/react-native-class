import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import moment from 'moment-timezone'

function TodoItem({ id, title, category, isDone, createdAt, pickCategory }){ //todo속성(props) 풀어헤치기
  //한국시간으로 포맷
  const getKrTime = () => {
    let krTime = moment(createdAt.toDate()).tz('Asia/Seoul')
    return krTime.format('YY-MM-DD HH:mm:ss')
  }
  console.log('할일 생성시각: ', title, createdAt, getKrTime())
  if(pickCategory === category){
    return(
      <View style={[styles.item, styles.line]}>
        <View style={styles.titleMargin}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View>
          <Text>{category} ({isDone ? '종료':'진행중'})</Text>
          <Text style={styles.dateText}>{createdAt && getKrTime()}</Text>
        </View>
      </View>
    )
  }else if(pickCategory === '카테고리' || pickCategory == ''){
    return(
      <View style={[styles.item, styles.line]}>
        <View style={styles.titleMargin}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View>
          <Text>{category} ({isDone ? '종료':'진행중'})</Text>
          <Text style={styles.dateText}>{createdAt && getKrTime()}</Text>
        </View>
      </View>
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