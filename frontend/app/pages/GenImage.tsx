import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { StoryType, SceneType } from '../../types/story';
import Carousel from '../components/Carousel';
import common from '../styles/common';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import StoryImage from '../components/StoryImage';

interface Props extends NativeStackScreenProps<RootStackParamList, 'Image'>{}

const GenImage: React.FC<Props> = ({ route, navigation }) => {
    const prompt: string = route.params.prompt;
    const currentStory: StoryType[] = route.params.story;
    const [loading, setLoading] = useState<boolean>(true);
    const [img, setImg] = useState<string>('');
    const [scene, setScene] = useState<SceneType>();

    useEffect(() => {
        awaitImage();
    }
    , []);

    const awaitImage = async () => {
        setTimeout(() => {
            const tempScene: SceneType = {
                prompt: prompt,
                illustration: 'assets/placeholder.png' // Placeholder image path
            };
            setScene(tempScene);
            setLoading(false)
        }, 2000)
        setImg('assets/placeholder.png');
    }

    const createStoryObject = () => {
        const nextId = currentStory.length;
        const storyObject: StoryType[] = [
            ...currentStory,
            {
                id: nextId,
                scene: {
                    prompt: prompt,
                    illustration: img
                }
            }
        ];
        return storyObject;
    }

    const handleContinue = () => {
        const storyObject = createStoryObject();
        navigation.navigate('Create', { story: storyObject });
    }

    const regenerateImage = () => {
        setLoading(true);
        awaitImage();
    }

    const handleSaveAndExit = () => {
        const storyObject = createStoryObject();
        const id = "story:" + crypto.randomUUID();
        localStorage.setItem(id, JSON.stringify(storyObject));
        navigation.navigate('View', { story: storyObject });
    }

    return (
        <SafeAreaView style={common.background}>
            <View style={common.container}>
                <View style={common.header}>
                    <Text style={common.title}>Your Story</Text>
                    <Carousel story={currentStory} textOnly={true}/>
                    {loading ? (
                        <View style={imgStyles.loadingContainer}>
                            <ActivityIndicator />
                            <Text style={common.subtleText}>Generating image - this might take a minute</Text>
                        </View>
                    ) : (
                    <View style={{marginTop: 5}}>
                        <StoryImage scene={scene} />
                    </View>
                    )}
                </View>
                {loading ? null : (
                <View style={[common.buttonContainer, {marginBottom: 20}]}>
                    <TouchableOpacity
                        style={[common.button, { backgroundColor: '#FF6347' }]}
                        onPress={handleContinue}
                    >
                        <Text style={common.text}>Continue the story</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[common.button, { backgroundColor: '#2e2e2e' }]}
                        onPress={regenerateImage}
                    >
                        <Text style={common.text}>Try another image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[common.button, { backgroundColor: '#2e2e2e' }]}
                        onPress={handleSaveAndExit}
                    >
                        <Text style={common.text}>Save and exit</Text>
                    </TouchableOpacity>
                </View>
                )}
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