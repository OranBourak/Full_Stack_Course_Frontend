import { StyleSheet, Text, View, Image, TouchableOpacity,Button,Alert,TextInput,StatusBar} from 'react-native';
import React,{useState, FC} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StudentListPage from './Components/StudentListPage';
import AddStudentPage from './Components/StudentAddPage';
import StudentDetailsPage from './Components/StudentDetailsPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginPage from './Components/LoginPage';
import PostsListPage from './Components/PostsListPage';
import SignUpUserPage from './Components/UserSignUpPage';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const LoginStack = createNativeStackNavigator();

const StudentsListScreen:FC= () => {
  return (
    <LoginStack.Navigator>
      {/* <StudentListStack.Screen name="StudentListPage" component={StudentListPage} options={{title: "Student List"}}/>
      <StudentListStack.Screen name="StudentDetailsPage" component={StudentDetailsPage} options={{title: "Student Details"}} />
      <StudentListStack.Screen name="AddStudentPage" component={AddStudentPage} options={{title: "Add Student"}}/> */}
      <LoginStack.Screen name="LoginPage" component={LoginPage} options={{title: "Login"}}/>
      <LoginStack.Screen name="SignUpUserPage" component={SignUpUserPage} options={{title: "Sign-Up User"}}/>
      <LoginStack.Screen name="PostsListPage" component={PostsListPage} options={{title: "Posts"}}/>
    </LoginStack.Navigator>
  );

}

export default function App() {
 
  return (
    <NavigationContainer>
       {/* <Tab.Navigator>
          <Tab.Screen name="StudentListPage" component={StudentsListScreen} options={{headerShown:false}} />
          <Tab.Screen name="AddStudentPage" component={AddStudentPage} options={{title: "Add Student"}}/>
        </Tab.Navigator> */}
        <Tab.Navigator>
          <Tab.Screen name="LoginPage" component={LoginPage} options={{headerShown:false}} />
          <Tab.Screen name="SignUpUserPage" component={SignUpUserPage} options={{title: "Sign-Up User"}}/>
        </Tab.Navigator>


    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: StatusBar.currentHeight,
  },
});
