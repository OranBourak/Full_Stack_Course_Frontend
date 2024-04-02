import { StyleSheet, Text, View, Image, TouchableOpacity,Button,Alert,TextInput,StatusBar} from 'react-native';
import React,{useState} from 'react';

export default function StudentPage() {

  const [name, onChangeName] = useState("");
  const [id, onChangeId] = useState("");
  const [address, onChangeAddress] = useState("");

  const onCancel = () => {
    console.log('Cancel');
  }
  const onSave = () => {
    console.log('Save');
  }
  

  return (
    <View style={styles.container}>
      <Image source = {require('../assets/Avatar.jpg')} style= {styles.avatar} />
      <TextInput 
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        placeholder='Enter your name'
      />
      <TextInput 
        style={styles.input}
        onChangeText={onChangeId}
        value={name}
        placeholder='Enter your ID number'
      />
      <TextInput 
        style={styles.input}
        onChangeText={onChangeAddress}
        value={name}
        placeholder='Enter your address'
      />
      <View style ={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={onCancel}>
           <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSave}>
          <Text style={styles.buttonText}>CANCEL</Text>
       </TouchableOpacity>
      </View>

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
  buttons:{
    flexDirection: 'row',
  },
  button:{
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  buttonText: {
    padding: 10,
 
    }
});
