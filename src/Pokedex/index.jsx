import pokedexjson from "./pokedex.json"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';


import "./css/Pokedex.css"

function findPokemon(id) {
    if (!pokedexjson.length > 0) {
        console.log("No pokemans")
    }
    var pokemon = pokedexjson.find(
        (pkmn) => pkmn.id == id
    );
    return pokemon;
}

const DisplayPokemon = (pokemon) => {
    if (!pokemon)
        return (<>Gotta Catch Em All</>)
    else
        return (
            <>
                <h1><span style={{ fontWeight: "100" }}>#{pokemon?.id}</span> {pokemon?.name?.english}</h1>
            </>
        )
}
const Home = () => {
    const filter = createFilterOptions();
    const [value, setValue] = useState(null);

    return (
        <>
            <h1 style={{ textAlign: "center" }}>
                Gotta Catch Em' All
            </h1>
            <Autocomplete
                id="pokedex-search"
                value={value}
                options={pokedexjson.map((option) => `#${option.id} ${option.name.english}`)}
                renderInput={(params) => <TextField {...params} label="Pokemon search..." />}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    console.log(newValue);
                }}
            />
        </>
    )
}

const Pokedex = () => {
    const params = useParams();
    const [pokemonId, setPokemonId] = useState(null);
    const [pokemon, setPokemon] = useState({});

    return (
        <>
            <div className="pokdexContainer">
                {
                    !Object.keys(pokemon).length > 1 ?
                        DisplayPokemon(pokemon)
                        :
                        Home()
                }
            </div>

        </>
    );
};

export default Pokedex;
