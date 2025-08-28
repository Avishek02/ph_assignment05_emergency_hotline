const favoriteCounterElement = document.getElementById('favorite-counter');
const favoriteButtons = document.querySelectorAll('.favorite-icon');


let favoriteCount = 0;

for(const button of favoriteButtons){
    button.addEventListener('click', () => {
        favoriteCount++;
        favoriteCounterElement.textContent = favoriteCount;
    });
}



