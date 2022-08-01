const axios = require("axios");
const fs = require("fs");
const cliSpinners = require('cli-spinners');
const Spinner = require('cli-spinner').Spinner;


class Dragonball {

    _History = [];
    path = "bd/history.json";

    constructor() {
        this.getHistory()
    }

    /**
     * Obtiene los datos del historial y los agrega en el array _History
     * @returns 
     */
    getHistory() {
        if (!fs.existsSync(this.path)) return;
        const info = fs.readFileSync(this.path, {
            encoding: 'utf-8'
        });
        if (info) {
            const data = JSON.parse(info);
            this._History = [...data.History];
        }
    }

    /**
     * Agregar personaje al historial
     * @param {*} character nombre del persnaje
     * @returns En caso de que el personaje ya este, no retorna nada.
     */

    addToHistory(character) {
        if (this._History.includes(character.toLocaleLowerCase())) {
            return;
        }
        this._History = this._History.splice(0, 5);
        this._History.unshift(character.toLocaleLowerCase());

        // Guardar en el archivo history
        this.guardarDB();
    }


    /**
     * Guarda el contenido del array _History en el archivo database
     */
    guardarDB() {
        const payload = {
            History: this._History
        }
        fs.writeFileSync(this.path, JSON.stringify(payload))
    }


    /**
     * Funcion encargada de hacer las peticiones a la api
     * @param {*} name nombre del personaje
     * @returns retona la informacion del personaje 
     */
    async getCharacter(name = "") {
        name = name.toLowerCase();

        // iniciar loader

        const spinner = new Spinner('Buscando.. %s');
        spinner.setSpinnerString(cliSpinners.dots.frames.join(" "));
        spinner.setSpinnerDelay(90)
        spinner.start();

        try {
            const request = axios.create({
                baseURL: `https://dragon-ball-super-api.herokuapp.com/api/characters/`
            })
            let result = await request.get();

            const character = result.data.filter(item => new RegExp(name, 'gi').test(item.name));

            console.clear();
            spinner.stop();

            if (character.length==0) return false;

            return character;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Dragonball;