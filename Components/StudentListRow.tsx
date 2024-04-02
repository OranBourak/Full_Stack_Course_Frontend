import { StyleSheet, Text, View, Image, TouchableHighlight, Alert} from 'react-native';
import React,{useState, FC} from 'react';




const StudentListRow: FC<{name: string, id: string, imgUrl: string,onItemSelected: (id:string)=>void}> = ({name, id, imgUrl,onItemSelected}) => {

    const onPress = () => {
        console.log('Pressed');
        onItemSelected(id);
    }

  return (
    <TouchableHighlight 
    onPress={onPress}
    underlayColor={'grey'}>
        <View style={styles.listrow}>
                <Image source = {require("../assets/Avatar.jpg")} style= {styles.avatar} />
                <View style={styles.info}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.id}>{id}</Text>
                </View>
        </View>
    </TouchableHighlight>
  );

}


const styles = StyleSheet.create({
  listrow:{
    flexDirection: 'row',
    borderRadius:2,
    elevation:1,
    marginHorizontal:5,
    marginVertical:1,
  },
  avatar:{
    height: 100,
    width: 100,
    margin: 10,
    borderRadius: 50,
  },
  name:{
    fontSize: 25,
    marginBottom:5,
    fontWeight: 'bold',
  },
  id:{
    marginBottom: 5,
    fontSize: 20,
  },
  info:{
    flexDirection: 'column',
    justifyContent: 'center',
  }

});

export default StudentListRow;