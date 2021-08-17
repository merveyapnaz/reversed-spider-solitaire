<template>
  <div>
    <div class="header">
      <h1 class="title">Reversed Spider Solitaire</h1>
      <div class="header-items">
        <timer ref="timer" :isRunning="isTimerRunning" />
        <score-table :score="score" />
        <new-game-button />
      </div>
    </div>
    <div class="board">
      <div class="board-header">
        <div class="undistributed-deck">
          <card
            v-if="undistributedDeck.length"
            :card="distributeCard"
            @click.native="distributeCards"
          />
          <card
            v-else
            :card="{
              type: cardTypeEnum.Holder,
            }"
          />
        </div>
        <div class="complated-decks">
          <div
            v-for="comletedDeck in complatedDeckCount"
            :key="'completedDeck' + comletedDeck"
          >
            <card
              :card="{
                type: cardTypeEnum.Complated,
              }"
            />
          </div>
          <div
            v-for="uncomletedDeck in unComplatedDeckCount"
            :key="'uncomletedDeck' + uncomletedDeck"
          >
            <card :card="holderCard" />
          </div>
        </div>
      </div>

      <div class="board-body">
        <div class="" v-for="(deck, index) in decks" :key="index">
          <div
            v-if="!deck.length"
            class="card-content"
            draggable="true"
            @dragenter="dragEnter(deck, holderCard)"
          >
            <card :card="holderCard" />
          </div>
          <div v-else>
            <div
              class="cards"
              v-for="cardItem in deck"
              :key="cardItem.cardNumber + cardItem.deck"
              @dragstart="dragStart(cardItem, deck)"
              @dragend="dragEnd()"
              @dragenter="dragEnter(deck, cardItem)"
              @select="distributeCards"
            >
              <card :card="cardItem" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- For Congratulations Animation -->
    <firework v-show="isGameEnd" />
  </div>
</template>

<script>
import Card from "../components/Card/Card";
import Firework from "../components/Firework/Firework";
import Timer from "../components/Timer";
import ScoreTable from "../components/ScoreTable";
import NewGameButton from "../components/NewGameButton";
import { cardTypeEnum } from "@/common/enums/cardTypeEnum";
import { scoreTypeEnum } from "@/common/enums/scoreTypeEnum";
import spiderSolitaireService from "@/common/services/spiderSolitaireService";

export default {
  name: "SpiderSolitaire",
  components: {
    card: Card,
    firework: Firework,
    timer: Timer,
    "score-table": ScoreTable,
    "new-game-button": NewGameButton,
  },
  data() {
    return {
      decks: [],
      complatedDeckCount: 0,
      unComplatedDeckCount: this.$app.totalDeckCount,
      undistributedDeck: [],
      selectedCard: {},
      selectedCards: [],
      selectedDeck: [],
      targetCard: {},
      targetDeck: [],
      isTimerRunning: true,
      isGameEnd: false,
      timerValue: 0,
      score: 0,
      cardTypeEnum: cardTypeEnum,
      holderCard: {
        type: cardTypeEnum.Holder,
      },
      complatedCard: {
        type: cardTypeEnum.Complated,
      },
      distributeCard: {
        type: cardTypeEnum.Distribute,
      },
    };
  },
  watch: {
    complatedDeckCount() {
      this.unComplatedDeckCount =
        this.$app.totalDeckCount - this.complatedDeckCount;
    },
  },
  methods: {
    initializeCards() {
      let allDecks = spiderSolitaireService.initializeCards();

      this.undistributedDeck = allDecks.undistributedDeck;
      this.decks = allDecks.distributedDecks;
    },
    dragStart(card, deck) {
      this.selectedDeck = deck;
      this.selectedCard = card;

      //Find index of selected card in deck
      let selectedCardIndex = this.selectedDeck.findIndex(
        (item) =>
          item.cardNumber === this.selectedCard.cardNumber &&
          item.deck === this.selectedCard.deck
      );

      this.selectedCards = this.selectedDeck.slice(selectedCardIndex);

      if (!spiderSolitaireService.moveCheck(card, this.selectedCards)) {
        this.$Toastr.showToastr("error", "You can't move selected card.");
        this.removeSelections();
      }
    },
    dragEnter(deck, card) {
      this.targetCard = card;
      this.targetDeck = deck;
    },
    dragEnd() {
      if (
        spiderSolitaireService.dropCheck(this.targetCard, this.selectedCard)
      ) {
        this.selectedDeck.splice(this.selectedCards.length * -1);

        //Open last card in deck
        if (this.selectedDeck.length) {
          this.selectedDeck[this.selectedDeck.length - 1].isOpen = true;
        }

        this.selectedCards.forEach((selectedCard) => {
          this.targetDeck.push(selectedCard);
        });

        this.updateScore(scoreTypeEnum.Move);
        this.deckComplatedCheck();
      } else if (this.targetCard != this.selectedCard) {
        this.$Toastr.showToastr("error", "You can't move card here.");
      }

      this.removeSelections();
    },
    deckComplatedCheck() {
      let openedCards = this.targetDeck.filter((card) => {
        if (card.isOpen) {
          return card;
        }
      });

      if (openedCards.length >= 13) {
        if (spiderSolitaireService.sortOfCardsCheck(openedCards.slice(-13))) {
          this.deckComplate();
        }
      }
    },
    deckComplate() {
      this.targetDeck.splice(-13);

      if (this.targetDeck.length) {
        this.targetDeck[this.targetDeck.length - 1].isOpen = true;
      }

      this.complatedDeckCount++;
      this.updateScore(scoreTypeEnum.DeckComplate);
      this.$Toastr.showToastr("success", "Deck completed successfully.");

      //All decks are complated
      if (this.complatedDeckCount == this.$app.totalDeckCount) {
        this.isTimerRunning = false;
        this.isGameEnd = true;
        this.updateScore(scoreTypeEnum.GameEnd);
        this.$Toastr.showToastr("success", "CONGRATULATIONS :) :)");
      }
    },
    distributeCards() {
      if (this.undistributedDeck.length) {
        this.decks.forEach((deck) => {
          let card = this.undistributedDeck.pop();

          card.isOpen = true;
          deck.push(card);
        });
      }
    },
    removeSelections() {
      this.selectedCard = {};
      this.selectedCards = [];
      this.selectedDeck = [];
      this.targetCard = {};
      this.targetDeck = [];
    },
    getTimerValue() {
      this.timerValue = this.$refs.timer.getTimerValue();
    },
    updateScore(type) {
      switch (type) {
        case scoreTypeEnum.Move:
          this.score += this.$app.movePoint;
          break;
        case scoreTypeEnum.DeckComplate:
          this.score += this.$app.deckComplatePoint;
          break;
        case scoreTypeEnum.GameEnd:
          this.getTimerValue();
          this.score -= this.timerValue;
          break;
        default:
          break;
      }
    },
  },
  created() {
    this.initializeCards();
  },
};
</script>

<style scoped>
@import "../styles/spider-solitaire.css";
</style>
