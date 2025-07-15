import React, { use, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Touchable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { StoryType, SceneType } from '../../types/story';
import Carousel from '../components/Carousel';
import common from '../styles/common';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

interface Props extends NativeStackScreenProps<RootStackParamList, 'View'>{}

const ViewStory: React.FC<Props> = ({route, navigation}) => {
    const [copySuccess, setCopySuccess] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const story: StoryType[] = route.params.story;
    const link = `https://yourstoryapp.com/view/1234`;

    useEffect(() => {
        setShowSuccess(copySuccess);
        const timer = setTimeout(() => {
            setShowSuccess(false);
        }, 2000);
        return () => clearTimeout(timer);
    }
    , [copySuccess]);

    const copyLink = async () => {
        await navigator.clipboard.writeText(link)
        setCopySuccess(true);
    }

    const handleCopyLink = () => {
        setCopySuccess(false);
        copyLink();
    };

    const handleWriteAnother = () => {
        navigation.navigate('Landing');
    };
    return (
        <SafeAreaView style={[common.background, {justifyContent: 'space-between'}]}>
            <View style={common.container}>
                <View style={common.header}>
                    <Text style={common.title}>Your Story</Text>
                    <Text style={common.subtleText}>A platform for storytellers to find inspiration and share their creations.</Text>
                    <Carousel story={story} textOnly={false}/>
                    <View style={{marginTop: 20}}>
                        <Text style={common.subtleText       }>Share your story with the link below.</Text>
                        <View style={common.greyContainer}>
                            <Text style={[common.text, {color: '#FF6347', fontWeight: 'bold'}]}>
                                {link}
                            </Text>
                        </View>
                    </View>
                </View>
                {showSuccess ? (
                    <View style={viewStyles.popUp}>
                        <Text style={[common.subtleText, {color: 'green'}]}>
                            Link copied to clipboard!
                        </Text>
                    </View>
                ) : null}
                <View style={[common.buttonContainer, {marginBottom: 20}]}>
                    <TouchableOpacity
                        style={[common.button, { backgroundColor: '#FF6347' }]}
                        onPress={handleCopyLink}
                    >
                        <Text style={common.text}>Copy link</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[common.button, { backgroundColor: '#2e2e2e' }]}
                        onPress={handleWriteAnother}
                    >
                        <Text style={common.text}>Write another story</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const viewStyles = StyleSheet.create({
    popUp: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        backgroundColor: '#2e2e2e',
        borderRadius: 8,
        padding: 10,
        zIndex: 1000,
    }
});

export default ViewStory;