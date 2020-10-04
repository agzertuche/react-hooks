// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'
import {ErrorBoundary} from 'react-error-boundary'

const initialState = {status: 'idle', pokemon: null, error: null}

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState(initialState)

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setState({...initialState, status: 'pending'})
    fetchPokemon(pokemonName)
      .then(pokemon => {
        setState(prevState => ({
          ...prevState,
          status: 'resolved',
          pokemon,
        }))
      })
      .catch(error => {
        setState(prevState => ({...prevState, status: 'rejected', error}))
      })
  }, [pokemonName])
  // 🐨 Have state for the pokemon (null)
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, make sure to update the loading state
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => { /* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemon name: 'Submit a pokemon'
  //   2. pokemon name but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

  const {status, pokemon, error} = state
  if (status === 'idle') {
    return 'Submit a pokemon'
  }
  if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  }
  if (status === 'rejected') {
    throw error
  }

  return <PokemonDataView pokemon={pokemon} />
}

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button type="reset" onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary

                   FallbackComponent={ErrorFallback}
         
          onReset={handleReset}
         
          resetKeys={[pokemonName]}
        
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
