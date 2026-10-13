import Field from './Field.js'
import Validation from './Validation.js'
import { RequiredRule, MinValueRule } from './Rule.js'

const form = document.querySelector('#transaction-form')
const message = document.querySelector('#message')
const transactionList = document.querySelector('#transaction-list')

const descriptionField = new Field('description')
descriptionField.addRule(
  new RequiredRule('Beskrivning måste fyllas i.')
)

const validation = new Validation()

const categoryField = new Field('category')
categoryField.addRule(
  new RequiredRule('Category is required.')
)

const dateField = new Field('date')
dateField.addRule(
  new RequiredRule('Date is required.')
)

const amountField = new Field('amount')
amountField.addRule(
    new RequiredRule('Amount must be seen.')
)
amountField.addRule(
    new MinValueRule(0.01, 'Amount must be greater than zero.')
)
validation.addField(descriptionField)
validation.addField(amountField)
validation.addField(categoryField)
validation.addField(dateField)

form.addEventListener('submit', async (event) => {
  event.preventDefault()

  const formData = new FormData(form)
  const data = {
    description: formData.get('description'),
    amount: formData.get('amount'),
    category: formData.get('category'),
    date: formData.get('date')
  }

  const result = validation.validate(data)

  if (!result.success) {
    message.textContent = result.errors[0].errorMessage
    return
  }

  
message.textContent = 'Transaction added successfully!'


const transaction = {
  description: data.description,
  amount: Number(data.amount),
  type: formData.get('type'),
  category: data.category,
  date: data.date
}

try {
  const response = await fetch('/api/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(transaction)
  })

  if (!response.ok) {
    throw new Error('Could not save transaction.')
  }

  const savedTransaction = await response.json()

  message.textContent = 'Transaction added successfully!'

  const listItem = document.createElement('li')
  listItem.textContent =
    `${savedTransaction.date} — ${savedTransaction.description} — ` +
    `€${savedTransaction.amount.toFixed(2)} — ${savedTransaction.category} ` +
    `(${savedTransaction.type})`

  transactionList.appendChild(listItem)
  form.reset()
} catch (error) {
  message.textContent = 'Could not save transaction. Please try again.'
  console.error(error)
}

const listItem = document.createElement('li')
listItem.textContent =
  `${transaction.date} — ${transaction.description} — ` +
  `€${transaction.amount.toFixed(2)} — ${transaction.category} ` +
  `(${transaction.type})`

transactionList.appendChild(listItem)
form.reset()

})
