const axios = require("axios");

class Dragonball {
    // code...
    async getCharacter(name = "") {
        name = name.toLowerCase();
        try {
            const request = axios.create({
                baseURL: `https://dragon-ball-super-api.herokuapp.com/api/characters/`
            })
            let result = await request.get();

            const character=result.data.filter(item=>new RegExp(name,'gi').test(item.name));
            
            if(!character) return false;

            return character;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Dragonball;