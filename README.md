# Gamified Habit Tracker

## Overview

Games utilize various strategies to keep players interested about the game and motivated to pursue objectives presented in them. An interesting storyline, vaious bosses to fight, the level up and ability systems all aim to keep the player engaged. These mechanisms target our innate desire to see progress and provide a reliable sense of achievement.

One problem with habit formation is that the rewards of sticking to a habit often come so slowly that it is hard for our brains to notice the immediate impact of our actions. This makes it harder for our habits to stick. This app aims to implement strategies used in games on a habit tracker so the user is more likely to follow through their habits.

Users can register and login, they can add habits that they can check daily or weekly (or another time frame of their own choosing). Habits will change color based on how often they are checked. Each time a user checks their habit, they earn xp to level up.

## Data Model

The application will store Users and Habits.

* Users will have level and xp (both Numbers) by embedding
* Users can have multiple habits (via references)

The only way a user can gain xp is to complete habits, and gaining xp will increase their level over time.

An Example User:

```javascript
{
  username: "habitTrackerPlayer",
  hash: // a password hash,
  level: // an integer
  xp: // an integer
  habits: // an array of references to Habits
}
```

An Example Habit:

```javascript
{
  title: "Drink at least 2L water every day."
  streak: // integer
  repeat time: // an array of options as to how often this habit should be repeated (daily, every other day, weekly, monthly)
}
```

## [Mongoose Models](/models)

## Wireframes and Sitemap

![wireframes-and-sitemap](/documentation/wireframes-and-sitemap.png)

## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can add a new habit
4. as a user, I can specify how often each habit should be checked
5. as a user, I can view all my habits in a single list
6. as a user, I can check off habits as done
7. as a user, I can level up by earning more xp
8. as a user, I can earn xp by checking off habits on time

## Research Topics

* (6 points) Front-end framework
    * I'm going to use Next.js for this project
* (2 points) ESLint
    * I'll integrate ESLint into my workflow
* (2 points) tailwind.css
    * I'll use tailwind.css

## [Main Project File](pages/main.js)

## Annotations / References Used
https://jwt.io/

https://vercel.com/docs/

https://docs.mongodb.com/

https://nextjs.org/docs

https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies

https://github.com/skolhustick/nextjs-mongoose-example/

https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose/

