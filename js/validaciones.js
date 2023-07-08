export function validar(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMissmatch",
    "patternMissmatch",
    "customError"
];

const mensajesDeError = {
    nombre: {
        valueMissing: "Este campo nombre no puede estar vacio "
    },
    email:{
        valueMissing: "Este campo correo no puede estar vacio ",
        typeMissmatch: "El correo no es valido"
    },
    contraseña:{
        valueMissing: "Este campo contraseña no puede estar vacio ",
        patternMissmatch: "Al menos 6 caracteres, maximo 16, debe contener una letra miniscula, una mayuscula, un numero"
    },
    nacimiento: {
        valueMissing: "Este campo fecha de nacimiento no puede estar vacio ",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero:{
        valueMissing: "Este campo no puede estar vacio",
        patternMissmatch: "El formato requerido es XXXXXXXXXX 10 numeros"
    },
    direccion:{
        valueMissing: "Este campo no puede estar vacio",
        patternMissmatch: "La direccion debe de contener de 10 a 40 caracteres"
    },
    ciudad:{
        valueMissing: "Este campo no puede estar vacio",
        patternMissmatch: "La ciudad debe de contener de 10 a 40 caracteres"
    },
    estado:{
        valueMissing: "Este campo no puede estar vacio",
        patternMissmatch: "El estado debe de contener de 10 a 40 caracteres"
    }
};

const validadores = {
    nacimiento: input => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje ="";
    tipoDeErrores.forEach( error =>{
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error])
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })

    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje ="";
    if(!mayorDeEdad(fechaCliente)){
         mensaje ="Debes tener al menos 18 años de edad";
    };

    input.setCustomValidity(mensaje);
};

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, 
    fecha.getUTCMonth(), fecha.getUTCDate());
    return diferenciaFechas < fechaActual;
}