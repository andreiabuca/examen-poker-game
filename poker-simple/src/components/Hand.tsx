import React from 'react';
import { Card } from './Card';

interface HandProps {
    isPlayer: boolean; // true for player hand, false for computer hand
    hand: Card[];
    isFaceDown: boolean;
}

const Hand: React.FC<HandProps> = ({ isPlayer, hand, isFaceDown }) => {
    return (
        <div className="hand">
            <h2 className={`hand-title ${isPlayer ? "player-title" : "computer-title"}`}>
                {isPlayer ? "Computer's Hand" : "Player's Hand"}
            </h2>            <div className="card-container">
                {hand.map((card, index) => (
                    <div key={index} className="card">
                        {isFaceDown ? (
                            <img src="/images/back-card.jpg" alt="Card Back" />
                        ) : (
                            <img src={card.image} alt={`${card.rank} of ${card.suit}`} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hand;
