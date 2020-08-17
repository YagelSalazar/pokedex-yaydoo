import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPokemon } from "../actions/pokemonActions";
import _ from "lodash";
import './Pokemon.css'

const Pokemon = (props) => {
    const pokemonName = props.match.params.pokemon;
    const dispatch = useDispatch();
    const pokemonState = useSelector(state => state.Pokemon);
    React.useEffect(() => {
        dispatch(GetPokemon(pokemonName))
    }, []);

    const ShowData = () => {
        if (!_.isEmpty(pokemonState.data[pokemonName])) {
            const pokeData = pokemonState.data[pokemonName];
            return (
                <div>
                    <p>Sprites</p>
                    <img src={pokeData.sprites.front_default} alt="" />
                    <img src={pokeData.sprites.back_default} alt="" />
                    <img src={pokeData.sprites.front_shiny} alt="" />
                    <img src={pokeData.sprites.back_shiny} alt="" />
                    <div>
                        <div>
                            <h1>Height</h1>
                            <p>{`${pokeData.height} ft`}</p>
                        </div>
                        <div>
                            <h1>Weight</h1>
                            <p>{`${pokeData.weight} lb`}</p>
                        </div>
                        <div>
                            <h1>Type</h1>
                            {pokeData.types.map(el => {
                                return <p>{el.type.name}</p>
                            })}
                        </div>
                        <div>
                            <h1>Stats</h1>
                            {pokeData.stats.map(el => {
                                return <p>{el.stat.name} {el.base_stat}</p>
                            })}
                        </div>
                        <div>
                            <h1>Abilities</h1>
                            {pokeData.abilities.map(el => {
                                return <p>{el.ability.name}</p>
                            })}
                        </div>
                    </div>
                </div>
            )
        }

        if (pokemonState.loading) {
            return <p>Loading...</p>
        }

        if (pokemonState.errorMsg !== "") {
            return <p>{pokemonState.errorMsg}</p>
        }

        return <p>error getting pokemon</p>
    }

    return (
        <div className="detail-container">
            <h1>{pokemonName}</h1>
            {ShowData()}
        </div>
    )
};

export default Pokemon;