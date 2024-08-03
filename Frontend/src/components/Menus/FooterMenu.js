import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation, useRoute} from '@react-navigation/native';
const FooterMenu = () => {
  // hooks
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={styles.hr}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <FontAwesome5
            name="home"
            style={styles.iconStyle}
            color={route.name === 'Home' ? 'orange' : 'black'}
          />

          <Text style={styles.label}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Post')}>
          <FontAwesome5
            name="plus-square"
            style={styles.iconStyle}
            color={route.name === 'Post' ? 'orange' : 'black'}
          />
          <Text style={styles.label}>Post</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('My Post')}>
          <FontAwesome5
            name="list"
            style={styles.iconStyle}
            color={route.name === 'My Post' ? 'orange' : 'black'}
          />
          <Text style={styles.label}>My Post</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Account')}>
          <FontAwesome5
            name="user"
            style={styles.iconStyle}
            color={route.name === 'Account' ? 'orange' : 'black'}
          />
          <Text style={styles.label}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FooterMenu;

const styles = StyleSheet.create({
  hr: {
    borderTopColor: 'lightblack',
    borderTopWidth: 0.7,
  },
  container: {
    flexDirection: 'row',
    margin: 15,
    justifyContent: 'space-between',
  },
  iconStyle: {
    marginBottom: 3,
    alignSelf: 'center',
    fontSize: 25,
  },
  label: {
    color: 'black',
  },
});
