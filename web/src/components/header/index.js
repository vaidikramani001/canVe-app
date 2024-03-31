import React from 'react';
import { gql, useQuery } from "@apollo/client";
import { getAuthToken } from "../../utils/auth";
import { jwtDecode } from "jwt-decode";

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
const Header = () => {
    const userToken = getAuthToken();
    const decode = jwtDecode(userToken)
    const { loading, error, data } = useQuery(userBymail, {
        variables: {
            data: { email: decode.username },
        },
    });

    const user = data?.user;
    return (
        <div style={{ marginLeft: '300px', width: '70%' }}>
            <header className=" p-4 flex justify-between items-center " >
                <div className="text-gray-800 text-lg font-bold pl-12">Welcome {user?.username}!</div>
                <div className="flex items-center space-x-4 shadow-lg  shadow-blue-200 p-3 rounded-lg   ">
                    {user && (
                        <div className="flex items-center gap-4">
                            <img
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                                alt={user.username}
                                className="inline-block h-12 w-12 rounded-full border-4 border-white"
                            />
                            <div className="flex flex-col justify-center">
                                <h5 className="text-lg font-bold">{user?.username}</h5>
                                <p className="text-md font-light">{user?.email}</p>
                            </div>
                        </div>
                    )}
                </div>
            </header>
        </div>
    );
};

export default Header;
