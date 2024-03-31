import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Login.css';
import { useMutation, gql } from '@apollo/client';
import { setAuthToken, getAuthToken } from '../utils/auth'; // Utility functions for managing tokens
import { jwtDecode } from 'jwt-decode';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const Login_mutation = gql`
  mutation login($data: LoginInput!) {
    login(data: $data) {
      accessToken
      errors {
        message
      }
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Login to Your account!")
  const navigate = useNavigate();

  const [signInMutation] = useMutation(Login_mutation);

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = () => {
    const userToken = getAuthToken();
    if (userToken) {
      const user = jwtDecode(userToken);
      if (typeof user.userId !== 'undefined') {
        navigate('/home');
      }
    }
  };

  const handleLogin = async () => {
    try {
      const { data } = await signInMutation({
        variables: {
          data: {
            email: email,
            password: password,
          },
        },
      });
      if (data.login.accessToken) {
        const token = data.login.accessToken;
        const userId = data.login.userId; // Assuming the user ID is returned by the login mutation
        setAuthToken(token, userId);
        navigate('/home');
      } else {
        setIsError(true)
        setErrorMessage(data.login.errors[0].message)
      }
    } catch (error) {
      setIsError(true);
      console.error('Error logging in:', error);
    }
  };
  ;


  return (
    <div className="flex justify-center items-center h-screen ">

      <div className="  shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-gray-100">
        <h2 className="text-xl mb-4">{errorMessage} </h2>
        <div className="mb-4">
          <input
            value={email}
            placeholder="Enter your email here"
            onChange={(ev) => setEmail(ev.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <input
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
          />
        </div>
        <div className="flex flex-col">
          <div className="mb-4">
            <a className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800" href="/reset-password">
              Reset Password
            </a>
          </div>
          <div>
            <a className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800" href="/register">
              Register your account?
            </a>
          </div>
        </div>
        <div className="mt-4">
          <input
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline cursor-pointer"
            type="button"
            onClick={handleLogin}
            value={'Log in'}
          />
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};


export default Login;
