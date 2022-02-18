import { useEffect, useState } from 'react'

export const App = () => {

  const [characters, setCharacters] = useState([])

  const ENDPOINT = 'https://rickandmortyapi.com/graphql'
  const QUERY = `
    query {
      characters(page: 1) {
        results {
          id
          name
          status
          species
          image
        }
      }

      locations {
        results {
          dimension
        }
      }
    } 
  `
  
  useEffect(() => {
    fetch(ENDPOINT, {
      method: "POST", 
      headers : { "Content-type": "application/json" },
      body: JSON.stringify({ query: QUERY })
    }).then(res => res.json())
    .then(data =>  {
      const results = data.data.characters.results
      console.log(results)
      setCharacters(results)
    })
  },[QUERY])

  return (
    <div className="App">
      <h1>Rick And Morty Wiki</h1>
      
      {characters.map(character => (

        <div key={character.id}>
          <h2>{character.name}</h2>
          <img src={character.image}/>
          <div>
            <span>{character.status}</span>
            <span>{character.species}</span>
          </div>
        </div>
      ))}
    </div>
  )
}