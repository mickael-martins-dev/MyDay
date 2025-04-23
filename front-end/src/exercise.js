const numbers = [1, 2, 3, 4, 5];
const doubleNumbers = numbers.map(number=>number*2)
console.log("double numbers : ",doubleNumbers)

const people = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 }
  ];

const name = people.map(e=>e.name)

console.log("name : ",name)

const products = [
    { name: "Laptop", price: 1200 },
    { name: "Phone", price: 800 },
    { name: "Tablet", price: 150 },
    { name: "Monitor", price: 300 }
  ];

const produitInf20 = products
.filter(e=>e.price<500)
.map(e=>e.name)  

console.log("produit en dessous de 500",produitInf20)

const sales = [
    { product: "Laptop", quantity: 2, price: 1200 },
    { product: "Phone", quantity: 3, price: 800 },
    { product: "Tablet", quantity: 5, price: 150 },
    { product: "Monitor", quantity: 1, price: 300 }
  ];

  const prix = sales
  .map(e=>e.quantity*e.price)
  .reduce((acc,curr)=>acc+curr,0)

  console.log("prix = ",prix)

  const users = [
    { name: "Alice", orders: [{ amount: 50 }, { amount: 150 }] },
    { name: "Bob", orders: [{ amount: 200 }, { amount: 100 }] },
    { name: "Charlie", orders: [{ amount: 300 }] }
  ];

const totalOrders = users.map(user=>{
    const totalUser = user.orders.reduce((acc,order)=>acc+order.amount,0)
    return{user : user.name,amount :totalUser}
})

console.log("total par user :",totalOrders)