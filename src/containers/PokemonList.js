import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { GetPokemonList } from '../actions/pokemonActions';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './PokemonList.css'

const PokemonList = (props) => {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const pokemonList = useSelector(state => state.PokemonList);
    React.useEffect(() => {
        FetchData(1)
    }, []);

    const FetchData = (page = 1) => {
        dispatch(GetPokemonList(page))
    }

    const ShowData = () => {
        if (pokemonList.loading) {
            return <p>Loading . . .</p>
        }

        if (!_.isEmpty(pokemonList.data)) {
            return pokemonList.data.map(e => (
                <div className="pokemon-card">
                    <p>{e.name}</p>
                    <Link to={`/pokemon/${e.name}`}>View</Link>
                </div>
            ))
        }

        if (pokemonList.errorMsg !== "") {
            return <p>{pokemonList.errorMsg}</p>
        }

        return <p>Unable to get data</p>
    }

    return (
        <div className="container-layout">
            <div>
                <input className="input-search" placeholder="Pokemon name" type='text' onChange={e => setSearch(e.target.value)} />
                <button className="btn-search" onClick={() => props.history.push(`/pokemon/${search}`)}>Search Pokemon</button>
            </div>
            <div className="pokemon-container">
            {ShowData()}
            </div>
            {!_.isEmpty(pokemonList.data) && (
                <ReactPaginate
                    pageCount={Math.ceil(pokemonList.count / 20)}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    onPageChange={(data) => FetchData(data.selected + 1)}
                    containerClassName='pagination'
                    pageClassName="selected-pg"
                />
            )}
        </div>
    )
};

export default PokemonList;