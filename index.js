import inquirer from 'inquirer'
import chalk from 'chalk';

class story {
    constructor(data) {
        this.data = data
    }
    
    /**
     * Used internally, Runs a function.
     * @param {string} func 
     */
    runFunc(func) {
        func = this.data[func];

        if (!func.options) {console.log(chalk.green('?'), chalk.bold(func.character + ":") || "", chalk.bold(func.message)); return};

        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'choice',
                    message: `${`${func.character}:` || ""} ${func.message}`,
                    choices: Object.keys(func.options)
                }
            ])
            .then(choice => {
                this.runFunc(func.options[choice.choice]);
            });
    };

    /**
     * Starts the story
     * @param {boolean} clearAll Toggles if it will clear the console
     */
    start(clearAll) {
        if (clearAll) {console.clear()}
        this.runFunc('start');
    };
};

export default story