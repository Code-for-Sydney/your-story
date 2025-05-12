import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { story } from '../../testdata.js';
import { useNavigation } from '@react-navigation/native';
import type { StoryType, SceneType } from '../../types/story';
import Carousel from '../components/Carousel';
import common from '../styles/common';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

interface Props extends NativeStackScreenProps<RootStackParamList, 'Create'>{}

const EditScene: React.FC<Props> = ({navigation}) => {
    const [currentStory, setCurrentStory] = useState<StoryType[]>(story);
    const [scene, setScene] = useState<string>('');
    const [validationFailed, setValidationFailed] = useState<boolean>(false);
 

    console.log(currentStory);

    const submitScene = () => {
        //logic
        if(scene) {
            setValidationFailed(false);
            navigation.navigate('Image', {scene: scene});
        } else {
            setValidationFailed(true);
        } 
    }

    console.log("scene", scene);
    return (
        <SafeAreaView style={common.background}>
            <View style={common.container}>
                
            <View style={common.header}>
                <Text style={common.title}>Your Story</Text>
                <Text style={common.text}>Write the next 2 - 3 sentences of your story (max 500 characters). </Text>
                <Carousel story={currentStory} />
                <TextInput
                    style={createStyles.input}
                    placeholder="Write your story here..."
                    placeholderTextColor="#aaa"
                    multiline
                    numberOfLines={10}
                    maxLength={500}
                    onChangeText={text => setScene(text)}
                    autoFocus
                />
                {validationFailed ? 
                    <Text style={[common.subtleText, {color: 'red'}]}>Write something!</Text>
                    : null}
            </View>
            <View style={[common.buttonContainer, {marginBottom: 20}]}>
                <TouchableOpacity
                    style={[common.button, { backgroundColor: '#FF6347' }]}
                    onPress={submitScene}
                >
                    <Text style={common.text}>Generate image</Text>
                </TouchableOpacity>
            </View>
            </View>
            
        </SafeAreaView>
    );
};

const createStyles = StyleSheet.create({
    input: {
        backgroundColor: '#2e2e2e',
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        color: '#fff',
        fontSize: 16,
    }
})

export default EditScene;