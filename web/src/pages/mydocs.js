import React from "react";
import { getAuthToken } from "../utils/auth";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../components/sidebar";
import { gql, useQuery } from "@apollo/client";
import doc from "../images/doc.png"

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
    const userToken = getAuthToken();
    const decode = jwtDecode(userToken)
    const { loading, error, data } = useQuery(DocumentsByUserId, {
        variables: {
            data: { userId: decode.userId },
        },
    });
    const docs = data?.documentsByUserId;
    return (
        <React.Fragment>
            <Sidebar />
            <div style={{ marginLeft: '350px', width: '70%' }}>
                <div>
                    <div className="text-center py-16">
                        <h1 className="text-4xl font-bold text-gray-900">Your Documents Anytime, Anywhere</h1>
                        <p className="mt-4 text-lg text-gray-700">Explore our collection of documents to find what you need.</p>
                    </div>
                </div>
                {/* <div>My Documents</div> */}
                {
    docs && docs.length === 0 ? (
        <p className="justify-between border text-center shadow-lg">No documents</p>
    ) : (
        docs?.map((i) => (
            <ul key={i.doc_number}>
                <li className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={doc} alt="" />
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">{i.doc_type}</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">Document Number : {i.doc_number}</p>
                        </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">{i.department}</p>
                        <div class="mt-1 flex items-center gap-x-1.5">
                            <div class="flex-none rounded-full bg-emerald-500/20 p-1">
                                <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                            </div>
                            <p class="text-xs leading-5 text-gray-500">{i.doc_status}</p>
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
