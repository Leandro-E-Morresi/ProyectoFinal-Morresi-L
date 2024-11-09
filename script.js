// Variables necesarias
let totalCompra = 0;  // Total acumulado de la compra
let productos = [];   // Array para almacenar objetos de productos

// Objeto para almacenar la información del producto
function Producto(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
}

// Función para agregar un producto
function agregarProducto() {
    const nombreProducto = document.getElementById('nombreProducto').value;
    const precioProducto = parseFloat(document.getElementById('precioProducto').value);

    // Validación de entrada
    if (isNaN(precioProducto) || precioProducto <= 0 || !nombreProducto) {
        mostrarNotificacion("Por favor, introduce un nombre y un precio válido mayor que cero.", 'warning');
        return;
    }

    // Procesamiento: agregar producto a la lista
    const nuevoProducto = new Producto(nombreProducto, precioProducto);
    productos.push(nuevoProducto);
    totalCompra += precioProducto; // Actualiza el total

    // Actualiza el total en la página
    document.getElementById("total").textContent = totalCompra.toFixed(2);

    // Mostrar producto en la lista
    const listaProductos = document.getElementById('listaProductos');
    const li = document.createElement('li');
    li.textContent = `${nuevoProducto.nombre} - $${nuevoProducto.precio.toFixed(2)}`;
    listaProductos.appendChild(li);

    // Almacenar datos en localStorage
    guardarEnStorage();

    mostrarNotificacion(`Producto agregado: ${nuevoProducto.nombre} - $${nuevoProducto.precio.toFixed(2)}`, 'success');
}

// Función para aplicar un descuento
function aplicarDescuento() {
    const porcentajeDescuento = parseFloat(prompt("Introduce el porcentaje de descuento (0-100):"));

    if (isNaN(porcentajeDescuento) || porcentajeDescuento < 0 || porcentajeDescuento > 100) {
        mostrarNotificacion("Por favor, introduce un porcentaje de descuento válido.", 'warning');
        return;
    }

    const montoDescuento = (totalCompra * porcentajeDescuento) / 100;
    totalCompra -= montoDescuento;

    // Actualiza el total en la página
    document.getElementById("total").textContent = totalCompra.toFixed(2);

    // Almacenar datos en localStorage
    guardarEnStorage();

    mostrarNotificacion(`Descuento aplicado: $${montoDescuento.toFixed(2)}`, 'success');
    mostrarNotificacion(`Total después del descuento: $${totalCompra.toFixed(2)}`, 'success');
}

// Función para calcular el impuesto
function calcularImpuesto() {
    const porcentajeImpuesto = parseFloat(prompt("Introduce el porcentaje de impuesto (0-100):"));

    if (isNaN(porcentajeImpuesto) || porcentajeImpuesto < 0 || porcentajeImpuesto > 100) {
        mostrarNotificacion("Por favor, introduce un porcentaje de impuesto válido.", 'warning');
        return;
    }

    const montoImpuesto = (totalCompra * porcentajeImpuesto) / 100;
    totalCompra += montoImpuesto;

    // Actualiza el total en la página
    document.getElementById("total").textContent = totalCompra.toFixed(2);

    // Almacenar datos en localStorage
    guardarEnStorage();

    mostrarNotificacion(`Impuesto aplicado: $${montoImpuesto.toFixed(2)}`, 'success');
    mostrarNotificacion(`Total después del impuesto: $${totalCompra.toFixed(2)}`, 'success');
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo) {
    const notificacionesDiv = document.getElementById('notificaciones');
    const nuevaNotificacion = document.createElement('div');
    
    nuevaNotificacion.textContent = mensaje;
    nuevaNotificacion.className = `notificacion ${tipo}`; // 'success' o 'warning'
    
    // Añadir al DOM
    notificacionesDiv.appendChild(nuevaNotificacion);

    // Eliminar la notificación después de 3 segundos
    setTimeout(() => {
        notificacionesDiv.removeChild(nuevaNotificacion);
    }, 3000);
}

// Función para limpiar la compra
function limpiarCompra() {
    totalCompra = 0;
    productos = [];
    document.getElementById("total").textContent = totalCompra.toFixed(2);
    document.getElementById('listaProductos').innerHTML = '';  // Limpiar la lista de productos

    // Eliminar los datos de localStorage
    localStorage.clear();

    mostrarNotificacion("Compra limpiada.", 'warning');
}

// Función para guardar los datos en localStorage
function guardarEnStorage() {
    localStorage.setItem('productos', JSON.stringify(productos));
    localStorage.setItem('totalCompra', totalCompra);
}

// Función para cargar los datos al inicio
function cargarDatos() {
    const productosGuardados = localStorage.getItem('productos');
    const totalGuardado = localStorage.getItem('totalCompra');

    if (productosGuardados && totalGuardado) {
        productos = JSON.parse(productosGuardados);
        totalCompra = parseFloat(totalGuardado);

        // Mostrar los productos guardados en la lista
        const listaProductos = document.getElementById('listaProductos');
        productos.forEach(producto => {
            const li = document.createElement('li');
            li.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
            listaProductos.appendChild(li);
        });

        // Actualizar el total en la página
        document.getElementById("total").textContent = totalCompra.toFixed(2);
        mostrarNotificacion("Datos cargados del Storage.", 'success');
    } else {
        mostrarNotificacion("No se encontraron datos previos.", 'warning');
    }
}

// Asignar eventos a los botones
document.getElementById('btnAgregarProducto').addEventListener('click', agregarProducto);
document.getElementById('btnAplicarDescuento').addEventListener('click', aplicarDescuento);
document.getElementById('btnCalcularImpuesto').addEventListener('click', calcularImpuesto);
document.getElementById('btnLimpiarCompra').addEventListener('click', limpiarCompra);

// Cargar los datos al iniciar la página
window.onload = cargarDatos;



