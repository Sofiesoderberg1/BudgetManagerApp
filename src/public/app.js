import Field from "./Field.js";
import Validation from "./Validation.js";
import { RequiredRule, MinValueRule } from "./Rule.js";
import Budget from "./Budget.js";

const form = document.querySelector("#transaction-form");
const message = document.querySelector("#message");
const transactionList = document.querySelector("#transaction-list");

const typeField = document.querySelector("#type");
const categoryFieldElement = document.querySelector("#category");

const expenseCategories = [
  "Food",
  "Transport",
  "Housing",
  "Insurance",
  "Entertainment",
];

const incomeCategories = ["Salary", "Student Support", "Business Profit"];

function updateCategories() {
  const categories =
    typeField.value === "income" ? incomeCategories : expenseCategories;

  categoryFieldElement.replaceChildren();

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFieldElement.appendChild(option);
  });
}

typeField.addEventListener("change", updateCategories);

updateCategories();

const totalIncomeElement = document.querySelector("#total-income");
const totalExpensesElement = document.querySelector("#total-expenses");
const balanceElement = document.querySelector("#balance");

const descriptionField = new Field("description");
descriptionField.addRule(new RequiredRule("Beskrivning måste fyllas i."));

const validation = new Validation();

const categoryField = new Field("category");
categoryField.addRule(new RequiredRule("Category is required."));

const dateField = new Field("date");
dateField.addRule(new RequiredRule("Date is required."));

const amountField = new Field("amount");
amountField.addRule(new RequiredRule("Amount must be seen."));
amountField.addRule(
  new MinValueRule(0.01, "Amount must be greater than zero."),
);
validation.addField(descriptionField);
validation.addField(amountField);
validation.addField(categoryField);
validation.addField(dateField);

 
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = {
    description: formData.get("description"),
    amount: formData.get("amount"),
    category: formData.get("category"),
    date: formData.get("date"),
  };

  const result = validation.validate(data);

  if (!result.success) {
    message.textContent = result.errors[0].errorMessage;
    return;
  }

  const transaction = {
    description: data.description,
    amount: Number(data.amount),
    type: formData.get("type"),
    category: data.category,
    date: data.date,
  };

  try {
    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });

    if (!response.ok) {
      throw new Error("Could not save transaction.");
    }

    message.textContent = "Transaction added successfully!";
    form.reset();
    updateCategories();
    await loadTransactions();
  } catch (error) {
    message.textContent = "Could not save transaction. Please try again.";
    console.error(error);
  }
});



function updateBudgetSummary(transactions) {
  const budget = new Budget();

  transactions.forEach((transaction) => {
    const type = transaction.type === "expense" ? "outcome" : transaction.type;

    budget.addTransaction(
      transaction.description,
      Number(transaction.amount),
      type,
      transaction.category,
    );
  });

  const totalIncome = budget.getTotalIncome();
  const totalExpenses = budget.getTotalExpenses();
  const balance = budget.getBalance();

  totalIncomeElement.textContent = `€${totalIncome.toFixed(2)}`;
  totalExpensesElement.textContent = `€${totalExpenses.toFixed(2)}`;
  balanceElement.textContent = `€${balance.toFixed(2)}`;
}

async function loadTransactions() {
  try {
    const response = await fetch("/api/transactions");

    if (!response.ok) {
      throw new Error("Could not load transactions.");
    }

    const transactions = await response.json();
    updateBudgetSummary(transactions);

    transactionList.replaceChildren();

    transactions.forEach((transaction) => {
      const listItem = document.createElement("li");

      listItem.textContent =
        `${transaction.date} — ${transaction.description} — ` +
        `€${Number(transaction.amount).toFixed(2)} — ` +
        `${transaction.category} (${transaction.type})`;

      transactionList.appendChild(listItem);
    });
  } catch (error) {
    console.error(error);
    message.textContent = "Could not load transactions.";
  }
}

loadTransactions();
