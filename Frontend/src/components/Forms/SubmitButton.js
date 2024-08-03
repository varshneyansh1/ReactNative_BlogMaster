import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const SubmitButton = ({handleSubmit, btnTitle, loading}) => {
  return (
    <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
      <Text style={styles.btnText}>
        {loading ? 'Please Wait...' : btnTitle}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitBtn: {
    backgroundColor: '#1e2225',
    height: 50,
    marginHorizontal: 25,
    justifyContent: 'center',
    marginVertical: 30,
    borderRadius: 15,
  },
  btnText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SubmitButton;
