# STORY MAKER
(Could also be used as a kinda simpiler inqurer)

All of this is assuming you have
```js
const story = require('./index')
```
at the top

## Creating story
A story consists of 'functions'.
functions are something that can happen in a story,
It has a message, and options.
A story always starts with the start function,
There is a type, defaults to message
The start function takes one boolean argument, this toggles if it should clear the console.

```js
const myStory = new story({
    start: {message: "Hello, how are you"}
})

myStory.start(true)
```

You can set the type to choices,
This will make a multiple choice system for the user,
You can define options as a list,
for the choices type, in the first item has to be an object, the other items dont matter,
in that object, the key is the option and the value is the function it will run.

```js
const myStory = new story({
    start: {message: "Hello, how are you", type: "choices", options: [{"Im fine!": "fine", "Im not so good...": "notFine"}]}
})

myStory.start(true)
```

Now it is the time we define multiple functions.

```js
const myStory = new story({
    start: {message: "Hello, how are you", type: "choices", options: [{"Im fine!": "fine", "Im not so good...": "notFine"}]},
    fine: {message: "Nice :)"},
    notFine: {message: "I dont care, lol"}
})

myStory.start(true)
```

## Making more complex stories
We can make branching paths to multiple endings!

```js
const myStory = new story({
    start: {message: "Hello, how are you?", type: "choices", options: [{"Im fine!": "fine", "Im not so good...": "notFine"}]},
    fine: {message: "Are you sure?", type: "choices", options: [{"Yes": "fineYes", "No": "fineNo"}]},
    notFine: {message: "So, Did i ask?", type: "choices", options: [{"Yes": "askYes", "No": "askNo"}]},

    fineYes: {message: "Cool :)"},
    fineNo: {message: "WHY DID YOU LIE TO ME IN THE FIRST PLACE!!"},

    askYes: {message: "LIAR"},
    askNo: {message: "Correct :)"}
})

myStory.start(true)
```

And lastly, add characters

```js
const myStory = new story({
    start: {message: "Hello, how are you?", type: "choices", options: [{"Im fine!": "fine", "Im not so good...": "notFine"}], character: "John"},
    fine: {message: "Are you sure?", type: "choices", options: [{"Yes": "fineYes", "No": "fineNo"}], character: "John"},
    notFine: {message: "So, Did i ask?", type: "choices", options: [{"Yes": "askYes", "No": "askNo"}], character: "John"},

    fineYes: {message: "Cool :)", character: "John"},
    fineNo: {message: "WHY DID YOU LIE TO ME IN THE FIRST PLACE!!", character: "John"},

    askYes: {message: "LIAR", character: "John"},
    askNo: {message: "Correct :)", character: "John"}
})

myStory.start(true)
```

or

```js
const character = "John";

const myStory = new story({
    start: {message: "Hello, how are you?", type: "choices", options: [{"Im fine!": "fine", "Im not so good...": "notFine"}], character},
    fine: {message: "Are you sure?", type: "choices", options: [{"Yes": "fineYes", "No": "fineNo"}], character},
    notFine: {message: "So, Did i ask?", type: "choices", options: [{"Yes": "askYes", "No": "askNo"}], character},

    fineYes: {message: "Cool :)", character},
    fineNo: {message: "WHY DID YOU LIE TO ME IN THE FIRST PLACE!!", character},

    askYes: {message: "LIAR", character},
    askNo: {message: "Correct :)", character}
})

myStory.start(true)
```

## Variables and questions
Right now, we only explored messages and choice, but there is one more... prompt
Prompts will ask questions, which can have any answer, and will save to a variable named after the 1st item in options (more on that later)
```js
const myStory = new story({
    start: {message: "What is your name?", type: "prompt", options: ["name"]}
})

myStory.start(true)
```

We can the next option to define what will come next
```js
const myStory = new story({
    start: {message: "What is your name?", type: "prompt", options: ["name"], next: "greet"},
    greet: {message: "Hello!"}
})

myStory.start(true)
```

Now there are two ways to access the variables

1. By using the story.vars object (story.setEnd() will set what function will run after the story ends)
```js
const myStory = new story({
    start: {message: "What is your name?", type: "prompt", options: ["name"], next: "greet"},
    greet: {message: "Hello!"}
})

mystory.setEnd(() => {
    console.log(myStory.vars)
})

myStory.start(true)
```

2. By using the $ symbol in text
```js
const myStory = new story({
    start: {message: "What is your name?", type: "prompt", options: ["name"], next: "greet"},
    greet: {message: "Hello, $name"}
})

myStory.start(true)
```