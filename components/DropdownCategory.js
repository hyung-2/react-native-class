import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import AntIcon from 'react-native-vector-icons/AntDesign'

const caretdownComponent = (props) => <AntIcon name='caretdown' {...props} size={15}/>
const caretupComponent = (props) => <AntIcon name='caretup' {...props} size={15}/>

function DropdownCategory({ caretType, setCaretType }){
  const onPress = () => {
    setCaretType(!caretType)
  }

  return(
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, caretType && { alignItems: 'flex-end'}]}>
        <Text style={styles.categoryText}>카테고리</Text>
        {caretType ? caretupComponent() : caretdownComponent()}
      </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    paddingRight: 5,
    fontSize: 15
  }
})

export default DropdownCategory