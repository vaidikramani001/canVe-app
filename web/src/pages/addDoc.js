import React from "react";
import { getAuthToken } from "../utils/auth"; 
import { jwtDecode } from "jwt-decode";
import Sidebar  from "../components/sidebar";
import AddDocForm from "../components/addDocForm";

const AddDoc = (props) => {
  const userToken = getAuthToken();
  const decode = jwtDecode(userToken)
  return (
    <React.Fragment> 
      <Sidebar />
      <div style={{ marginLeft: '350px', width: '70%' }}>
        <AddDocForm/>
      </div>
    </React.Fragment>
  );
};

export default AddDoc;
