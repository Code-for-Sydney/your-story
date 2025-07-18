import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { prompt, baseUrl, story } from '../../testdata.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import common from '../styles/common';
import { BaseSceneType, SceneType} from '../../types/story';
import StoryImage from '../components/StoryImage';

const LandingScreen: React.FC = () => {
    const [loading, setLoading] =useState<boolean>(true);
    const [reload, setReload] = useState(Date.now());
    const [prompt, setPrompt] = useState<BaseSceneType>();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const navigation = useNavigation();

    console.log('LandingScreen loaded', loading, prompt);

    const fetchUserPrompt = async () => {
        setLoading(true);
        try {
            await fetch(baseUrl + 'api/human-prompt')
            .then(res => res.json())
            .then(data => setPrompt(data));
        } catch (error) {
            console.error('Error fetching prompt:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log('Fetching user prompt...');
        fetchUserPrompt();
    }, [reload]);

    const onSubmit = async () => {
        setSubmitting(true);
        if (!prompt) { throw new Error('Prompt is undefined'); }
        else {
        let sceneObject: SceneType = {
            id: "0",
            scene: {
                prompt: prompt.prompt,
                illustration: prompt.illustration
            }
        }
        try {
            await fetch(baseUrl + 'api/create-story', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sceneObject),
            })
            .then(res => res.json())
            .then(data => {
                if(data.id) {navigation.navigate('Create', { id: data.id, story: [sceneObject] })}
            });
        } catch (error) {
            console.error('Error submitting story:', error);
        } finally {
            setSubmitting(false);
    }}}

    return (
        <SafeAreaView style={common.background}>
            <View style={common.container}>
                <View id="header" style={common.header}>
                    <Text style={common.title}>Your Story</Text>
                    <Text style={common.subtleText}>A platform for storytellers to find inspiration and share their creations.</Text>
                </View>
                {loading ? (
                    <View style={common.loading}>
                        <ActivityIndicator style={{padding: 20}}/>
                        <Text style={common.subtleText}>Generating a story prompt...</Text> 
                    </View>
                ) : (
                <>
                    <StoryImage scene={prompt} />
                    {submitting ? <ActivityIndicator /> : (
                    <View id='button-container' style={common.buttonContainer}>
                        <TouchableOpacity 
                        style={[common.button, {backgroundColor: '#FF6347'}]}
                        onPress={onSubmit}
                        >
                            <Text style={common.buttonText}>Continue the story</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[common.button, {backgroundColor: '#2e2e2e'}]} onPress={() => setReload(Date.now())}>
                            <Text style={common.buttonText}>Try another prompt</Text>
                        </TouchableOpacity>
                    </View>
                    )}
                </>
                )}
            </View>
        </SafeAreaView>
    );
};

export default LandingScreen;