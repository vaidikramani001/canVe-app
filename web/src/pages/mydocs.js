import React from "react";
import { getAuthToken } from "../utils/auth";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../components/sidebar";
import { gql, useMutation, useQuery } from "@apollo/client";
import doc from "../images/doc.png"
import Header from "../components/header";

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

const Bookmark = gql`
  mutation bookmarked($documentId:Float!){
  toggleBookmark(documentId: $documentId) {
    id
    bookmarked
  }
}
`;

const MyDocs = (props) => {
    const userToken = getAuthToken();
    const decode = jwtDecode(userToken)
    const { loading, error, data } = useQuery(DocumentsByUserId, {
        variables: {
            data: { userId: decode.userId },
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
        <React.Fragment>
            <Sidebar />
            <Header />
            <div style={{ marginLeft: '350px', width: '70%' }}>
                <div >
                    <div className="text-center py-12  bg-gray-200 rounded ">
                        <h1 className="text-4xl font-bold  ">Your Documents Anytime, Anywhere</h1>
                        <p className="mt-4 text-lg  ">Explore our collection of documents to find what you need.</p>
                    </div>
                </div>
                {
                    docs && docs.length === 0 ? (
                        <p className="justify-between text-center shadow-lg bg-gray-200 rounded p-3   mt-3 text-black" >Documents not Found!</p>
                    ) : (
                        docs?.map((i) => (
                            <ul key={i.doc_number}>
                                <li className="flex justify-between gap-x-6 py-5 mt-5 border-b-4 border-black rounded-lg  bg-gray-200 p-3  ">
                                    <div className="flex min-w-0 gap-x-4   ">
                                        <div onClick={() => { bookmarking(i.id) }}>
                                            {
                                                i.bookmarked ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 ">
                                                        <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clip-rule="evenodd" />
                                                    </svg>
                                                    :
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                                    </svg>
                                            }
                                        </div>
                                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={doc} alt="" />
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm font-semibold leading-6 font-bold">{i.doc_type}</p>
                                            <p className="mt-1 truncate text-xs leading-5  text-black">Document Number : {i.doc_number}</p>
                                        </div>
                                    </div>
                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end  ">
                                        <p className="text-sm leading-6 text-gray-900">{i.department}</p>
                                        <div class="mt-1 flex items-center gap-x-1.5">
                                            <div class="flex-none rounded-full bg-emerald-500/20 p-1">
                                                <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                                            </div>
                                            <p class="text-xs leading-5 text-green-800 font-bold">{i.doc_status}</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        ))
                    )
                }

            </div>
        </React.Fragment>
    );
};

export default MyDocs;
