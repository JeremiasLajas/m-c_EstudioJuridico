// Importa las funciones y variables de usuarios en lugar de propiedades
import { insertarClientes, obtenerClientes, actualizarClientes, eliminarClientes } from "../modelos/clientes";

const btnAgregar = document.querySelector('#btnAgregar');
const formulario = document.querySelector('#agregar-cliente');
const formularioModal = new bootstrap.Modal(document.getElementById('addUserModal'));
const btnGuardar = document.querySelector('#btnGuardar');
const contenedorclientes = document.querySelector('#lista-clientes tbody')

// Alerta
const alerta = document.querySelector('#alerta');

// Input
const inputTipo = document.querySelector('#tipo');
const inputDni = document.querySelector('#dni');
const inputApellidoRSocial = document.querySelector('#apellidoRsocial');
const inputNombre = document.querySelector('#nombre');
const inputDomicilio = document.querySelector('#domicilio');
const inputTelefono = document.querySelector('#telefono');
const inputEmail = document.querySelector('#email');
const inputLocalidad = document.querySelector('#localidad');
const inputCPostal = document.querySelector('#cpostal');
const inputFNacimiento = document.querySelector('#fnacimiento');
const inputFAlta = document.querySelector('#falta');
const inputFBaja = document.querySelector('#fbaja');

// Variables
let opcion = '';
let id;
let mensajeAlerta;

// Evento que sucede cuando todo el contenido del DOM es leído
document.addEventListener('DOMContentLoaded', () => {
    mostrarClientes();
});

/**
* Ejecuta el evento click del Botón Agregar cliente
*/
btnAgregar.addEventListener('click', () => {
    debugger;
    // Limpiamos los inputs
    inputTipo.value = null;
    inputDni.value = null;
    inputApellidoRSocial.value = null;
    inputNombre.value = null;
    inputDomicilio.value = null;
    inputTelefono.value = null;
    inputEmail.value = null;
    inputLocalidad.value = null;
    inputCPostal.value = null;
    inputFNacimiento.value = null;
    inputFAlta.value = null;
    inputFBaja.value = null;


    // Mostramos el formulario
    formularioModal.show();

    opcion = 'insertar';
})

let clientes = [];
const header = document.getElementById('header-lista-clientes');
// Función para mostrar clientes
async function mostrarClientes() {
    clientes = await obtenerClientes();
    const tablaClientes = document.getElementById('lista-clientes tbody');
    const tbody = document.getElementById('tbody')
    tbody.innerHTML = '';

    if (clientes.lenght < 0) {

        header.classList.add('hidden');
    }

    for (let cliente of clientes) {

        console.log(cliente);

        tbody.innerHTML += `
       
    
    <tr>
        <td>
        <select disabled name="spantipopersona" class="tipoPersonaSelect">
            <option value="1" ${cliente.tipopersona === 'Persona fisica' ? 'selected' : ''}>Persona fisica</option>
            <option value="2" ${cliente.tipopersona === 'Persona juridica' ? 'selected' : ''}>Persona juridica</option>
        </select>
    </td>       
     <td><span name="spandni">${cliente.dni}</span></td>
        <td><span name="spannombres">${cliente.nombres}</span></td>
        <td><span name="spanapellidoRsocial">${cliente.apellidoRsocial}</span></td>
        <td><span name="spandomicilio">${cliente.domicilio}</span></td>
        <td><span name="spantelefono">${cliente.telefono}</span></td>
        <td><span name="spanemail">${cliente.email}</span></td>
        <td><span name="spanlocalidad">${cliente.localidad}</span></td>
        <td><span name="spancpostal">${cliente.cpostal}</span></td>
        <td><span name="spanfnacimiento">${cliente.fnacimiento}</span></td>
        <td><span name="spanfalta">${cliente.falta}</span></td>
        <td><span name="spanfbaja">${cliente.fbaja}</span></td>
       
        <td>
            <a class="btnEditar btn btn-primary btn-sm">Editar</a>
            <a class="btnBorrar btn btn-danger btn-sm">Borrar</a>
            <input type="hidden" class="idCliente" value="${cliente.id}">
        </td>
        </tr>

 
        
        `;

    }
}

/**
 * Ejecuta el evento submit del formulario
 */
formulario.addEventListener('submit', function (e) {
    debugger;
    e.preventDefault();     // Prevenimos la acción por defecto
    const datos = new FormData(formulario); // Guardamos los datos del formulario

    switch (opcion) {
        case 'insertar':
            debugger;
            mensajeAlerta = `Datos guardados`;
            insertarClientes(datos);
            break;

        case 'actualizar':
            debugger;
            mensajeAlerta = `Datos actualizados`;
            actualizarClientes(datos, id);
            break;
    }
    insertarAlerta(mensajeAlerta, 'success');
    mostrarClientes();
    formularioModal.hide();


})

/**
* Define el mensaje de alerta
* @param mensaje el mensaje a mostrar
* @param tipo el tipo de alerta
*/
const insertarAlerta = (mensaje, tipo) => {
    const envoltorio = document.createElement('div');
    envoltorio.innerHTML = `
    <div class="alert alert-${tipo} alert-dismissible" role="alert">
        <div>${mensaje}</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    </div>
    `;
    alerta.append(envoltorio);

    setTimeout(() => {
        envoltorio.remove();
    }, 3000);
};

/**
 * Determina en qué elemento se realiza un evento
 * @param elemento el elemento al que se realiza el evento
 * @param evento el evento realizado
 * @param selector el selector seleccionado
 * @param manejador el método que maneja el evento
 */
const on = (elemento, evento, selector, manejador) => {
    elemento.addEventListener(evento, e => { // Agregamos el método para escuchar el evento
        if (e.target.closest(selector)) { // Si el objetivo del manejador es el selector
            manejador(e); // Ejecutamos el método del manejador
        }
    })
}

on(document, 'click', '.btnEditar', e => {
    const botones = e.target.parentNode; // Guardamos el elemento padre del botón

    // Guardamos los valores del card de la propiedad
    id = botones.querySelector('.idCliente').value;
    const tipopersona = botones.querySelector('#tipo')
    const dni = botones.querySelector('#dni')
    const apellidoRsocial = botones.querySelector('#apellidoRsocial')
    const nombre = botones.querySelector('#nombre')
    const domicilio = botones.querySelector('#domicilio')
    const telefono = botones.querySelector('#telefono')
    const email = botones.querySelector('#email')
    const localidad = botones.querySelector('#localidad')
    const cpostal = botones.querySelector('#cpostal')
    const fnacimiento = botones.querySelector('#fnacimiento')
    const falta = botones.querySelector('#falta')
    const fbaja = botones.querySelector('#fbaja')




    // Asignamos los valores a los inputs
    inputTipo.value = tipopersona;
    inputDni.value = dni;
    inputApellidoRSocial.value = apellidoRsocial;
    inputNombre.value = nombre;
    inputDomicilio.value = domicilio;
    inputTelefono.value = telefono;
    inputEmail.value = email;
    inputLocalidad.value = localidad;
    inputCPostal.value = cpostal;
    inputFNacimiento.value = fnacimiento;
    inputFAlta.value = falta;
    inputFBaja.value = fbaja;

    // Mostramos el formulario
    formularioModal.show();

    opcion = 'actualizar';
})

/**
 *  Función para el botón Borrar
 */
on(document, 'click', '.btnBorrar', e => {
    const cardFooter = e.target.parentNode; // Guardamos el elemento padre del botón
    id = cardFooter.querySelector('.idCliente').value; // Obtenemos el id de la propiedad
    const nombres = cardFooter.parentNode.querySelector('span[name=spannombres]').innerHTML; // Obtenemos el nombre del artículo
    let aceptar = confirm(`¿Realmente desea eliminar a ${nombres}?`); // Pedimos confirmación para eliminar
    if (aceptar) {
      eliminarClientes(id);
      insertarAlerta(`${nombres}  borrado`, 'danger');
      mostrarClientes();
    }
  });

