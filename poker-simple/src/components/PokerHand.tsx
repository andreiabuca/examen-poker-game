// Define constant ranks as a readonly tuple and type for Rank
export const ranks = ['7', '8', '9', '10', 'J', 'Q', 'K', 'A'] as const;
export type Rank = typeof ranks[number];

// Define types for Suit
export type Suit = 'hearts' | 'spades' | 'diamonds' | 'clubs';

// Card class to represent a playing card
export class Card {
    constructor(public rank: Rank, public suit: Suit) {}
}

// Hand class to represent a hand of cards
export class Hand {
    cards: Card[];

    constructor(cards: Card[]) {
        this.cards = cards;
    }

    // Evaluate the hand and return its type
    evaluate(): string {
        if (this.checkFourOfAKind()) return "Carré";
        if (this.checkThreeOfAKind()) return "Brelan";
        if (this.checkTwoPairs()) return "Double Paire";
        if (this.checkOnePair()) return "Paire";
        return `Highest card: ${this.getHighestCard().rank}`;
    }

    // Check for four of a kind
    private checkFourOfAKind(): boolean {
        return this.hasSameRank(4);
    }

    // Check for three of a kind
    private checkThreeOfAKind(): boolean {
        return this.hasSameRank(3);
    }

    // Check for two pairs
    private checkTwoPairs(): boolean {
        const rankCount = this.getRankCount();
        const pairs = Object.values(rankCount).filter(count => count === 2);
        return pairs.length === 2;
    }

    // Check for one pair
    private checkOnePair(): boolean {
        return this.hasSameRank(2);
    }

    // General method to check for any specific rank count
    private hasSameRank(count: number): boolean {
        const rankCount = this.getRankCount();
        return Object.values(rankCount).includes(count);
    }

    // Get the highest card in the hand
    private getHighestCard(): Card {
        return this.cards.reduce((prev, current) => {
            return ranks.indexOf(prev.rank) > ranks.indexOf(current.rank) ? prev : current;
        });
    }

    // Get a count of each rank in the hand
    private getRankCount(): { [key: string]: number } {
        return this.cards.reduce((acc, card) => {
            acc[card.rank] = (acc[card.rank] || 0) + 1;
            return acc;
        }, {} as { [key: string]: number });
    }
}

// Function to compare two hands and return the winner
export function compareHands(hand1: Hand, hand2: Hand): number {
    const handRankings: { [key: string]: number } = {
        "Carré": 4,
        "Brelan": 3,
        "Double Paire": 2,
        "Paire": 1,
        "Highest card": 0,
    };

    const hand1Type = hand1.evaluate();
    const hand2Type = hand2.evaluate();

    if (handRankings[hand1Type] > handRankings[hand2Type]) return 1; 
    if (handRankings[hand1Type] < handRankings[hand2Type]) return -1; 
    return 0; 
}
