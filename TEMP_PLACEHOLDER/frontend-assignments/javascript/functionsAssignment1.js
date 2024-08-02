/** Q1.Write a program to demonstrate how a function can be passed as a parameter to another function. */
function mainFunction(callBackFun) {
    console.log('Main Function Executed');
    callBackFun();
}

function callBackFunction() {
    console.log('Callback Executed');
}

mainFunction(callBackFunction);

/*Q2. An arrow function takes two arguments firstName and lastName and returns a 2 letter string that represents 
the first letter of both the arguments. For the arguments  Roger and Waters, the function returns ‘RW’. Write this function.*/

let getFirstLetter = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
}
console.log(getFirstLetter("Roger", "Waters"));