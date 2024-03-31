import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import doc from "../images/doc.png"
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
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
const Bookmark = gql`
  mutation bookmarked($documentId:Float!){
  toggleBookmark(documentId: $documentId) {
    id
    bookmarked
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
    const [BookmarkMutation] = useMutation(Bookmark);
    const bookmarking = async (id) => {
        try {
            const data = await BookmarkMutation({
                variables: {
                    documentId: id
                },
            });
        } catch (error) {
            console.error('Error during bookmark:', error);
        }
    };
    ;
    return (
      
        <View style={{ flex: 1, padding: 16  , backgroundColor : "#FCF9F8"}}>
            <View style={{ marginTop: 10,alignItems: 'center', marginBottom: 40, }}>
                <Text style={{fontSize: 32,fontWeight: 'bold',color: '#1F2937',}}>Documents</Text>
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
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={()=> bookmarking(item.id)}>
                <Image
                  style={{ width: 25, height: 25, backgroundColor: '#eee', marginRight: 10 }}
                  source={
                    item.bookmarked
                      ? require('../images/bookmark.png')
                      : require('../images/bookmarks.png')
                  }
                />
                </TouchableOpacity>
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
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      
  )}
    export default MyDocs