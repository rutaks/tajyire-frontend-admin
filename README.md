<img src="public/images/logo-no-name.png" width="90" height="90">

# Tajyire Admin

A B2C platform where products and items can be displayed, sold and monitored, while keeping customer communication active

## Folder Structure

    .
    ├── public                  # Compiled files (alternatively `dist`)
    ├── out                     # Documentation files (alternatively `doc`)
    ├── src                     # Source files (alternatively `lib` or `app`)
    |   ├── lib                 # UI Compoments
    |   ├── pages               # Pages
    |   ├── helpers             # Helper Functions/Classes
    |   ├── middlewares         # chained functions called by the routes before the user-defined handler is invoked
    |   ├── redux               # All Classes, Functions & Configs Related Redux State Management
    |   |   ├── action-types    # All String variables defining action types
    |   |   ├── actions         # Functions representing actions that execute specific states
    |   |   ├── reducer         # Action/State Reducers
    |   |   ├── store           # Redux initial States Store & Configs
    ├── .env                    # Secret Key Storage
    ├── package.json            # Project's Metadata
    ├── .prettierrc             # Style Auto-Formatting Config
    ├── .eslintrc.json          # Linting Configuration
    ├── ....                    # Misc Configs brought by `create-react-app`
    ├── README.md
    └── .gitignore

## Installation

#### Clone The Repo:

```
$ git clone
$ cd
```

#### Install dependencies:

- Yarn:

```
$ yarn install
```

- npm:

```
$ npm install
```

#### Component documentation:

#### Run the project

```
$ npm start
```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
