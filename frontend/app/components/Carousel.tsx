import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { SceneType } from '../../types/story';
import common from '../styles/common';
import StoryImage from './StoryImage';

interface CarouselProps {
    story: SceneType[];
    textOnly: boolean;
}

const Carousel: React.FC<CarouselProps> = ({ story, textOnly }) => {
    const maxIndex = story.length - 1;
    const [currentIndex, setCurrentIndex] = React.useState(textOnly ? maxIndex : 0);

    const handlePrev = () => {
        if (currentIndex <= 0) {
            return;
        }
        setCurrentIndex(currentIndex - 1);
    };

    const handleNext = () => {
        if (currentIndex >= maxIndex) {
            return;
        }
        setCurrentIndex(currentIndex + 1);
    };

    const SceneDisplay: React.FC = () => (
        <>
            {!textOnly ? (
                <StoryImage scene={story[currentIndex].scene} />
            ) : null}
            <View style={carouselStyles.itemContainer}>
                <TouchableOpacity onPress={handlePrev}>
                    <Image
                    source={require("../../assets/chevron_left.png")}
                    style={{ width: 30, height: 30, margin: 10 }}
                    />
                </TouchableOpacity>
                {textOnly ? (
                    <Text style={common.text}>{story[currentIndex].scene.prompt}</Text>
                ) : (
                    <Text style={common.text}>Scene {currentIndex + 1}/{maxIndex + 1}</Text>
                )}
                <TouchableOpacity 
                onPress={handleNext}
                style={[{alignSelf: 'flex-end'}]}>
                <Image
                    source={require("../../assets/chevron_right.png")}
                    style={{ width: 30, height: 30, margin: 10 }}
                    />
                </TouchableOpacity>
            </View>
        </>
    );

    return (
        <View style={[{ marginTop: 10 }]}>
            {textOnly ? <Text style={common.subtleText}>The story so far</Text> : null}
            <View style={common.greyContainer}>
                <SceneDisplay />
            </View>
        </View>
    );
};

const carouselStyles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rightChevron: {
        
    }
});

export default Carousel;