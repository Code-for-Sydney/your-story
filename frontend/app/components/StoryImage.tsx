import React from 'react';
import { Text, View, Image } from 'react-native';
import { SceneType } from '../../types/story';
import common from '../styles/common';


interface StoryImageProps {
    scene: undefined | SceneType;
}

const StoryImage: React.FC<StoryImageProps> = ({ scene }) => {

    return (
        <View id="image-container" style={common.imageContainer}>
            <Image
                source={require("../../assets/placeholder.png")}
                style={common.image}
                resizeMode='contain'
            />
            <View style={common.promptOverlay}>
                <Text style={common.promptText}>{scene?.prompt}</Text>
            </View>
        </View>
    );
};

export default StoryImage;