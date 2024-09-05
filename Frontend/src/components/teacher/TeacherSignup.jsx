import React, { useState } from 'react';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';
// import Navbar from './navbar';

const TeacherSignup = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [role, setRole] = useState('teacher'); // 'student' or 'teacher'

    const handleLogin = (data) => {
        console.log(`${role} Login Data:, data`);
    };

    const handleSignup = (data) => {
        console.log(`${role} Signup Data:, data`);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* <Navbar setIsLogin={setIsLogin} setRole={setRole} /> */}
            <div className="flex items-center justify-center pt-12">
                <div className="max-w-xl w-full">
                    {isLogin ? (
                        <LoginForm onLogin={handleLogin} role={role} />
                    ) : (
                        <SignupForm onSignup={handleSignup} role={role} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeacherSignup;