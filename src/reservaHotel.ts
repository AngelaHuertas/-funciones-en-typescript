import * as readline from 'readline';

interface IReserva{
    nombre: string;
    habitacion: number;
}

let reservas: IReserva[] = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Bienvenid@ al hotel "El Descanso".');

const menu = () => {
    console.log(`
        Seleccione una opción:
        1. Agregar reserva.
        2. Buscar reserva.
        3. Ingreso total del hotel.
        4. Salir.`)
};

const preguntar = (pregunta: string): Promise<string> =>{
    return new Promise(resolve => rl.question(pregunta, resolve))
};

const iniciarMenu = async () =>{
    while(true){
        menu();
        const opcion = await preguntar(`Ingrese una opción: `);

        switch(Number(opcion)){
            case 1:
                const nuevaReserva = await preguntar(`Ingrese el nombre del huésped: `);
                const habitacion = await preguntar(`Ingrese numero de habitación: `)
                const habitacionNumero = Number(habitacion);

                    if(nuevaReserva && !isNaN(habitacionNumero)){
                        reservas.push({nombre: nuevaReserva, habitacion:habitacionNumero})
                        console.log(`El huésped ${nuevaReserva} con reserva en la habitación ${habitacionNumero} se agrego correctamente`)
                    }else{
                        console.log(`Error: ingrese valores válidos.`)
                    }
                break;

            case 2:
                const buscarReserva = await preguntar(`Ingrese nombre del huésped que desea buscar: `)
                const reservaEncontrada = reservas.find(IReserva => IReserva.nombre === buscarReserva);

                    if(reservaEncontrada){
                        console.log(`La reserva del huésped: ${reservaEncontrada.nombre} en la habitación: ${reservaEncontrada.habitacion} se a encontrado.`)
                    }else{
                        console.log(`La reserva ${buscarReserva} no se encontro.`)
                    }
                break;

            case 3:
                if(reservas.length === 0){
                    console.log(`No hay reservas registradas para calcular el ingreso del hotal.`)
                }else{
                    const sumarReservas = reservas.length;//length es para sumar cuantos datos hay dentro de un array
                    console.log(`El ingreso del hotel es de ${sumarReservas}`)
                }
            break;

            case 4:
                console.log(`Estas saliendo del sistema del hotal "El Descanso"... !Hasta pronto!`)
                rl.close();
                return;

            default:
                console.log(`Error: Opción inválida. Por favor ingrese un dato válido.`)
                break;
        }

    }
}
iniciarMenu();