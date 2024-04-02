import { FC, useEffect, useState } from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import StudentListRow from './StudentListRow';

import StudentModel, {Student} from '../Models/StudentModel';

const StudentList: FC = () => {

    const [data, setData] = useState<Student[]>([]);

    const onItemSelected = (id:string)=>{
        console.log('Item Selected, ID:'+ id);
    }

    useEffect(()=>{
        setData(StudentModel.getAllStudents());
    },[])

    return (
      <FlatList 
        style={styles.flatList}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
            <StudentListRow 
            name ={item.name}
            id={item.id}
            imgUrl={item.imgUrl}
            onItemSelected={onItemSelected}
            />
        )}
      />
    )
}

const styles = StyleSheet.create({
    flatList:{
        flex: 1,
    }
})

export default StudentList;