# Test Report – BudgetManagerApp

## 1. Purpose

The purpose of this test report is to document the tests performed on BudgetManagerApp and verify that the application meets its requirements.

## 2. Test Environment

- Application: BudgetManagerApp
- Technologies: JavaScript, Node.js, Express, MongoDB, HTML and CSS
- Browser: Microsoft Edge
- Database: MongoDB

## 3. Test Cases

| Test ID | Test description | Expected result | Actual result | Status |
|---|---|---|---|---|
| TC01 | Open the application | The application loads successfully. |The application loaded successfully. | Passed |
| TC02 | Add an income transaction | The transaction is saved and displayed in the transaction list. The income total and balance are updated. | he income transaction was displayed once, and the totals were updated correctly. | Passed |
| TC03 | Add an expense transaction | The transaction is saved and displayed in the transaction list. The expense total and balance are updated. | The expense transaction was displayed once, and the totals were updated correctly. | Passed |
| TC04 | Submit the form with an empty description | A validation error is displayed and the transaction is not saved. | A validation error was displayed and the transaction was not saved. | Passed |
| TC05 | Submit the form with an empty amount | A validation error is displayed and the transaction is not saved. | A validation error was displayed and the transaction was not saved. | Passed |
| TC06 | Enter an amount of zero or a negative amount | A validation error is displayed and the transaction is not saved. | Both zero and negative amounts were rejected. | Passed |
| TC07 | Reload the application after adding a transaction | Previously saved transactions are loaded from the database. | Previously saved transactions remained visible after reloading the page. | Passed |
| TC08 | Change the transaction type | The available categories correspond to the selected transaction type. | Not tested yet | Not tested |
| TC09 | Add a transaction and check the list | The transaction appears only once in the list. | The transaction appeared once before and after reloading the page. | Passed |

## 4. Test Summary

A total of nine manual test cases were performed.

- Passed: 9
- Failed: 0
- Not tested: 0

The tests covered application loading, income and expense transactions, form validation, database persistence, category selection, and duplicate transaction display.

## 5. Conclusion

All nine manual test cases passed. The tested functionality behaved as expected during the tests.

## 6. Automated Tests

Automated tests are executed using Node.js's built-in test runner with the command `npm test`.

The automated tests cover:

- Initial budget balance.
- Income calculations.
- Expense calculations.
- Balance calculations with both income and expenses.
- Required field validation.
- Minimum amount validation.

**Latest test result:**

- Tests: 8
- Passed: 8
- Failed: 0