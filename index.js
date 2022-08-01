// Paquetes
require("colors");

// Funciones

const{
    inquirerMenu,
    pause,
    searchCharacter,
    selectCharacter
}= require("./config/inquirer");

const Dragonball= require("./model/Dragonball");



const main=async()=>{
    let opt="";
    const dbs = new Dragonball();
    do{
        opt=await inquirerMenu();

        switch (opt) {
            case 1:
                const name = await searchCharacter();
                let info = await dbs.getCharacter(name);

                

                // Valida si se encontró el personaje
                if(info){
                    if(info.length>1){
                        info= await selectCharacter(info);
                    }else{
                        info=info[0];
                    }

                    // Guardar nombre del personaje en el historial
                    dbs.addToHistory(name);
                    
                    // Mostrar info
                    console.log("===========================".red)
                    console.log("\tDRAGON".yellow+"BALL".red)
                    console.log("===========================".red)

                    console.log("\nInformacion del personaje:\n".red);
                    console.log("Nombre: ".yellow+info.name);
                    console.log("Especie: ".yellow+info.specie);
                    console.log("Rol: ".yellow+info.role);
                    console.log("Estado: ".yellow+info.status);
                    console.log("Universo: ".yellow+info.universe);
                    console.log("PlanetaOrigen: ".yellow+info.originplanet+"\n");
                }else{
                    console.log("\nNo se encontro el personaje.".red);
                }
                break;
            case 2:
                dbs._History.map(el=>{
                    console.log("- ".red+el);
                })
                break;
            default:
                break;
        }
        // si selecciona salir que lo saque del ciclo antes de la pausa
        if(opt==0) break;
        await pause();
    }while(opt!=0);
}

main();
