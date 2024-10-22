import * as readline from 'readline';

interface Libro {
    titulo: string;
    autor: string;
}

let libros: Libro[] = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Hola, bienvenido a su biblioteca pública");

const mostrarMenu = () => {
    console.log(`
Seleccione una opción:
1. Agregar libro.
2. Buscar libro.
3. Libros disponibles.
4. Buscar libros por autor.
5. Salir.
    `);
};

const preguntar = (pregunta: string): Promise<string> => {
    return new Promise(resolve => rl.question(pregunta, resolve));
};

const iniciarMenu = async () => {
    while (true) {
        mostrarMenu();
        const opcion = await preguntar("Ingrese una opción: ");
        
        switch (Number(opcion)) {
            case 1:
                const nuevoLibro = await preguntar("Ingrese el nombre del libro: ");
                const autor = await preguntar("Ingrese el nombre del autor: ");
                if (nuevoLibro && autor) {
                    libros.push({ titulo: nuevoLibro, autor: autor });
                    console.log(`Libro "${nuevoLibro}" de "${autor}" agregado correctamente.`);
                }else{
                    console.log('Error: ingrese valores válidos.')
                }
                break;
            case 2:
                const buscarLibro = await preguntar("Ingrese el nombre del libro que desea buscar: ");
                const libroEncontrado = libros.find(libro => libro.titulo === buscarLibro);
                if (libroEncontrado) {
                    console.log(`El libro "${libroEncontrado.titulo}" de "${libroEncontrado.autor}" está disponible.`);
                } else {
                    console.log(`El libro "${buscarLibro}" no fue encontrado.`);
                }
                break;
            case 3:
                if (libros.length > 0) {
                    console.log("Libros disponibles:");
                    libros.forEach(libro => console.log(`"${libro.titulo}" de "${libro.autor}"`));
                } else {
                    console.log("No hay libros disponibles.");
                }
                break;
            case 4:
                const autorBusqueda = await preguntar("Ingrese el nombre del autor: ");
                const librosAutor = libros.filter(libro => libro.autor === autorBusqueda);
                if (librosAutor.length > 0) {
                    console.log(`Libros de "${autorBusqueda}":`);
                    librosAutor.forEach(libro => console.log(`"${libro.titulo}"`));
                } else {
                    console.log(`No se encontraron libros del autor "${autorBusqueda}".`);
                }
                break;
            case 5:
                console.log("Gracias por usar la biblioteca pública. ¡Hasta luego!");
                rl.close();
                return;
            default:
                console.log("Opción no válida. Por favor seleccione una opción válida.");
                break;
        }
    }
};

iniciarMenu();
