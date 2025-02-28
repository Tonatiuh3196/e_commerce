let carrito = [];

function ocultarCarrito() { /*Oculta la sección de carrito de compras*/ 
    document.getElementById('carritoCompras').style.display = 'none';
}

function mostrarCarrito() { /*Muestra la sección de carrito de compras*/
    document.getElementById('carritoCompras').style.display = 'block';
}

function anadirProducto(event) { /*Añade un producto desde le botón que se tienen en los productos*/ 
    let producto = event.target.closest('.producto'); 
    let nombre = producto.querySelector('.detalles').innerText;
    let precio = parseFloat(producto.querySelector('.precio').innerText.replace('$', '')); 
    anadirCarrito(nombre, precio);
}

function anadirCarrito(nombre, precio) { /*Agrega los productos al carrito */
    if (carrito.length === 0) {
        mostrarCarrito();
    }
    
    let productoExistente = carrito.find(item => item.nombre === nombre);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }
    actualizarCarrito();
}

function agregarProducto(nombre) {/*Aumenta la cantidad de un producto */
    let producto = carrito.find(item => item.nombre === nombre);
    if (producto) {
        producto.cantidad++;
        actualizarCarrito();
    }
}

function quitarProducto(nombre) {/*Disminuir la cantidad de un producto */
    let producto = carrito.find(item => item.nombre === nombre);
    if (producto) {
        producto.cantidad--;
        if (producto.cantidad === 0) {
            carrito = carrito.filter(item => item.nombre !== nombre);
        }
        actualizarCarrito();
    }
}

function calcularTotal() {/*Calcula el mosto total */
    return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
}

function vaciarCarrito() {/*Elimina el carrito por completo */
    carrito = [];
    ocultarCarrito();
    actualizarCarrito();
}

function actualizarCarrito() { /*Actualiza el carrito interfaz */
    let carritoContainer = document.querySelector('.productosCarrito');
    carritoContainer.innerHTML = '';
    
    carrito.forEach(producto => {
        let div = document.createElement('div');
        div.classList.add('descripcion');
        div.innerHTML = `
            <h4>Producto</h4>
            <p>${producto.nombre}</p>
            <h4>Precio</h4>
            <p>$${producto.precio}</p>
            <div class="cantidad">
                <button onclick="agregarProducto('${producto.nombre}')">+</button>
                <p>${producto.cantidad}</p>
                <button onclick="quitarProducto('${producto.nombre}')">-</button>
            </div>
        `;
        carritoContainer.appendChild(div);
    });
    
    document.querySelector('.Valor').innerText = `$${calcularTotal().toFixed(2)}`;
    document.getElementById('limpiar').disabled = carrito.length === 0;

    if (carrito.length === 0){
        ocultarCarrito();
    }
}

ocultarCarrito();