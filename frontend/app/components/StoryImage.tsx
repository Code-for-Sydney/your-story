import React, {useState} from 'react';
import { Text, View, Image } from 'react-native';
import { BaseSceneType } from '../../types/story';
import common from '../styles/common';
import { baseUrl } from '../../testdata.js';


interface StoryImageProps {
    scene: undefined | BaseSceneType;
}

const StoryImage: React.FC<StoryImageProps> = ({ scene }) => {
    const [imageUrl, setImageUrl] = useState(baseUrl + scene?.illustration);
    console.log(imageUrl)
    return (
        <View id="image-container" style={common.imageContainer}>
            <Image
                source={imageUrl ? { uri: imageUrl } : undefined}
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