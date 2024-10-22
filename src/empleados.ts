import * as readline from 'readline';

interface empleado{
    nombre: string;
    salario: number;
}

let empleados: empleado[] = [];

const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

console.log('Bienvenido al sistema')

const menu = () => {
    console.log(`
        seleccione una opción
        1. Agregar empleado.
        2. Buscar empleado.
        3. Salario promedio. 
        4. salir`)
};

const preguntar = (pregunta: string): Promise<string> => {
    return new Promise(resolve => rl.question(pregunta, resolve));
};

const iniciarMenu = async () => {
    while(true){
        menu();
        const opcion = await preguntar('Ingrese una opción: ');

        switch(Number(opcion)){
            case 1:
                const nuevoEmpleado = await preguntar('Ingrese el nombre del empleado: ');
                const saldo = await preguntar('Ingrese el salario del empleado: ')
                const salarioNumero = Number(saldo);

                    if (nuevoEmpleado && !isNaN (salarioNumero)){
                        empleados.push({nombre: nuevoEmpleado, salario:salarioNumero})
                        console.log(`Empleado ${nuevoEmpleado} con salario de ${salarioNumero} se agrego correctamente.`)
                    } else{
                        console.log('Error: ingrese valores válidos.')
                    }
                break;
            case 2: 
                const buscarEmpleado = await preguntar('Ingrese el nombre del empleado que desea buscar: ')  
                const empleadoEncontrado = empleados.find(empleado => empleado.nombre === buscarEmpleado);

                    if (empleadoEncontrado){
                        console.log(`Empleado encontrado.
                            nombre: ${empleadoEncontrado.nombre}
                            salario: ${empleadoEncontrado.salario}`)
                    } else{
                        console.log (`Empleado con nombre: ${buscarEmpleado} no encontrado.`)
                    }
                break;

            case 3:
                if(empleados.length === 0){
                    console.log('No hay empleados registrados para calcular el salario promedio.');
                } else{
                const sumaSalarios = empleados.reduce((acumulado, empleado) => acumulado + empleado.salario, 0);
                const promedioSalario = sumaSalarios / empleados.length;
                console.log(`El salario promedio de los empleados es: ${promedioSalario}`);
                }
                break;

            case 4:
                console.log(`Esta saliendo del sistemas... ¡Hasta pronto!`)
                rl.close();
                return;

            default:
                console.log(`Opción inválida. Por favor ingrese un dato válido`);
                break;
        }

    }
};

iniciarMenu();