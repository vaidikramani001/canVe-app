import React from "react";
import Sidebar from "../components/sidebar";
import { getAuthToken } from "../utils/auth";
import { jwtDecode } from "jwt-decode";
import { gql, useQuery } from "@apollo/client";

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
  }
}
`;

const DownloadDocs = (props) => {
    const userToken = getAuthToken();
    const decode = jwtDecode(userToken)
    const { loading, error, data } = useQuery(DocumentsByUserId, {
        variables: {
            data: { userId: decode.userId },
        },
    });
    const docs = data?.documentsByUserId;

    async function downloadImage(URL, Name) {
        try {
            const imageUrl = URL;
            const response = await fetch(imageUrl);

            if (!response.ok) {
                throw new Error('Failed to download image');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = Name; // Specify the filename here
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    }



    return (
        <React.Fragment>
            <Sidebar />
            <Header />
            <div style={{ display: 'flex', alignItems: 'flex-start', marginLeft: '350px', width: '70%' }}>
                <div >
                    <div className="text-center py-12 bg-gray-200">
                        <h1 className="text-4xl font-bold text-gray-900">Document wallet to Empower Citizens</h1>
                        <p className="text-lg text-gray-600 mt-4 ">CanVe aims at Digital Empowerment of the citizen by providing access to authentic digital documents to the citizen's digital document wallet.</p>
                    </div>
                    <div className="flex justify-between mt-8">
                        <div className="w-3/1 p-4 bg-gray-200 rounded-md ml-4 item-center justify-center">
                            {docs && docs.length > 0 ? (
                                <ul className="grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
                                    {docs.map((i) => {
                                        return (
                                            <li key={i.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start rounded-lg overflow-hidden bg-white shadow-lg">
                                                <img
                                                    src={i?.doc_url ? i?.doc_url : "https://tailwindcss.com/_next/static/media/headlessui@75.c1d50bc1.jpg"}
                                                    alt=""
                                                    className="w-full sm:w-[17rem] xl:w-full object-cover"
                                                />
                                                <div className="p-6 gap-2 flex flex-col justify-between">
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-indigo-500 mb-2 ">{i?.doc_type}</h3>
                                                        <p className="text-sm text-gray-600 mb-4">{i.doc_status}</p>
                                                        <p className="text-xs text-gray-500 mb-2">Document Number: {i?.doc_number}</p>
                                                        <p className="text-xs text-gray-500">Department: {i?.department}</p>
                                                    </div>
                                                    <button
                                                        className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                                        onClick={() => { downloadImage(i?.doc_url, i?.doc_type) }}
                                                    >
                                                        Download
                                                    </button>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            ) : (
                                <div className="flex justify-center items-center h-full">
                                    <h2 className="text-2xl font-semibold text-gray-900">Documents not found</h2>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );


};

export default DownloadDocs;
