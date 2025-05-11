import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { story } from '../../testdata.js';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StoryType, SceneType } from '../../types/story';
import Carousel from '../components/Carousel';
import common from '../styles/common';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

interface Props extends NativeStackScreenProps<RootStackParamList, 'Image'>{}

const GenImage: React.FC<Props> = ({ route, navigation }) => {

    const [currentStory, setCurrentStory] = useState<StoryType[]>(story);
    const [loading, setLoading] = useState<boolean>(true);
    

    console.log(currentStory);

    const awaitImage = async () => {
        setTimeout(() => setLoading(false), 4000)
    }

    useEffect(() => {
        awaitImage();
    }
    , []);

    return (
        <SafeAreaView style={[common.container, {justifyContent: 'space-between'}]}>
            <View style={common.header}>
                <Text style={common.title}>Your Story</Text>
                <Carousel story={currentStory} />
                {loading ? (
                    <View style={imgStyles.loadingContainer}>
                        <ActivityIndicator />
                        <Text style={common.subtleText}>Generating image - this might take a minute</Text>
                    </View>
                ) : (
                <View id="image-container" style={[common.imageContainer, {marginTop: 5}]}>
                    <Image
                        source={require("../../assets/placeholder.png")}
                        style={common.image}
                        resizeMode='contain'
                    />
                    <View style={common.promptOverlay}>
                        <Text style={common.promptText}>{route.params?.scene}</Text>
                    </View>
                </View>
                )}
            </View>
            <View style={[common.buttonContainer, {marginBottom: 20}]}>
                <TouchableOpacity
                    style={[common.button, { backgroundColor: '#FF6347' }]}
                >
                    <Text style={common.text}>Continue the story</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[common.button, { backgroundColor: '#2e2e2e' }]}
                >
                    <Text style={common.text}>Try another image</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[common.button, { backgroundColor: '#2e2e2e' }]}
                >
                    <Text style={common.text}>Save and exit</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const imgStyles = StyleSheet.create({
    loadingContainer: {
        marginTop: 20
    }
})

export default GenImage;