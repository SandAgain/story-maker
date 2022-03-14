# STORY MAKER

## Creating story
A story consists of 'functions'
functions are something that can happen in a story
It has a message, and options
A story always starts with the start function
The start function takes one boolean argument, this toggles if it should clear the console

```js
const myStory = new story({
    start: {message: "Hello, how are you"}
})

myStory.start(true)
```

You can define options as a object
the key is the option and the value is the function it will run

```js
const myStory = new story({
    start: {message: "Hello, how are you", options: {"Im fine!": "fine", "Im not so good...": "notFine"}}
})

myStory.start(true)
```

Now it is the time we define multiple functions

```js
const myStory = new story({
    start: {message: "Hello, how are you", options: {"Im fine!": "fine", "Im not so good...": "notFine"}},
    fine: {message: "Nice :)"},
    notFine: {message: "I dont care, lol"}
})

myStory.start(true)
```

## Making more complex stories
We can make branching paths to multiple endings

```js
const myStory = new story({
    start: {message: "Hello, how are you?", options: {"Im fine!": "fine", "Im not so good...": "notFine"}},
    fine: {message: "Are you sure?", options: {"Yes": "fineYes", "No": "fineNo"}},
    notFine: {message: "So, Did i ask?", options: {"Yes": "askYes", "No": "askNo"}},

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
    start: {message: "Hello, how are you?", options: {"Im fine!": "fine", "Im not so good...": "notFine"}, character: "John"},
    fine: {message: "Are you sure?", options: {"Yes": "fineYes", "No": "fineNo"}, character: "John"},
    notFine: {message: "So, Did i ask?", options: {"Yes": "askYes", "No": "askNo"}, character: "John"},

    fineYes: {message: "Cool :)", character: "John"},
    fineNo: {message: "WHY DID YOU LIE TO ME IN THE FIRST PLACE!!", character: "John"},

    askYes: {message: "LIAR", character: "John"},
    askNo: {message: "Correct :)", character: "John"}
})

myStory.start(true)
```

or

```js
character = "John";

const myStory = new story({
    start: {message: "Hello, how are you?", options: {"Im fine!": "fine", "Im not so good...": "notFine"}, character},
    fine: {message: "Are you sure?", options: {"Yes": "fineYes", "No": "fineNo"}, character},
    notFine: {message: "So, Did i ask?", options: {"Yes": "askYes", "No": "askNo"}, character},

    fineYes: {message: "Cool :)", character},
    fineNo: {message: "WHY DID YOU LIE TO ME IN THE FIRST PLACE!!", character},

    askYes: {message: "LIAR"},
    askNo: {message: "Correct :)"}
})

myStory.start(true)
```