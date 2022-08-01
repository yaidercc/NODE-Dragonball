const inquirer = require("inquirer");

require("colors");

const questions = [{
    type: 'list',
    name: 'option',
    message: '¿Que desea hacer?',
    choices: [{
            value: 1,
            name: `${'1.'.red} Buscar personaje.`
        },
        {
            value: 2,
            name: `${'2.'.red} Historial.`
        },
        {
            value: 0,
            name: `${'0.'.red} Salir.`
        },
    ]
}];

/**
 * Menu de opciones
 * @returns respuesta seleccionada
 */
const inquirerMenu = async () => {
    console.clear();
    console.log("========================".red);
    console.log("Seleccione una opción");
    console.log("========================".red);

    const {
        option
    } = await inquirer.prompt(questions);

    return option;
}


/**
 * Funcion que recibira el personaje a buscar
 * @returns Nombre digitado
 */
const searchCharacter = async() => {
    const choices = [{
        type: 'input',
        name: 'option',
        message: `Ingrese el nombre del personaje:`,
        validate(value) {
            if (value.length === 0) {
                return 'Por favor ingrese un valor';
            }
            return true;

        }
    }]

    const {
        option
    } = await inquirer.prompt(choices);

    return option;
}


/**
 * En caso de que hallan varios personajes con el mismo nombre, despliega los nombre para que seleccione el que quiere
 * @returns personaje seleccionado
 */
const selectCharacter = async(characters=[]) => {

    // construir la estructura del objeto choices
    const choicesCharacters=characters.map((item,i)=>{
        return{
            value:i,
            name:`${((i+1)+".").red} ${item.name}`
        }
    })

    
    const choices = [{
        type: 'list',
        name: 'option',
        message: `¿Cual de estos personajes buscas?`,
        choices:choicesCharacters,
        validate(value) {
            if (value<0) {
                return 'Por favor ingrese un valor';
            }
            return true;

        }
    }]

    const {
        option
    } = await inquirer.prompt(choices);

    return characters[option];
}

/**
 * Funcion para pausar la ejecucion despues de cada accion
 */
const pause = async () => {

    const choices = [{
        type: 'input',
        name: 'option',
        message: `Presione ${"Enter".red} para continuar.`
    }]

    const {
        option
    } = await inquirer.prompt(choices);

    return option;
}

module.exports = {
    inquirerMenu,
    pause,
    searchCharacter,
    selectCharacter
}