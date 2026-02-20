import React from 'react'
import { useFetch } from '../hooks/useFetch'
import { useCounter } from '../hooks/useCounter'
import { Card } from './Card'
import { Loading } from './Loading'

export const CustomHook = () => {

    const { counter, increment, decrement } = useCounter(1);
    const { data, hasError, isLoading } = useFetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${counter}`);

    return (
        <>
            <h1>Hyrule Compendium</h1>
            <hr />
            <h2>{data?.name}</h2>
            {isLoading ? <Loading /> : (<Card id={counter} name={data.data.name} description={data.data.description} image={ data.data.image } />)}
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <button className='btn btn-primary' onClick={ () => decrement() }>Anterior</button>
            <button className='btn btn-primary' onClick={ () => increment() }>Siguiente</button>
        </>
    )
}
