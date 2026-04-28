// script.js

// Step 1: Retrieving Elements
// We can select elements by their ID. This is the most common way.
// The `document` object represents our entire HTML page.
// `getElementById` finds the element with the matching ID.

const mainTitle = document.getElementById('main-title');
const changeButton = document.getElementById('change-button');
const container = document.getElementById('container');

// We can also use `querySelector`. It's more flexible and uses CSS selectors.
// It will only return the *first* matching element it finds.
const paragraph = document.querySelector('p');

// Let's log them to the console to see what we got!
// Open the developer tools in your browser (Cmd+Opt+J or Ctrl+Shift+J) to see these.
console.log(mainTitle);
console.log(changeButton);
console.log(paragraph);

// Step 2: Changing Elements
// Let's change the main title's text
mainTitle.textContent = 'Welcome to JavaScript!';

// Let's make the paragraph blue and a bit larger
paragraph.style.color = 'blue';
paragraph.style.fontSize = '18px';

// Step 3: Creating and Adding New Elements
// 1. Create a new element
const newParagraph = document.createElement('p');

// 2. Give it some content
newParagraph.textContent = 'This paragraph was created with JavaScript!';

// 3. Add it to the page. We'll append it as a child of our 'container' div.
container.appendChild(newParagraph);

// Step 4: Event Listeners - The Core of Interactivity
// The pattern: element.addEventListener('eventType', functionToRunWhenEventHappens);

changeButton.addEventListener('click', () => {
    // This code inside the curly braces will ONLY run when the button is clicked.
    
    console.log('Button was clicked!');

    // Let's change the main title's style by adding a CSS class.
    // .classList.toggle will add the class if it's not there, and remove it if it is.
    mainTitle.classList.toggle('highlight');

    // Let's also add a new element to our container every time we click
    const newElement = document.createElement('div');
    newElement.textContent = 'A new element appeared!';
    container.appendChild(newElement);
});
