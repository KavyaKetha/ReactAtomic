/*Refactor the following function into a one-liner:
const printName = (name) => {
                     return “Hi” + name;
           }
Rewrite the following code using template literals
const printBill = (name, bill) => {
                     return “Hi “ + name + “, please pay: “ + bill;
           }
Modify the following code such that the object properties are destructured and logged.
const person = {
                      name: “Noam Chomsky”,
                      age: 92
            }
           
           let name = person.name;
           let age = person.age;
           console.log(name);
           console.log(age);
*/

const printName = name => "Hi" + name;
console.log(printName('John'));

const printBill = (name, bill) => {
    return `Hi ${name} , please pay:  ${bill}`;
}
console.log(printBill('John', 100));

const person = {
    name: 'Noam Chomsky',
    age: 92
}

let { name, age } = person;
console.log(name);
console.log(age);