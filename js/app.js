const formularioContactos = document.querySelector('#contacto'),
      listadoContactos = document.querySelector('#listado-contactos tbody');
    inputBuscador = document.querySelector('#buscar');

eventListeners();

function eventListeners() {
    formularioContactos.addEventListener('submit',leerFormulario);

    if(listadoContactos) {
        listadoContactos.addEventListener('click', eliminarContacto);
    }

    inputBuscador.addEventListener('input', buscarContactos);
   
}

function leerFormulario(e) {
    e.preventDefault();

    const nombre = document.querySelector('#nombre').value,
          empresa = document.querySelector('#empresa').value,
          telefono = document.querySelector('#telefono').value;
          accion = document.querySelector('#accion').value;

    if(nombre === '' || empresa === '' || telefono === '') {
        mostrarNotificacion('Todos los campos son obligatorios', 'error');
    } else {
        const infoContacto = new FormData();
        infoContacto.append('nombre', nombre);
        infoContacto.append('empresa', empresa);
        infoContacto.append('telefono', telefono);
        infoContacto.append('accion', accion);

        console.log(...infoContacto);

        if(accion === 'crear'){
            insertarBD(infoContacto);
        } else {

            const idRegistro = document.querySelector('#id').value;
            infoContacto.append('id', idRegistro);
            actualizarRegistro(infoContaco);
        }
    }
}

function insertarBD(datos) {

    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'inc/modelos/modelo-contactos.php', true);

    xhr.onload = function() {
        if(this.status === 200) {
            console.log(JSON.parse( xhr.responseText) );

            const respuesta = JSON.parse( xhr.responseText);

            const nuevoContacto = document.createElement('tr');

            nuevoContacto.innerHTML = `
                <td>${respuesta.datos.nombre}</td>
                <td>${respuesta.datos.empresa}</td>
                <td>${respuesta.datos.telefono}</td>
            `;

            const contenedorAcciones = document.createElement('td');

            const iconoEditar = document.createElement('i');
            iconoEditar.classList.add('fas', 'fa-pen-square');

            const btnEditar = document.createElement('a');
            btnEditar.appendChild(iconoEditar);
            btnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`;
            btnEditar.classList.add('btn', 'btn-editar');

            contenedorAcciones.appendChild(btnEditar);

            const iconoEliminar = document.createElement('i');
            iconoEliminar.classList.add('fas', 'fa-trash-alt');

            const btnEliminar = document.createElement('button');
            btnEliminar.appendChild(iconoEliminar);
            btnEliminar.setAttribute('data-id', respuesta.datos.id_insertado);
            btnEliminar.classList.add('btn', 'btn-borrar');

            contenedorAcciones.appendChild(btnEliminar);

            nuevoContacto.appendChild(contenedorAcciones);

            listadoContactos.appendChild(nuevoContacto);

            document.querySelector('form').reset();

            mostrarNotificacion('Contacto creado Correctamente', 'correcto');
        }
    }

    xhr.send(datos)
}

function actualizarRegistro(datos) {
    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'inc/modelos/modelo-contactos.php', true);

    xhr.onload = function(){
        if(this.status === 200) {
            const respuesta = JSON.parse(xhr.responseText);

            console.log(respuesta);
        }
    }

    xhr.send();
}

function eliminarContacto(e) {
    if( e.target.parentElement.classList.contains('btn-borrar') ) {

        const id = e.target.parentElement.getAttribute('data-id');


        const respuesta = confirm('¿Estas Seguro (a) ?');

        if(respuesta) {

            const xhr = new XMLHttpRequest();

            xhr.open('GET', `inc/modelos/modelo-contactos.php?id=${id}&accion=borrar`, true);

            xhr.onload = function() {
                if(this.status === 200) {
                    /**console.log(xhr.responseText);**/
                    const resultado = JSON.parse(xhr.responseText);
                    if(resultado.respuesta === 'correcto') {

                        console.log(e.target.parentElement.parentElement.parentElement);
                        e.target.parentElement.parentElement.parentElement.remove();

                        mostrarNotificacion('Contacto eliminado', 'correcto');
                    } else {

                        mostrarNotificacion('Hubo un error...', 'error' );
                    } 
                }
            } 

            xhr.send();
        }
    }
}

function mostrarNotificacion(mensaje, clase) {
    const notificacion = document.createElement('div');
    notificacion.classList.add(clase, 'notificacion', 'sombra');
    notificacion.textContent = mensaje;

    formularioContactos.insertBefore(notificacion, document.querySelector('form legend'));

    setTimeout(() => {
        notificacion.classList.add('visible');
        setTimeout(() => {
            notificacion.classList.remove('visible');
            setTimeout(() => {
                notificacion.remove();
            }, 500)
        }, 3000);
    }, 100);

}

function buscarContactos(e) {
    const expresion = new RegExp(e.target.value),
    registro = document.querySelectorAll('tbody tr');

    registro.forEach(registro => {
        registro.style.display = 'none';

        console.log(registro.childNodes[])
    })
}