import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'


interface Pokemon {
    abilities: string[]
    base_experience: number
    cries: Cries
    forms: Form[]
    game_indices: number[]
    height: number
    held_items: string[]
    id: number
    is_default: boolean
    location_area_encounters: string
    moves: string[]
    name: string
    order: number
    past_abilities: string[]
    past_types: string[]
    species: Record<string, string>
    stats: any
    types: string[]
    weight: number
    sprites: any
  }

interface Form {
    name: string
    url: string
}

interface Cries {
    latest: string
    legacy: string
}


const SelectedCharacter: React.FC = () => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null)
    const [error, setError] = useState<string | null>(null);

    const location = useLocation();
    const urlActual = location.pathname.split("/");
    const pokemonName = urlActual[urlActual.length -1]

    async function fetchPokemon() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName);
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            const data = await response.json();
            setPokemon(data);
        } catch(error: any) {
            console.log(error)
            setError(error.message);
        }
    }

    useEffect(() => {
        fetchPokemon();
      }, [pokemonName])



  return (
    <div>
        {error && <p>Ocurrió un error: {error}</p>}
        {
            pokemon ? (

                <div className="pokemonCard">
                    <div className="img-container">
                        <img src={pokemon.sprites.other.dream_world.front_default} alt="" />
                    </div>
                    <div className="detail-container">
                        <h4 className="name">{pokemon.name}</h4>
                        <div className="stats-container">
                        {pokemon.stats.map((stat: any, index: number) => (
                            <div className="stat" key={index}>
                                <p className="statName">{stat.stat.name}:</p>
                                <p className="statValue">{stat.base_stat}</p>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>

            ) : (
                <p>Cargando...</p>
            )
        }
      
    </div>
  )
}

export default SelectedCharacter
