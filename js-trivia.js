// 1) What is a potential pitfall with using: typeof bar === 'object' 
// to determine if 'bar' is an Object? How can this pitfall be avoided?

// A: an array is an object and null is also considered an object
//    therefore include bar !== null and !Array.isArray(bar) (which checks for arrays)

// answer should be checked this way
  console.log((bar !== null) && (!Array.isarray(bar)) && (typeof bar === 'object'))
  
// 2) What will the code below output to the console and why?
  (function(){
  var a = b = 3;
  })();

console.log("a defined? " + (typeof a !== 'undefined'));
console.log("b defined? " + (typeof b !== 'undefined'));

// A: It will return a defined true, and b defined as true 
//    but the b is stored globally si if you use strict mode 
//    then a is false and b is true;
//    var a=b=3 
//    =>  
//    b = 3; 
//    var a=b;   where be isn't a stored value.
//    b is only a referance not a stored value 
//    therefore a is not defined.

// 3) What will the code below output to the console and why?
var myObject = {
  foo: "bar",
  func: function() {
      var self = this;
      console.log("outer func:  this.foo = " + this.foo);
      console.log("outer func:  self.foo = " + self.foo);
      (function() {
          console.log("inner func:  this.foo = " + this.foo);
          console.log("inner func:  self.foo = " + self.foo);
      }());
  }
};
myObject.func();

// A: The outer function has 'this' stored as self, so it will return this
//    but the inner function doesn't carry 'this' it only gets self passed.
//    2nd function doesn't referance myObject so only stored value is passed in
//    so it will return:
// Outer function:
  'this.foo =' bar;
  'self.foo =' bar;
// Inner Function:
  'this.foo =' undefined;
  'self.foo =' bar;

// 4) What is the significance of, and reason for, wrapping the entire content of a JavaScript source file in a function block?

// A: It creates closure so other functions and libraries don't clash.

// 5) What is the significance, and what are the benefits, of including 'use strict' at the beginning of a JavaScript source file?

// A:  a. It prevents global storage of values and makes sure there are no accidents
   //  b. Helps with debug as it tells you if there are errors
  //   c. Gets rid of this. Turns this to null.
  //   d. Doesn't allow duplicate param values. (e.g., function foo(val1, val2, val1){}) doesn't work.

// 6)  Consider the two functions below. Will they both return the same thing? Why or why not?
function foo1()
{
  return {
      bar: "hello"
  };
}

function foo2()
{
  return
  {
      bar: "hello"
  };
}

// A: first one returns bar: 'hello' second one returns undefined.
   // If nothing is on the same line as return, it considers the line empty like python.
   
// 7) What will the code below output? Explain your answer.
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 == 0.3);

// A: Assumption: first one will return 0.3 and second will return true;
  //  Reality: first returns 0.30000000000000004  therefore second is false;
  // console.log(0.1 + 0.2) => 0.30000000000000004
  // console.log(0.1 + 0.2 == 0.3) => false
// stored numbers are floating precision therefore not 100% accurate

// 8) In what order will the numbers 1-4 be logged to the console when the code below is executed? Why?

(function() {
  console.log(1); 
  setTimeout(function(){console.log(2)}, 1000); 
  setTimeout(function(){console.log(3)}, 0); 
  console.log(4);
})();

// A:  1
//     4
//     3
//     2
// 1 and 4 are regular calls, then timeouts, 4 has a shorter delay than 3

// 9) Write a simple function (less than 160 characters) that returns a boolean indicating whether or not a string is a palindrome.

// A: 
function isPalindrome(s) {
  let r = s.length-1;
  for (let i=0; i <= r; i++) {
    if (s[i] !== s[r -i]) return false; 
   }
  return true;
}

// total 136 characters (including the spaces)


// 10)  Write a sum method which will work properly when invoked using either syntax below.
console.log(sum(2,3));   // Outputs 5
console.log(sum(2)(3));  // Outputs 5

// A: 
function sum(val1, val2) {
  if (val2 !== undefined) return val1 + val2;
  else return function(val2) {
        return val1 + val2
       };
}


// 11) Consider the following code snippet:
for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function(){ console.log(i); });
  document.body.appendChild(btn);
}
// (a) What gets logged to the console when the user clicks on “Button 4” and why?
// (b) Provide one or more alternate implementations that will work as expected.

// A:  
//   a) B4 gets answer 5 since the loop has already finished and the last value is 5
//   b) 
for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  (function(i){ 
  btn.addEventListener('click', function() {console.log(i); })
  })(i);
  document.body.appendChild(btn);
}
// or just replace var with let now it will pass i coorectly
for (let i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function(){ console.log(i); });
  document.body.appendChild(btn);
}

// 12) Assuming d is an “empty” object in scope, say:
var d = {};
// …what is accomplished using the following code?
[ 'zebra', 'horse' ].forEach(function(k) {
	d[k] = undefined;
});

// A: generically it stores each item as a key with a value of undefined


// 13) What will the code below output to the console and why?
var arr1 = "john".split('');
var arr2 = arr1.reverse();
var arr3 = "jones".split('');
arr2.push(arr3);
console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1));
console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1));

// A: because you are using var, the items become mutable
//    so when using reverse you reversed both the values and copy
//    making arr1 a copy of arr2 instead so whatever is done to arr2 is done to arr1.
//    also you are not concatinating the string and therfore returning an array within an array
//    arr1 = arr2 = ['n','h','o','j', ['j','o','n','e','s'] ]
// "array 1: length=5 last=j, o, n, e, s"


// 14) What will the code below output to the console and why ?
console.log(1 +  "2" + "2"); 
console.log(1 +  +"2" + "2");
console.log(1 +  -"1" + "2");
console.log(+"1" +  "1" + "2");
console.log( "A" - "B" + "2");
console.log( "A" - "B" + 2);

// A:
/*
console.log(1 +  "2" + "2") => 122
console.log(1 +  +"2" + "2") => 32
console.log(1 +  -"1" + "2") => 02
console.log(+"1" +  "1" + "2") => 112
console.log( "A" - "B" + "2") => NaN2
console.log( "A" - "B" + 2) => NaN
*/


// 14) The following recursive code will cause a stack overflow if the array list is too large. How can you fix this and still retain the recursive pattern?
var list = readHugeList();

var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item...
        nextListItem();
    }
};

// A:  I have no clue and I guessed wrong below is the answer
var list = readHugeList();

var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item...
        setTimeout(nextListItem(),0);
    }
};
/*
The stack overflow is eliminated because the event loop handles the recursion, 
not the call stack. When nextListItem runs, if item is not null, the timeout 
function (nextListItem) is pushed to the event queue and the function exits, 
thereby leaving the call stack clear. When the event queue runs its timed-out 
event, the next item is processed and a timer is set to again invoke nextListItem. 
Accordingly, the method is processed from start to finish without a direct recursive call, 
so the call stack remains clear, regardless of the number of iterations.
*/


// 15) What is a “closure” in JavaScript? Provide an example.

// A: closure is the name of the inner function which uses the 
//    values passed in by the outer function. It doesn't need to 
//    pass in values to the inner function.

function outer(arg) {
  let ban = 'you';
  function inner() {
    let test = 'new'
    console.log(arg);
    console.log(ban)
    console.log(test)
  }
}


// 16 What would the following lines of code output to the console?
console.log("0 || 1 = "+(0 || 1));
console.log("1 || 2 = "+(1 || 2));
console.log("0 && 1 = "+(0 && 1));
console.log("1 && 2 = "+(1 && 2));

// A: 
// returns truthy 
console.log("0 || 1 = "+(0 || 1)) => 0 || 1 = 1
// retruns leftmost
console.log("1 || 2 = "+(1 || 2)) => 1 || 2 = 1
// returns right most if true
console.log("0 && 1 = "+(0 && 1)) => 0 && 1 = 1
console.log("1 && 2 = "+(1 && 2)) => 1 && 2 = 2 


// 17) What will be the output when the following code is executed? Explain.
console.log(false == '0')
console.log(false === '0')

// A: 
//  === compares values whereas == finds similaries before comparing
// false == falsey 
console.log(false == '0') => true
// false === '0'
console.log(false === '0') => false
// also 1 is considered truthy 

// 18) What is the output out of the following code? Explain your answer.
var a={},
    b={key:'b'},
    c={key:'c'};

a[b]=123;
a[c]=456;

console.log(a[b]);

// A: 456

/*
for objects js stringifies parameter value. Since b and c 
are both objects == is applied so a['b'] == a['c'] since a['c'] is 
the last value now a['b'] references a['c']
*/


// 19) What will the following code output to the console? Explain.
console.log((function f(n){return ((n > 1) ? n * f(n-1) : n)})(10));

// A: It looks like a version of 10 factorial
//    a recursive function that multiplies one less each time until
//    it reaches 1 which it returns n which is the full factorial value

// 20) Consider the code snippet below. What will the console output be and why?
(function(x) {
  return (function(y) {
      console.log(x);
  })(2)
})(1);

// A: the asnwer is 1 because the inner function is a closure and x is passed in 
//    the outer function. Even though x isn't defined or saved in the inner func.

// 21) What will the following code output to the console and why? 
//     What is the issue with this code and how can it be fixed?
var hero = {
  _name: 'John Doe',
  getSecretIdentity: function (){
      return this._name;
  }
};

var stoleSecretIdentity = hero.getSecretIdentity;

console.log(stoleSecretIdentity());
console.log(hero.getSecretIdentity());

// A: It returns undifined for the first value, and John Doe for the second
//    stoleSecretIdentity is calling outside the object and therefore never gets ._name key
//    You fix this by binding hero object to hero.getSecretidentity

var hero = {
  _name: 'John Doe',
  getSecretIdentity: function (){
      return this._name;
  }
};

var stoleSecretIdentity = hero.getSecretIdentity.bind(hero);

console.log(stoleSecretIdentity());
console.log(hero.getSecretIdentity());



// 22) 
/*
Create a function that, given a DOM Element on the page, will visit the element itself 
and all of its descendents (not just its immediate children). For each element visited, 
the function should pass that element to a provided callback function.
The arguments to the function should be:
a DOM element
a callback function (that takes a DOM element as its argument)
*/

// A:  First it visits the element and then through recursion it visits its descendants
function visit(e, callback){
  callback(e);
  let list = e.children;
  for (let i=0; i <= list.length; i++) {
    visit(list[i], callback)
  }
}


// 23 Testing your this knowledge in JavaScript: What is the output of the following code?

var length = 10;
function fn() {
	console.log(this.length);
}

var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0]();
  }
};

obj.method(fn, 1);

// A: 10 and 2
/*  It's obvious that 10 is passed as the global variable,
in the method function the only variable that is being passed is fn
1 does nothing but it forces the function to go though another iteration
arguments in this case is (fn, fn) and arguments[0] is fn.
arguments[0]() is 2 because this.length is called from arguments[0] (fn).

if obj.method(fn, fn, fn, anything); then the returned values would be 10 and 4
since the length of the method argument is 4
*/

// 24) Consider the following code. What will the output be, and why?

(function () {
  try {
      throw new Error();
  } catch (x) {
      var x = 1, y = 2;
      console.log(x);
  }
  console.log(x);
  console.log(y);
})();

// A: it returns   undefined, 1 ,undefined, 2
//  first it checks catch(x) which is not defined returning undefined
// the x = 1 and y = 2 are stored in the inner function but becase y=2 
// came after x=1 only y=2 is stored as the global variable
// so console.log(x) is 1 for inner but undefined for outer and
//  onsole.log(y) is 2 since it is a global value. 

// 25) What will be the output of this code?
var x = 21;
var girl = function () {
    console.log(x);
    var x = 20;
};
girl ();

// A: undefined because although x is global it then turns to 20 and
//    one you leave the function x becomes undefined so when you call
//    girl() you don't pass in anything also most importantly because nothing is 
// being passed in the function, x will always start out as undefined. 

//  26) What will this code print?
for (let i = 0; i < 5; i++) { 
  setTimeout(function() { console.log(i); }, i * 1000 );
}

// A: 0,1,2,3,4 because let is being used. if it was var then the output 
  //  would have been 5,5,5,5,5 

// 27) What do the following lines output, and why?
console.log(1 < 2 < 3);
console.log(3 > 2 > 1);

// A: true and false  second is false because when first operation runs 
//  it returns true or false 3>2 true => 1 then 1 > 1 false 
// conversely 1<2 true => 1 then 1 < 3 true

// 28) How do you add an element at the begining of an array? How do you add one at the end?

// A: array.unshift(e1) and array.push(e2) 
// or array = [e1, ...array, e2]  

// 29) Imagine you have this code:
var a = [1, 2, 3];
// a) Will this result in a crash?
a[10] = 99;
// b) What will this output?
console.log(a[6]);

// A: 
// a) a = [1, 2, 3, 0,0,0,0,0,0,99]; It doesn't crash simply adds 0 to empty values
// b) undefined since no number was placed in the array

// 30) What is the value of typeof undefined == typeof NULL?

// A: true: falsy = falsy therefore true 

// 31) What would following code return?
console.log(typeof typeof 1);

// A: string  typeof 1 => 'number'   typeof 'number' => string

// 32) What will be the output of the following code:
for (var i = 0; i < 5; i++) {
	setTimeout(function() { console.log(i); }, i * 1000 );
}

// A: 5,5,5,5,5 since i will return the value after the loop each time which 
//  is 5, and the fifth time it returns 5 from the settimeout


// 33) What is NaN? What is its type? How can you reliably test if a value is equal to NaN?

// A: Not a Number is checks if the type is a number, float or integer. 
/*
For one thing, although NaN means “not a number”, its type is, believe it or not, Number:

console.log(typeof NaN === "number");  // logs "true"
Additionally, NaN compared to anything – even itself! – is false:

console.log(NaN === NaN);  // logs "false"
*/

// 34) What will the following code output and why?
var b = 1;
function outer(){
   	var b = 2
    function inner(){
        b++;
        var b = 3;
        console.log(b)
    }
    inner();
}
outer();

// A; 3 
//  because inner is inside outer it returns undefined, but then 
//  inner() is called which returns 3.

// 35) Discuss possible ways to write a function isInteger(x) that determines if x is an integer.

// A: 
let isInteger = (x) => {return (x**1) === x} 
// anything number to the power of 1 is itself so if it is a number it will return true.

// another example that uses Bitwise XOR
let isInteger = (x) => {return (x^0) === x} 
// turns number to bit and checks then returns to number then === number

// 36) How do you clone and object?

// A: {...obj} which is the spread operator also useful for cloning arrays
//  could also use Object.assign({},obj)
// 
// const v8 = require('v8');
// const structuredClone = obj => {
//   return v8.deserialize(v8.serialize(obj));
// };