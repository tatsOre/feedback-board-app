# Frontend Mentor - Product feedback app

This is a solution to the <a href="https://www.frontendmentor.io/challenges/product-feedback-app-wbvUYqjR6" target="_blank">Product feedback app challenge on Frontend Mentor</a>.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [The process](#the-process)
  - [Built with](#built-with)
  - [What I learn](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

The challenge is to build out this product feedback application and get it looking as close to the design as possible.

In this application users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete product feedback requests
- Receive form validations when trying to create/edit feedback requests. **In progress.**
- Sort suggestions by most/least upvotes and most/least comments
- Filter suggestions by category
- Add comments and replies to a product feedback request
- Upvote product feedback requests
- Keep track of any changes building out a full-stack app with Firestore

#### Expected Behaviour

- Suggestions page
  - Only product feedback requests with a status of `suggestion` should be shown on the Suggestions page.
- Roadmap
  - Feedback requests with a status of `planned`, `in-progress`, or `live` should show up on the roadmap, and should be placed in the correct column based on their status.
  - Columns should be ordered by upvote totals.
- Creating a product request
  - The default status for a new piece of feedback is `suggestion`. This places it on the Suggestions page.
- Editing feedback
  - If a piece of feedback has its status updated to `planned`/`in-progress`/`live` it moves through to the roadmap and should show up in the correct column based on its new status.
  - Only the feedbacks created by the current user are editable.
- Add comments/replies
  - Current user will be "logged-in" using mockup data to populate the user data for any new comments or replies or the author when creating a new feedback request.
  - Any comment/reply can have a maximum of 250 characters.

### Screenshot

![Design preview for the Product feedback app coding challenge](https://github.com/tatsOre/feedback-board-app/blob/main/preview.jpg)

### Links

- Live Site URL: [Feedback Board App](https://feedback-board-app.vercel.app/)

## The process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind](https://tailwindcss.com/) - For styles
- [Firestore](https://firebase.google.com/) - Firebase/Firestore

### What I learned

### Continued development
Currently working on: 
- Create/Edit feedback implementation, form validation and styling
- Redirections and 404 page

## Author

[LinkedIn](https://www.linkedin.com/in/tatiana-orejuela-zapata/) | [Github](https://github.com/tatsOre)

##### May, 2022.
