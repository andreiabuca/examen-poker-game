export type Suit = 'hearts' | 'spades' | 'diamonds' | 'clubs';
export type Rank = '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

export interface Card {
    rank: Rank;
    suit: Suit;
    image: string;
}

const cardImages: { [key: string]: string } = {
    '7hearts': '/images/seven-hearts.jpg',
    '8hearts': '/images/eight-hearts.jpg',
    '9hearts': '/images/nine-hearts.jpg',
    '10hearts': '/images/ten-hearts.jpg',
    'Jhearts': '/images/j-hearts.jpg',
    'Qhearts': '/images/d-hearts.jpg',
    'Khearts': '/images/r-hearts.jpg',
    'Ahearts': '/images/a-hearts.jpg',
    '7spades': '/images/seven-spades.jpg',
    '8spades': '/images/eight-spades.jpg',
    '9spades': '/images/nine-spades.jpg',
    '10spades': '/images/ten-spades.jpg',
    'Jspades': '/images/j-spades.jpg',
    'Qspades': '/images/q-spades.jpg',
    'Kspades': '/images/r-spades.jpg',
    'Aspades': '/images/a-spades.jpg',
    '7diamonds': '/images/seven-diamonds.jpg',
    '8diamonds': '/images/eight-diamonds.jpg',
    '9diamonds': '/images/nine-diamonds.jpg',
    '10diamonds': '/images/ten-diamonds.jpg',
    'Jdiamonds': '/images/j-diamonds.jpg',
    'Qdiamonds': '/images/d-diamonds.jpg',
    'Kdiamonds': '/images/r-diamonds.jpg',
    'Adiamonds': '/images/a-diamonds.jpg',
    '7clubs': '/images/seven-clubs.jpg',
    '8clubs': '/images/eight-clubs.jpg',
    '9clubs': '/images/nine-clubs.jpg',
    '10clubs': '/images/ten-clubs.jpg',
    'Jclubs': '/images/j-clubs.jpg',
    'Qclubs': '/images/d-clubs.jpg',
    'Kclubs': '/images/r-clubs.jpg',
    'Aclubs': '/images/a-clubs.jpg',
};


//func generate a new deck of cards
const createDeck = (): Card[] => {
    const deck: Card[] = [];
    const ranks: Rank[] = ['7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const suits: Suit[] = ['hearts', 'spades', 'diamonds', 'clubs'];

    suits.forEach((suit) => {
        ranks.forEach((rank) => {
            const cardKey = `${rank}${suit}`;
            const image = cardImages[cardKey];
            deck.push({ rank, suit, image });
        });
    });
    return deck;
};

export { createDeck }; 
