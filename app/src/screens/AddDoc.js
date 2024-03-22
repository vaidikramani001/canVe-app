import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getUserId } from "../utils/auth";

const Verify_Document = gql`
 mutation VerifyDocument($data: String!, $userId: Float!) {
  verifyDocument(data: $data, userId: $userId)
}
`;

const AddDoc = (props) => {
  const [DocNumber, setDocNumber] = useState('');
  const [message, setMessage] = useState('');
  const [verifyDocMutation] = useMutation(Verify_Document);


  const handleSubmit = async () => {
    const user = await getUserId();
    let data
    try {
     data = await verifyDocMutation({
        variables: {
          data: DocNumber,
          userId: user.userId,
        },
      });
    } catch (error) {
      // setIsError(true);
      console.error('Error logging in:', error);
    }
  };
  ;
  return (
    <View style={styles.container}>
        <View style={styles.formContainer}>
            <Text style={styles.message}>{message}</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Enter Document Number:</Text>
                <TextInput
                    value={DocNumber}
                    placeholder="Enter your document number here"
                    onChangeText={setDocNumber}
                    style={styles.input}
                />
            </View>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
    </View>
);
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
formContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
},
message: {
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
},
inputContainer: {
    marginBottom: 20,
},
label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
},
input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 14,
},
button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
},
buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
},
});

export default AddDoc;