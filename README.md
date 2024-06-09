<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template.
-->

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <img src="joanna-office-space.png" alt="Icon" width="80" height="80">
  <!-- Removed the extraneous closing </a> tag here -->

  <h3 align="center">It's a... Jump To Conclusions App!</h3>

  <p align="center">
    Ask the app anything, and let it jump to a conclusion for you!
    <br />
    <a href="https://www.youtube.com/watch?v=sDEL4Ty950Q&t=25s" target="_blank"><strong>A word from our Founder »</strong></a>
    <br />
    <br />
    <a href="https://github.com/wickhill/jumpToConclusions/" target="_blank">View Demo</a>
    ·
    <a href="https://github.com/wickhill/jumpToConclusions/issues" target="_blank">Report Bug</a>
    ·
    <a href="https://github.com/wickhill/jumpToConclusions/issues" target="_blank">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#project-team">Project Team</a></li>
        <li><a href="#quick-links">Quick Links</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap: Leap Before You Look!</a></li>
    <ul>
      <li><a href="#project-origins">Our Journey</a></li>
      <li><a href="#user-stories">User Stories</a></li>
      <!-- <li><a href="#jump-to-conclusions-data">Jump To Conclusions Data</a></li> -->
      <li><a href="#hurdles">Hurdles: Is This Good For The Company?</a></li>
    </ul>
    <li><a href="#screenshots">Screenshots</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

<div align="center">
  <img src="https://i.imgur.com/h5H3MwF.jpg" alt="Jump To Conclusions Homescreen" width="323" height="700">
  <img src="https://i.imgur.com/pbKgb9W.jpg" alt="Jump To Conclusions Cheeves" width="324" height="700">
  <a href="https://www.youtube.com/watch?v=sDEL4Ty950Q&t=25s" target="_blank">
    <img src="https://i.imgur.com/yGPWy4Y.jpg" alt="Jump To Conclusions Logo" width="450" height="450">
  </a>
</div>

<br>

<h1 align="center">"You know... I had an idea like that once..."</h1>

### Project Team:
- [Wick Hill](https://github.com/wickhill)
- [Tom Smykowski](https://www.imdb.com/name/nm0726223/?ref_=tt_cl_t_8)

### Quick Links:
- [Scott Chacon's "So You Think You Know Git?"](https://youtu.be/aolI_Rz0ZqY?si=iqDKHdpO9_uHtlib)
- [NPM](https://www.npmjs.com)
- [Office Space IMDB](https://www.imdb.com/title/tt0151804/)

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

* [![React][React.js]][React-url]
* [![W3Schools](https://img.shields.io/badge/W3Schools-1572B6?style=for-the-badge&logo=w3schools&logoColor=white)](https://www.w3schools.com)
* [![SVGRepo](https://img.shields.io/badge/SVGRepo-232F3E?style=for-the-badge&logo=svg&logoColor=white)](https://www.svgrepo.com)
* [![Tailwind CSS][Tailwind.js]][Tailwind-url]
* [![NPM][NPM.js]][NPM-url]
* [![ChatGPT][ChatGPT.js]][ChatGPT-url]
* [![IMDB](https://img.shields.io/badge/IMDB-ff9900?style=for-the-badge&logo=imdb&logoColor=white)](https://www.imdb.com/title/tt0151804/)

<p align="right">(<a href="#top">back to top</a>)</p>




<!-- GETTING STARTED -->
## Getting Started

To get started with The Jump To Conclusions App, just follow these steps:

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/wickhill/jumpToConclusions
   ```

2. Install NPM packages
   ```sh
   npm install
   npm i dotenv
   npm i axios
   npm i mongoose
   npm i cors
   npm i react-router-dom
   npm i jsonwebtoken
   npm i livereload
   npm i connect-livereload
   npm i method-override
   npm i bcrypt
   ```

3. Enter your Mongo Connection String into an `.env` file you create in your backend root directory. You can find these Client parameters by doing the following:
* []() Visit [MongoDB Atlas](https://cloud.mongodb.com) and log in --->
* []() Select your project from the dashboard, connect to your own Cluster --->
* []() Click the "Connect" button and select "Connect Your Application." --->
* []() Copy Connection String: Replace `<username>` and `<password>` with your MongoDB username and password --->
* []() Add the connection string to your `.env` file as follows:

   ```js
   MONGODB_URI='"mongodb+srv://<YOUR_USER_NAME>:<YOUR_PASSWORD>@cluster0.q7tdmnt.mongodb.net/jump-to-conclusions"';
   SECRETKEY='ENTER_YOUR_CLIENT_SECRET';
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

**With the Jump To Conclusions app, everyday is Hawaiian Shirt Day.**

Why contemplate? Leap before you look, and jump to conclusions with a single click! Stuck on a question, but you don't want to deal with that pesky thing known as 'accountability'? Look no further, the Jump To Conclusions app is here to save the day! Just ask a question, click the footprint button, and let the app do the thinking for you.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP to Jump To Conclusions -->
## Roadmap

Inspired by the “Jump to Conclusions” mat from the 1999 film “Office Space”, this app is designed to offer light-hearted fun for anyone facing a case of the Mondays.

<div align="center">
<img src="https://i.imgur.com/btZhrEY.jpg" alt="Jump To Conclusions Mat" width="168" height="250">
<img src="https://i.imgur.com/v2q1Bys.jpg" alt="bob1" width="250" height="250">
<img src="https://i.imgur.com/uWc9dl1.jpg" alt="michael bolton" width="250" height="250">
</div>

Having a baseline helped, but adding features that encouraged replay value and user retention became essential. Concepts were worked out using Figma and Trello. Many ideas were used, and even those that haven't been used will likely be added in the near future.

- View the [Figma Board](https://www.figma.com/board/ZmQYxUoys0tOWwHSDY3fia/Jump-To-Conclusions-App?node-id=0-1&t=BmHscWeCgJKBg3Vc-0) for the project's wireframe blueprint:

<div align="center">
  <a href="">
    <img src="https://i.imgur.com/PZo1cYK.jpg" alt="Wireframe #1" width="383" height="700">
    <img src="https://i.imgur.com/Lzj6CQA.jpg" alt="Wireframe #1" width="427" height="700">
  </a>
</div>

<p align="right">(<a href="#top">back to top</a>)</p>

- View the [Trello Board](https://trello.com/b/2dwSSjZy/jump-to-conclusions) for MVP and stretch goals.

- Here are the project's ERD blueprints:

<div align="center">
  <a href="">
    <img src="https://i.imgur.com/GIGtJM9.jpg" alt="Whiteboard Wireframe" width="400" height="300">
    <img src="https://i.imgur.com/qfzxthd.jpg" alt="Whiteboard ERD" width="400" height="300">
  </a>
</div>

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- SCREENSHOTS -->

<!-- ## Screenshots

<p align="right">(<a href="#top">back to top</a>)</p> -->



<!-- USER STORIES -->

## User Stories

**Showcasing Skills**: As a Recruiter, I want to see an app that demonstrates the candidate's skills and personality effectively.

**Casual Entertainment**: As a User, I want a fun and easy-going app that I can enjoy in my spare time and share amusing moments with friends.

**Nostalgia**: As a User who loves the film "Office Space," I want to see a concept from the movie brought to life in a creative and engaging way.

**Replay Valie**: As a User, I want the app to include hidden achievements and a personal history feature to encourage users to return and play again.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- Jump To Conclusions Data -->

<!-- ## Jump To Conclusions Data

There's more to the app than you think! Earn "Cheeves" (achievements), build and view your history, and display your history, either anonymously or with your user handle!

<p align="right">(<a href="#top">back to top</a>)</p> -->



<!-- HURDLES -->

## Hurdles

**Is This Good For The Company?**

* []() From time to time we ran into issues involving scope, context, and responsive design. Still, it wasn't anything that a few 'Shrimp Poppers' or 'Extreme Fajitas' couldn't fix 🦐🎉


**'utils.js' - Keeping Component-Based Code DRY.**

* []() Dynamically rendering text and containers for responsive design was a top priority for 'Jump To Conclusions'. 
* []() `utils.js` is a utility file that contains a reusable helper function (`resizeText`) that streamlines and simplifies styling code across the app.
* []() By using `utils.js`, it became much easier to keep styling code modular, and later this concept set the stage for `UserContext.jsx` and centralizing commonly/globally used logic.

**Scope, Prop Drilling, UserContext.jsx**

* []() Initially, the app faced challenges with scope, as certain Randomizer Functions were not being passed correctly across different components.
* []() Prop drilling, the process of passing data from parent to child components through props, was attempted. However, it led to a complicated and hard-to-manage codebase without resolving the core issues.
* []() To address these challenges, UserContext.jsx was implemented. This component simplified the code significantly, making it more manageable and easier to debug. 
* []() `UserContext.jsx` provided a centralized state management solution using React’s Context API, allowing state and functions to be accessed by any component without prop drilling.

**A Not-So-Modular Compromise**

* []() Footer Component Issue and Resolution: Despite the improvements with `UserContext.jsx`, the `Footer.jsx` component, which contained the critical `footprint-button` that initiated the `startRandomizer` function, still did not function as intended.
* []() Ultimately, it was decided to remove the `Footer.jsx` component and rebuild it within `Conclusions.jsx`. 
* []() This approach was successful, resolving the issues and ensuring the button worked as expected.

**Current Status**

* []() However, this process took longer than anticipated, leading to some planned features not being implemented yet.
* []() Features like audio integration and a user-input text bar will be added in the future. Additionally, the `History.jsx` component is still a work in progress.


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

* []() Wick Hill: [@wickstarter](https://twitter.com/wickstarter)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* []() That guy who invented the Pet Rock
* []() Caffeine
* []() The Bobs

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/wickhill/jumpToConclusions.svg?style=for-the-badge
[contributors-url]: https://github.com/wickhill/jumpToConclusions/graphs/contributors

[forks-shield]: https://img.shields.io/github/forks/wickhill/jumpToConclusions.svg?style=for-the-badge
[forks-url]: https://github.com/wickhill/jumpToConclusions/network/members

[stars-shield]: https://img.shields.io/github/stars/wickhill/jumpToConclusions.svg?style=for-the-badge
[stars-url]: https://github.com/wickhill/jumpToConclusions/stargazers

[issues-shield]: https://img.shields.io/github/issues/wickhill/jumpToConclusions.svg?style=for-the-badge
[issues-url]: https://github.com/wickhill/jumpToConclusions/issues

[license-shield]: https://img.shields.io/badge/License-MIT-yellow.svg
[license-url]: https://opensource.org/licenses/MIT

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/wickhill/
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 

[Tailwind.js]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white "Tailwind CSS Badge"
[Tailwind-url]: https://tailwindcss.com/

[Spotify.js]: https://img.shields.io/badge/Spotify-1DB954?style=for-the-badge&logo=spotify&logoColor=white "Spotify Badge"
[Spotify-url]: https://developer.spotify.com/documentation/web-api/

[jQuery.js]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white "jQuery Badge"
[jQuery-url]: https://jquery.com/

[NPM.js]: https://img.shields.io/badge/npm-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white "NPM Badge"
[NPM-url]: https://www.npmjs.com/

[ChatGPT.js]: https://img.shields.io/badge/ChatGPT-000000?style=for-the-badge&logo=openai&logoColor=white "ChatGPT Badge"
[ChatGPT-url]: https://www.openai.com/chatgpt

[DallE.js]: https://img.shields.io/badge/DallE-000000?style=for-the-badge&logo=openai&logoColor=white "DallE Badge"
[DallE-url]: https://www.openai.com/dall-e-2

