import { useEffect, useState } from 'react'
import styled from 'styled-components'

export const App = () => {

  const [characters, setCharacters] = useState([])
  const [pageNumber, setPageNumber] =  useState(1)

  const ENDPOINT = 'https://rickandmortyapi.com/graphql'
  const QUERY = `
    query {
      characters(page: ${pageNumber}) {
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

  const App = styled.div`
    text-align: center;
    padding: 20px;
  `
  const Cards = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    grid-gap: 20px;
  `
  const Card = styled.div`
    margin: 10px;
  `
  const Pagination = styled.div`
    span {
      padding: 0 10px;
    }
  `

  const goPreviousPage = () => {
    if(pageNumber === 1) {
      return;
    }

    setPageNumber(pageNumber - 1)
  }

  const goNextPage = () => {
    setPageNumber(pageNumber + 1)
  }

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
    <App>
      <h1>Rick And Morty Wiki</h1>
    
      <Cards>
        {characters.map(character => (
          <Card key={character.id}>
 
            <img src={character.image}/>
            <div>
              <h2>{character.name}</h2>
              <span>{character.status}</span>
              <span>{character.species}</span>
            </div>
          </Card>
        ))}
      </Cards>

      <Pagination>
        <button onClick={goPreviousPage}>prev</button>
        <span>{pageNumber}</span>
        <button onClick={goNextPage}>next</button>
      </Pagination>
    </App>
  )
}