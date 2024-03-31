import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import { useMutation, gql } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const navigation = useNavigation();
  const [registerMutation] = useMutation(RegisterMutation);

  const handleRegister = async () => {
    // navigation.navigate('LoginScreen');
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
        navigation.navigate('LoginScreen'); 
      }
    } catch (error) {
      setIsError(true);
      console.error('Error during registration:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.centeredContent}>
        <View style={styles.content}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcome}>Create a new account</Text>
            <Text style={styles.subtitle}>Sign up to continue!</Text>
          </View>
          <View style={styles.form}>
            <TextInput
              value={username}
              placeholder="Username"
              onChangeText={(text) => setUsername(text)}
              style={styles.input}
            />
            <TextInput
              value={email}
              placeholder="Email Address"
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
            />
            <TextInput
              value={password}
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
              secureTextEntry={true}
              autoCapitalize="none"
              textContentType="password"
            />
            <TextInput
              value={confirmPassword}
              placeholder="Confirm Password"
              onChangeText={(text) => setConfirmPassword(text)}
              style={styles.input}
              secureTextEntry={true}
              autoCapitalize="none"
              textContentType="password"
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.links}>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.link}>Already have an account? Login</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  centeredContent: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  welcomeSection: {
    marginBottom: 24,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563',
  },
  form: {
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#00A08B',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  links: {
    alignItems: 'center',
  },
  link: {
    fontSize: 16,
    color: '#00A08B',
    textDecorationLine: 'underline',
    marginBottom: 8,
  },
});

export default RegisterScreen;