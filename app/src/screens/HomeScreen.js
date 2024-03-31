import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View, SafeAreaView, StyleSheet } from 'react-native';
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
      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 7 }}>
          <TouchableOpacity onPress={()=>{navigation.navigate('MyDocs')}} style={{ backgroundcolor : "blue"}}>
              <Text style={{fontSize: 30}}>📘</Text>
          </TouchableOpacity>
          <TouchableOpacity >
              <Text style={{fontSize: 30}}>🔓</Text>
          </TouchableOpacity>
      </View> */}
      <HomeHeroSection />
      <View style={styles.titleContainer}>
                <Text style={styles.title}>Documents</Text>
       </View>
       <View style={styles.sectionContainer}>
                <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('My Documents')}>
                    <Text style={styles.sectionText}>My Documents</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('My Bookmarks')}>
                    <Text style={styles.sectionText}>BookMarks Documents</Text>
                </TouchableOpacity>
            </View>
  </View>
);
};
const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 60,
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
},
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#00A08B',
    marginHorizontal: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 4,
},
sectionText: {
    fontSize: 12,
    color: '#fff',
    textTransform: 'uppercase',
},
 })
export default HomeScreen;
