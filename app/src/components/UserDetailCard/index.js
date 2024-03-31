import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getUserId } from "../../utils/auth";
import { Touchable } from "react-native";
import { useNavigation } from "@react-navigation/native";


const userBymail = gql`
  query user($data:UpdateUserInput!){
  user(data:$data){
    id
    email
    phone_number
    username
  }
}
`;


const UserDetail = () => {
  const navigation = useNavigation();

const [User , setUser] = useState()
     const handleToken = async () => {
    
      let users = await getUserId()
      setUser(users)
    
  };
  
  useEffect(() => {
    handleToken();
  }, []);
    const { loading, error, data } = useQuery(userBymail, {
        variables: {
            data: { email: User?.username },
        },
    });
    const user = data?.user;
     {/* <Text style={styles.username}>{user?.username}</Text>
                    <Text style={styles.email}>{user?.email}</Text> */}
                    return (
                      <View style={styles.userInfo}>
                        <View style={styles.userInfoText}>
                          <Text style={styles.username}>Welcome to Canve Mr.{user?.username}</Text>
                          <Text style={styles.email}>{user?.email}</Text>
                          <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('LoginScreen')}>
                            <Text style={styles.logoutText}>Log Out</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                    };
                    
                    const styles = StyleSheet.create({
                      userInfo: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 12,
                        paddingHorizontal: 16,
                        backgroundColor: '#fff',
                        borderRadius: 12,
                        shadowColor: '#000',
                        shadowOpacity: 0.12,
                        shadowRadius: 8,
                        elevation: 4,
                        justifyContent: 'space-between',
                        position: 'relative', 
                      },
                      userInfoText: {
                        flex: 1,
                        justifyContent: 'space-between',
                      },
                      userImage: {
                        width: 64,
                        height: 64,
                        borderRadius: 32,
                        marginRight: 16,
                      },
                      username: {
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#333',
                        marginBottom: 4,
                      },
                      email: {
                        fontSize: 16,
                        fontWeight: '400',
                        color: '#666',
                        marginBottom: 12,
                      },
                      logoutButton: {
                        backgroundColor: '#f04',
                        paddingVertical: 4,
                        paddingHorizontal: 10,
                        borderRadius: 4,
                        position: 'absolute', 
                        right: 16, 
                        top: 12, 
                      },
                      logoutText: {
                        color: '#fff',
                        fontWeight: 'bold',
                      },
                    });
                    
                    
                    export default UserDetail;
