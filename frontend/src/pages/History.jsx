import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import conclusionsData from '../conclusionsData';
// import achievementsData from '../achievementsData';
const backendUrl = import.meta.env.VITE_APP_CLIENT_BACKEND_URL;

const History = ({ user }) => {
    const { id } = useParams();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch(`${backendUrl}/user/${id}/history`, {
                // const response = await fetch(`http://localhost:3000/user/${id}/history`, {
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
            <h1>History:</h1>
            </div>
            <div className="history-text" style={{ marginBottom: '-30px', marginTop: '15px' }}>
                {history.length > 0 ? (
                    history.map((entry, index) => {
                        const conclusion = conclusionsData[entry.conclusion];
                        {/* const achievement = achievementsData.find(ach => ach.name === entry.conclusion); */}
                        return (
                            <div key={index} className="history-entry">
                                <span className="history-text text-lg jersey-15-regular mt-16 mb-1"><p>Question: {entry.question}</p></span>
                                <span className="history-text text-base jersey-15-regular mt-16 mb-1"><p>Conclusion: {conclusion ? conclusion.answer : 'Unknown'}</p></span>
                                {/* {achievement && <img src={achievement.image} alt={achievement.name} className="achievement-image" />} */}
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
