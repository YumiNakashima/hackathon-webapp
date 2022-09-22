import "./success.css"

import React, { FunctionComponent } from "react"

const Success: FunctionComponent = () => {
  return (
    <div className="container-success">
      <div className="bg-success" />
      <div className="right-half">
        <div className="text">
          <h1>Inscrição realizada com sucesso!</h1>
          <span>Nossas lindas e simpáticas Lhamas te desejam boas provas!</span>
        </div>
      </div>
    </div>
  )
}

export default Success
