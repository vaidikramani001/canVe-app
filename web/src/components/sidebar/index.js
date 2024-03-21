import React, { useState } from "react";
import arrow from "../../images/Arrow.png"
import doc from "../../images/doc.png"
import { removeAuthToken } from "../../utils/auth";
import { useNavigate } from "react-router";

const Sidebar = (props) => {
    const [isOpen, setisOpen] = useState(true);
    const [isArrowRotated, setIsArrowRotated] = useState(false);

    const toggleSideBar = () => {
        setisOpen(!isOpen);
        setIsArrowRotated(!isArrowRotated);
    };

    const navigate = useNavigate();
    const handleLogOut = () => {
        removeAuthToken();
        navigate('/');
    };

    return (
        <React.Fragment>
            <div>
                <>
                    <span
                        className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
                        onclick="openSidebar()"
                    >
                        <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md" />
                    </span>
                    <div className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900">
                        <div className="text-gray-100 text-xl">
                            <div className="p-2.5 mt-1 flex items-center">
                                <img src={doc} height={50} width={50} alt="dropdown" />
                                <h1 className="font-bold text-gray-200 text-[15px] ml-3">
                                    CanVe
                                </h1>
                                <i
                                    className="bi bi-x cursor-pointer ml-28 lg:hidden"
                                    onclick="openSidebar()"
                                />
                            </div>
                            <div className="my-2 bg-gray-600 h-[1px]" />
                        </div>
                        {/* <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
                            <i className="bi bi-search text-sm" />
                            <input
                                type="text"
                                placeholder="Search"
                                className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
                            />
                        </div> */}

                        <a href="/home">
                            <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
                                <i className="bi bi-house-door-fill" />
                                <span className="text-[15px] ml-4 text-gray-200 font-bold">Home</span>
                            </div>
                        </a>

                        <a href="/mydocs">
                            <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
                                <i className="bi bi-bookmark-fill" />
                                <span className="text-[15px] ml-4 text-gray-200 font-bold">My Documents</span>
                            </div>
                        </a>
                        <div className="my-4 bg-gray-600 h-[1px]" />

                        <div
                            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                            onClick={() => toggleSideBar()}
                        >

                            <i className="bi bi-chat-left-text-fill" />
                            <div className="flex justify-between w-full items-center">
                                <span className="text-[15px] ml-4 text-gray-200 font-bold">
                                    Other
                                </span>
                                <span className={`text-sm ${isArrowRotated ? 'rotate-180' : ''}`} id="arrow">
                                    <img src={arrow} height={15} width={15} alt="dropdown" />
                                </span>
                            </div>
                        </div>
                        {isOpen ?
                            <div
                                className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold"
                                id="submenu"
                            >
                                {/* <a href="/add-doc">
                                    <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
                                        Add Document
                                    </h1>
                                </a> */}
                                {/* <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
                                    Bookmark
                                </h1> */}
                                <a href="/download-doc">
                                    <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
                                        Download Documents
                                    </h1>
                                </a>
                            </div>
                            :
                            <></>
                        }


                        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white" onClick={handleLogOut}>
                            <i className="bi bi-box-arrow-in-right" />
                            <span className="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
                        </div>
                    </div>
                </>

            </div>
        </React.Fragment>
    )
};

export default Sidebar;
