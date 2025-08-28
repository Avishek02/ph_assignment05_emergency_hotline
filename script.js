const favoriteCounterElement = document.getElementById('favorite-counter');
const favoriteButtons = document.querySelectorAll('.favorite-icon');

const coinCounterElement = document.getElementById('coin-counter');
const callButtons = document.querySelectorAll('button[id $= "-btn-call"]');

let favoriteCount = 0;
let coinCount = 100;

for(const button of favoriteButtons){
    button.addEventListener('click', () => {
        favoriteCount++;
        favoriteCounterElement.textContent = favoriteCount;
    });
}

for(const button of callButtons){
    button.addEventListener('click', () => {
        if(coinCount > 0){
            coinCount-= 20;
            coinCounterElement.textContent = coinCount;
        }else{
            alert("You have no coins left to call");
        }
    });
}



