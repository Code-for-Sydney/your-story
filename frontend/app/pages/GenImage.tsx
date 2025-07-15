import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { SceneType, BaseSceneType } from '../../types/story';
import Carousel from '../components/Carousel';
import common from '../styles/common';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import StoryImage from '../components/StoryImage';

interface Props extends NativeStackScreenProps<RootStackParamList, 'Image'>{}

const GenImage: React.FC<Props> = ({ route, navigation }) => {
    const prompt: string = route.params.prompt;
    const storyId: string = route.params.id;
    const currentStory: SceneType[] = route.params.story;
    const [loading, setLoading] = useState<boolean>(true);
    const [img, setImg] = useState<string>('');
    const [scene, setScene] = useState<BaseSceneType>();

    useEffect(() => {
        generateImage();
    }
    , []);

    const generateImage = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/api/generate-scene-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: storyId, scene_description: prompt }),
            });
            const data = await response.json();
            console.log("data", data)
            if (data.image) {
                setScene({
                        prompt: prompt,
                        illustration: data.image
                });
            } else {
                console.error('No image returned from API');
            }
        } catch (error) {
            console.error('Error generating image:', error);
        } finally {
            setLoading(false);
        }
    }

    const createStoryObject = () => {
        const nextId = currentStory.length;
        const storyObject: SceneType[] = [
            ...currentStory,
            {
                id: nextId.toString(),
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
        generateImage();
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