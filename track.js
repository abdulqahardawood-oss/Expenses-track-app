const typeInput = document.getElementById("type");
const amountInput = document.getElementById("amount");
const nameInput = document.getElementById("name");
const form = document.getElementById("expenseForm");

const incomeDisplay = document.getElementById("income");
const expensesDisplay = document.getElementById("expenses");
const balanceDisplay = document.getElementById("balance");
const transactionsList = document.getElementById("transactionsList");

let income = 0;
let expenses = 0;
let transactions = [];

function updateDisplay() {
  incomeDisplay.textContent = `$${income.toFixed(2)}`;
  expensesDisplay.textContent = `$${expenses.toFixed(2)}`;
  const balance = income - expenses;
  balanceDisplay.textContent = `$${balance.toFixed(2)}`;
  updateTransactionsList();
}

function updateTransactionsList() {
  if (transactions.length === 0) {
    transactionsList.innerHTML = '<p class="text-gray-400 text-sm">No transactions yet</p>';
    return;
  }

  transactionsList.innerHTML = transactions
    .map((t, index) => `
      <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div class="flex-1">
          <p class="font-semibold text-gray-800">${t.name}</p>
          <p class="text-xs text-gray-500">${t.type}</p>
        </div>
        <div class="text-right">
          <p class="font-bold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}">
            ${t.type === 'income' ? '+' : '-'}$${t.amount.toFixed(2)}
          </p>
          <button type="button" onclick="deleteTransaction(${index})" class="text-xs text-red-500 hover:text-red-700 mt-1">Delete</button>
        </div>
      </div>
    `)
    .join("");
}

function deleteTransaction(index) {
  const transaction = transactions[index];
  if (transaction.type === "income") {
    income -= transaction.amount;
  } else {
    expenses -= transaction.amount;
  }
  transactions.splice(index, 1);
  updateDisplay();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const type = typeInput.value;
  const amount = parseFloat(amountInput.value);
  const name = nameInput.value.trim();

  if (!name) {
    alert("Please enter a description");
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    alert("Enter a valid amount");
    return;
  }

  if (type === "income") {
    income += amount;
  } else {
    expenses += amount;
  }

  transactions.push({ type, amount, name });

  amountInput.value = "";
  nameInput.value = "";
  typeInput.value = "expense";

  updateDisplay();
});

updateDisplay();