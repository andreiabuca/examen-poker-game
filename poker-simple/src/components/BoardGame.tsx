import React, { useState } from 'react';
import { createDeck, Card } from './Card';
import Hand from './Hand';
import { Hand as PokerHand, compareHands } from './PokerHand'; 

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
        setGameStarted(true);
        setCardsRevealed(false);
    };

    const revealCards = () => {
        setCardsRevealed(true);

        const playerPokerHand = new PokerHand(playerHand);
        const computerPokerHand = new PokerHand(computerHand);

        const playerHandType = playerPokerHand.evaluate();
        const computerHandType = computerPokerHand.evaluate();

        const handRankings: { [key: string]: number } = {
            "Carré": 4,
            "Brelan": 3,
            "Double Paire": 2,
            "Paire": 1,
            "Highest card": 0,
        };

        const playerRank = handRankings[playerHandType];
        const computerRank = handRankings[computerHandType];

        let resultMessage = 
        `⛹🏾‍♀️ Player has: ${playerHandType}. 
        🖥️ Computer has: ${computerHandType}.`;

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
