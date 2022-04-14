const story = require("./index")

const myStory = new story({
    start: {message: "What is your name?", type: "prompt", options: ["name"], next: "greet"},
    greet: {message: "Hello, $name"}
})

myStory.start(true)