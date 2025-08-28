const favoriteCounterElement = document.getElementById('favorite-counter');
const coinCounterElement = document.getElementById('coin-counter');
const copyCounterElement = document.getElementById('copy-counter');
const callHistoryContainer = document.getElementById('history-list-container');



const favoriteButtons = document.querySelectorAll('.favorite-icon');
const callButtons = document.querySelectorAll('button[id $= "-btn-call"]');
const copyButtons = document.querySelectorAll('button[id $= "-btn-copy"]');


let favoriteCount = 0;
let coinCount = 100;
let copyCount = 0;


function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
}


for (const button of favoriteButtons) {
    button.addEventListener('click', () => {
        favoriteCount++;
        favoriteCounterElement.textContent = favoriteCount;
    });
}

for (const button of callButtons) {
    button.addEventListener('click', () => {
        if (coinCount > 0) {
            coinCount -= 20;
            coinCounterElement.textContent = coinCount;


            const servicePrefix = button.id.replace('-btn-call', '');
            const serviceNameElement = document.getElementById(`${servicePrefix}-service-name`);
            const serviceNumberElement = document.getElementById(`${servicePrefix}-service-number`);


            const serviceName = serviceNameElement.textContent;
            const serviceNumber = serviceNumberElement.textContent;

            const clickTime = getCurrentTime();

            const callHistoryItemHTML = `
                        <div class="flex justify-between items-center">

                            <div>
                                <p class="font-semibold">${serviceName}</p>
                                <p >${serviceNumber}</p>
                            </div>

                            <p >${clickTime}</p>
                        </div>
        `;


            callHistoryContainer.insertAdjacentHTML('afterbegin', callHistoryItemHTML);
        } else {
            alert("You have no coins left to call");
        }



    });
}



for (const button of copyButtons) {
    button.addEventListener('click', () => {
        copyCount++;
        copyCounterElement.textContent = copyCount;

    });
}



