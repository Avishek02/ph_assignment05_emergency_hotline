
<!-- First Question  -->
# 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Answer : 
# Element Selectors: getElementById vs. getElementsByClassName vs. querySelector. 
These are all methods for selecting DOM elements, but they differ in what they select, what they return, and how they perform.

#document.getElementById('id')

Selects: A single element that has the specified unique ID.

Returns: A single DOM element object. It's the fastest and most direct way to get one specific element.

Example: const coinCounterElement = document.getElementById('coin-counter');



# document.getElementsByClassName('class')

Selects: All elements that contain the specified class name.

Returns: A live HTMLCollection  of all matching elements, an array-like object. "Live" means it automatically updates if I add or remove elements with that class.

Example: const serviceCards = document.getElementsByClassName('service-cards');





# document.querySelector('selector')

Selects: The first element that matches the specified CSS selector (like #id, .class, div > p).

Returns: A single DOM element object. It's incredibly flexible, because I can select any element whether id, class or tag.

Example: const firstCard = document.querySelector('.service-cards');



# document.querySelectorAll('selector')

Selects: All elements that match the specified CSS selector.

Returns: A static NodeList (an array-like object). "Static" means it's a snapshot and does not automatically update if I add or remove matching elements later.

Example: const favoriteButtons = document.querySelectorAll('.favorite-icon');







<!-- Second Question  -->
# 2.How do you create and insert a new element into the DOM?

First I will create an element object in memory and then append it to an existing element on the page.

#Creating the Element
I will use the document.createElement() method, passing the HTML tag name as a string. This will create a new element node, but it only exists in memory and is not yet visible on the page.


*Creating a new <p> element in memory
const newParagraph = document.createElement('p');
Before inserting the element, i can set its content, classes, or other attributes.


*Adding some text content
newParagraph.textContent = 'This is my new paragraph';

*Adding a CSS class
newParagraph.classList.add('info-text');

*Now I wiil Insert the Element to a parent element.
I will select an existing element to act as the parent. Then, will add by using appendChild() method  as the last child of that parent.

const parentDiv = document.getElementById('container');
parentDiv.appendChild(newParagraph);







<!-- Third Question  -->
# 3.What is Event Bubbling and how does it work?


Event bubbling is a fundamental concept in how the browser handles events. It describes the process where an event, fired on a specific element, is first handled by that element and then "bubbles up" to its parent, its parent's parent, and so on, all the way up to the window object.


It's like a bubble rising from the bottom of a glass of water. The event starts at the deepest, most specific element (the target) and travels upwards through its ancestors in the DOM tree.

## How It Works    
When an event occurs on an element, the browser checks for any event listeners on that specific element and runs them. After that, it moves to the element's direct parent and does the same. This process repeats until it reaches the top of the document hierarchy.

Example:
I have a button inside a paragraph, which is inside a div.

**HTML part :
<div id="grandparent">
  <p id="parent">
    <button id="child">Click Me</button>
  </p>
</div>
If I click the button, the event handling order will be:

1. The button's click handler runs first.

2. The event then bubbles up to the parent <p>. Its click handler runs next.

3. Finally, the event bubbles up to the <div>. Its click handler runs last.

This behavior is default for most DOM events and is the foundation for a powerful technique called event delegation.

Code Demonstration:
Attaching a click listener to each element.

**JavaScript Part :
const grandparent = document.getElementById('grandparent');
const parent = document.getElementById('parent');
const child = document.getElementById('child');

grandparent.addEventListener('click', () => {
  console.log('Grandparent (div) was clicked');
});

parent.addEventListener('click', () => {
  console.log('Parent (p) was clicked');
});

child.addEventListener('click', () => {
  console.log('Child (button) was clicked');
});

When I run this code and click the button, the console will show:

**Console Output:
Child (button) was clicked
Parent (p) was clicked
Grandparent (div) was clicked







<!-- Fourth Question  -->
# 4. What is Event Delegation in JavaScript? Why is it useful?

## What is Event Delegation?
Event delegation is a powerful and efficient technique where I attach a single event listener to a parent element to manage events for all of its child elements. Instead of adding a separate listener to each child, I let the events from the children bubble up to the parent and handle them there.

This technique takes advantage of event bubbling.

## How It Works
The single event listener on the parent element uses the event.target property to figure out which specific child element the event originated from.

**Example: Instead of adding a click listener to every <li> in a list, I can add just one to the parent <ul>.

**HTML part :
<ul id="parent-list">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>


**JavaScript part :
const parentList = document.getElementById('parent-list');

parentList.addEventListener('click', function(event) {
    if (event.target && event.target.tagName === 'LI') {
    console.log('I clicked on:', event.target.textContent);
  }
});

When I click on any list item, the event bubbles up to the <ul>, the listener fires, and event.target correctly identifies the <li> that was clicked.


## Why It's Useful
Event delegation offers two major advantages:

**Improved Performance and Memory
I only need to create and manage one event listener instead of potentially dozens or hundreds. This saves memory and can make my application run faster, especially on pages with many interactive elements.


**Handles Dynamically Added Elements
This is the most powerful benefit. If I add new child elements to the parent later, the event listener on the parent will automatically work for them. I don't need to write extra code to attach listeners to the new elements.

**JavaScript Part continues :
const newItem = document.createElement('li');
newItem.textContent = 'Item 4 (new!)';
parentList.appendChild(newItem); 


Clicking this new item will work immediately, no new listener needed.










<!-- Fifth Question  -->
# 5. What is the difference between preventDefault() and stopPropagation() methods?


While both preventDefault() and stopPropagation() are methods called on an event object, they control two completely different things. One stops the browser's default behavior, and the other stops the event's movement through the DOM.

## event.preventDefault()
This method stops the browser's default action that is associated with a certain type of element or event.

Like saying, "Hey browser, don't do the thing you normally do for this."

# Common Use Cases:
Stopping a form submission: When a user clicks a submit button, the browser's default action is to send the form data and reload the page. preventDefault() stops this so I can handle the submission with JavaScript.

Preventing a link navigation: When a user clicks an <a> tag, the browser navigates to the URL in the href attribute. preventDefault() stops the browser from changing the page.

Blocking a checkbox tick: I can prevent a checkbox from being checked or unchecked by the user.

Example:
# JavaScript Part :
const form = document.getElementById('my-form');

form.addEventListener('submit', function(event) {
  event.preventDefault(); 
  console.log('Form submission was prevented!');
});

## event.stopPropagation() 
This method stops an event from bubbling up the DOM tree to its parent, grandparent, and other ancestor elements.

Like saying, "This event happened here, and its journey ends now. Don't let any parent elements know about it."

# Common Use Cases:
Suppose I have a clickable card (div) that opens a modal. Inside that card, I have a "delete" button. If a user clicks the delete button, I only want to delete the item, not open the modal. I would use stopPropagation() on the button's click event to prevent the event from bubbling up to the card's click listener.



# Example
const card = document.getElementById('my-card');
const deleteButton = document.getElementById('delete-btn');

card.addEventListener('click', function() {
  console.log('Card was clicked! Opening modal...');
});

deleteButton.addEventListener('click', function(event) {
  event.stopPropagation(); 
  console.log('Delete button was clicked! Deleting item...');
});



Without stopPropagation(), clicking the delete button would log both messages and open the modal.

preventDefault() deals with the browser's behavior, while stopPropagation() deals with the event's propagation. They can be used together if I need to do both.