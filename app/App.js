/* eslint-disable react/react-in-jsx-scope */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import AddDoc from './src/screens/AddDoc'
import ResetPasswordScreen from './src/screens/ResetScreen'
import RegisterScreen from './src/screens/RegisterScreen'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import MyDocs from './src/screens/MyDoc'; 
import client from './apollo';

const Stack = createNativeStackNavigator();
// const client = new ApolloClient({
//   uri: 'https://c7ff-2409-40c1-5a-3f84-3918-ab1f-eb20-f058.ngrok-free.app/graphql',
//   cache: new InMemoryCache()
// });
export default function App() {
  return (
    <ApolloProvider client={client}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                contentStyle: {
                  backgroundColor: '#FFFFFF',
                },
                headerStyle: {
                  backgroundColor: '#d8d8d8', //Set Header color
                },
                headerTintColor: 'black',
              }}>
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                 headerShown : false
                  
                }}
              />
              <Stack.Screen name="AddDoc" component={AddDoc} />
              <Stack.Screen name="MyDocs" component={MyDocs} />
            </Stack.Navigator>
          </NavigationContainer>
          </ApolloProvider>
  );
}
