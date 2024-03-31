import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const OurServices = () => {
    const navigation = useNavigation();
    return (
        <View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Our Services</Text>
            </View>

            <View style={styles.sectionContainer}>
                <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('AddDoc')}>
                    <Text style={styles.sectionText}>TRAVELER DEPARTMENT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('AddDoc')}>
                    <Text style={styles.sectionText}>BUSINESSES DEPARTMENT</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.sectionContainer}>
                <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('AddDoc')}>
                    <Text style={styles.sectionText}>PROFESSIONAL SERVICES</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('AddDoc')}>
                    <Text style={styles.sectionText}>CANADIAN CITIZEN</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.sectionContainer}>
                <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('AddDoc')}>
                    <Text style={styles.sectionText}>STUDENT DEPARTMENT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('AddDoc')}>
                    <Text style={styles.sectionText}>HEALTH DEPARTMENT</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.sectionContainer}>
            <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('AddDoc')}>
                <Text style={styles.sectionText}>ENVIROMENTALIST</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white', 
    },
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
});

export default OurServices;
