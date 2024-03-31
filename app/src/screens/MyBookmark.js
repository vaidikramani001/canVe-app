import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import doc from "../images/doc.png"
import { View, Text, Image, FlatList } from 'react-native';
import { getUserId } from "../utils/auth";

const DocumentsByUserId = gql`
  query DocumentsByUserId($data:FindDocumentByUserInput!){
  documentsByUserId(data:$data){
    doc_type
    doc_number
    department
    doc_url
    id
    doc_status
    bookmarked
  }
}
`;

const MyBookmark = (props) => {
    const [User , setUser] = useState()
    
    const handleToken = async () => {
   
     let users = await getUserId()
     setUser(users)
   
 };
 
 useEffect(() => {
   handleToken();
 }, []);
    const { loading, error, data } = useQuery(DocumentsByUserId, {
        variables: {
            data: { userId: User?.userId },
        },
    });
    const docs = data?.documentsByUserId;

return (
      
    <View style={{ flex: 1, padding: 16  , backgroundColor : "#FCF9F8"}}>
        <View style={{ marginTop: 10,alignItems: 'center', marginBottom: 40, }}>
            <Text style={{fontSize: 32,fontWeight: 'bold',color: '#1F2937',}}>Bookmarks</Text>
   </View>
    <FlatList
      data={docs}
      renderItem={({ item, index }) => (
        <View
          style={{
            paddingVertical: 12,
            borderBottomColor: '#ddd',
            borderBottomWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
         {item.bookmarked === true && <View><View style={{ flexDirection: 'row', alignItems: 'center' }}>
           
            <View>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>
                {item.doc_type}
              </Text>
              <Text style={{ marginTop: 2, fontSize: 12, color: '#666' }}>
                Document Number: {item.doc_number}
              </Text>
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 14, color: '#333' }}>{item.department}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 2,
              }}
            >
           <View
               
              />
             
            </View>
          </View> </View>}
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  </View>
  
)}
    export default MyBookmark