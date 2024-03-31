import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import arrow from "../../images/Arrow.png";
import logo from "../../images/cvd.jpeg";
import { removeAuthToken } from "../../utils/auth";
import { useNavigate } from "react-router";
import { IoMdHome, IoIosArrowDown } from "react-icons/io";
import { IoDocumentsSharp, IoCloudDownloadSharp, IoBookmarksSharp, IoLogOut } from "react-icons/io5";

const Sidebar = (props) => {
    const [isOpen, setisOpen] = useState(true);
    const [isArrowRotated, setIsArrowRotated] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleSideBar = () => {
        setisOpen(!isOpen);
        setIsArrowRotated(!isArrowRotated);
    };

    const handleLogOut = () => {
        removeAuthToken();
        navigate("/");
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <React.Fragment>
            <div>
                <div className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center    shadow-lg p-3 pt-5  ">
                    <div className="text-black-400 text-xl flex items-center justify-start p-2.5 mt-1 ">
                        <div>
                            <img src={logo} height={100} width={100} alt="logo" />
                        </div>
                        <div className="my-2 bg-gray-600 h-[1px]" />
                    </div>
                    <div className="shadow-lg   rounded  ">

                        <NavLink to="/home" activeClassName="active">
                            <div className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer       ${isActive("/home") ? "bg-gray-800" : ""}`}>
                                <IoMdHome className={`mr-4    ${isActive("/home") ? "text-white" : "text-black"}`} />
                                <span className={`text-[15px] text-black font-bold   ${isActive("/home") ? "text-white" : "text-black"}`}>Home</span>
                            </div>
                        </NavLink>

                        <NavLink to="/mydocs" activeClassName="active">
                            <div className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer ${isActive("/mydocs") ? "bg-gray-800" : ""}`}>
                                <IoDocumentsSharp className={`mr-4 ${isActive("/mydocs") ? "text-white" : "text-black"}`} />
                                <span className={`text-[15px] text-black font-bold   ${isActive("/mydocs") ? "text-white" : "text-black"}`}>My Documents</span>
                            </div>
                        </NavLink>

                        <div className="my-4 bg-gray-600 h-[1px]" />

                        <div
                            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-800  hover:text-white"
                            onClick={() => toggleSideBar()}
                        >
                            <div className="flex justify-between w-full items-center">
                                <span className="text-[15px] ml-4   font-bold">Other</span>
                                <span className={`text-sm ${isArrowRotated ? 'rotate-180' : ''}`} id="arrow">
                                    {/* <img src={arrow} height={15} width={15} alt="dropdown" /> */}
                                    <IoIosArrowDown />
                                </span>
                            </div>
                        </div>
                        {isOpen ? (
                            <div className="text-left text-sm mt-2 w-4/5 mx-auto text-black font-bold " id="submenu">
                                <NavLink to="/download-doc" activeClassName="active ">
                                    <div className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer ${isActive("/download-doc") ? "bg-gray-800" : ""}`}>
                                        <IoCloudDownloadSharp className={`mr-4 ${isActive("/download-doc") ? "text-white" : "text-black"}`} />
                                        <h1 className={`cursor-pointer rounded-md mt-1 text-[15px] text-black font-bold  ${isActive("/download-doc") ? "text-white" : "text-black"}`}>
                                            Download Documents
                                        </h1>
                                    </div>
                                </NavLink>

                                <NavLink to="/bookmark" activeClassName="active">
                                    <div className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer ${isActive("/bookmark") ? "bg-gray-800" : ""}`}>
                                        <IoBookmarksSharp className={`mr-4 ${isActive("/bookmark") ? "text-white" : "text-black"}`} />
                                        <h1 className={`cursor-pointer rounded-md mt-1 text-[15px] text-black font-bold ${isActive("/bookmark") ? "text-white" : "text-black"}`}>
                                            Bookmarks Documents
                                        </h1>
                                    </div>
                                </NavLink>

                            </div>
                        ) : (
                            <></>
                        )}

                        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-800 hover:text-white  " onClick={handleLogOut}>
                            <IoLogOut />
                            <span className="text-[15px] ml-4 font-bold">Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
};

export default Sidebar;
