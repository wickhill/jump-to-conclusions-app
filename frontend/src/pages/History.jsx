import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import conclusionsData from '../conclusionsData';
// import achievementsData from '../achievementsData';

const History = ({ user }) => {
    const { id } = useParams();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch(`http://localhost:3000/user/${id}/history`, {
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
            <h1>History:</h1>
            <div className="history-list">
                {history.length > 0 ? (
                    history.map((entry, index) => {
                        const conclusion = conclusionsData[entry.conclusion];
                        {/* const achievement = achievementsData.find(ach => ach.name === entry.conclusion); */}
                        return (
                            <div key={index} className="history-entry">
                                <p><strong>Question:</strong> {entry.question}</p>
                                <p><strong>Conclusion:</strong> {conclusion ? conclusion.answer : 'Unknown'}</p>
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
