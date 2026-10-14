
import test from "node:test";
import assert from "node:assert/strict";
import Field from "../src/public/Field.js";
import Validation from "../src/public/Validation.js";
import { RequiredRule, MinValueRule } from "../src/public/Rule.js";

test("required rule rejects an empty description", () => {
  const field = new Field("description");
  field.addRule(new RequiredRule("Description is required."));

  const validation = new Validation();
  validation.addField(field);

  const result = validation.validate({ description: "" });

  assert.equal(result.success, false);
});

test("required rule accepts a non-empty description", () => {
  const field = new Field("description");
  field.addRule(new RequiredRule("Description is required."));

  const validation = new Validation();
  validation.addField(field);

  const result = validation.validate({ description: "Salary" });

  assert.equal(result.success, true);
});


test("minimum value rule rejects zero", () => {
  const field = new Field("amount");
  field.addRule(
    new RequiredRule("Amount is required.")
  );
  field.addRule(
    new MinValueRule(0.01, "Amount must be greater than zero.")
  );

  const validation = new Validation();
  validation.addField(field);

  const result = validation.validate({ amount: "0" });

  assert.equal(result.success, false);
});


test("minimum value rule accepts a valid amount", () => {
  const field = new Field("amount");
  field.addRule(
    new RequiredRule("Amount is required.")
  );
  field.addRule(
    new MinValueRule(0.01, "Amount must be greater than zero.")
  );

  const validation = new Validation();
  validation.addField(field);

  const result = validation.validate({ amount: "25" });

  assert.equal(result.success, true);
});
