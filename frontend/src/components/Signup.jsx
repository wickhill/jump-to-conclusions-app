import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
const backendUrl = import.meta.env.VITE_APP_CLIENT_BACKEND_URL;

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useContext(UserContext);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch(`${backendUrl}/user/signup`, {
            // const response = await fetch('http://localhost:3000/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    username,
                    password
                })
            });
            const res = await response.json();
            if (response.ok) {
                setUser({ ...res.user, token: res.token });  // Include token in user object
                localStorage.setItem('token', res.token);
                navigate("/");
            } else {
                setError(res.msg || 'Failed to sign up');
            }
        } catch (error) {
            console.error('Error signing up:', error);
            setError('Failed to sign up');
        }
    };

    return (
        <div className="pt-0 relative w-full min-h-screen bg-zinc-700/90 flex justify-center items-center">
            <div className="flex justify-center items-center w-full px-20">
                <form className="max-w-[400px] w-full bg-black p-8 rounded-lg shadow-lg" onSubmit={handleSignup}>
                    <h2 className="text-4xl font-bold text-center py-6">Sign Up</h2>
                    <div className="flex flex-col py-2 mb-4">
                        <label htmlFor="username" className="mb-2">Username:</label>
                        <input
                            className="border bg-black-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black-300"
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col py-2 mb-4">
                        <label htmlFor="email" className="mb-2">Email:</label>
                        <input
                            className="border bg-black-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black-300"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col py-2 mb-4">
                        <label htmlFor="password" className="mb-2">Password:</label>
                        <input
                            className="border bg-black-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black-300"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="w-full py-3 mt-4 bg-black-300 hover:bg-black-300 rounded-lg text-white font-bold" type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
