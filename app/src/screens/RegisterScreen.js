import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useMutation, gql } from '@apollo/client';
import { useNavigation } from '@react-navigation/native'; // Assuming you're using React Navigation for navigation
import styles from './styles';

const RegisterMutation = gql`
  mutation register($options: UsernamePassWordInput!) {
    register(options: $options) {
      user {
        username
      }
      errors {
        message
      }
    }
  }
`;

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const navigation = useNavigation();
  const [registerMutation] = useMutation(RegisterMutation);

  const handleRegister = async () => {
    try {
      const { data } = await registerMutation({
        variables: {
          options: {
            username: username,
            email: email,
            password: password,
          },
        },
      });

      if (data.register.errors) {
        setIsError(true);
        console.error('Registration failed:', data.register.errors);
      } else {
        navigation.navigate('LoginScreen'); // Navigate to the homepage upon successful registration
      }
    } catch (error) {
      setIsError(true);
      console.error('Error during registration:', error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.centerContainer}>
        <View style={styles.titleContainer}>
          <Text>{isError ? 'Registration Failed!' : 'Register'}</Text>
        </View>
        <TextInput
          value={username}
          placeholder="Enter your username here"
          onChangeText={(text) => setUsername(text)}
          style={styles.inputBox}
        />
        <TextInput
          value={email}
          placeholder="Enter your email here"
          onChangeText={(text) => setEmail(text)}
          style={styles.inputBox}
        />
        <TextInput
          value={password}
          placeholder="Enter your password here"
          onChangeText={(text) => setPassword(text)}
          style={styles.inputBox}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={handleRegister} style={styles.inputButton}>
          <Text>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text>Already have an account? Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
