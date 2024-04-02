import { StyleSheet, Text, View, Image, TouchableOpacity,Button,Alert,TextInput,StatusBar} from 'react-native';
import React,{useState, FC} from 'react';
import StudentList from './Components/StudentList';



export default function App() {
 
  return (
    <View style={styles.container}>
      <StudentList />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: StatusBar.currentHeight,
  },
});
