import { StyleSheet, Text, View, Image, TouchableOpacity,Button,Alert,TextInput,StatusBar} from 'react-native';
import React,{useState, FC} from 'react';
import StudentAddPage from './Components/StudentAddPage';
import StudentListRow from './Components/StudentListRow';



export default function App() {
 
  return (
    <View style={styles.container}>
      <StudentListRow name="Oran Bourak" id="12312412" imgUrl='https://www.youtube.com'/>

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
