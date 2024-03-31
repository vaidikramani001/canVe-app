// import { gql, useQuery } from "@apollo/client";
// import React from "react";
// import { getAuthToken } from "../../utils/auth";
// import { jwtDecode } from "jwt-decode";

// const userBymail = gql`
//   query user($data:UpdateUserInput!){
//   user(data:$data){
//     id
//     email
//     phone_number
//     username
//   }
// }
// `;

// const UserDetail = (props) => {
//     const userToken = getAuthToken();
//     const decode = jwtDecode(userToken)
//     const { loading, error, data } = useQuery(userBymail, {
//         variables: {
//             data: { email: decode.username },
//         },
//     });

//     const user = data?.user;

//     return (
//         <React.Fragment>
//             <div className="flex justify-end ">
//                 <div className="p-2 m-2 rounded-lg shadow-lg text-black  shadow-white ">
//                     <div className="flex flex-col gap-4 ">
//                         <div className="relative flex items-center gap-4 overflow-hidden">
//                             <img
//                                 src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
//                                 alt="Tania Andrew"
//                                 className="inline-block h-12 w-12 rounded-full border-4 border-white"
//                             />
//                             <div className="flex flex-col justify-center">
//                                 <h5 className="text-lg font-bold   "> {user?.username}</h5>
//                                 <p className="text-md font-light  ">{user?.email}</p>
//                             </div>
//                         </div>

//                     </div>
//                 </div>

//             </div>
//             <div className="text-white text-lg font-bold">Welcome</div>
//         </React.Fragment>

//     )
// };

// export default UserDetail;
