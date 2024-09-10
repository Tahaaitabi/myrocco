# Plan for the search engine logic

### Problem:
**Step 1:** Determine wether the target variable is an array or an object.

In order to check weather a variable contains an array or an objects I will create the following function: 

```javascript
const checkVariable = (arrVariable) => {
    //Logic for evaluating if the variable contains an array or an object
}
```

#### Array

In javascript arrays and objects are both of type `object`.

**Q.** How can one then tell if the data inside the variable is an object or an array?

**A.** We can use the `Array.isArray()` method to check if it's an array or not.

This can be done by creating the following logic inside the `checkVariable()` function:

```javascript
if ( Array.isArray(arrVariable) === true ) {
    //Logic to be performed on the array.
} else {
    //Falsey logic.
}
```

>Alternatively, we can write the same logic with a ternary operator and save some lines of code like so: 
>`Array.isArray(arrVariable) === true ? /* Truthy logic here */ : /* Falsey logic here */`

#### Object

In javascript, `arrays`, `objects` and `null` are of type `object`.

**Q.** How can we tell if the variable contains a plain object?

**A.** Since we already know, that we are not dealing with an array. We can proceed to check if the variable within is of type `object` and that the value of the array is not null.

Here's how we can write that logic using a  ternary operator: 

`typeof arrVariable === 'object' &&  arrVariable !== null ? : ;`

---

**Step 2:** Determine wether or not there is nested arrays or objects within the variable.

**Q.** How do we search the array or object to find out if there other objects or arrays within them? 

**A.** In order to see what's inside the arrVariable we can recursivelly call the `checkValue()` function on each iteration of the contents of the variable  until we reach the last level of nesting of the initial variable. If it's an array we can use the `.forEach()` method, and if it's a object we can iterate with a `for (... in ...)` loop.

Here's how the code for a recusrive check of the variable we initially check can be done:

```javascript
checkVariable = (arrVariable) => {
    if (Array.isArray(arrVariable)) {
        arrVariable.forEach(item => {
                checkVariable(item)
                });
    } else if (typeof arrVariable === 'object' && arrVariable !== null) {
        for (const prop in arrVariable) {
            console.log(`Property '${prop}' = ${arrVariable[prop]}`)
                checkVariable(arrVariable[prop])
        }
    } else {
        console.log(`${arrVariable} = `typeof arrVariable`)
    }
}
```

---

**Step 3:** Ensure that we only return the direct properties of an object and not all the chain.

**Q.** How do we stop the algorithm from returning everything the desired level?

**A.** We can use the `.hasOwnProperty()` method to check whether an object has a property as its own and not inherted though the prototype chain. We can make this part of the condition for recusuvely running the `checkVariable()` function. 

In the `else if` code block, we can add this condition like this:

```javascript
else if (typeof arrVariable === 'object' && arrVariable !== null) {
    console.log(`Object = ${arrVariable}`)
    for (const prop in arrVariable) {
        if (arrVariable.hasOwnProperty(prop)) {
            console.log(`Property ${prop} = ${arrVariable[prop]}`)
            checkVariable(arrVariable[prop])
        }
    }
}
```
