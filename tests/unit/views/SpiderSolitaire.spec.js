import { shallowMount, createLocalVue } from "@vue/test-utils";
import SpiderSolitaire from "@/views/SpiderSolitaire.vue";
import app from "@/common/constants/app";
import Toastr from "@/components/Toastr/Toastr";
import { scoreTypeEnum } from "@/common/enums/scoreTypeEnum";

let showToastr;
const $app = app;
const $Toastr = Toastr;
let wrapper;
let timer = {
  render: () => {},
  methods: {
    getTimerValue: () => 100,
  },
};

beforeEach(() => {
  wrapper = shallowMount(SpiderSolitaire, {
    mocks: {
      $app,
      $Toastr,
    },
    stubs: {
      timer: timer,
    },
  });

  showToastr = jest.spyOn(Toastr, "showToastr");
});

afterEach(() => {
  showToastr.mockReset();
  showToastr.mockRestore();
});

describe("SpiderSolitaire.vue", () => {
  describe("initializeCards method should set undistributed and distributed decks", () => {
    it("should set undistributed deck of 50 item", () => {
      expect(wrapper.vm.undistributedDeck).toHaveLength(50);
    });

    it("should set distributed deck arrays of 10 item", () => {
      expect(wrapper.vm.decks).toHaveLength(10);
    });
  });
  describe("complatedDeckCount watch should recalculate uncompleted deck count when completed deck count change", () => {
    it("should set uncompleted deck count to ' total deck count - completed deck count '", async () => {
      await wrapper.setData({ complatedDeckCount: 2 });

      expect(wrapper.vm.unComplatedDeckCount).toBe(app.totalDeckCount - 2);
    });
  });

  describe("dragstart method works when the selected card starts to swipe", () => {
    it("should set selected decks to selected deck when selected cards are moveable", async () => {
      let selectedDeck = [
        { cardNumber: "9", deck: 4, isOpen: true, type: 1, value: 9 },
        { cardNumber: "4", deck: 4, isOpen: true, type: 1, value: 4 },
        { cardNumber: "5", deck: 1, isOpen: true, type: 1, value: 5 },
        { cardNumber: "6", deck: 6, isOpen: true, type: 1, value: 6 },
      ];
      let selectedCard = {
        cardNumber: "4",
        deck: 4,
        isOpen: true,
        type: 1,
        value: 4,
      };

      await wrapper.vm.dragStart(selectedCard, selectedDeck);

      expect(wrapper.vm.selectedDeck).toStrictEqual(selectedDeck);
    });

    it("should set selected decks to selected deck when selected cards are moveable", async () => {
      let selectedDeck = [
        { cardNumber: "9", deck: 4, isOpen: true, type: 1, value: 9 },
        { cardNumber: "4", deck: 4, isOpen: true, type: 1, value: 4 },
        { cardNumber: "5", deck: 1, isOpen: true, type: 1, value: 5 },
        { cardNumber: "6", deck: 6, isOpen: true, type: 1, value: 6 },
      ];
      let selectedCard = {
        cardNumber: "4",
        deck: 4,
        isOpen: true,
        type: 1,
        value: 4,
      };

      await wrapper.vm.dragStart(selectedCard, selectedDeck);

      expect(wrapper.vm.selectedDeck).toStrictEqual(selectedDeck);
    });

    it("should set selected card to selected card when selected cards are moveable", async () => {
      let selectedDeck = [
        { cardNumber: "9", deck: 4, isOpen: true, type: 1, value: 9 },
        { cardNumber: "4", deck: 4, isOpen: true, type: 1, value: 4 },
        { cardNumber: "5", deck: 1, isOpen: true, type: 1, value: 5 },
        { cardNumber: "6", deck: 6, isOpen: true, type: 1, value: 6 },
      ];
      let selectedCard = {
        cardNumber: "4",
        deck: 4,
        isOpen: true,
        type: 1,
        value: 4,
      };

      await wrapper.vm.dragStart(selectedCard, selectedDeck);

      expect(wrapper.vm.selectedCard).toStrictEqual(selectedCard);
    });

    it("should set selected cards to selected cards when selected cards are moveable", async () => {
      let selectedDeck = [
        { cardNumber: "9", deck: 4, isOpen: true, type: 1, value: 9 },
        { cardNumber: "4", deck: 4, isOpen: true, type: 1, value: 4 },
        { cardNumber: "5", deck: 1, isOpen: true, type: 1, value: 5 },
        { cardNumber: "6", deck: 6, isOpen: true, type: 1, value: 6 },
      ];
      let selectedCard = {
        cardNumber: "4",
        deck: 4,
        isOpen: true,
        type: 1,
        value: 4,
      };
      let selectedCards = selectedDeck.slice(1);

      await wrapper.vm.dragStart(selectedCard, selectedDeck);

      expect(wrapper.vm.selectedCards).toStrictEqual(selectedCards);
    });

    it("should call toastr method when selected cards can not move", async () => {
      let selectedDeck = [
        { cardNumber: "9", deck: 4, isOpen: true, type: 1, value: 9 },
        { cardNumber: "10", deck: 4, isOpen: true, type: 1, value: 10 },
        { cardNumber: "7", deck: 1, isOpen: true, type: 1, value: 7 },
        { cardNumber: "6", deck: 6, isOpen: true, type: 1, value: 6 },
      ];
      let selectedCard = {
        cardNumber: "10",
        deck: 4,
        isOpen: true,
        type: 1,
        value: 10,
      };

      await wrapper.vm.dragStart(selectedCard, selectedDeck);

      expect(showToastr).toHaveBeenCalled();
    });

    it("should set empty relevant data when selected cards can not move", async () => {
      let selectedDeck = [
        { cardNumber: "9", deck: 4, isOpen: true, type: 1, value: 9 },
        { cardNumber: "10", deck: 4, isOpen: true, type: 1, value: 10 },
        { cardNumber: "7", deck: 1, isOpen: true, type: 1, value: 7 },
        { cardNumber: "6", deck: 6, isOpen: true, type: 1, value: 6 },
      ];
      let selectedCard = {
        cardNumber: "10",
        deck: 4,
        isOpen: true,
        type: 1,
        value: 10,
      };

      await wrapper.vm.dragStart(selectedCard, selectedDeck);

      expect(wrapper.vm.selectedDeck).toStrictEqual([]);
      expect(wrapper.vm.selectedCard).toStrictEqual({});
      expect(wrapper.vm.selectedCards).toStrictEqual([]);
      expect(wrapper.vm.targetCard).toStrictEqual({});
      expect(wrapper.vm.targetDeck).toStrictEqual([]);
    });
  });

  describe("dragEnter method works when a draggable item hovers over another draggable item", () => {
    it("should set target deck to vm target deck", async () => {
      let targetDeck = [
        { cardNumber: "9", deck: 4, isOpen: true, type: 1, value: 9 },
        { cardNumber: "4", deck: 4, isOpen: true, type: 1, value: 4 },
        { cardNumber: "5", deck: 1, isOpen: true, type: 1, value: 5 },
        { cardNumber: "6", deck: 6, isOpen: true, type: 1, value: 6 },
      ];
      let targetCard = {
        cardNumber: "4",
        deck: 4,
        isOpen: true,
        type: 1,
        value: 4,
      };

      await wrapper.vm.dragEnter(targetDeck, targetCard);

      expect(wrapper.vm.targetDeck).toStrictEqual(targetDeck);
    });

    it("should set target card to vm target card", async () => {
      let targetDeck = [
        { cardNumber: "9", deck: 4, isOpen: true, type: 1, value: 9 },
        { cardNumber: "4", deck: 4, isOpen: true, type: 1, value: 4 },
        { cardNumber: "5", deck: 1, isOpen: true, type: 1, value: 5 },
        { cardNumber: "6", deck: 6, isOpen: true, type: 1, value: 6 },
      ];
      let targetCard = {
        cardNumber: "4",
        deck: 4,
        isOpen: true,
        type: 1,
        value: 4,
      };

      await wrapper.vm.dragEnter(targetDeck, targetCard);

      expect(wrapper.vm.targetCard).toStrictEqual(targetCard);
    });
  });

  describe("dragend method works when  when a drag operation is being ended ", () => {
    it("should update score when selected card can drop to target card", async () => {
      let selectedDeck = [
        { cardNumber: "10", deck: 4, isOpen: true, type: 1, value: 10 },
        { cardNumber: "4", deck: 4, isOpen: true, type: 1, value: 4 },
      ];
      let selectedCards = [
        { cardNumber: "4", deck: 4, isOpen: true, type: 1, value: 4 },
      ];
      let targetDeck = [
        { cardNumber: "9", deck: 3, isOpen: false, type: 1, value: 9 },
        { cardNumber: "3", deck: 3, isOpen: true, type: 1, value: 3 },
      ];
      let targetCard = {
        cardNumber: "3",
        deck: 5,
        isOpen: true,
        type: 1,
        value: 3,
      };
      let selectedCard = {
        cardNumber: "4",
        deck: 4,
        isOpen: true,
        type: 1,
        value: 4,
      };

      await wrapper.setData({ targetDeck: targetDeck });
      await wrapper.setData({ selectedCards: selectedCards });
      await wrapper.setData({ selectedDeck: selectedDeck });
      await wrapper.setData({ targetCard: targetCard });
      await wrapper.setData({ selectedCard: selectedCard });

      await wrapper.vm.dragEnd();

      expect(wrapper.vm.score).toBe(app.movePoint);
    });

    it("should call toastr method when selected card can not drop to target card", async () => {
      let selectedDeck = [
        { cardNumber: "10", deck: 4, isOpen: true, type: 1, value: 10 },
        { cardNumber: "9", deck: 4, isOpen: true, type: 1, value: 9 },
      ];
      let selectedCards = [
        { cardNumber: "9", deck: 4, isOpen: true, type: 1, value: 9 },
      ];
      let targetDeck = [
        { cardNumber: "9", deck: 3, isOpen: false, type: 1, value: 9 },
        { cardNumber: "3", deck: 3, isOpen: true, type: 1, value: 3 },
      ];
      let targetCard = {
        cardNumber: "3",
        deck: 5,
        isOpen: true,
        type: 1,
        value: 3,
      };
      let selectedCard = {
        cardNumber: "9",
        deck: 4,
        isOpen: true,
        type: 1,
        value: 9,
      };

      await wrapper.setData({ targetDeck: targetDeck });
      await wrapper.setData({ selectedCards: selectedCards });
      await wrapper.setData({ selectedDeck: selectedDeck });
      await wrapper.setData({ targetCard: targetCard });
      await wrapper.setData({ selectedCard: selectedCard });

      await wrapper.vm.dragEnd();

      expect(showToastr).toHaveBeenCalled();
    });
  });

  describe("deckComplatedCheck method should control target deck is completed ", () => {
    it("should update complatedDeckCount when deck complete", async () => {
      let targetDeck = [
        { cardNumber: "9", deck: 3, isOpen: false, type: 1, value: 9 },
        { cardNumber: "A", deck: 3, isOpen: true, type: 1, value: 1 },
        { cardNumber: "2", deck: 3, isOpen: true, type: 1, value: 2 },
        { cardNumber: "3", deck: 3, isOpen: true, type: 1, value: 3 },
        { cardNumber: "4", deck: 3, isOpen: true, type: 1, value: 4 },
        { cardNumber: "5", deck: 3, isOpen: true, type: 1, value: 5 },
        { cardNumber: "6", deck: 3, isOpen: true, type: 1, value: 6 },
        { cardNumber: "7", deck: 3, isOpen: true, type: 1, value: 7 },
        { cardNumber: "8", deck: 3, isOpen: true, type: 1, value: 8 },
        { cardNumber: "9", deck: 3, isOpen: true, type: 1, value: 9 },
        { cardNumber: "10", deck: 3, isOpen: true, type: 1, value: 10 },
        { cardNumber: "J", deck: 3, isOpen: true, type: 1, value: 11 },
        { cardNumber: "Q", deck: 3, isOpen: true, type: 1, value: 12 },
        { cardNumber: "K", deck: 3, isOpen: true, type: 1, value: 13 },
      ];

      await wrapper.setData({ targetDeck: targetDeck });

      await wrapper.vm.deckComplatedCheck();

      expect(wrapper.vm.complatedDeckCount).toBe(1);
    });
  });

  describe("deckComplate method should update score and target deck", () => {
    it("should remove completed deck in target deck ", async () => {
      let targetDeck = [
        { cardNumber: "9", deck: 3, isOpen: false, type: 1, value: 9 },
        { cardNumber: "A", deck: 3, isOpen: true, type: 1, value: 1 },
        { cardNumber: "2", deck: 3, isOpen: true, type: 1, value: 2 },
        { cardNumber: "3", deck: 3, isOpen: true, type: 1, value: 3 },
        { cardNumber: "4", deck: 3, isOpen: true, type: 1, value: 4 },
        { cardNumber: "5", deck: 3, isOpen: true, type: 1, value: 5 },
        { cardNumber: "6", deck: 3, isOpen: true, type: 1, value: 6 },
        { cardNumber: "7", deck: 3, isOpen: true, type: 1, value: 7 },
        { cardNumber: "8", deck: 3, isOpen: true, type: 1, value: 8 },
        { cardNumber: "9", deck: 3, isOpen: true, type: 1, value: 9 },
        { cardNumber: "10", deck: 3, isOpen: true, type: 1, value: 10 },
        { cardNumber: "J", deck: 3, isOpen: true, type: 1, value: 11 },
        { cardNumber: "Q", deck: 3, isOpen: true, type: 1, value: 12 },
        { cardNumber: "K", deck: 3, isOpen: true, type: 1, value: 13 },
      ];

      let expedtedTargetDeck = [
        { cardNumber: "9", deck: 3, isOpen: true, type: 1, value: 9 },
      ];

      await wrapper.setData({ targetDeck: targetDeck });

      await wrapper.vm.deckComplate();

      expect(wrapper.vm.targetDeck).toStrictEqual(expedtedTargetDeck);
    });

    it("should update score and call toastr method ", async () => {
      let targetDeck = [
        { cardNumber: "9", deck: 3, isOpen: false, type: 1, value: 9 },
        { cardNumber: "A", deck: 3, isOpen: true, type: 1, value: 1 },
        { cardNumber: "2", deck: 3, isOpen: true, type: 1, value: 2 },
        { cardNumber: "3", deck: 3, isOpen: true, type: 1, value: 3 },
        { cardNumber: "4", deck: 3, isOpen: true, type: 1, value: 4 },
        { cardNumber: "5", deck: 3, isOpen: true, type: 1, value: 5 },
        { cardNumber: "6", deck: 3, isOpen: true, type: 1, value: 6 },
        { cardNumber: "7", deck: 3, isOpen: true, type: 1, value: 7 },
        { cardNumber: "8", deck: 3, isOpen: true, type: 1, value: 8 },
        { cardNumber: "9", deck: 3, isOpen: true, type: 1, value: 9 },
        { cardNumber: "10", deck: 3, isOpen: true, type: 1, value: 10 },
        { cardNumber: "J", deck: 3, isOpen: true, type: 1, value: 11 },
        { cardNumber: "Q", deck: 3, isOpen: true, type: 1, value: 12 },
        { cardNumber: "K", deck: 3, isOpen: true, type: 1, value: 13 },
      ];

      await wrapper.setData({ targetDeck: targetDeck });

      await wrapper.vm.deckComplate();

      expect(wrapper.vm.score).toBe(app.deckComplatePoint);
      expect(showToastr).toHaveBeenCalled();
    });

    it("should stop timer when all decks are completed ", async () => {
      let targetDeck = [
        { cardNumber: "9", deck: 3, isOpen: false, type: 1, value: 9 },
        { cardNumber: "A", deck: 3, isOpen: true, type: 1, value: 1 },
        { cardNumber: "2", deck: 3, isOpen: true, type: 1, value: 2 },
        { cardNumber: "3", deck: 3, isOpen: true, type: 1, value: 3 },
        { cardNumber: "4", deck: 3, isOpen: true, type: 1, value: 4 },
        { cardNumber: "5", deck: 3, isOpen: true, type: 1, value: 5 },
        { cardNumber: "6", deck: 3, isOpen: true, type: 1, value: 6 },
        { cardNumber: "7", deck: 3, isOpen: true, type: 1, value: 7 },
        { cardNumber: "8", deck: 3, isOpen: true, type: 1, value: 8 },
        { cardNumber: "9", deck: 3, isOpen: true, type: 1, value: 9 },
        { cardNumber: "10", deck: 3, isOpen: true, type: 1, value: 10 },
        { cardNumber: "J", deck: 3, isOpen: true, type: 1, value: 11 },
        { cardNumber: "Q", deck: 3, isOpen: true, type: 1, value: 12 },
        { cardNumber: "K", deck: 3, isOpen: true, type: 1, value: 13 },
      ];

      await wrapper.setData({ targetDeck: targetDeck });
      await wrapper.setData({ complatedDeckCount: app.totalDeckCount - 1 });

      await wrapper.vm.deckComplate();

      expect(wrapper.vm.isTimerRunning).toBeFalsy();
      expect(wrapper.vm.isGameEnd).toBeTruthy();
      expect(showToastr).toHaveBeenCalled();
    });

    it("should set true isGameEnd and call toastr method when all decks are completed ", async () => {
      let targetDeck = [
        { cardNumber: "9", deck: 3, isOpen: false, type: 1, value: 9 },
        { cardNumber: "A", deck: 3, isOpen: true, type: 1, value: 1 },
        { cardNumber: "2", deck: 3, isOpen: true, type: 1, value: 2 },
        { cardNumber: "3", deck: 3, isOpen: true, type: 1, value: 3 },
        { cardNumber: "4", deck: 3, isOpen: true, type: 1, value: 4 },
        { cardNumber: "5", deck: 3, isOpen: true, type: 1, value: 5 },
        { cardNumber: "6", deck: 3, isOpen: true, type: 1, value: 6 },
        { cardNumber: "7", deck: 3, isOpen: true, type: 1, value: 7 },
        { cardNumber: "8", deck: 3, isOpen: true, type: 1, value: 8 },
        { cardNumber: "9", deck: 3, isOpen: true, type: 1, value: 9 },
        { cardNumber: "10", deck: 3, isOpen: true, type: 1, value: 10 },
        { cardNumber: "J", deck: 3, isOpen: true, type: 1, value: 11 },
        { cardNumber: "Q", deck: 3, isOpen: true, type: 1, value: 12 },
        { cardNumber: "K", deck: 3, isOpen: true, type: 1, value: 13 },
      ];

      await wrapper.setData({ targetDeck: targetDeck });
      await wrapper.setData({ complatedDeckCount: app.totalDeckCount - 1 });

      await wrapper.vm.deckComplate();

      expect(wrapper.vm.isTimerRunning).toBeFalsy();
      expect(wrapper.vm.isGameEnd).toBeTruthy();
      expect(showToastr).toHaveBeenCalled();
    });
  });

  describe("distributeCards method should ditribute undistributed cards to decks", () => {
    it("should distribute all undistributed cards to decks and set is open true each of last cards", async () => {
      let undistributedDeck = [
        { cardNumber: "10", deck: 11, isOpen: true, type: 1, value: 10 },
        { cardNumber: "4", deck: 11, isOpen: true, type: 1, value: 4 },
      ];
      let decks = [
        [{ cardNumber: "3", deck: 3, isOpen: true, type: 1, value: 3 }],
        [{ cardNumber: "5", deck: 3, isOpen: true, type: 1, value: 5 }],
      ];

      let expectedDecks = [
        [
          { cardNumber: "3", deck: 3, isOpen: true, type: 1, value: 3 },
          { cardNumber: "4", deck: 11, isOpen: true, type: 1, value: 4 },
        ],
        [
          { cardNumber: "5", deck: 3, isOpen: true, type: 1, value: 5 },
          { cardNumber: "10", deck: 11, isOpen: true, type: 1, value: 10 },
        ],
      ];

      await wrapper.setData({ undistributedDeck: undistributedDeck });
      await wrapper.setData({ decks: decks });

      await wrapper.vm.distributeCards();

      expect(wrapper.vm.decks).toStrictEqual(expectedDecks);
      expect(wrapper.vm.undistributedDeck).toStrictEqual([]);
    });
  });

  describe("removeSelections method should set empty relevant data", () => {
    it("should set empty relevant data", async () => {
      await wrapper.vm.removeSelections();

      expect(wrapper.vm.selectedCard).toStrictEqual({});
      expect(wrapper.vm.targetCard).toStrictEqual({});
      expect(wrapper.vm.selectedCards).toStrictEqual([]);
      expect(wrapper.vm.selectedDeck).toStrictEqual([]);
      expect(wrapper.vm.targetDeck).toStrictEqual([]);
    });
  });

  describe("getTimerValue method should set timerValue to calculated timer value in timer component", () => {
    it("should set timer value to 100 when timer component return 100", async () => {
      await wrapper.vm.getTimerValue();

      expect(wrapper.vm.timerValue).toEqual(100);
    });
  });

  describe("updateScore method should update score from given type", () => {
    it("should update score to 'base score + move point' when type is Move", async () => {
      let baseScore = 100;

      await wrapper.setData({ score: baseScore });
      await wrapper.vm.updateScore(scoreTypeEnum.Move);

      expect(wrapper.vm.score).toEqual(baseScore + app.movePoint);
    });

    it("should update score to 'base score + deck complate point' when type is DeckComplate", async () => {
      let baseScore = 100;

      await wrapper.setData({ score: baseScore });
      await wrapper.vm.updateScore(scoreTypeEnum.DeckComplate);

      expect(wrapper.vm.score).toEqual(baseScore + app.deckComplatePoint);
    });

    it("should update score to 'base score + deck complate point - timerValue' when type is GameEnd", async () => {
      let baseScore = 200;

      await wrapper.setData({ score: baseScore });
      await wrapper.vm.updateScore(scoreTypeEnum.GameEnd);

      expect(wrapper.vm.score).toEqual(baseScore - 100);
    });

    it("should not update when given parameter is irrelevant", async () => {
      let baseScore = 200;

      await wrapper.setData({ score: baseScore });
      await wrapper.vm.updateScore("something irrelevant");

      expect(wrapper.vm.score).toEqual(baseScore);
    });
  });
});
