import { cardTypeEnum } from "@/common/enums/cardTypeEnum";
import spiderSolitaireService from "@/common/services/spiderSolitaireService";

describe("spiderSolitaireService.js", () => {
  describe("initializeCards function should return all cards", () => {
    it("should return create eight decks of playing cards, shuffle these cards, and turn the cards to be distribute, consisting of 10 separate sets, and the remaining 50 undistributed cards.", () => {
      let initializedCards = spiderSolitaireService.initializeCards();

      expect(initializedCards.undistributedDeck).toHaveLength(50);
      expect(initializedCards.distributedDecks).toHaveLength(10);
    });
  });

  describe("getCardNumber function should return card numeric value", () => {
    it("should return 1 when parameter is 'A' ", () => {
      let cardValue = spiderSolitaireService.getCardNumber("A");

      expect(cardValue).toEqual(1);
    });

    it("should return 11 when parameter is 'J' ", () => {
      let cardValue = spiderSolitaireService.getCardNumber("J");

      expect(cardValue).toEqual(11);
    });

    it("should return 12 when parameter is 'Q' ", () => {
      let cardValue = spiderSolitaireService.getCardNumber("Q");

      expect(cardValue).toEqual(12);
    });

    it("should return 13 when parameter is 'K' ", () => {
      let cardValue = spiderSolitaireService.getCardNumber("K");

      expect(cardValue).toEqual(13);
    });

    it("should return numeric value of given paremeter", () => {
      let cardNumber = "3";
      let cardValue = spiderSolitaireService.getCardNumber(cardNumber);

      expect(cardValue).toEqual(parseInt(cardNumber));
    });
  });

  describe("sortOfCardsCheck function should return check of given array objects values sorted ", () => {
    it("should return true when cards values are order by ascending ", () => {
      let cardList = [
        {
          value: 1,
        },
        {
          value: 2,
        },
        {
          value: 3,
        },
      ];

      let sortOfCardsCheckResponse =
        spiderSolitaireService.sortOfCardsCheck(cardList);

      expect(sortOfCardsCheckResponse).toBeTruthy();
    });

    it("should return false when cards values are not order by ascending ", () => {
      let cardList = [
        {
          value: 3,
        },
        {
          value: 1,
        },
        {
          value: 2,
        },
      ];

      let sortOfCardsCheckResponse =
        spiderSolitaireService.sortOfCardsCheck(cardList);

      expect(sortOfCardsCheckResponse).toBeFalsy();
    });

    it("should throw error when parameter is null ", () => {
      expect(() => {
        spiderSolitaireService.sortOfCardsCheck(null);
      }).toThrowError("Error : Cannot read property 'length' of null");
    });
  });

  describe("moveCheck function should return check of given array objects values sorted and card is open", () => {
    it("should return true when selected card is open and selected cards are sorted ascending", () => {
      let cardList = [
        {
          isOpen: true,
          value: 1,
        },
        {
          isOpen: true,
          value: 2,
        },
        {
          isOpen: true,
          value: 3,
        },
      ];
      let selectedCard = {
        isOpen: true,
        value: 1,
      };

      let moveCheckResponse = spiderSolitaireService.moveCheck(
        selectedCard,
        cardList
      );

      expect(moveCheckResponse).toBeTruthy();
    });

    it("should return false when selected card is not open ", () => {
      let cardList = [
        {
          isOpen: false,
          value: 1,
        },
        {
          isOpen: true,
          value: 2,
        },
        {
          isOpen: true,
          value: 3,
        },
      ];
      let selectedCard = {
        isOpen: false,
        value: 1,
      };

      let moveCheckResponse = spiderSolitaireService.moveCheck(
        selectedCard,
        cardList
      );

      expect(moveCheckResponse).toBeFalsy();
    });

    it("should return false when selected cards are not sorted ascending ", () => {
      let cardList = [
        {
          isOpen: true,
          value: 1,
        },
        {
          isOpen: true,
          value: 3,
        },
        {
          isOpen: true,
          value: 2,
        },
      ];
      let selectedCard = {
        isOpen: true,
        value: 1,
      };

      let moveCheckResponse = spiderSolitaireService.moveCheck(
        selectedCard,
        cardList
      );

      expect(moveCheckResponse).toBeFalsy();
    });

    it("should throw error when card is null ", () => {
      expect(() => {
        spiderSolitaireService.moveCheck(null);
      }).toThrowError("Cannot read property 'isOpen' of null");
    });
  });

  describe("dropCheck function should return check if the selected card can be drop to the target card", () => {
    it("should return true when target card type is holder", () => {
      let selectedCard = {
        isOpen: true,
        value: 1,
        type: cardTypeEnum.Card,
      };

      let targetCard = {
        type: cardTypeEnum.Holder,
      };

      let dropCheckResponse = spiderSolitaireService.dropCheck(
        targetCard,
        selectedCard
      );

      expect(dropCheckResponse).toBeTruthy();
    });

    it("should return false when target card is not open", () => {
      let selectedCard = {
        isOpen: true,
        value: 2,
        type: cardTypeEnum.Card,
      };

      let targetCard = {
        isOpen: false,
        value: 1,
        type: cardTypeEnum.Card,
      };

      let dropCheckResponse = spiderSolitaireService.dropCheck(
        targetCard,
        selectedCard
      );

      expect(dropCheckResponse).toBeFalsy();
    });

    it("should return false when [ target card, selected card ] array is not order by ascending ", () => {
      let selectedCard = {
        isOpen: true,
        value: 1,
        type: cardTypeEnum.Card,
      };

      let targetCard = {
        isOpen: true,
        value: 2,
        type: cardTypeEnum.Card,
      };

      let dropCheckResponse = spiderSolitaireService.dropCheck(
        targetCard,
        selectedCard
      );

      expect(dropCheckResponse).toBeFalsy();
    });

    it("should return true when target card is open and [ target card, selected card ] array is order by ascending ", () => {
      let selectedCard = {
        isOpen: true,
        value: 2,
        type: cardTypeEnum.Card,
      };

      let targetCard = {
        isOpen: true,
        value: 1,
        type: cardTypeEnum.Card,
      };

      let dropCheckResponse = spiderSolitaireService.dropCheck(
        targetCard,
        selectedCard
      );

      expect(dropCheckResponse).toBeTruthy();
    });

    it("should throw error when targetCard is null ", () => {
      expect(() => {
        spiderSolitaireService.dropCheck(null);
      }).toThrowError("Error : Cannot read property 'type' of null");
    });
  });
});
