import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const TitleBox = (props) => {
    return (
        <View className={styles.title}>
            <TextInput
                value={props.value}
                onChangeText={props.onChange}
                placeholder="Enter a title for your review..."
                placeholderTextColor="grey"
                style={styles.input}
            />
        </View>
    );
};



const styles = StyleSheet.create({
    input: {
        borderColor: "gray",
        width: "100%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 5
    },
});

export default TitleBox;