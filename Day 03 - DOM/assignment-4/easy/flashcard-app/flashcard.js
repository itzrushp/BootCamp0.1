// check if we are infact in flashcards.html;
if (window.location.pathname.includes("flashcards.html")) {
    loadFlashcardsPage();
}

// function to load the flashcard Pages :
function loadFlashcardsPage() {
    const topic = localStorage.getItem('selectedTopic');
    const numberOfQuestions = localStorage.getItem('selectedNumberOfQuestions');

    if (!topic || !numberOfQuestions) {
        console.log("Missing Data");
        return;
    }
    // finally display the page :
    display(numberOfQuestions, topic);
}

async function display(numberOfQuestions, topic) {

    const flashCardDoc = document.getElementById('flashcards');

    try {
        const jsonData = await fetch("topics.json");
        const jsonResponse = await jsonData.json();
        console.log(jsonResponse);
        const particularTopicData = jsonResponse[topic]; // Simple Key Access
        console.log(particularTopicData);
        if (!particularTopicData) {
            console.log("Topics Not FOUND !!");
            return;
        }

        for (let i = 0; i < numberOfQuestions && i < particularTopicData.length; i++) {

            const card = document.createElement('div');
            card.classList.add('card');

            const cardInner = document.createElement('div');
            cardInner.classList.add('card-inner');

            const front = document.createElement('div');
            front.classList.add('card-front');
            front.innerText = "Question: " + particularTopicData[i].question;

            const back = document.createElement('div');
            back.classList.add('card-back');
            back.innerText = "Answer: " + particularTopicData[i].answer;

            cardInner.appendChild(front);
            cardInner.appendChild(back);
            card.appendChild(cardInner);

            card.addEventListener('click', () => {
                card.classList.toggle('flip');
            });

            flashCardDoc.appendChild(card);
        }

    } catch (error) {
        console.log("ERROR " + error);
    }
}

