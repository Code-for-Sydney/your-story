import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { prompt } from '../../testdata.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import common from '../styles/common';


const getPrompt = () => {
    return prompt;
}

const LandingScreen: React.FC = () => {
    const [prompt, setPrompt] = useState(getPrompt());
    const navigation = useNavigation();

    const continueStory = () => {
        // Backend logic
       navigation.navigate('Create');
    };

    return (
        <SafeAreaView style={common.background}>
            <View style={common.container}>
                <View id="header" style={common.header}>
                    <Text style={common.title}>Your Story</Text>
                    <Text style={common.subtleText}>A platform for storytellers to find inspiration and share their creations.</Text>
                </View>
                <View id="image-container" style={common.imageContainer}>
                    <Image
                        source={require("../../assets/placeholder.png")}
                        style={common.image}
                        resizeMode='contain'
                    />
                    <View style={common.promptOverlay}>
                        <Text style={common.promptText}>{prompt.prompt}</Text>
                    </View>
                </View>
                <View id='button-container' style={common.buttonContainer}>
                    <TouchableOpacity 
                    style={[common.button, {backgroundColor: '#FF6347'}]}
                    onPress={continueStory}
                    >
                        <Text style={common.buttonText}>Continue the story</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[common.button, {backgroundColor: '#2e2e2e'}]} onPress={() => setPrompt(getPrompt())}>
                        <Text style={common.buttonText}>Try another prompt</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LandingScreen;