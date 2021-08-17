import app from "@/common/constants/app";
import utilities from "@/common/utilities/utilities";
import { cardTypeEnum } from "@/common/enums/cardTypeEnum";

const spiderSolitaireService = {
  initializeCards() {
    let baseDecks = [],
      undistributedDeck = [],
      distributedDecks = [];

    app.cardNumbers.forEach((cardNumber) => {
      //numeric value of card
      let cardValue = this.getCardNumber(cardNumber);

      baseDecks.push(
        {
          cardNumber: cardNumber,
          isOpen: false,
          deck: 1,
          value: cardValue,
          type: cardTypeEnum.Card,
        },
        {
          cardNumber: cardNumber,
          isOpen: false,
          deck: 2,
          value: cardValue,
          type: cardTypeEnum.Card,
        },
        {
          cardNumber: cardNumber,
          isOpen: false,
          deck: 3,
          value: cardValue,
          type: cardTypeEnum.Card,
        },
        {
          cardNumber: cardNumber,
          isOpen: false,
          deck: 4,
          value: cardValue,
          type: cardTypeEnum.Card,
        },
        {
          cardNumber: cardNumber,
          isOpen: false,
          deck: 5,
          value: cardValue,
          type: cardTypeEnum.Card,
        },
        {
          cardNumber: cardNumber,
          isOpen: false,
          deck: 6,
          value: cardValue,
          type: cardTypeEnum.Card,
        },
        {
          cardNumber: cardNumber,
          isOpen: false,
          deck: 7,
          value: cardValue,
          type: cardTypeEnum.Card,
        },
        {
          cardNumber: cardNumber,
          isOpen: false,
          deck: 8,
          value: cardValue,
          type: cardTypeEnum.Card,
        }
      );
    });

    let mixedDecks = utilities.shuffleArray(baseDecks);

    //To divide the cards into 4 decks of 6 each and 6 decks of 5 each.
    distributedDecks = utilities.chunkArray(mixedDecks.slice(0, 24), 6);
    distributedDecks = distributedDecks.concat(
      utilities.chunkArray(mixedDecks.slice(24, 54), 5)
    );

    //Throws the remaining cards into the undistributed array
    undistributedDeck = mixedDecks.slice(54, 104);

    //Open last card each deck
    distributedDecks.forEach((deck) => {
      deck[deck.length - 1].isOpen = true;
    });

    let allDecks = {
      undistributedDeck: undistributedDeck,
      distributedDecks: distributedDecks,
    };

    return allDecks;
  },
  getCardNumber(cardNumber) {
    let number = 0;

    switch (cardNumber) {
      case "A":
        number = 1;
        break;

      case "J":
        number = 11;
        break;

      case "Q":
        number = 12;
        break;

      case "K":
        number = 13;
        break;

      default:
        number = parseInt(cardNumber);
        break;
    }

    return number;
  },
  sortOfCardsCheck(cardList) {
    try {
      for (let index = 0; index < cardList.length; index++) {
        if (
          index < cardList.length - 1 &&
          cardList[index + 1].value - cardList[index].value != 1
        ) {
          return false;
        }
      }

      return true;
    } catch (error) {
      let err = `Error : ${error.message}`;
      console.log(err);

      throw err;
    }
  },
  moveCheck(card, selectedCards) {
    try {
      if (!card.isOpen) {
        return false;
      }

      if (!this.sortOfCardsCheck(selectedCards)) {
        return false;
      }

      return true;
    } catch (error) {
      let err = `Error : ${error.message}`;
      console.log(err);

      throw err;
    }
  },
  dropCheck(targetCard, selectedCard) {
    try {
      if (targetCard.type == cardTypeEnum.Holder) {
        return true;
      } else if (!targetCard.isOpen) {
        return false;
      } else {
        if (!this.sortOfCardsCheck([targetCard, selectedCard])) {
          return false;
        }
      }

      return true;
    } catch (error) {
      let err = `Error : ${error.message}`;
      console.log(err);

      throw err;
    }
  },
};

export default spiderSolitaireService;
