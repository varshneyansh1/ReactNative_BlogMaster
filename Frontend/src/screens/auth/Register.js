import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import InputBox from '../../components/InputBox';
import SubmitButton from '../../components/Forms/SubmitButton';
import axios from 'axios';

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!name || !email || !password) {
        Alert.alert('Please fill all fields');
        setLoading(false);
        return;
      }
      setLoading(false);
      // uploading credentials to backend
      const {data} = await axios.post(
        '/auth/register',
        {name, email, password},
      );

      Alert.alert(data && data.message);
      navigation.navigate('Login')  
     
    } catch (error) {
      alert(error.response.data.message)
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Register</Text>
      </View>
      <View style={styles.inputBoxArea}>
        <InputBox inputTitle={'Name'} value={name} setValue={setName} />
        <InputBox
          inputTitle={'Email'}
          keyboardType="email-address"
          value={email}
          setValue={setEmail}
        />
        <InputBox
          inputTitle={'Password'}
          secureTextEntry={true}
          value={password}
          setValue={setPassword}
        />
        <SubmitButton
          btnTitle="Register"
          loading={loading}
          handleSubmit={handleSubmit}
        />
        <Text style={styles.loginText}>
          Already Registered Please
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('Login')}>
            {' '}
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#efeff0',
    height: '100%',
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBoxArea: {
    flex: 2,
    margin: 20,
  },
  loginText: {
    textAlign: 'center',
    fontSize: 17,
    color:"black"
  },
  link: {
    color: 'green',
    fontSize: 18,
  },
});
