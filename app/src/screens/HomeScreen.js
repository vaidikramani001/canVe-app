import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { getUserId, removeAuthToken } from '../utils/auth';
import {useTailwind} from 'tailwind-rn';
import HomeHeroSection from '../components/HomeHeroSection'
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';
const HomeScreen = () => {
    const navigation = useNavigation();

  const handleToken = async () => {
    try {
      const userId = await getUserId()
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };
  
  useEffect(() => {
    handleToken();
  }, []);
  const handleLogOut = () => {
    removeAuthToken();
    navigation.navigate('LoginScreen')
};
return ( 
  <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 7 }}>
          <TouchableOpacity onPress={()=>{navigation.navigate('MyDocs')}} style={{ backgroundcolor : "blue"}}>
              <Text style={{fontSize: 30}}>📘</Text>
          </TouchableOpacity>
          <TouchableOpacity >
              <Text style={{fontSize: 30}}>🔓</Text>
          </TouchableOpacity>
      </View>
      <HomeHeroSection />
  </View>
);
};

export default HomeScreen;
