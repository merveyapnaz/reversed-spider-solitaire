# Reversed Spider Solitaire

##### Vue.js card game application. Jest was used for unit testing, cypress was used for e2e testing.

[Live Demo](http://reversed-spider-solitaire-my.herokuapp.com/)

Reversed spider solitaire is a card game played with 8 decks of cards.
The cards are shuffled and laid face down, four sixes and six fives. The last card of each set is left face up. The remaining cards, on the other hand, are divided into groups of ten in the face down position and kept above.

The order of cards should be as follows.

```
 A, 2, 3, 4, 5, 6, 7, 8 ,9 ,10, J, Q, K
```

With each card move, the card one below the move card is turned up.
If there are no cards left to move, the first set of ten cards in the above undistributed deck is dealt face up.
Each correctly sorted deck is removed from the screen and collected upwards.
The game is won when each of the eight decks is completed.

##### Timer

Calculates the elapsed time since the start of the game.

> Hurry up, every second you spend will be deducted from your endgame score.

##### Skore

For each move you make in the game, the score value is calculated according to certain rules.

##### Hint

If you feel that the game is stuck, you can immediately seek help for a hint.

#

### Carrying Cards Dealing Cards And Hint

![game](/public/gif/game.gif)

#

### End Game

![game](/public/gif/end-of-game.gif)

#

### Cypress

![game](/public/gif/cypess-test.gif)

#

### Jest Coverage

![game](/public/screenshot/coverage.JPG)

#

### Lighthouse Performance

![game](/public/screenshot/lighthouse.JPG)

#

### Heroku Deployment - Activity

![game](/public/screenshot/heroku-deploy.JPG)
![game](/public/screenshot/heroku-activity.JPG)

#

### Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```
