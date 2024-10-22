import * as readline from 'readline';

interface IEstudiante{
    nombre: string;
    nota: number
}

let estudiantes: IEstudiante[] = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

console.log(`Bienvenid@ al sistema escolar:`);

const menu = () => {
    console.log(`
        Seleccione una opción:
        1. Agregar estudiante y calificación.
        2. Buscar estudiantes.
        3. Nota promedio de todos los estudiantes.
        4. Salir.
        `)
}

const preguntar = (pregunta: string): Promise<string> => {
    return new Promise(resolve => rl.question(pregunta, resolve));
};

const iniciarMenu = async () => {
    while (true) {
        menu();
        const opcion = await preguntar("Ingrese una opción: ");
        
        switch (Number(opcion)) {
            case 1:
                const nuevoEstudiante = await preguntar("Ingrese el nombre del estudiante: ");
                const calificacion = await preguntar("Ingrese la nota del estudiante: ");
                const calificacionNumero = Number(calificacion)
                    if (nuevoEstudiante && !isNaN (calificacionNumero)) {
                        estudiantes.push({ nombre: nuevoEstudiante, nota: calificacionNumero });
                        console.log(`El estudiante "${nuevoEstudiante}" tiene una calificación de ${calificacionNumero}.`);
                    }else{
                        console.log('Error: ingrese valores válidos.')
                    }
                break;
            case 2:
                const buscarEstudiante = await preguntar("Ingrese el nombre del estudiante que desea buscar: ");
                const estudianteEncontrado = estudiantes.find(IEstudiante => IEstudiante.nombre === buscarEstudiante);
                    if (estudianteEncontrado) {
                        console.log(`El estudiante "${estudianteEncontrado.nombre}" tiene una calificación de ${estudianteEncontrado.nota}.`);
                    } else {
                        console.log(`El estudiante "${buscarEstudiante}" no fue encontrado.`);
                    }
                break;

            case 3:
                if(estudiantes.length === 0){
                    console.log('No hay notas de estudiantes registrados para calcular el promedio.');
                } else{
                const sumaNotas = estudiantes.reduce((acumulado, IEstudiante) => acumulado + IEstudiante.nota, 0);
                const promedioNotas = sumaNotas / estudiantes.length;
                console.log(`La nota promedio de los estudiantes es de: ${promedioNotas}`);
                }
                break;

            case 4:
                console.log("Gracias por utilizar el sistema escolar. ¡Hasta luego!");
                rl.close();
                return;
            default:
                console.log("Opción no válida. Por favor seleccione una opción válida.");
                break;
        }
    }
};

iniciarMenu();

