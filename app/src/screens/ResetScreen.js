import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { useMutation, gql } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';

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
      const { data } = await resetMutation({
        variables: {
          data: {
            email: email,
            currentPassword: currentPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
          },
        },
      });

      if (data.resetPassword.errors) {
        setErrorMessage('ResetPassword');
        Alert.alert('Error', data.resetPassword.errors[0].message);
      } else {
        // Registration successful
        navigation.navigate('LoginScreen'); // Navigate to the homepage upon successful registration
      }
    } catch (error) {
      console.error('Error during Reset Password:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.centeredContent}>
        <View style={styles.content}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcome}>Reset your password</Text>
            <Text style={styles.subtitle}>Enter your new password here!</Text>
          </View>
          <View style={styles.form}>
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
              value={currentPassword}
              placeholder="Current Password"
              onChangeText={(text) => setCurrentPassword(text)}
              style={styles.input}
              secureTextEntry={true}
              autoCapitalize="none"
              textContentType="password"
            />
            <TextInput
              value={newPassword}
              placeholder="New Password"
              onChangeText={(text) => setNewPassword(text)}
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
            <TouchableOpacity style={styles.button} onPress={handleReset}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.links}>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.link}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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

export default ResetScreen;