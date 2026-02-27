/**
the final flow becomes:
index.html
→ user selects topic
→ click submit
→ store data (local storage)
→ redirect
→ flashcards.html loads
→ read stored data
→ render cards
 */
const topicsArray = ["Maths", "Physics", "Chemistry", "JavaScript", "C++"];

const topicListsElement = document.getElementById("topics_list");

topicsArray.forEach((topic) => {
    // render that topics into the topicLists :

    // Create this: <li class="listelement" onclick="topicClickHandler" id="Maths">Maths</li>
    const listElement = document.createElement('li');
    listElement.innerHTML = topic;
    listElement.setAttribute('id', topic);
    listElement.classList.add('listelement');
    listElement.addEventListener('click', () => {
        // remove active from all
        document.querySelectorAll('.listelement')
            .forEach(el => el.classList.remove('active'));

        // add active to clicked
        listElement.classList.add('active');
        topicClickHandler(topic);
    })

    console.log(listElement.innerText);

    // Append this to the TopicListsElement
    topicListsElement.appendChild(listElement);
})

let ClickedTopic = "";

function topicClickHandler(topic) {
    ClickedTopic = topic;
    console.log(ClickedTopic);

}

function handleSubmit() {
    // getting the number of question and selected topic
    const inputQuestions = document.getElementById("inputval");
    let questions = inputQuestions.value;
    let subjectChosen = ClickedTopic;

    if(!questions || !subjectChosen){
        alert("Please select the subject and number of questions");
        return;
    }
    if(questions > 20){
        alert("Please set the number of questions less than 20");
        return;
    }
    // store data temporarily in localStorage
    localStorage.setItem('selectedTopic' , subjectChosen);
    localStorage.setItem('selectedNumberOfQuestions' , questions);

    console.log("Questions : " + questions + " " + "TopicChosen : " + subjectChosen);

    // Navigate to the flashcards.html;
    window.location.href = "flashcards.html";

}









