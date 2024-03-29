import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { getAuthToken } from "../../utils/auth";
import { jwtDecode } from "jwt-decode";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const Verify_Document = gql`
 mutation VerifyDocument($data: String!, $userId: Float!) {
  verifyDocument(data: $data, userId: $userId)
}
`;

const AddDocForm = (props) => {
  const [DocNumber, setDocNumber] = useState('');
  const [message, setMessage] = useState('');
  const [verifyDocMutation] = useMutation(Verify_Document);
  const userToken = getAuthToken();
  const decode = jwtDecode(userToken)

  const handleSubmit = async () => {
    let data;
    try {
      data = await verifyDocMutation({
        variables: {
          data: DocNumber,
          userId: decode.userId,
        },
      });
      toast(data?.data?.verifyDocument)

    } catch (error) {
      // toast.error('Error verifying document');
      console.error('Error logging in:', error);
    }
  };
  ;

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md mt-32 border border-gray-300">
        {message}
        <div className="mb-4">
          <label htmlFor="document-number" className="block text-gray-700 text-sm font-bold mb-2">Enter Document Number:</label>
          <input
            type="text"
            value={DocNumber}
            placeholder="Enter your document number"
            onChange={(e) => setDocNumber(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="flex items-center justify-between">
          <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddDocForm;
