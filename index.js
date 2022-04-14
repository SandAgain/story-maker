const inquirer = require('inquirer')
const chalk = require('chalk')

class story {
    constructor(data) {
        this.data = data
        this.vars = {}
        this.end = () => {}
    }
    
    /**
     * Used internally, Runs a function.
     * @param {string} func 
     */
    runFunc(func) {
        const types = ["message", "choices", "prompt"]

        if (!this.data[func]) {console.log(chalk.red("Cannot load function \"" + func + "\"")); return}

        func = this.data[func]
        const character = func.character ? func.character + ": " : ""

        let message = character + func.message
        message.split(" ").forEach(segment => {
            if (segment.startsWith("$")) {
                if (!Object.keys(this.vars).includes(segment.slice(1))) {console.log(chalk.red("Cannot get variable \"" + segment.slice(1) + "\"")); return}
                message = message.replace(segment, this.vars[segment.slice(1)])
            } else {
                message = message
            }
        })

        if (func.func) {func.func()}
        if (!func.type) {func.type = "message"}
        if (!types.includes(func.type)) {console.log(chalk.red("Type \"" + func.type + "\" Does not exist")); return}
        if (!func.options && func.type != "message") {console.log(chalk.red("Did not find options for type", func.type)); return}

        switch (func.type) {
            case "message":
                console.log(chalk.bold(chalk.green("!"), message))
                if (!func.next) {this.end()}

                if (func.next) {this.runFunc(func.next)}

            case "choices":
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'choice',
                            message,
                            choices: Object.keys(func.options[0])
                        }
                    ])
                    .then(choice => {
                        this.runFunc(func.options[0][choice.choice])
                    })
            case "prompt":
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'answer',
                            message,
                        }
                    ])
                    .then(choice => {
                        this.vars[func.options[0]] = choice.answer
                        if (!func.next) {this.end()}
                        if (func.next) {this.runFunc(func.next)}
                })

            default:
        }
    }

    /**
     * Starts the story
     * @param {boolean} clearAll Toggles if it will clear the console
     */
    async start(clearAll) {
        if (clearAll) {console.clear()}
        this.runFunc('start')
    }

    /**
     * Sets what should happen after the story is done running
     * @param {Function} func 
     */
    setEnd(func) {
        this.end = func
    }
}

module.exports = story