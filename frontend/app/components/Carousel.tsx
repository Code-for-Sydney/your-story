import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { StoryType, SceneType } from '../../types/story';
import common from '../styles/common';

interface CarouselProps {
    story: StoryType[];
}

const Carousel: React.FC<CarouselProps> = ({ story }) => {
    const maxIndex = story.length - 1;
    const [currentIndex, setCurrentIndex] = React.useState(maxIndex);

    console.log("idx", currentIndex);

    const handlePrev = () => {
        if (currentIndex <= 0) {
            return;
        }
        setCurrentIndex(currentIndex - 1);
    };

    console.log(story)
    const handleNext = () => {
        if (currentIndex >= maxIndex) {
            return;
        }
        setCurrentIndex(currentIndex + 1);
    };

    const SceneDisplay: React.FC = () => (
        <View style={carouselStyles.itemContainer}>
            <TouchableOpacity onPress={handlePrev}>
                <Image
                source={require("../../assets/chevron_left.png")}
                style={{ width: 30, height: 30, margin: 10 }}
                />
            </TouchableOpacity>
            <Text style={[common.text, {textAlign: 'center'}]}>{story[currentIndex].scene.prompt}</Text>
            <TouchableOpacity 
            onPress={handleNext}
            style={[{alignSelf: 'flex-end'}]}>
            <Image
                source={require("../../assets/chevron_right.png")}
                style={{ width: 30, height: 30, margin: 10 }}
                />
            </TouchableOpacity>
        </View>
    );


    return (
        <View style={[{ marginTop: 10 }]}>
            <Text style={common.subtleText}>The story so far</Text>
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