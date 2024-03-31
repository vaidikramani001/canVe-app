import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { setAuthToken } from '../utils/auth';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';

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

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
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
        // Handle errors if any
        setIsError(true);
        console.error('Registration failed:', data.register.errors);
      } else {
        // Registration successful 
        navigate('/'); // Navigate to the homepage upon successful registration
      }
    } catch (error) {
      setIsError(true);
      console.error('Error during registration:', error);
    }
  };
  ;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
        <div className="text-center text-xl font-bold mb-4">
          {isError ? 'Registration Failed!' : 'Register'}
        </div>
        <div className="mb-4">
          <input
            value={username}
            placeholder="Enter your username"
            onChange={(ev) => setUsername(ev.target.value)}
            className="w-full border rounded px-4 py-2"
          />
        </div>
        <div className="mb-4">
          <input
            value={email}
            placeholder="Enter your Email"
            onChange={(ev) => setEmail(ev.target.value)}
            className="w-full border rounded px-4 py-2"
            type="email"
          />
        </div>
        <div className="mb-4">
          <input
            value={password}
            placeholder="Enter your password"
            onChange={(ev) => setPassword(ev.target.value)}
            className="w-full border rounded px-4 py-2"
            type="password"
          />
        </div>
        <div className="text-center mb-4 text-blue-500 hover:text-blue-800">
          <a href="/">Already have an account?</a>
        </div>
        <div className="text-center">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
