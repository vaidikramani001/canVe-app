// utils/auth.js

// Function to set authentication token and user ID in local storage
export const setAuthToken = (token, userId) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', userId);
  };
  
  // Function to get authentication token from local storage
  export const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };
  
  // Function to get user ID from local storage
  export const getUserId = () => {
    return localStorage.getItem('userId');
  };
  
  // Function to remove authentication token and user ID from local storage
  export const removeAuthToken = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
  };
  