import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signin = ({ onSignin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/user/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const res = await response.json();
        console.log(res);
        onSignin(res.user);
        localStorage.setItem('token', res.token);
        navigate("/");
    };

    return (
        <div className="pt-0 relative w-full min-h-screen bg-zinc-700/90 flex justify-center items-center">
            <div className="flex justify-center items-center w-full px-4">
                <form className="max-w-[400px] w-full bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSignin}>
                    <h2 className="text-4xl font-bold text-center py-6">Sign In</h2>
                    {/* Uncomment these if needed */}
                    {/* <div className="flex justify-between px-6 py-8">
                        <p className="border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center"><FaSpotify />Spotify</p>
                        <p className="border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center"><FaGithub />Github</p>
                    </div> */}
                    <div className="flex flex-col py-2 mb-4">
                        <label htmlFor="username" className="mb-2">Username:</label>
                        <input
                            className="border bg-gray-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col py-2 mb-4">
                        <label htmlFor="password" className="mb-2">Password:</label>
                        <input
                            className="border bg-gray-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="w-full py-3 mt-4 bg-gray-400 hover:bg-gray-300 rounded-lg text-white font-bold" type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default Signin;
