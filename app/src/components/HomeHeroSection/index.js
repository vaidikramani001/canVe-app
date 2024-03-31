import React from 'react';
import { Text, View } from 'react-native';
import OurService from '../OurService'
import UserDetailCard from '../UserDetailCard'
const HomeHeroSection = () => {
    return (
        <View>
            <UserDetailCard />
            <OurService />
            </View>
       
    );
}


export default HomeHeroSection;
