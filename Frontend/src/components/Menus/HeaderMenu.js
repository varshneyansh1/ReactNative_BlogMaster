import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../../context/authContext'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeaderMenu = ({showlogout}) => {
    const [state,setState] = useContext(AuthContext)
    //logout
    const handleLogout = async () =>{
      setState({token:'',user : null})
      await AsyncStorage.removeItem('@auth')
      Alert.alert('logout successfully')
    }
  return (
    <>
    {showlogout && (  
      <View>
      <TouchableOpacity onPress={handleLogout}>
      <FontAwesome5 name='sign-out-alt' style={styles.iconStyle} />
      </TouchableOpacity>
    </View>)}
    </>
  )
}

export default HeaderMenu

const styles = StyleSheet.create({
    iconStyle:{
        marginBottom:3,
        alignSelf:"center",
        fontSize:25,
        color:"black"
    }
})