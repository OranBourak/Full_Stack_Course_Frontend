import { StyleSheet, Text, View, Image, TouchableOpacity,Button,Alert,TextInput,StatusBar} from 'react-native';
import React,{useState,FC, useEffect} from 'react';
import StudentModel from '../Models/StudentModel';

const StudentDetailsPage:FC<{route:any, navigation:any}> = ({route,navigation})=>{
  
  const student = StudentModel.getStudentById(route.params.id);

  useEffect(()=>{
    navigation.setOptions({title: student?.name});
    navigation.setOptions({
      headerRight: () => (
          <Button
          onPress={() => navigation.navigate('AddStudentPage')}
          title="Edit"
          />
          ),
  });
  },[])


  return (
    <View style={styles.container}>
      <Image source = {require("../assets/Avatar.jpg")} style= {styles.avatar} />
      <Text style={styles.input}>Name: {student?.name}</Text>
      <Text style={styles.input}>ID: {student?.id}</Text>
      <Text style={styles.input}>Image:{student?.imgUrl}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: StatusBar.currentHeight,
  },
  title:{
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor:'blue',
  },
  avatar:{
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: 'center',
  },
  input:{
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default StudentDetailsPage;