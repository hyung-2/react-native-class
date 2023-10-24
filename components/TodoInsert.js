import React from 'react'
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Keyboard } from 'react-native'

function TodoInsert({ onInsertTodo, todoText, setTodoText, warning, setWarning, disabled }){

  const onPress = () => {
    const trimedText = todoText.trim() //공백제거
    onInsertTodo(trimedText)

    // setTodoText('') //입력창 초기화
    // Keyboard.dismiss() //키보드 감추기
  }

  const handleChange = (text) => {
    if(/\n/.test(text)){ //엔터키 입력시
      onPress() //할일 추가
    }else{
      setTodoText(text)
      setWarning(false)
    }
  }

  const hideKeyboard = () => {
    Keyboard.dismiss()
  }

  console.log(todoText)

  return(
    <View style={styles.container}>
      <TextInput
        editable={!disabled} //disabled값에 따른 입력창 비활성화
        selectTextOnFocus={!disabled} //disabled값에 따른 입력창 비활성화
        placeholder={disabled ? '할일을 작성할 수 없습니다' : '할일을 작성해주세요!'}
        placeholderTextColor={disabled ? 'red' : '#a8c8ffff'}
        selectionColor={'#d6e3ffff'} //커서색상
        style={[styles.input, { color : warning ? 'red' : '#a8c8ffff'} ]}
        value={disabled ? '' : todoText} //disabled값이 true인 경우 입력창 초기화
        blurOnSubmit={false} //탭키 누를때 키보드 사리지지 않게 하기
        onChangeText={handleChange} //입력창에 글자 입력시
        returnKeyType='done' //엔터키 아이콘 변경
        maxLength={50} //최대 글자수 제한
        autoCorrect={false} //자동완성기능 끄기
        onSubmitEditing={hideKeyboard} //엔터키 눌렀을때 키보드 닫기
      />
      <TouchableOpacity 
        disabled={disabled} //disabled값에 따른 버튼 비활성화
        activeOpacity={0.7} //버튼 클릭시 투명도 변경  
        onPress={onPress} //버튼 클릭시 실행
      >
        {/* disabled값에 따른 버튼 색상 변경 */}
        <View style={[styles.button, {backgroundColor: disabled ? 'red' : '#a8c8ffff'}]}>
          <Text style={styles.buttonText}>추가</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    paddingLeft: 10,
    borderColor: 'transparent',
    borderTopWidth: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  input: {
    fontSize: 20,
    color: '#a8c8ffff',
    paddingVertical: 10,
    flex: 1, //설정하지 않으면 입력창에 입력한 글자가 길어지면 추가버튼이 밀려남
  },
  button: {
    backgroundColor: '#a8c8ffff',
    width: 80,
    height: 35,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    color: '#fff',
    letterSpacing: 3,
    fontWeight: 'bold',
    fontSize: 15
  }
})

export default TodoInsert