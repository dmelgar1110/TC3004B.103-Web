import React from 'react'

const Segundo = () => {
    const saludo = 'Saludo desde variable';
    function mostrarSaludo() {
        return('Saludando desde funcion');
    }

    return (
        <div>
            <br/>
            {saludo}
            <br/>
            {mostrarSaludo()}
        </div>
    )
}

export default Segundo