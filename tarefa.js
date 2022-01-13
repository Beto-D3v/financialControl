let addValueBtn = document.getElementById("btnAdd")
let addTxt = document.getElementById("transactionText");
let addNum = document.getElementById("number");
let list = []
var expense = 0
var revenue = 0
var balance = 0


function addElement(txtName, numValue) {
 
  let element = document.createElement("label");
  let id = String(Math.random()) + String(Math.random());
  element.classList.add("newElement");
  element.innerHTML = `
  <span> ${txtName}</span>
  <span>R$${Number(numValue)}</span>`;
  element.setAttribute("id", id);
  element.setAttribute("data-value", numValue);
  let buttonX = document.createElement("button");
  buttonX.innerHTML = "X";
  buttonX.classList.add("newButton");
  buttonX.addEventListener("click", () => delTransaction(id));
  let newList = document.getElementById("newTransactions").appendChild(element).appendChild(buttonX);
  list.push(newList);
   
  addTxt.value = ''
  addNum.value = ''
  addTxt.focus()
  
  
  if (numValue < 0) {
    element.style.color = "red";
    let expense = addExpense(numValue);
    return expense;
  } else {
    element.style.color = "green";
    let revenue = addRevenue(numValue);
    return revenue;
  }
}

const addTransaction = () => {
  let addTxt = document.getElementById("transactionText").value;
  let addNum = document.getElementById("number").value;
  if (addTxt != "" && addNum != "") {
    addElement(addTxt, addNum);
  } else {
    alert("Please add new values to continue");
  }

}

const addRevenue = (value) => {
  let revenues = document.getElementById("revenueValue");
  revenue += Number(value);
  let revHTML = revenue.toFixed(2).replace(".",",")
  revenues.innerHTML = `R$${revHTML}`;
  newBalance(expense,revenue)
};

const addExpense = (value) => {
  let expenses = document.getElementById("expenseCost");
  expense += Number(value);
  expHTML = expense.toFixed(2).replace(".",",")
  expenses.innerHTML = `R$${expHTML}`;
  newBalance(expense,revenue)
};

const newBalance = (exp, rev) =>{
  let curBalance = document.getElementById("balance") 
  let e = exp
  let r = rev
  balance = Number(e + r)
  newB = balance.toFixed(2).replace(".",",")
  curBalance.innerHTML = `R$${newB}`}

const delTransaction = (id) => {
    element = document.getElementById(id)
    let numValue = Number(element.dataset.value)
    element.remove()
    localStorage.removeItem('saveList');
    if (numValue < 0) {
      element.style.color = "red";
      let expense = addExpense(-numValue);
      return expense;
    } else {
      element.style.color = "green";
      let revenue = addRevenue(-numValue);
      return revenue;
    }
  }

addEventListener('keypress',e=>{
    if(e.key=="Enter") addTransaction()
  })

/*addEventListener('click', () => {
    const element = document.getElementById("newTransactions").innerHTML
    localStorage.setItem('saveList',element)
})

addEventListener('DOMContentLoaded', () =>{
    const saveElement = localStorage.getItem('saveList')
    document.getElementById("newTransactions").innerHTML = saveElement
})*/

addValueBtn.addEventListener("click", addTransaction);
