import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { useMutation, gql } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';


const ResetMutation = gql`
   mutation resetpassword($data:PasswordResetInput!){
     resetPassword(data:$data){
      user{
        email
        id
        username
      }
      errors{
        message
        field
      }
    }
  }
`;

const ResetScreen = () => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('ResetPassword');
  const navigation = useNavigation();
  const [resetMutation] = useMutation(ResetMutation);
  const handleReset = async () => {
    try {
       await resetMutation({
        variables: {
          data: {
            email: email,
            currentPassword: currentPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
          },
        },
      });
     
        // Registration successful
        navigation.navigate('LoginScreen'); // Navigate to the homepage upon successful registration
      
    } catch (error) {
      console.error('Error during Reset Password:', error);
      
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.centerContainer}>
        <View style={styles.titleContainer}>
          <Text>{errorMessage}</Text>
        </View>
        <TextInput
          value={email}
          placeholder="Enter your email here"
          onChangeText={(text) => setEmail(text)}
          style={styles.inputBox}
        />
        <TextInput
          value={currentPassword}
          placeholder="Enter your currentpassword here"
          onChangeText={(text) => setCurrentPassword(text)}
          style={styles.inputBox}
        />
        <TextInput
          value={newPassword}
          placeholder="Enter your new password here"
          onChangeText={(text) => setNewPassword(text)}
          style={styles.inputBox}
        />
         <TextInput
          value={confirmPassword}
          placeholder="Enter your confirm password here"
          onChangeText={(text) => setConfirmPassword(text)}
          style={styles.inputBox}
        />
        <TouchableOpacity onPress={handleReset} style={styles.inputButton}>
          <Text>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ResetScreen;
