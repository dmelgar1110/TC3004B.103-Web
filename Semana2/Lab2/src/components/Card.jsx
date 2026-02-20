import React from 'react'

export const Card = ({id, name, description, image}) => {
  return (
    <section className="card" style = {{height: '200px'}}>
        <h2 className="text-capitalize">#{id} - { name } </h2>
        
        <div className="card" style={{width: '18rem'}}>
            <img src={image} className="card-img-top" alt={name}></img>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>
            </div>
        </div>
    </section>
  )
}
