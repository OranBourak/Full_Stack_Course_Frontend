import { FC, useEffect, useState } from 'react';
import { FlatList, Text, StyleSheet,Button, View } from 'react-native';

const PostsListPage: FC<{navigation:any}> = ({navigation}) => {

   
    return (
        <View>
            <Text>Posts List Page</Text>
            <Text>NOT IMPLEMENTED YED</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    flatList:{
        flex: 1,
    }
})

export default PostsListPage;