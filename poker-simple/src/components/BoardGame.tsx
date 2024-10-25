import React, { useState } from 'react';
import { createDeck, Card } from './Card';
import Hand from './Hand';

const ranks: string[] = ['7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

const evaluateHand = (hand: Card[]): string => {
    const rankCount: { [key: string]: number } = {};

    hand.forEach((card) => {
        rankCount[card.rank] = (rankCount[card.rank] || 0) + 1;
    });

    const counts = Object.values(rankCount).sort((a, b) => b - a);
    if (counts[0] === 4) return "Carré";
    if (counts[0] === 3) return "Brelan";
    if (counts[0] === 2 && counts[1] === 2) return "Double Paire";
    if (counts[0] === 2) return "Paire";

    const highCard = Object.keys(rankCount).reduce((a, b) =>
        ranks.indexOf(a) > ranks.indexOf(b) ? a : b
    );

    return `Highest card: ${highCard}`;
};

const BoardGame: React.FC = () => {
    const [playerHand, setPlayerHand] = useState<Card[]>([]);
    const [computerHand, setComputerHand] = useState<Card[]>([]);
    const [message, setMessage] = useState<string>('');
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [cardsRevealed, setCardsRevealed] = useState<boolean>(false);

    const startGame = () => {
        const newDeck = createDeck();
        const shuffledDeck = newDeck.sort(() => Math.random() - 0.5);
        const playerCards = shuffledDeck.slice(0, 4);
        const computerCards = shuffledDeck.slice(4, 8);

        setPlayerHand(playerCards);
        setComputerHand(computerCards);
        // setMessage('Game Started!');
        setGameStarted(true);
        setCardsRevealed(false);
    };

    const handRankings: { [key: string]: number } = {
        "Carré": 4,
        "Brelan": 3,
        "Double Paire": 2,
        "Paire": 1,
        "Highest card": 0,
    };

    const revealCards = () => {
        setCardsRevealed(true);

        const playerHandType = evaluateHand(playerHand);
        const computerHandType = evaluateHand(computerHand);

        const playerRank = handRankings[playerHandType];
        const computerRank = handRankings[computerHandType];

        let resultMessage = `Player has: ${playerHandType}. Computer has: ${computerHandType}.`;

        // Logic to determine the winner
        if (playerRank === computerRank) {
            resultMessage += " It's a tie!";
        } else if (playerRank > computerRank) {
            resultMessage += `Player wins with ${playerHandType}!`;
        } else {
            resultMessage += `Computer wins with ${computerHandType}!`;
        }

        setMessage(resultMessage);
    };

    const restartGame = () => {
        setPlayerHand([]);
        setComputerHand([]);
        setMessage('');
        setGameStarted(false);
        setCardsRevealed(false);
    };

    return (
        <div className="game-board">
            <h1>Simple Poker</h1>
            {!gameStarted ? (
                <button onClick={startGame} className='reveal-btn start-btn'>Start Game</button>
            ) : !cardsRevealed ? (
                <button onClick={revealCards} className='reveal-btn'>Reveal Cards</button>
            ) : (
                <button onClick={restartGame} className='reveal-btn'>Restart Game</button>
            )}
            <Hand isPlayer={true} hand={playerHand} isFaceDown={!cardsRevealed} />
            <Hand isPlayer={false} hand={computerHand} isFaceDown={!cardsRevealed} />
            <h2 className='message'>{message}</h2>
        </div>
    );
};

export default BoardGame;
