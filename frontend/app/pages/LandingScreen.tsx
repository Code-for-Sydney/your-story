import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import prompt from '../../prompt.js';
import { SafeAreaView } from 'react-native-safe-area-context';



const getPrompt = () => {
    return prompt;
}

const LandingScreen: React.FC = () => {
    const [prompt, setPrompt] = React.useState(getPrompt());

    console.log(prompt.illustration);

    return (
        <SafeAreaView style={styles.container}>
            <View id="header" style={styles.header}>
                <Text style={styles.title}>Your Story</Text>
                <Text style={styles.subtleText}>A platform for storytellers to find inspiration and share their creations.</Text>
            </View>
            <View id="image-container" style={styles.imageContainer}>
                <Image
                    source={require("../../assets/placeholder.png")}
                    style={styles.image}
                    resizeMode='contain'
                />
                <View style={styles.promptOverlay}>
                    <Text style={styles.promptText}>{prompt.prompt}</Text>
                </View>
            </View>
            <View id='button-container' style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, {backgroundColor: '#FF6347'}]}>
                    <Text style={styles.buttonText}>Continue the story</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, {backgroundColor: '#2e2e2e'}]} onPress={() => setPrompt(getPrompt())}>
                    <Text style={styles.buttonText}>Try another prompt</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222222'
    },
    promptText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        opacity: 1
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF6347'
    },
    promptOverlay: {
        alignSelf: 'flex-end',
        padding: 10,
        margin: 5,
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 10,
        width: '99%'
    },
    image: {
        margin: 5,
        width: '99%',
        maxHeight: 500,
        borderRadius: 10
    },
    header: {
        padding: 20,
    },
    subtleText: {
        fontSize: 14,
        color: '#aaa',
        marginBottom: 5,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#2e2e2e',
        borderRadius: 10
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        padding: 15,
        margin: 10,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
    }
});

export default LandingScreen;