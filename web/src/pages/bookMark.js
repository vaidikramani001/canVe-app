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
    bookmarked
  }
}
`;

const BookMarkedDocs = (props) => {
    const userToken = getAuthToken();
    const decode = jwtDecode(userToken)
    const { loading, error, data } = useQuery(DocumentsByUserId, {
        variables: {
            data: { userId: decode.userId },
        },
    });
    const docs = data?.documentsByUserId;
console.log(data , "dTs");
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
            <div style={{ marginLeft: '350px', width: '70%' }}>
                <div>
                    <div className="text-center py-12 bg-gray-200 rounded">
                        <h1 className="text-4xl font-bold text-gray-900">Your Bookmarked Documents</h1>
                    </div>
                </div>
                {docs && docs.length > 0 && docs.filter(i => i.bookmarked === true).length > 0 ? (
                    <ul className="grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-6 items-start p-8  bg-gray-200 rounded mt-8 ">
                        {docs?.filter(i => i.bookmarked === true).map((i) => {
                            return (
                                <li className="relative flex flex-col sm:flex-row xl:flex-col items-start bg-gray-100 p-6 rounded-lg">
                                    <div className="order-1 sm:ml-6 xl:ml-0">
                                        <h3 className="mb-1 text-slate-900 font-semibold dark:text-slate-200 flex items-center">
                                            <span className="mb-1 block text-sm leading-6 text-indigo-500 mr-2">{i?.doc_type}</span>
                                            <div className="ml-auto flex items-center gap-x-1.5">
                                                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                                                </div>
                                                <p className="text-xs leading-5 text-gray-500">{i.doc_status}</p>
                                            </div>
                                            {/* Your {i?.doc_type} Document's Number is {i?.doc_number} */}
                                        </h3>
                                        <div className="prose prose-slate prose-sm text-slate-600 dark:prose-dark">
                                            <p className="document-info">
                                                <span className="block mb-2">Document Number: {i?.doc_number}</span>
                                                <span className="block">Department: {i?.department}</span>
                                            </p>
                                        </div>
                                        <button
                                            className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500 mt-6"
                                            // href={i?.doc_url}
                                            // download={i?.doc_url}
                                            onClick={() => { downloadImage(i?.doc_url, i?.doc_type) }}
                                        >
                                            Download
                                            {/* <span className="sr-only">
                                            , Completely unstyled, fully accessible UI components
                                        </span> */}
                                            <svg
                                                className="overflow-visible ml-3 text-slate-300 group-hover:text-slate-400 dark:text-slate-500 dark:group-hover:text-slate-400"
                                                width={3}
                                                height={6}
                                                viewBox="0 0 3 6"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M0 0L3 3L0 6" />
                                            </svg>
                                        </button>
                                    </div>
                                    <img
                                        src={i?.doc_url ? i?.doc_url : "https://tailwindcss.com/_next/static/media/headlessui@75.c1d50bc1.jpg"}
                                        alt=""
                                        className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full"
                                        width={1216}
                                        height={640}
                                    />
                                </li>
                            )
                        })
                        }
                    </ul>
                ) : (
                    <div className="text-center bg-gray-200 mt-4 rounded p-3  ">
                        <p className="text-xl text-gray-700">No bookmarks found</p>
                    </div>
                )}
            </div>
        </React.Fragment>
    )
};

export default BookMarkedDocs;
