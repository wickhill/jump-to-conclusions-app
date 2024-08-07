import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const backendUrl = import.meta.env.VITE_APP_CLIENT_BACKEND_URL;

const History = ({ user }) => {
    const { id } = useParams();
    const [history, setHistory] = useState([]);
    const [achievementsData, setAchievementsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${backendUrl}/user/achievementsData`);
                const data = await response.json();
                setAchievementsData(data);
            } catch (error) {
                console.error("Error fetching achievements data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch(`${backendUrl}/user/${id}/history`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch history');
                }
                const data = await response.json();
                setHistory(data.history);
            } catch (error) {
                console.error('Error fetching history:', error);
            }
        };

        fetchHistory();
    }, [id]);

    return (
        <div id="content" className="p-1 text-center">
            <div className="history-text text-base jersey-15-regular mt-16 mb-1" style={{ marginBottom: '0px', marginTop: '120px' }}>
            <h1>User History:</h1>
            </div>
            <div className="history-text" style={{ marginBottom: '-30px', marginTop: '15px' }}>
                {history.length > 0 ? (
                    history.map((entry, index) => {
                        const conclusion = achievementsData.find(ach => ach.name === entry.conclusion);
                        return (
                            <div key={index} className="history-entry">
                                <span className="history-text text-3xl jersey-15-regular mt-16 mb-1"><p>Question: <span className='text-blue-500'>{entry.question}</span></p></span>
                                <span className="history-text text-3xl jersey-15-regular mt-16 mb-1"><p>Conclusion: <span className='text-green-500'>{conclusion ? conclusion.answer : 'Unknown'}</span></p></span>
                            </div>
                        );
                    })
                ) : (
                    <p>No history available</p>
                )}
            </div>
        </div>
    );
};

export default History;