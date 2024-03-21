import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { setAuthToken } from '../utils/auth';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


const RegisterMutation = gql`
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

const ResetPassword = () => {
  const[email , setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage , setErrorMessage]= useState("")
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const [registerMutation] = useMutation(RegisterMutation);

  const handleReset = async () => {
    try {
      const { data } = await registerMutation({
        variables: {
          data: {
            email: email,
            currentPassword: currentPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
          },
        },
      });
      if (data.resetPassword.errors && data.resetPassword.errors.length > 0) {
        // Handle errors if any
        setErrorMessage(data.resetPassword.errors[0].message)
        setTimeout(() => {
          setIsError(true)
        }, 2000); 
        // setIsError(true);
        // console.error('ResetPassword failed:', data.resetpassword.errors);
      } else {  
        navigate('/'); // Navigate to the homepage upon successful registration
      }
    } catch (error) {
      setIsError(true);
      console.error('Error during: ResetPassword', error);
    }
  };
  ;
useEffect(()=>{
setTimeout(() => {
  setErrorMessage('')
}, 2000);
}, [isError === false])
  return (
    <div class="mainContainer flex justify-center items-center h-screen">
    <div class="centerContainer bg-white p-8 rounded-lg shadow-lg">
      <div class="titleContainer mb-4">
        <div class="font-bold text-xl">{isError ? 'ResetPassword Failed!' : 'ResetPassword'}</div>
      </div>
      <div>
        {errorMessage}
      </div>
      <div class="inputContainer mb-4">
        <input
          value={email}
          placeholder="Enter your Email"
          onChange={(ev) => setEmail(ev.target.value)}
          class="inputBox w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          type="email"
        />
      </div>
      <div class="inputContainer mb-4">
        <input
          value={currentPassword}
          placeholder="Enter your currentpassword"
          onChange={(ev) => setCurrentPassword(ev.target.value)}
          class="inputBox w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          type="password"
        />
      </div>
      <div class="inputContainer mb-4">
        <input
          value={newPassword}
          placeholder="Enter your newpassword"
          onChange={(ev) => setNewPassword(ev.target.value)}
          class="inputBox w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          type="password"
        />
      </div>
      <div class="inputContainer mb-4">
        <input
          value={confirmPassword}
          placeholder="Enter your confirmpassword"
          onChange={(ev) => setConfirmPassword(ev.target.value)}
          class="inputBox w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          type="password"
        />
      </div>
      <div class="mb-4">
        <a href='/' class="text-blue-500">Already have account?</a>
      </div>
      <div class="inputContainer">
        <input
          class="inputButton w-full px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600"
          type="button"
          onClick={handleReset}
          value={'Reset'}
        />
      </div>
    </div>
  </div>
  
  );
};

export default ResetPassword;
