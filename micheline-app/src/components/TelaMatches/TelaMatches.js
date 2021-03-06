import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {ContainerPag, Header, ImgB, ImgPerfil, ContainerMatches, Button} from "./Styled"



const urlBase = 'https://us-central1-missao-newton.cloudfunctions.net/astroMatch/micheline-barros-paiva/'

function TelaMatches(props) {
  const [perfilMatche, setPerfilMatche] = useState ([])
  
  useEffect(() => {
    getMatches()
  }, [])

  const getMatches = () => {
    axios.get(`${urlBase}matches`).then((res) => {
      setPerfilMatche(res.data.matches)
    }).catch((err) => {
      alert(err.response.data)
    })
  }

  const clear = () => {
    const header = {
      'Content-Type': 'application/json'
    }
    axios.put(`${urlBase}clear`, header).then((res) => {
      console.log(res.data)
      setPerfilMatche([])
    }).catch((err) => {
     alert(err.response.data)
    })
  }


  return (
    <ContainerPag>
      <Header>
       <Button onClick={props.telaPerfis}><ImgB src="/perfis.png" /></Button>
       <Button onClick={clear}><ImgB src="/lixeira.png" /></Button>
      </Header>
       <> 
     
      {perfilMatche && perfilMatche.map((perfil) => {
        return(
          <ContainerMatches>
            <ImgPerfil src={perfil.photo} />
            <p>{perfil.name}</p>
          </ContainerMatches>
        )
      })}
      </>
     
    </ContainerPag>
  );
}

export default TelaMatches;