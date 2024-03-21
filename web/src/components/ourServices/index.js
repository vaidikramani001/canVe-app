import React from "react";
import Transport from '../../images/Transport.png';
import citizen from '../../images/citizenship.png';
import health from '../../images/health.png';
import passport from '../../images/passport.png';
import  student from '../../images/student.png';
import PROFESSIONAL from '../../images/Professional.jpg';
import env from '../../images/env.jpg';

const OurServices = ( ) => {
    return (
        <React.Fragment>
            <h2>Our Services </h2>
            {/* sec 1 */}
            <div className="pt-0 pb-8 mx-0 mt-4 overflow-hidden text-gray-700 bg-transparent rounded-xl bg-clip-border grid grid-cols-3 gap-3">
                <a href="/add-doc">
                    <div className="bg-white rounded-xl p-4 flex items-center shadow-md">
                        <img
                            src={Transport}
                            alt="Traveller"
                            className="h-16 w-16 rounded-full object-cover object-center" />
                        <span className="ml-4 text-lg font-semibold">TRAVELER DEPARTMENT</span>
                    </div>
                </a>
                <a href="/add-doc">
                    <div className="bg-white rounded-xl p-4 flex items-center shadow-md">
                        <img
                            src={passport}
                            alt="Tania Andrew"
                            className="h-16 w-16 rounded-full object-cover object-center" />
                        <span className="ml-4 text-lg font-semibold">BUSINESSES DEPARTMENT</span>
                    </div>
                </a>
                <a href="/add-doc">
                    <div className="bg-white rounded-xl p-4 flex items-center shadow-md">
                        <img
                        src={PROFESSIONAL}
                            alt="Tania Andrew"
                            className="h-16 w-16 rounded-full object-cover object-center" />
                        <span className="ml-4 text-lg font-semibold">PROFESSIONAL SERVICES</span>
                    </div>
                </a>
                <a href="/add-doc">
                    <div className="bg-white rounded-xl p-4 flex items-center shadow-md">
                        <img
                            src={student}
                            alt="student+department"
                            className="h-16 w-16 rounded-full object-cover object-center" />
                        <span className="ml-4 text-lg font-semibold">STUDENT DEPARTMENT</span>
                    </div>
                </a>
                <a href="/add-doc">
                    <div className="bg-white rounded-xl p-4 flex items-center shadow-md">
                        <img
                          src={citizen}
                          alt="not found"
                            className="h-16 w-16 rounded-full object-cover object-center" />
                        <span className="ml-4 text-lg font-semibold">CANADIAN CITIZEN</span>
                    </div>
                </a>
                <a href="/add-doc">
                    <div className="bg-white rounded-xl p-4 flex items-center shadow-md">
                        <img
                           src={health}
                           alt="health"
                            className="h-16 w-16 rounded-full object-cover object-center" />
                        <span className="ml-4 text-lg font-semibold">HEALTHCARE DEPARTMENT</span>
                    </div>
                </a>
                <a href="/add-doc">
                    <div className="bg-white rounded-xl p-4 flex items-center shadow-md">
                        <img
                             src={env}
                             alt="env"
                            className="h-16 w-16 rounded-full object-cover object-center" />
                        <span className="ml-4 text-lg font-semibold">ENVIRONMENT DEPARTMENT</span>
                    </div>
                </a>
            </div>
        </React.Fragment>
    )
};

export default OurServices;
