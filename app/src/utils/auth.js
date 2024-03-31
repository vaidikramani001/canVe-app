import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'base64-js';

export const setAuthToken = async (token) => {
  try {
    await AsyncStorage.setItem('authToken', token);
  } catch (error) {
    console.error('Error setting auth token:', error);
  }
};

export const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem('authToken');
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

export const getUserId = async () => {
  try {
    const userToken = await AsyncStorage.getItem('authToken');
    const parts = userToken.split('.');
    const encodedPayload = parts[1];
    const decodedPayload = base64.toByteArray(encodedPayload)
    const decodedPayloadString = String.fromCharCode.apply(null, decodedPayload);
    const payloadData = JSON.parse(decodedPayloadString);
    return payloadData
  } catch (error) {
    console.error('Error getting user ID:', error);
    return null;
  }
};

// Function to remove authentication token and user ID from AsyncStorage
export const removeAuthToken = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userId');
  } catch (error) {
    console.error('Error removing auth token:', error);
  }
};
