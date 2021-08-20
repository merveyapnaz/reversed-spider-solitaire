<template>
  <div>
    <div class="header">
      <h1 class="title">Reversed Spider Solitaire</h1>
      <div class="header-items">
        <timer ref="timer" :isRunning="isTimerRunning" />
        <score-table :score="score" />
        <custom-button :type="buttonTypeEnum.Hint" @hint="hint" />
        <custom-button :type="buttonTypeEnum.NewGame" @newGame="newGame" />
      </div>
    </div>
    <div class="board">
      <div class="board-header">
        <div class="undistributed-deck">
          <card
            v-if="undistributedDeck.length"
            :card="distributeCard"
            @click.native="distributeCards"
            :key="refreshCard + 'Distribute'"
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
              @dragenter="dragEnter(deck)"
              @select="distributeCards"
            >
              <card :card="cardItem" :key="refreshCard" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- For Congratulations Animation -->
    <firework v-show="isGameEnd" />
    <confirm-modal
      text="Are you sure you want to start a new game?"
      @confirmModalResponse="confirmModalResponse"
      v-show="confirmModalShow"
    />
  </div>
</template>

<script>
import Card from "../components/Card/Card";
import Firework from "../components/Firework/Firework";
import Timer from "../components/Timer";
import ScoreTable from "../components/ScoreTable";
import Button from "../components/Button";
import ConfirmModal from "../components/ConfirmModal/ConfirmModal";
import { cardTypeEnum } from "@/common/enums/cardTypeEnum";
import { scoreTypeEnum } from "@/common/enums/scoreTypeEnum";
import { buttonTypeEnum } from "@/common/enums/buttonTypeEnum";
import spiderSolitaireService from "@/common/services/spiderSolitaireService";

export default {
  name: "SpiderSolitaire",
  components: {
    card: Card,
    firework: Firework,
    timer: Timer,
    "score-table": ScoreTable,
    "custom-button": Button,
    "confirm-modal": ConfirmModal,
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
      buttonTypeEnum: buttonTypeEnum,
      holderCard: {
        type: cardTypeEnum.Holder,
      },
      complatedCard: {
        type: cardTypeEnum.Complated,
      },
      distributeCard: {
        type: cardTypeEnum.Distribute,
      },
      refreshCard: 0,
      confirmModalShow: false,
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
    dragEnter(deck, holderCard = null) {
      this.targetDeck = deck;

      if (holderCard != null) {
        this.targetCard = holderCard;
      } else {
        this.targetCard = deck[deck.length - 1];
      }
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
    newGame() {
      this.confirmModalShow = true;
    },
    hint() {
      let isThereAnyTip = false;

      for (
        let recomendedIndex = 0;
        recomendedIndex < this.decks.length;
        recomendedIndex++
      ) {
        let recomendedCards = this.decks[recomendedIndex].filter((item) => {
          if (item.isOpen) {
            return item;
          }
        });

        if (recomendedCards.length <= 0 || isThereAnyTip) {
          break;
        }

        let isRecomendedCardsSorted = false;

        while (!isRecomendedCardsSorted) {
          if (spiderSolitaireService.sortOfCardsCheck(recomendedCards)) {
            isRecomendedCardsSorted = true;
          } else {
            recomendedCards.shift();
          }
        }

        for (
          let targetIndex = 0;
          targetIndex < this.decks.length;
          targetIndex++
        ) {
          let targetCards = this.decks[targetIndex];

          if (
            recomendedIndex != targetIndex &&
            this.checkHintTargetDeckMove(targetCards, recomendedCards)
          ) {
            targetCards[targetCards.length - 1].isSelected = true;
            recomendedCards.forEach((recomendedCard) => {
              recomendedCard.isSelected = true;
            });

            this.refreshCard++;
            isThereAnyTip = true;

            break;
          }

          if (isThereAnyTip) {
            break;
          }
        }
      }

      if (!isThereAnyTip) {
        if (this.undistributedDeck.length > 0) {
          this.distributeCard.isSelected = true;
          this.refreshCard++;
        } else {
          this.$Toastr.showToastr(
            "warning",
            "There are no possible moves left."
          );
        }
      }

      this.removeHintSelections();
    },
    checkHintTargetDeckMove(targetCards, recomendedCards) {
      let result = false;

      if (
        targetCards.length > 0 &&
        targetCards[targetCards.length - 1].isOpen &&
        spiderSolitaireService.dropCheck(
          targetCards[targetCards.length - 1],
          recomendedCards[0]
        )
      ) {
        result = true;
      }

      return result;
    },
    removeHintSelections() {
      setTimeout(() => {
        this.decks.forEach((deck) => {
          deck.forEach((card) => {
            card.isSelected = false;
          });
        });

        this.distributeCard.isSelected = false;

        this.refreshCard++;
      }, 1000 * 1);
    },
    confirmModalResponse(response) {
      if (response) {
        this.openNewGame();
      }

      this.confirmModalShow = false;
    },
    openNewGame() {
      //reload page for new game
      window.location.reload();
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
