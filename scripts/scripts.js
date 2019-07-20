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



class Game {

    constructor() {
        this._setUpElements(); // line 70
        this._setUpCards(); // line 85
        this._setUpGameStats(); // line 62
    }


    //  "_" - private method



    //------------------------------ Game Stats Function ------------------------------


    _setUpGameStats() {
        this.clickCounter = 0;
        this.matches = 0;
        this.winningMatches = this.element.cards.length / 2;
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
        this._placeCards(this.cards, this.element.cards);
    }



    //------------------------------ ClickCards Function ------------------------



    // clickCards -> open the first card -> ignore clicks on the open cards -> opens a second card -> compares the two open cards -> closes the cards if no match -> leaves them open if they are a match -> keeps track of the number of clicks per turn



    handleClickedCard(element) {
        if (element.hasClass('open')) {
            console.log("Card is already opened")
            return;
        }

        this.clickCounter++;

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

        if (card1.data('number') === card2.data('number')) {
            console.log("Cards matched with number: " + card2.data('number'));
            card1.addClass('matched');
            card2.addClass('matched');

            // Add to this.matches (line 64)
            this.matches++;


            if (this.matches === this.winningMatches) {

                this._endGame();
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


    _endGame() {

        setTimeout(function () {
            alert('Congratulations! You won!!!');
        }, 500);
        const restart = function () {
            alert("Restart the Game?");
            console.log(this);
            this._reset();
        };
        const restartBindedToGame = restart.bind(this);
        setTimeout(restartBindedToGame, 2000);
        //eto pisec!!!!!!!
    }


    //--------------------------------- Reset -----------------------------------


    _reset() {
        this.element.cards.each(function () {
            $(this).removeClass('open');
        });
        this.openCards = [];
        this.matches = 0;



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

}



//--------------------------------- Initialize Game --------------------------------



const game = new Game();

game.init();

// $('#temp').click(function(){
//     game.init();
// });

game.element.cards.click(function () {
    console.log("Clicked card: " + $(this));
    game.handleClickedCard($(this));
});