# Bizlink

Bizlink is a full stack web app that provides a platform that brings businesses and individuals together.
Users can post their business on Bizlink and get feedback in form of reviews and votes from other users. [The back-end repo is here](https://github.com/tope-olajide/Bizlink-v2-backend)

## Hosted Application

**Front-end** https://bizlink.now.sh/
**Back-end** https://bislink.herokuapp.com/

## Installation

1. Get the backend running first, to do that, clone this repo:

   ```
   git clone https://github.com/tope-olajide/Bizlink-v2-backend.git
   cd Bizlink-v2-backend.git
   ```

   Then follow the instructions [here](https://github.com/tope-olajide/Bizlink-v2-backend#readme) to get the backend server up and running. After that:

1. Install [`node`](https://nodejs.org/en/download/), version 12 or greater

3) Clone this repo and cd into it

   ```
   git clone https://github.com/tope-olajide/Bizlink-v2-frontend.git
   cd Bizlink-v2-frontend
   ```

4) Install all dependencies

   ```
   npm install
   ```

5) navigate to `src/utils/baseUrl.js` and change the baseUrl from 'https://bislink.herokuapp.com' to 'http://localhost:5000'`

6) Start the app

   ```
   npm start
   ```

7) Once the server is running, Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Features

1. Create an account with fulname, username, email and password.
2. Sign in with username or email and password
3. Create a Business
4. Modify a business
5. View business details
6. Search for a business
7. Post reviews on businesses
8. Add business and remove business from favourite
9. Upvote or downvote business
10. View/edit user profile
11. Follow another user
12. User get in app notifications when:
- they Registered for the first time
- their business get upvoted or downvoted.
- their businesses get reviewed.
- they are followed or unfollowed by another user.
- their business get added to another user's favourite.

## Built With

- [NodeJS](https://nodejs.org/en/) - A Javascript runtime built on chrome V8 engine that uses an event-driven non-blocking I/O model that makes it lightweight and efficient.
- [React Bootstrap with Material Design](https://mdbootstrap.com/docs/react/) - MDBootstrap - world's most popular Material Design framework for building responsive, mobile-first websites & apps.
- [React](https://www.reactjs.org/) - A JavaScript library for building user interfaces by Facebook.
- [Redux](http://redux.js.org/) - A predictable state container for JavaScript apps.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Contributing
If you are interested in contributing to development of this project, follow the instructions below to contribute.

* Fork the repository

* Make your change

* Commit your change to your forked repository

* Provide a detailed commit description

* Raise a pull request against the master branch

#### Can I clone this application for personal use?

    Yes!. This application is licensed under MIT, and it's open for
    everybody

## Author

- **Temitope David Olajide** - Fullstack Developer.

## Acknowledgments

- MDBootstrap
- ReactJS
- ReduxJS
- Cloudinary
