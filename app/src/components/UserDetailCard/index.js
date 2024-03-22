import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from 'react-native';
import { getUserId } from "../../utils/auth";


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
    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80' }}
                    style={styles.userImage}
                    resizeMode="cover"
                />
                <View style={styles.userInfoText}>
                    <Text style={styles.username}>{user?.username}</Text>
                    <Text style={styles.email}>{user?.email}</Text>
                </View>
            </View>
            {/* <View style={styles.testimonial}>
                <Text style={styles.testimonialText}>
                    "I found solution to all my design needs from Creative Tim. I use
                    them as a freelancer in my hobby projects for fun! And its really
                    affordable, very humble guys !!!"
                </Text>
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    userImage: {
        width: 58,
        height: 58,
        borderRadius: 29,
    },
    userInfoText: {
        marginLeft: 12,
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    email: {
        fontSize: 16,
        fontWeight: '300',
        color: '#333',
    },
    testimonial: {
        padding: 16,
    },
    testimonialText: {
        fontSize: 16,
        fontWeight: '300',
        color: '#333',
    },
});


export default UserDetail;
