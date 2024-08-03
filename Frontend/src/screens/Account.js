import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../../context/authContext';
import FooterMenu from '../components/Menus/FooterMenu';
import axios from 'axios';

const Account = () => {
  // global state
  const [state,setState] = useContext(AuthContext);
  const {user} = state;
  // local state
  const [name, setName] = useState(user?.name);
  const [password, setPassword] = useState(user?.password);
  const [email] = useState(user?.email);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true)
      const {data} = await axios.put('/auth/update-user',{
        name,password,email
      })
      setLoading(false)
      let UD = JSON.stringify(data)
      setState({...state , user:UD?.updatedUser})
      Alert.alert(data && data.message)
    } catch (error) {
      Alert.alert(error.response.data.message);
      setLoading(false)
      console.log(error)
      
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView>

    
      <View style={{alignItems: 'center'}}>
        <Image
          source={{
            uri: 'https://publicdomainvectors.org/tn_img/abstract-user-flat-4.webp',
          }}
          style={{height: 200, width: 200, borderRadius: 100}}
        />
      </View>
      <Text style={styles.warningText}>
        You can update your Name and Password{' '}
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Name</Text>
        <TextInput
          style={styles.inputBox}
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Email</Text>
        <TextInput style={styles.inputBox} value={email} editable={false} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Password</Text>
        <TextInput
          style={styles.inputBox}
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
      </View>

      <View style={{alignItems: 'center'}}>
        <TouchableOpacity style={styles.updateBtn}
        onPress={handleUpdate}
        >
          <Text style={styles.updateBtnText }>
            {loading ? "Please Wait" : "Update Profile"}
            </Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <FooterMenu />
      </View>
    
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    margin: 10,
    justifyContent: "space-between",
    backgroundColor:"white"
  },
  warningText: {
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    fontWeight: 'bold',
    width: 70,
    color: 'gray',
  },
  inputBox: {
    backgroundColor: "#ffffff",
    textAlignVertical: "top",
    color:"gray",
    width:250,
    fontSize: 16,
    paddingLeft: 15,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
  },
  updateBtn: {
    backgroundColor: 'black',
    color: 'white',
    height: 40,
    width: 250,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateBtnText: {
    color: '#FFF',
    fontSize: 18,
  },
});
