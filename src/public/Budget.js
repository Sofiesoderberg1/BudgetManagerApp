import Transaction from "./Transaction.js";

class Budget {
  constructor() {
    this.name = "SeptemberBudget";

    this.transactions = [];

    // Use a separate counter so removed transactions do not cause duplicate IDs.
    this.nextId = 1;
  }

  addTransaction(description, amount, type, category) {
    if (type !== "income" && type !== "outcome")
      throw new Error("Type must be income or outcome");

    // Store the amount as positive; the transaction type determines
    // whether it is added to or subtracted from the balance.
    amount = Math.abs(amount);
    const id = this.nextId;
    this.nextId = this.nextId + 1;
    const date = new Date();
    const transaction = new Transaction(
      id,
      description,
      amount,
      type,
      category,
      date,
    );

    this.transactions.push(transaction);
  }

  removeTransaction(id) {
    for (let i = 0; i < this.transactions.length; i++) {
      const transaction = this.transactions[i];
      if (transaction.id === id) {
        this.transactions.splice(i, 1);
      }
    }
  }
  getBalance() {
    let balance = 0;
    for (let i = 0; i < this.transactions.length; i++) {
      const transaction = this.transactions[i];

      // Income increases the balance and outcome decreases it.
      if (transaction.type === "income") {
        balance = balance + transaction.amount;
      }
      if (transaction.type === "outcome") {
        balance = balance - transaction.amount;
      }
    }
    return balance;
  }

  getTotalIncome() {
    let totalIncome = 0;
    for (let i = 0; i < this.transactions.length; i++) {
      const transaction = this.transactions[i];
      if (transaction.type === "income") {
        totalIncome = totalIncome + transaction.amount;
      }
    }
    return totalIncome;
  }

  getTotalExpenses() {
    let totalExpenses = 0;
    for (let i = 0; i < this.transactions.length; i++) {
      const transaction = this.transactions[i];

      if (transaction.type === "outcome") {
        totalExpenses = totalExpenses + transaction.amount;
      }
    }

    return totalExpenses;
  }

  getTransactionsByCategory(category) {
    let transactions = [];
    for (let i = 0; i < this.transactions.length; i++) {
      const transaction = this.transactions[i];
      if (transaction.category === category) {
        transactions.push(transaction);
      }
    }
    return transactions;
  }

  getTotalByCategory(category) {
    let total = 0;

    for (let i = 0; i < this.transactions.length; i++) {
      const transaction = this.transactions[i];

      if (transaction.category === category) {
        total = total + transaction.amount;
      }
    }

    return total;
  }

  getTransactionsAboveAmount(amount) {
    let transactions = [];

    for (let i = 0; i < this.transactions.length; i++) {
      const transaction = this.transactions[i];

      if (transaction.amount > amount) {
        transactions.push(transaction);
      }
    }

    return transactions;
  }
  getSummary() {
    let summary = [];

    // Summary contains balance, total income and total expenses in that order.
    summary.push(this.getBalance());
    summary.push(this.getTotalIncome());
    summary.push(this.getTotalExpenses());

    return summary;
  }

  getTransactionsByDateRange(startDate, endDate) {
    let transactions = [];
    for (let i = 0; i < this.transactions.length; i++) {
      const transaction = this.transactions[i];
      if (transaction.date >= startDate && transaction.date <= endDate) {
        transactions.push(transaction);
      }
    }
    return transactions;
  }

  getTransactionsByType(type) {
    let transactions = [];
    for (let i = 0; i < this.transactions.length; i++) {
      const transaction = this.transactions[i];
      if (transaction.type === type) {
        transactions.push(transaction);
      }
    }
    return transactions;
  }

  getLargestExpense() {
    let largestExpense = 0;

    for (let i = 0; i < this.transactions.length; i++) {
      const transaction = this.transactions[i];

      if (transaction.type === "outcome") {
        if (transaction.amount > largestExpense) {
          largestExpense = transaction.amount;
        }
      }
    }

    return largestExpense;
  }

  getCategorySummary() {
    let categorySummary = {};

    for (let i = 0; i < this.transactions.length; i++) {
      const transaction = this.transactions[i];

      // Add each transaction amount to its category total.
      if (categorySummary[transaction.category]) {
        categorySummary[transaction.category] =
          categorySummary[transaction.category] + transaction.amount;
      } else {
        categorySummary[transaction.category] = transaction.amount;
      }
    }

    return categorySummary;
  }

  getLargestExpenseCategory() {
    // Find the category with the highest total amount.
    const categorySummary = this.getCategorySummary();

    if (Object.keys(categorySummary).length === 0) {
      return "";
    }

    let largestCategory = "";
    let largestAmount = 0;

    // Compare each category total to find the largest one.
    for (let category of Object.keys(categorySummary)) {
      const categoryAmount = categorySummary[category];

      if (categoryAmount > largestAmount) {
        largestAmount = categoryAmount;
        largestCategory = category;
      }
    }

    return largestCategory;
  }
}
export default Budget;
