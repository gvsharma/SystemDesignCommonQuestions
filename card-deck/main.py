import random

class CardDeck(object):
    def __init__(self):
        suits = ["Clubs", "Diamonds", "Hearts", "Spades"]
        ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"]

        cards = []
        for i in range(len(suits)):
            for j in range(len(ranks)):
                card = suits[i] + '_' + ranks[j]
                cards.append(card)
        
        self.suits = suits
        self.ranks = ranks
        self.cards = cards
        self.shuffled = []
    
    def shuffle(self):
        clone = self.cards[:]
        for i in range(len(clone)):
            j = random.randint(i, len(clone)-1)
            clone[i], clone[j] = clone[j], clone[i]
        self.shuffled = clone
        return clone
    
    def getCardFromShuffle(self):
        if len(self.shuffled) == 0:
            # please shuffle first
            raise Exception('please shuffle first')
            # or shuffle
            # self.shuffle()
        return self.shuffled.pop()
        