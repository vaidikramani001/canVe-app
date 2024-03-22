import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Optional: Set background color
  },
  centerContainer: {
    textAlign: 'center', // Not applicable in React Native, so we'll center text using alignItems
    alignItems: 'center',
  },
  titleContainer: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputBox: {
    padding: 8,
    width: 200,
    borderWidth: 1,
    borderColor: '#000000', // Add border color
    borderRadius: 5,
    marginBottom: 10,
  },
  inputButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    color: '#ffffff',
    borderRadius: 5,
    marginBottom: 10,
  },
  errorLabel: {
    color: 'red',
  },
});

export default styles;
