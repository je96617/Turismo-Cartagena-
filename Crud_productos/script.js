const formulario = document.querySelector('#formulario');
const codigoInput = document.querySelector('#codigo');
const nombreInput = document.querySelector('#nombre');
const valorMinimoInput = document.querySelector('#valorMinimo');
const valorMaximoInput = document.querySelector('#valorMaximo');
const btnAgregarInput = document.querySelector('#btnAgregar');
const listaProductos = document.querySelector('#listaProductos');

formulario.addEventListener('submit', agregarProducto);

function agregarProducto(e) {
    e.preventDefault();

    const codigo = codigoInput.value.trim();
    const nombre = nombreInput.value.trim();
    const valorMinimo = parseFloat(valorMinimoInput.value);
    const valorMaximo = parseFloat(valorMaximoInput.value);

    if (!codigo || !nombre || isNaN(valorMinimo) || isNaN(valorMaximo)) {
        alert('Todos los campos deben llenarse correctamente.');
        return;
    }

    const existeProducto = Array.from(listaProductos.children).some(item => {
        const itemCodigo = item.querySelector('.codigo').textContent.split(': ')[1];
        return itemCodigo === codigo;
    });

    if (existeProducto) {
        alert('Ya existe un producto con el mismo código.');
        return;
    }

    const nuevoProducto = {
        codigo,
        nombre,
        valorMinimo,
        valorMaximo
    };

    mostrarProductoEnLista(nuevoProducto);
    limpiarFormulario();
}

function mostrarProductoEnLista(producto) {
    const li = document.createElement('li');
    li.className = 'producto';
    li.innerHTML = `
        <span class="codigo">Código: ${producto.codigo}</span>
        <span>Nombre: ${producto.nombre}</span>
        <span>Valor Mínimo: ${producto.valorMinimo}</span>
        <span>Valor Máximo: ${producto.valorMaximo}</span>
        <button class="btn-editar" onclick="editarProducto('${producto.codigo}')">Editar</button>
        <button class="btn-eliminar" onclick="eliminarProducto(this)">Eliminar</button>
    `;

    listaProductos.appendChild(li);
}

function limpiarFormulario() {
    formulario.reset();
}

function editarProducto(codigo) {
    const producto = obtenerProductoPorCodigo(codigo);

    if (producto) {
        // Actualizar los valores del producto con los datos del formulario
        producto.nombre = nombreInput.value.trim();
        producto.valorMinimo = parseFloat(valorMinimoInput.value);
        producto.valorMaximo = parseFloat(valorMaximoInput.value);

        // Encontrar el elemento li en la lista y actualizar su contenido
        const productosEnLista = listaProductos.getElementsByClassName('producto');

        for (let i = 0; i < productosEnLista.length; i++) {
            const item = productosEnLista[i];
            const codigoEnLista = item.querySelector('.codigo').textContent.split(': ')[1];

            if (codigoEnLista === codigo) {
                // Actualizar el contenido del elemento li con los nuevos valores del producto
                item.querySelector('.codigo').textContent = `Código: ${producto.codigo}`;
                item.querySelector('span:nth-child(2)').textContent = `Nombre: ${producto.nombre}`;
                item.querySelector('span:nth-child(3)').textContent = `Valor Mínimo: ${producto.valorMinimo}`;
                item.querySelector('span:nth-child(4)').textContent = `Valor Máximo: ${producto.valorMaximo}`;
                break;
            }
        }

        // Limpiar el formulario después de la edición
        limpiarFormulario();
    }
}


function eliminarProducto(botonEliminar) {
    const li = botonEliminar.parentNode;
    const codigo = li.querySelector('.codigo').textContent.split(': ')[1];

    listaProductos.removeChild(li);
    limpiarFormulario();
}

function obtenerProductoPorCodigo(codigo) {
    const productosEnLista = listaProductos.getElementsByClassName('producto');

    for (let i = 0; i < productosEnLista.length; i++) {
        const producto = productosEnLista[i];
        const codigoEnLista = producto.querySelector('.codigo').textContent.split(': ')[1];

        if (codigoEnLista === codigo) {
            return {
                codigo,
                nombre: producto.querySelector('span:nth-child(2)').textContent.split(': ')[1],
                valorMinimo: parseFloat(producto.querySelector('span:nth-child(3)').textContent.split(': ')[1]),
                valorMaximo: parseFloat(producto.querySelector('span:nth-child(4)').textContent.split(': ')[1])
            };
        }
    }

    return null;
}
