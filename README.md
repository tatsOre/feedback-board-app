# Frontend Mentor - Product feedback app with NextJS/MongoDB

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
- Keep track of any changes

#### Expected Behaviour

- New feedbacks with authenticated author
  - Current user will be "logged-in" using mockup data to populate the user data for any new comments/replies or the author when creating a new feedback request.
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
  - Any comment/reply can have a maximum of 250 characters.
  - Current user will not see the comment form in their own feedbacks.

### Screenshot

![Design preview for the Product feedback app coding challenge](https://github.com/tatsOre/feedback-board-app/blob/main/preview.jpg)

![Design preview](https://github.com/tatsOre/feedback-board-app/blob/main/preview/Tablet-Suggestions.png)

![Design preview](https://github.com/tatsOre/feedback-board-app/blob/main/preview/Tablet-Edit-Feedback.png)

![Design preview](https://github.com/tatsOre/feedback-board-app/blob/main/preview/Tablet-Feedback%20Detail.png)

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
- MongoDB/Mongoose

### Continued development

Currently working on:

- Error UI handling
- Testing
- Documentation

#### Implementation with Firestore: (https://github.com/tatsOre/feedback-board-app/tree/with_firebase)

### Links

- [A guide to module mocking with Jest](https://www.emgoto.com/mocking-with-jest/) - A guide to module mocking with Jest
- [Common mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library) - Common mistakes with React Testing Library
- [react-testing-library-examples](https://github.com/kentcdodds/react-testing-library-examples) - React Testing Library Examples

## Author

[LinkedIn](https://www.linkedin.com/in/tatiana-orejuela-zapata/) | [Github](https://github.com/tatsOre)

##### 2022.
