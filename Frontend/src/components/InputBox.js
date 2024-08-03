import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const InputBox = ({inputTitle,keyboardType="default",secureTextEntry=false,value,setValue}) => {
  return (
    <View>
      <Text style={styles.textLabel}>{inputTitle}</Text>
      <TextInput style={styles.inputBox}
      autoCorrect={false}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={(text)=>setValue(text)}
      />
    </View>
  )
}



const styles = StyleSheet.create({
    inputBox:{
        height:40,
        marginBottom:20,
        backgroundColor:"white",
        borderRadius:10,
        marginTop:10,
        borderColor:"black",
        paddingLeft:10,
        color:"black",
        elevation:7
    },
    textLabel:{
              color:"black"
    }
    
})
export default InputBox