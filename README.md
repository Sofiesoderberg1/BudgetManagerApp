# BudgetManagerApp

## Vision

BudgetManagerApp is a web application that helps users track their personal income and expenses. The goal is to make it easier to understand spending habits and keep track of the user's financial balance.

## Features

- Add income transactions.
- Add expense transactions.
- Select a category for each transaction.
- Enter a description, amount and date.
- View a list of saved transactions.
- View total income, total expenses and the current balance.
- Store transactions in MongoDB.
- Validate required fields and ensure that transaction amounts are greater than zero.

## Requirements

The application should:

1. Allow users to add income transactions.
2. Allow users to add expense transactions.
3. Require a description, amount, category and date.
4. Reject empty required fields.
5. Reject amounts that are zero or negative.
6. Display saved transactions in a list.
7. Calculate total income, total expenses and the balance correctly.
8. Save transactions in MongoDB so they remain available after reloading the application.
9. Display categories according to the selected transaction type.
10. Display each transaction only once in the list.

## Technologies

- JavaScript
- Node.js
- Express
- MongoDB
- HTML
- CSS

## Running the application

1. Install Node.js and MongoDB.
2. Install the project dependencies:

   ```bash
   npm install
   ```

3. Start the Express server using the project's server command.
4. Open `http://localhost:3000` in a web browser.

MongoDB must be running for database functionality to work.

## Running automated tests

Run the automated tests with:

```bash
npm test
```

The project uses Node.js's built-in test runner.

Live application

The application is deployed on Render and can be accessed here:

Application URL:
**Application URL:** https://budgetmanagerapp-5ewu.onrender.com/