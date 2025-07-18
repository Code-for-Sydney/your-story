import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { SceneType, BaseSceneType } from '../../types/story';
import Carousel from '../components/Carousel';
import common from '../styles/common';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import StoryImage from '../components/StoryImage';
import { baseUrl } from '../../testdata';

interface Props extends NativeStackScreenProps<RootStackParamList, 'Image'>{}

const GenImage: React.FC<Props> = ({ route, navigation }) => {
    const prompt: string = route.params.prompt;
    const storyId: string = route.params.id;
    const currentStory: SceneType[] = route.params.story;
    const [loading, setLoading] = useState<boolean>(true);
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [scene, setScene] = useState<BaseSceneType>();
    const [refresh, setRefresh] = useState<string>('');

    useEffect(() => {
        setLoading(true);
        generateImage();
    }
    , [refresh]);

    const generateImage = async () => {
        setLoading(true);
        try {
            const response = await fetch(baseUrl + 'api/generate-scene-image', {
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

    const createSceneObject = () => {
        const nextId = currentStory.length;
        if (!scene) {return "error"}
        const sceneObject: SceneType =
            {   
                id: nextId.toString(),
                scene: {
                    prompt: scene.prompt,
                    illustration: scene.illustration
                }
            }
        return sceneObject;
    }

    const createStoryObject = (sceneObject: SceneType) => {
        const storyObject: SceneType[] =
        [
            ...currentStory,
            sceneObject
        ]
        return storyObject
    }

    const handleContinue = async () => {
        setSubmitting(true)
        const sceneObject = createSceneObject();
        try {
            const response = await fetch(baseUrl + 'api/update-story/' + storyId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sceneObject),
            });
            if (response.status == 200 && sceneObject != "error") {
                const storyObject = createStoryObject(sceneObject)
                navigation.navigate('Create', { id: storyId, story: storyObject });
            } else {throw new Error}
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

    const regenerateImage = () => {
        setRefresh(String(Date.now()))
    }

    const handleSaveAndExit = async () => {
        //duplication
        setSubmitting(true)
        const sceneObject = createSceneObject();
        try {
            const response = await fetch(baseUrl + 'api/update-story/' + storyId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sceneObject),
            });
            if (response.status == 200) {
                navigation.navigate('View', { id: storyId });
            } else {throw new Error}
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
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
                {loading || submitting ? null : (
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