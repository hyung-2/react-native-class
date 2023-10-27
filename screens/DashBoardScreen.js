import React, { useRef } from 'react'
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from 'react-native'
import { max } from 'moment'
import { BarChart } from 'react-native-gifted-charts'

function DashBoardScreen({navigation, todos}){
  // console.log('할일목록-통계:', todos)

  const groupedByCategory = todos.reduce((groupedByCategory, todo) => { //reduce: 배열을 하나의 값으로 만들어줌(여기선 객체), todos에서 할일정보추출 -> 카테고리별 분류
    if(!groupedByCategory[todo.category]) groupedByCategory[todo.category] = 0
    groupedByCategory[todo.category]++
    return groupedByCategory
  },{})
  console.log(groupedByCategory)

  const groupedByStatus = todos.reduce((groupedByStatus, todo) => {
    const propName = `${todo.isDone ? '완료' : '진행중'}`
    if(!groupedByStatus[propName]) groupedByStatus[propName] = 0
    groupedByStatus[propName] ++
    return groupedByStatus
  },{})
  console.log(groupedByStatus)
  
  //데이터 전달을 위해 객체를 가진 배열형태로 만들어줌
  // value: 바 그래프에서 보여줄 숫자, spacing: 바 그래프 사이 간격, label: 카테고리 이름
  const data = []
  let maxValue = -Infinity //그래프에서 바가 그래프 밖으로 빠져나오지 않기 위해 설정
  for(let category in groupedByCategory){
    if(maxValue < groupedByCategory[category]) maxValue = groupedByCategory[category]
    data.push({value: groupedByCategory[category], frontColor: '#a8a6ffff', gradientColor: '#a8cfffff', spacing: 12, label: category})
  }

  const noOfSections = 10 //행 갯수
  const yAxisLabelTexts = Array(noOfSections).fill(0).map((_, id) => { //id값은 0~9 (noOfSections이 10이므로)
    // console.log('아이디-------', id)
    let unit = id * maxValue/noOfSections
    if(unit > 1000000) unit = (unit / 1000000).toString() + 'M'
    else if(unit > 1000) unit = (unit / 1000).toString() + 'K'
    return unit
  })
  console.log(yAxisLabelTexts)

  return(
    <SafeAreaView style={styles.block}>
      <StatusBar backgroundColor="#a8c8ffff"></StatusBar>{/* 상태바를 안보이게 하고싶으면 추가를 안하면 됨 */}
      <View style={styles.graphBg}>
        <View style={styles.itemBg}>
          <View><Text style={styles.statusText}>진행중</Text></View>
          <View style={styles.badge}><Text style={styles.badgeText}>{groupedByStatus['진행중']}</Text></View>
        </View>
        <View style={styles.itemBg}>
          <View><Text style={styles.statusText}>완료</Text></View>
          <View style={styles.badge}><Text style={styles.badgeText}>{groupedByStatus['완료']}</Text></View>
        </View>
      </View>
      <View style={styles.graphBg}>
        <Text style={{color: '#666', fontSize: 16, fontWeight: 'bold'}}>
          카테고리별 할일 목록 수
        </Text>
        <View style={{padding: 20, alignItems: 'center'}}>
          <BarChart
            isAnimated //애니메이션 적용
            data={data} //그래프에 사용되는 데이터
            barWidth={25} //바 그래프 넓이
            initialSpacing={10}
            spacing={40}
            barBorderTopLeftRadius={7}
            barBorderTopRightRadius={7}
            showGradient
            yAxisThickness={0}
            xAxisType={'dashed'}
            xAxisColor={'#666'}
            yAxisTextStyle={{color: '#666'}}
            stepValue={1}
            maxValue={maxValue} //바 그래프 최대값
            noOfSections={noOfSections} // 그래프 행의 갯수
            yAxisLabelTexts={yAxisLabelTexts} // 그래프 Y축 라벨 리스트
            labelWidth={20} //라벨 간격
            xAxisLabelTextStyle={{color: '#666', textAlign: 'center'}}
            lineConfig={{
              color: '#666',
              thickness: 3,
              curved: true,
              hideDataPoints: true,
              shiftY: 20,
              initialSpacing: -30,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  block:{
    flex:1,
    backgroundColor: '#a8c8ffff',
  },
  graphBg: { //통계분석 블럭 배경화면
    margin: 10,
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#ffffff',
  },
  itemBg: { //진행상태가 보이는 부분 배경
    margin: 10,
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#a8c8ffff',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  statusText: { //진행상태 문자열 스타일
    color: '#666',
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: 10,
  },
  badge: { //진행상태 갯수 표시하는 뱃지 스타일
    backgroundColor: '#a8a6ffff',
    borderRadius: 50,
    elevation: 2,
    padding: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: { //뱃지 텍스트
    fontSize: 20,
    color: '#fff',
  }
})


export default DashBoardScreen