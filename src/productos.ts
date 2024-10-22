import * as readline from 'readline';

interface IProducto{
    producto: string;
    valor: number;
}

let productos: IProducto[] = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Bienvenid@ al inventario.');

const menu = () => {
    console.log(`
        Seleccione una opción:
        1. Agregar producto.
        2. Buscar Producto.
        3. Valor total del inventario.
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
                const nuevoProducto = await preguntar(`Ingrese el nombre del producto: `);
                const precio = await preguntar(`Ingrese el valor del producto: `)
                const precioNumero = Number(precio);

                    if(nuevoProducto && !isNaN(precioNumero)){
                        productos.push({producto: nuevoProducto, valor:precioNumero})
                        console.log(`El producto ${nuevoProducto} con un precio de $${precioNumero} pesos, se agrego correctamente`)
                    }else{
                        console.log(`Error: ingrese valores válidos.`)
                    }
                break;

            case 2:
                const buscarProducto = await preguntar(`Ingrese nombre del producto que desea buscar: `)
                const productoEncontrado = productos.find(IProducto => IProducto.producto === buscarProducto);

                    if(productoEncontrado){
                        console.log(`El producto ${productoEncontrado.producto} con un precio de: $${productoEncontrado.valor} pesos se a encontrado. `)
                    }else{
                        console.log(`El producto ${buscarProducto} no se encontro.`)
                    }
                break;

            case 3:
                if(productos.length === 0){
                    console.log(`No hay productos registrados para calcular el valor total del inventario.`)
                }else{
                    const sumarInventario = productos.reduce((acumulado, IProducto) => acumulado + IProducto.valor, 0);
                    console.log(`El valor total del inventario es de $${sumarInventario} pesos.`)
                }
            break;

            case 4:
                console.log(`Estas saliendo del inventario... !Hasta pronto!`)
                rl.close();
                return;

            default:
                console.log(`Error: Opción inválida. Por favor ingrese un dato válido.`)
                break;
        }

    }
}
iniciarMenu();