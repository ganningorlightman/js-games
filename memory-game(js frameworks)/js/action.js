(function () {

    const cards = document.querySelectorAll('.memory-card');
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let timeoutId = null;

    function shuffle() {
        cards.forEach(card => {
            const ramdomPos = Math.floor(Math.random() * 12);
            card.style.order = ramdomPos;
        });
    }
    shuffle();
    cards.forEach(card => card.addEventListener('click', flipCard));
    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function restart() {
        clearTimeout(timeoutId);
        resetBoard();
        shuffle();
        cards.forEach(card => {
            card.classList.remove('flip');
            card.removeEventListener('click', flipCard);
            card.addEventListener('click', flipCard);
        });
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;

        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
        isMatch ? disableCards() : unFlipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();
    }

    function unFlipCards() {
        lockBoard = true;

        timeoutId = setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard();
        }, 1500);
    }

})();