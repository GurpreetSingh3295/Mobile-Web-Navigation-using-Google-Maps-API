/*
 Author: Gurpreet Singh , 000901702
 Statement of Authorship: I Gurpreet Singh, 000901702 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
*/
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomMapApp  from './Map';


export default function App() {
  return (
    <View style={styles.container}>
      <CustomMapApp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:5,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});