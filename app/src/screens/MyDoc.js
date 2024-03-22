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
  }
}
`;

const MyDocs = (props) => {
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
      <>
          <View >
              {/* <View>
                  <View style={{ alignItems: 'center', paddingTop: 16 }}>
                      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>Your Documents Anytime, Anywhere</Text>
                      <Text style={{ marginTop: 4, fontSize: 18, color: '#666' }}>Explore our collection of documents to find what you need.</Text>
                  </View>
              </View> */}
              {/* <View>My Documents</View> */}
              <FlatList
                  data={docs}
                  renderItem={({ item }) => (
                      <View style={{ paddingVertical: 5 }}>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                              <View style={{ flexDirection: 'row', minWidth: 0, marginRight: 12 }}>
                                  {/* <Image style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#eee' }} source={require('./path/to/your/doc')} /> */}
                                  <View style={{ minWidth: 0 }}>
                                      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>{item.doc_type}</Text>
                                      <Text style={{ marginTop: 2, fontSize: 12, color: '#666' }}>Document Number: {item.doc_number}</Text>
                                  </View>
                              </View>
                              <View style={{ alignItems: 'flex-end' }}>
                                  <Text style={{ fontSize: 14, color: '#333' }}>{item.department}</Text>
                                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                      <View style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: 'rgba(46, 204, 113, 0.2)', marginRight: 3 }} />
                                      <Text style={{ fontSize: 12, color: '#666' }}>{item.doc_status}</Text>
                                  </View>
                              </View>
                          </View>
                      </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
              />
          </View>
      </>
  )}
    export default MyDocs