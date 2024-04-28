// Global variable to hold array of questions
let questions = [];
// Global variable to hold array of filtererd questions
let filteredQuestions = [];

// Function to toggle between login and register forms
function toggleForms() {
    const loginForm = document.getElementById('login-form-section');
    const registerForm = document.getElementById('register-form-section');

    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
}

// Function to open new question dialog
function openNewQuestionDialog() {
    const modal = document.getElementById('askQuestionModal');
    modal.style.display = 'block';
}

// Function to close new question dialog
function closeNewQuestionDialog() {
    const modal = document.getElementById('askQuestionModal');
    modal.style.display = 'none';
}

// Function to retrieve questions from the server
async function getQuestions() {
    try {
        const response = await fetch('http://localhost:3000/questions?_sort=createdAt&_order=desc');
        if (!response.ok) {
            throw new Error('Failed to retrieve questions');
        }
        const data = await response.json();
        questions = data;
        filteredQuestions = data;
        showQuestions(questions);
    } catch (error) {
        console.error(error);
    }
}

// Function to show questions on the page
function showQuestions(questions) {
    const questionsContainer = document.getElementById('questions-container');
    if (questionsContainer) {
        questionsContainer.innerHTML = ''; // Clear previous content

        questions.forEach(question => {
            // Create question container
            console.log(question);
            const questionContainer = document.createElement('div');
            questionContainer.classList.add('Question');

            // Create answer number container
            const answerNumContainer = document.createElement('div');
            answerNumContainer.classList.add('answerNum');

            // Create correct icon
            const correctIcon = document.createElement('div');
            correctIcon.id = 'correct';
            correctIcon.textContent = '✓';

            // Create answer count
            const answerCount = document.createElement('div');
            answerCount.textContent = `${question.answers.length} Answer`;

            // Append correct icon and answer count to answer number container
            answerNumContainer.appendChild(correctIcon);
            answerNumContainer.appendChild(answerCount);

            // Create question details container
            const questionDetails = document.createElement('div');
            questionDetails.classList.add('questionAsked');

            // Create question title
            const questionTitle = document.createElement('h2');
            const questionLink = document.createElement('a');
            questionLink.href = `question.html?id=${question.id}`;
            questionLink.textContent = question.title;
            questionTitle.appendChild(questionLink);

            // Create question description
            const questionDescription = document.createElement('p');
            questionDescription.textContent = question.description;

            // Append title and description to question details container
            questionDetails.appendChild(questionTitle);
            questionDetails.appendChild(questionDescription);

            // Create question metadata container
            const questionMetadata = document.createElement('div');
            questionMetadata.classList.add('Asker');

            // Create asked by text
            const askedByText = document.createElement('span');
            askedByText.textContent = 'Asked by: ';

            // Create asker name
            const askerName = document.createElement('span');
            askerName.textContent = question.author.username;

            // Create asked in text
            const askedInText = document.createElement('span');
            askedInText.textContent = 'Asked in: ';

            // Create ask date
            const askDate = document.createElement('span');
            const timestamp = question.createdAt;
            const date = new Date(timestamp);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            askDate.textContent = `${year}-${month}-${day}`;

            // Append elements to question metadata container
            questionMetadata.appendChild(askedByText);
            questionMetadata.appendChild(askerName);
            questionMetadata.appendChild(document.createElement('br')); // Line break
            questionMetadata.appendChild(askedInText);
            questionMetadata.appendChild(askDate);

            // Append answer number container, question details, and metadata to question container
            questionContainer.appendChild(answerNumContainer);
            questionContainer.appendChild(questionDetails);
            questionContainer.appendChild(questionMetadata);

            // Append question container to questions container
            questionsContainer.appendChild(questionContainer);
        });
    }
}


// Function to sort questions based on criteria
function sortQuestions(criteria) {
    if (criteria === 'Oldest') {
        filteredQuestions.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (criteria === 'Newest') {
        filteredQuestions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (criteria === 'MostAnswered') {
        filteredQuestions.sort((a, b) => b.answers.length - a.answers.length);
    }
    showQuestions(filteredQuestions);
}

// Function to filter questions based on criteria
function filterQuestions(criteria) {
    if (criteria === 'Answered') {
        filteredQuestions = questions.filter(question => question.answers.length > 0);
    } else if (criteria === 'Unanswered') {
        filteredQuestions = questions.filter(question => question.answers.length === 0);
    } else if (criteria === 'All') {
        filteredQuestions = questions;
    }
    showQuestions(filteredQuestions);
}
// Function to validate login form
function validateLoginForm(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    console.log(email, password);
    // Validate email and password
    if (!email || !password) {
        alert('Please enter email and password');
        return;
    }

    // Send login request
    fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Incorrect email or password');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('user', JSON.stringify(data));
            window.location.href = 'index.html';
        })
        .catch(error => {
            alert(error.message);
        });
}

// Function to validate registration form
function validateRegisterForm(event) {
    event.preventDefault();
    const email = document.getElementById('register-email').value;
    const fullName = document.getElementById('register-fullName').value;
    const bio = document.getElementById('register-Bio').value;
    const password = document.getElementById('register-password').value;
    // Additional validation for other fields

    // Validate required fields
    if (!fullName || !email || !password) {
        alert('Please fill in all required fields');
        return;
    }

    // Send registration request
    fetch('http://localhost:3000/register', {
        method: 'POST',
        body: JSON.stringify({ fullName, email, password, bio }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then((data) => {
                    if (data) {
                        throw new Error(data);
                    }
                    else {
                        throw new Error('Error signing up')
                    }
                });
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('user', JSON.stringify(data));
            window.location.href = 'index.html';
        })
        .catch(error => {
            console.log(error);
            alert(error.message);
        });
}
// Function to validate new question form
function validateNewQuestionForm(event) {
    event.preventDefault();
    const title = document.getElementById('new-question-title').value;
    const description = document.getElementById('new-question-description').value;
    const tags = document.getElementById('new-question-tags').value.split(',');

    // Read user information from localStorage or use default values
    const userIndLocalStorage = JSON.parse(localStorage.getItem('user'));
    let user;
    if(!userIndLocalStorage || !userIndLocalStorage.user){
        user = { id: 1, fullName: 'Anonymous' };
    }
    else{
        user = userIndLocalStorage.user;
    }
    // Populate additional fields
    const newQuestion = {
        title,
        description,
        tags,
        author: {id:user.id, username:user.fullName},
        answers: [],
        answered: false,
        createdAt: new Date().toISOString()
    };

    // Send new question request
    fetch('http://localhost:3000/questions', {
        method: 'POST',
        body: JSON.stringify(newQuestion),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to submit question');
            }
            return response.json();
        })
        .then(data => {
            console.log('Question submitted successfully:', data);
            window.location.reload();
        })
        .catch(error => {
            alert(error.message);
        });
}

const fullText = document.getElementById('full-text');
if (fullText) {
    fullText.addEventListener('click', openNewQuestionDialog);
}
const shortText = document.getElementById('short-text');
if (shortText) {
    shortText.addEventListener('click', openNewQuestionDialog);
}
const closeModalButton = document.etElementById('close-modal-btn');
if (closeModalButton) {
    closeModalButton.addEventListener('click', closeNewQuestionDialog);
}
const loginForm = document.getElementById('login-form')
if (loginForm) {
    loginForm.addEventListener('submit', validateLoginForm);
}
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', validateRegisterForm);
}
const newQuestionForm = document.getElementById('new-question-form');
if (newQuestionForm) {
    newQuestionForm.addEventListener('submit', validateNewQuestionForm);
}

const sortSelect = document.getElementById('Sort');
if (sortSelect) {
    // Add event listener for sorting
    sortSelect.addEventListener('change', function () {
        const selectedSortCriteria = sortSelect.value;

        sortQuestions(selectedSortCriteria);
    });
}
const filterSelect = document.getElementById('Filter');
if (filterSelect) {
    // Add event listener for filtering
    filterSelect.addEventListener('change', function () {
        const selectedFilterCriteria = filterSelect.value;
        filterQuestions(selectedFilterCriteria);
    });
}

// Initial actions
getQuestions();

// Event listener for page load to check localStorage
window.addEventListener('load', () => {
    console.log("Page reloaded")
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        const loginLink = document.getElementById('login-link');
        if (loginLink) {
            loginLink.style.display = 'none';
        }
    }
});