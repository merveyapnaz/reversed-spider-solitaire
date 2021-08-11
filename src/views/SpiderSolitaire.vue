<template>
  <div>
    <div class="header">
      <h1 class="title">Reversed Spider Solitaire</h1>
      <div class="header-items">
        <timer ref="timer" :isRunning="isTimerRunning" />
        <score-table
          :deckCount="complatedDeckCount"
          :moveCount="moveCount"
          :isGameEnd="isGameEnd"
          :timerValue="timerValue"
        />
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
              @dragstart="dragStart($event, cardItem, deck)"
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
      moveCount: 0,
      timerValue: 0,
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
      let allDecks = this.$utilities.initializeCards();

      this.undistributedDeck = allDecks.undistributedDeck;
      this.decks = allDecks.distributedDecks;
    },
    dragStart(event, card, deck) {
      this.selectedDeck = deck;
      this.selectedCard = card;
      this.selectedCards = this.selectedDeck.slice(
        this.selectedDeck.indexOf(card)
      );

      if (!this.$utilities.moveCheck(card, this.selectedCards)) {
        this.$Toastr.showToastr("error", "You can't move selected card.");
        this.removeSelections();
      }
    },
    dragEnter(deck, card) {
      this.targetCard = card;
      this.targetDeck = deck;
    },
    dragEnd() {
      if (this.$utilities.dropCheck(this.targetCard, this.selectedCard)) {
        this.selectedDeck.splice(this.selectedCards.length * -1);

        if (this.selectedDeck.length) {
          this.selectedDeck[this.selectedDeck.length - 1].isOpen = true;
        }

        this.selectedCards.forEach((selectedCard) => {
          this.targetDeck.push(selectedCard);
        });

        this.moveCount++;
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
        if (!this.$utilities.sortOfCardsCheck(openedCards.slice(-13))) {
          return false;
        } else {
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
      this.$Toastr.showToastr("success", "Deck completed successfully.");

      if (this.complatedDeckCount == this.$app.totalDeckCount) {
        this.isTimerRunning = false;
        this.isGameEnd = true;
        this.getTimerValue();
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
  },
  created() {
    this.initializeCards();
  },
};
</script>

<style scoped>
@import "../styles/spider-solitaire.css";
</style>
