import "./register.css"
import React, { FunctionComponent, useState } from "react"

import { useForm, SubmitHandler } from "react-hook-form"

import { useHistory } from "react-router-dom"

import {
  CallbackCamera,
  SelfieCameraTypes,
  UnicoCheckBuilder,
  UnicoThemeBuilder,
} from "unico-webframe"

interface user {
  name: string
  cpf: string
  base64Image: string
}

const Register: FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<user>()
  const [showBoxCamera, setShowBoxCamera] = useState(false)
  const [b64, setB64] = useState("")
  const history = useHistory()

  const unicoTheme = new UnicoThemeBuilder()
    .setColorSilhouetteSuccess("#0384fc")
    .setColorSilhouetteError("#D50000")
    .setColorSilhouetteNeutral("#fcfcfc")
    .setBackgroundColor("#dff1f5")
    .setColorText("#0384fc")
    .setBackgroundColorComponents("#0384fc")
    .setColorTextComponents("#dff1f5")
    .setBackgroundColorButtons("#0384fc")
    .setColorTextButtons("#dff1f5")
    .setBackgroundColorBoxMessage("#fff")
    .setColorTextBoxMessage("#000")
    .setHtmlPopupLoading(
      `<div style="position: absolute; top: 45%; right: 50%; transform:
translate(50%, -50%); z-index: 10; text-align: center;">Carregando...</div>`
    )
    .build()

  const unicoCamera = new UnicoCheckBuilder()
    .setResourceDirectory("/resources")
    .setModelsPath("http://localhost:3000/models")
    .setTheme(unicoTheme)
    .build()

  const callback: CallbackCamera = {
    on: {
      success: (obj) => {
        console.log(obj.base64)
        setB64(obj.base64)
        setShowBoxCamera(false)
      },
      error: (error) => {
        alert("Ocorreu um erro :(")
      },
      support: (supportMessage) => {
        console.log(supportMessage)
      },
    },
  }

  const onSubmit: SubmitHandler<user> = (data) => {
    console.log("data", data)
    data.base64Image = b64
    return history.push("/success")
    //fetch("url").then((response) => response.json())
  }

  return (
    <div className="container-register">
      <div className="bg" />
      <div className="right-half">
        <div>
          <h1>Inscrição</h1>
        </div>
        <div>
          <form>
            <div className="personal-data">
              <h2>Dados pessoais</h2>
              <div className="form-inputs">
                <label htmlFor="name" className="form-label">
                  Nome completo
                </label>
                <input
                  {...register("name", { required: true })}
                  className="form-control"
                />
                {errors.name && <span>This field is required</span>}
              </div>

              <div className="form-inputs">
                <label htmlFor="cpf" className="form-label">
                  CPF
                </label>
                <input
                  {...register("cpf", { required: true })}
                  className="form-control"
                />
                {errors.cpf && <span>This field is required</span>}
              </div>
            </div>

            <div>
              <div
                style={{
                  display: showBoxCamera ? "inline" : "none",
                }}
              >
                <div id="box-camera"></div>
              </div>

              <button
                className="camera-btn"
                type="button"
                onClick={async () => {
                  setShowBoxCamera(true)

                  await unicoCamera
                    .prepareSelfieCamera(
                      "/services-sem-facetec.json",
                      SelfieCameraTypes.SMART
                    )
                    .then((camera) => camera.open(callback))
                }}
              >
                Biometria Facial
              </button>
            </div>
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={b64 ? false : true}
            >
              Registrar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
