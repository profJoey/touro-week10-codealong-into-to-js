# Code-Along Week 10: Introduction to JavaScript

Welcome to JavaScript! So far, you've learned how to structure a webpage with HTML and style it with CSS. Now, we're going to add interactivity and make our pages dynamic using JavaScript.

JavaScript is a programming language that runs in the browser and allows us to manipulate the content and style of our webpage in response to user actions.

---

### The HTML Document as a Data Structure (The DOM)

An HTML document is structured as a collection of nested elements. When the browser loads it, it creates a tree-like data structure where every element is a "node" that can have parents, children, and siblings.

**Consider this simple HTML:**

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1 id="main-title">Welcome!</h1>
  <p class="intro">This is a paragraph.</p>
  <div>
    <p>Another paragraph inside a div.</p>
  </div>
</body>
</html>
```

**The browser sees it as a navigable tree of nodes:**

-   `html` (The root node)
    -   `head`
        -   `title`
            -   (text node: "My Page")
    -   `body`
        -   `h1` (with id "main-title")
            -   (text node: "Welcome!")
        -   `p` (with class "intro")
            -   (text node: "This is a paragraph.")
        -   `div`
            -   `p`
                -   (text node: "Another paragraph inside a div.")

### Navigating the DOM with JavaScript

JavaScript can access and navigate this tree using dot notation, starting from the global `document` object.

-   **Accessing the body:**
    `document.body`

-   **Getting children of an element:**
    `document.body.children` will return a collection of the `<h1>`, `<p>`, and `<div>` elements.

-   **Navigating between elements:**
    If you have a reference to the `<h1>` element, you can find its next sibling:
    `const title = document.getElementById('main-title');`
    `const firstParagraph = title.nextElementSibling; // This gets the <p class="intro">`

This ability to treat the HTML page as a manipulable data structure is the fundamental concept that makes modern, dynamic websites possible.

### Step 0: The Setup

First, let's create our three files. We've been doing this all semester.

#### `index.html`
This is our main page structure. We have a title, a paragraph, a button, and an empty `div` container. Notice the `<script src="script.js" defer></script>` at the bottom of the `<body>`. This is how we link our JavaScript file. The `defer` attribute tells the browser to load the HTML first before running the script.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JS Introduction</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <h1 id="main-title">Hello, World!</h1>
    <p>This is a simple webpage.</p>

    <button id="change-button">Click Me!</button>

    <div id="container"></div>

    <script src="script.js" defer></script>
</body>
</html>
```

#### `style.css`
Let's add some basic styles to make our page look a bit nicer. We'll also add a special class `.highlight` that we will add to elements using JavaScript later.

```css
body {
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
}

#container {
    margin-top: 20px;
    border: 1px solid #ccc;
    padding: 10px;
    min-height: 50px;
    width: 300px;
}

.highlight {
    background-color: yellow;
    font-weight: bold;
}
```

#### `script.js`
This file is currently empty. This is where we will write all our JavaScript code.

---

### Step 1: Retrieving (or Selecting) Elements

Before we can change anything, we need to get a reference to the HTML elements we want to work with. We can think of this as telling our JavaScript "Hey, I want to do something with this specific element."

In `script.js`, add the following:

```javascript
// script.js

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
```

---

### Step 2: Changing Elements

Now that we have our elements stored in variables, we can change them.

#### Changing Text
We can change the text inside an element using the `.textContent` property.

```javascript
// Let's change the main title's text
mainTitle.textContent = 'Welcome to JavaScript!';
```

#### Changing Styles
We can change the CSS of an element using the `.style` property. The CSS properties are written in camelCase (e.g., `backgroundColor` instead of `background-color`).

```javascript
// Let's make the paragraph blue and a bit larger
paragraph.style.color = 'blue';
paragraph.style.fontSize = '18px';
```

---

### Step 3: Creating and Adding New Elements

We can also create brand new HTML elements from scratch and add them to our page.

```javascript
// 1. Create a new element
const newParagraph = document.createElement('p');

// 2. Give it some content
newParagraph.textContent = 'This paragraph was created with JavaScript!';

// 3. Add it to the page. We'll append it as a child of our 'container' div.
container.appendChild(newParagraph);
```
If you refresh your `index.html` page now, you should see the title has changed, the first paragraph is blue, and a brand new paragraph has appeared in the box!

---

### Step 4: Event Listeners - The Core of Interactivity

This is where JavaScript gets really powerful. We can make our page listen for user actions, like clicks, and then run code in response. The pattern is:

1.  Get the element (e.g., the button).
2.  Add an "event listener" to it.
3.  Tell the listener what event to listen for (e.g., a 'click').
4.  Write a function that contains the code to run when the event happens.

Let's make our button do something when we click it.

```javascript
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
```

Now, when you open `index.html` in the browser and click the button, the title should get a yellow background, and a new message will appear in the container. Click it again, and the highlight will disappear, but another message will be added.

This is the fundamental pattern for web interactivity: **listen for an event, and change the state (the HTML or CSS) in response.**

---

### Common Question: Why toggle() Works But add() Doesn't?

You might wonder: "Why use `toggle()` instead of `add()`?" Here's the key difference:

#### `classList.toggle(className)`
- **Acts like a light switch** - turns the class on and off
- First click: adds the class ✅
- Second click: removes the class ❌
- Third click: adds it back ✅
- **Perfect for interactive buttons** where each click should reverse the previous action

#### `classList.add(className)`
- **Acts like a permanent sticker** - only adds the class
- First click: adds the class ✅
- Second click: does nothing (class already present) 
- Third click: still does nothing
- **Perfect for one-time styling changes** that should stay applied

**The "Problem":** If you use `add()` on a button that gets clicked multiple times, it appears to "not work" after the first click because the class is already added! There's no visible change on subsequent clicks.

**The Solution:** Use `toggle()` for interactive elements that switch states, and use `add()` only when you want to apply styling once and keep it permanently.

For a detailed explanation and interactive demos, see:
- `EXPLANATION.md` - Detailed explanation of both methods
- `demo-toggle-vs-add.html` - Interactive demonstrations you can open in your browser
