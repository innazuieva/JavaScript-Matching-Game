// $('.box').click(function () {
//     var color = $(this).css('background-color', 'red')
// })


// Cards

// Card Class
class Card {
    constructor(path, name, number) {
        this.path = path;
        this.alt = name;
        this.number = number;
    }

}

// Create 12 instances of the card class
const cards = [];
// 01
cards[0] = new Card('images/01.jpg', '01', 1);
cards[1] = new Card('images/01.jpg', '01', 1);
// 02
cards[2] = new Card('images/02.jpg', '02', 2);
cards[3] = new Card('images/02.jpg', '02', 2);
// 03
cards[4] = new Card('images/03.jpg', '03', 3);
cards[5] = new Card('images/03.jpg', '03', 3);
// 04
cards[6] = new Card('images/04.jpg', '04', 4);
cards[7] = new Card('images/04.jpg', '04', 4);
// 05
cards[8] = new Card('images/05.jpg', '05', 5);
cards[9] = new Card('images/05.jpg', '05', 5);
// 06
cards[10] = new Card('images/06.jpg', '06', 6);
cards[11] = new Card('images/06.jpg', '06', 6);







//----------------------------- Game Constructor ------------------------------------

const gameState = {
    START: 'start',
    WIN: 'win',
    TIMEOUT: 'timeout',
    GAME: 'game'
}

const gameTimeOut = 45;

function convertTimeCounterToDisplayedValue(timeCounter) {
    return timeCounter > 9 ? "" + timeCounter : "0" + timeCounter;
}

class Game {

    constructor() {
        this._setUpElements(); // line 70
        this._setUpCards(); // line 85
        this._setUpGameStats(); // line 62
        this._updateGameState(gameState.START);

    }


    //  "_" - private method

    _updateGameState(gameState) {
        this.gameState = gameState;
        this._updateUIBasedOnGameState();
    }


    _updateUIBasedOnGameState() {

        switch (this.gameState) {
            case gameState.START:
                console.log($('#win, #time-is-out, #game-board'));
                $('#win').parent().addClass('hidden');
                $('#game-board').addClass('hidden');
                $('#time-is-out').parent().addClass('hidden');
                $('#start-game').parent().removeClass('hidden');
                break;
            case gameState.GAME:
                $('#win').parent().addClass('hidden');
                $('#start-game').parent().addClass('hidden');
                $('#time-is-out').parent().addClass('hidden');
                $('#game-board').removeClass('hidden');
                break;
            case gameState.WIN:
                $('#start-game').parent().addClass('hidden');
                $('#game-board').addClass('hidden');
                $('#time-is-out').parent().addClass('hidden');
                $('#win').parent().removeClass('hidden');
                break;
            case gameState.TIMEOUT:
                $('#start-game').parent().addClass('hidden');
                $('#game-board').addClass('hidden');
                $('#win').parent().addClass('hidden');
                $('#time-is-out').parent().removeClass('hidden');
                break;
        }
    }

    //------------------------------ Game Stats Function ------------------------------


    _setUpGameStats() {
        this.clickCounter = 0;
        this.matches = 0;
        this.winningMatches = this.element.cards.length / 2;
        this.counter = gameTimeOut;
        this._updateTotalClickCounter(0);
    }


    //--------------------------- Get HTML Elements Function --------------------------


    _setUpElements() {

        // Object - Store HTML elements
        this.element = {}

        // Grab the HTML element
        this.element.html = $('html');
        this.element.body = $('body');
        this.element.cards = $('.card');
    }


    //------------------------------ Store Cards Function -----------------------------



    _setUpCards() {

        // Store Cards
        this.cards = cards;

        // Array - Store open Cards
        this.openCards = [];
    }



    //------------------------------ Game Start - Init Function ------------------------



    // Calls _placeCards method

    init() {
        console.log('from init')

        this._placeCards(this.cards, this.element.cards);
        this._setStats();
        this._updateGameState(gameState.GAME);
    }




    //---------------------------- Update UI for Total Click Counter ----------------------



    _updateUIForTotalClickCounter() {
        console.log("Current cLick counter = " + this.totalClickCounter);
        $('#turns').html("Turns: " + this.totalClickCounter);
    }




    //---------------------------- Update Total Click Counter ----------------------



    _updateTotalClickCounter(totalClickCounter) {
        this.totalClickCounter = totalClickCounter;
        this._updateUIForTotalClickCounter();
    }




    //------------------------------ ClickCards Function ------------------------



    // clickCards -> open the first card -> ignore clicks on the open cards -> opens a second card -> compares the two open cards -> closes the cards if no match -> leaves them open if they are a match -> keeps track of the number of clicks per turn



    handleClickedCard(element) {
        if (element.hasClass('open')) {
            console.log("Card is already opened")
            return;
        }

        this.clickCounter++;
        this._updateTotalClickCounter(this.totalClickCounter + 1);


        // Open Card
        element.addClass('open');
        console.log(element)

        // Store in Array
        this.openCards.push(element);



        if (this.clickCounter == 2) {
            console.log("2 cards selected");

            // It's second click

            this.clickCounter = 0;
            this._isMatched(this.openCards[0], this.openCards[1]);
        }
    }



    //------------------------------ Is Match? Function ------------------------



    _isMatched(card1, card2) {

        // TODO: Remove
        // this._endGame(gameState.WIN);
        // return;

        console.log("card#1 " +
            card1)
        console.log("card#2 " +
            card2)

        if (card1.data('number') === card2.data('number')) {
            console.log(card2.data('number'));
            console.log("Cards matched with number: " + card2.data('number'));
            card1.addClass('matched');
            card2.addClass('matched');

            // Add to this.matches (line 64)
            this.matches++;


            if (this.matches === this.winningMatches) {

                this._endGame(gameState.WIN);
                return; //Not to execute anything else
            }

            this.openCards = []; //Empty Array
            return true;
        }

        console.log("Cards didn't match, number1: " + card1.data('number') + ", number2: " + card2.data('number'));


        //If No Match
        setTimeout(function () {

            card1.removeClass('open');
            card2.removeClass('open');

        }, 750);

        this.openCards = []; //Empty Array
        return false;

    }



    //------------------------------ End Game Function ---------------------------


    _endGame(gameState) {
        this._updateGameState(gameState)
    }






    //--------------------------------- Reset -----------------------------------


    _reset() {
        console.log('from reset')
        this.element.cards.each(function () {
            $(this).removeClass('open');
        });
        this.openCards = [];
        this.matches = 0;
        this.clickCounter = 0;
        this._updateTotalClickCounter(0);
        this.counter = gameTimeOut;

        this.element.cards.each(function (i) {

            // Add the image element to the "card-back" element
            $(this).children('.card-back')
                .empty();
        });



        this.init();

    }




    //----------------------------- Place Cards on GameBoard ------------------------



    _placeCards(cards, cardsElement) {

        cards = this._shuffleCards(cards);

        console.log(cards);

        // Loop through each(), place a card image inside each card div
        cardsElement.each(function (i) {

            // Stores a unique identifier number in each card element
            $(this).data('number', cards[i].number);

            // Creates a temporary image element
            const $img = $('<img>');

            // Sets the "src" of the image element
            $img.attr('src', cards[i].path);

            // Sets the "alt" of the image element
            $img.attr('alt', cards[i].alt);

            // Add the image element to the "card-back" element
            $(this).children('.card-back')
                .append($img);
        });

    }



    //------------------------------ Shuffle Cards Function ------------------------



    _shuffleCards(cards) {

        let j, x, i;
        for (i = cards.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = cards[i];
            cards[i] = cards[j];
            cards[j] = x;
        }
        return cards;
    }



    //------------------------------ Set Stats Function ------------------------


    _setStats() {

        console.log('hello')
        const timeCounter = document.getElementById("time-counter");

        if (this.counter > 0) {

            timeCounter.innerHTML = "Time: 00:" + convertTimeCounterToDisplayedValue(this.counter);

            setTimeout(function () {
                if (this.gameState === gameState.GAME) {
                    this.counter--;
                    console.log('counter')
                    this._setStats();
                }
            }.bind(this), 1000);



        } else {
            this.counter = gameTimeOut;
            this._endGame(gameState.TIMEOUT);
        }
    };

}



//--------------------------------- Initialize Game --------------------------------



const game = new Game();


$('#start-button').click(function () {
    console.log('start-button')
    game.init();

});

$('.restart-game').click(function () {
    game._reset();
});


game.element.cards.click(function () {
    console.log("Clicked card: " + $(this));
    game.handleClickedCard($(this));
});





// $("#card").flip({
//     trigger: 'click'
// });
// $("#card").flip('toggle');