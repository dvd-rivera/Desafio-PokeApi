import React, { useState, useEffect, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom';

interface PokeList {
    name: string
    url: string
}

interface Selected {
    name: string
}

const Character: React.FC = () => {
    const [pokemonList, setPokemonList] = useState<PokeList[]>([])
    const [selectedPokemon, setSelected] = useState<Selected>({name: ""})

    const navigate = useNavigate();

    async function fetchPokemon() {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
        const data = await response.json();
        setPokemonList(data.results);
    }


    useEffect(() => {
        fetchPokemon();
    }, []);

    const updateSelected = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelected({name: e.target.value})
    }


    const navigateToPokemon = () => {
        if (selectedPokemon.name != "") {
            console.log(selectedPokemon)
            navigate(selectedPokemon.name)
        }
    }

    return (
        <div>
            <div className="select-pokemon-container">
                <h2>Selecciona un pokemon</h2>
                <select value={selectedPokemon.name} name="pokemonSelector" id="pokemonSelector" onChange={updateSelected}>
                    <option value="0">Selecciona un pokemón</option>
                    {pokemonList.map((pokemon) => (
                        <option key={pokemon.name} value={pokemon.name}>
                            {pokemon.name}
                        </option>
                    ))}
                </select>
                <div className="button-container">
                    <button onClick={navigateToPokemon}>
                        Ver pokemon
                        <img src="https://pngimg.com/uploads/pokeball/pokeball_PNG22.png" alt="" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Character
