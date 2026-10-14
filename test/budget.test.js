
import test from "node:test";
import assert from "node:assert/strict";
import Budget from "../src/public/Budget.js";

test("a new budget has a balance of zero", () => {
  const budget = new Budget();

  assert.equal(budget.getBalance(), 0);
});


test("adding income updates the balance", () => {
  const budget = new Budget();

  budget.addTransaction("Salary", 1000, "income", "Salary");

  assert.equal(budget.getBalance(), 1000);
});


test("adding an expense decreases the balance", () => {
  const budget = new Budget();

  budget.addTransaction("Groceries", 50, "outcome", "Food");

  assert.equal(budget.getBalance(), -50);
});


test("balance is correct with income and expenses", () => {
  const budget = new Budget();

  budget.addTransaction("Salary", 1000, "income", "Salary");
  budget.addTransaction("Groceries", 50, "outcome", "Food");

  assert.equal(budget.getBalance(), 950);
});
