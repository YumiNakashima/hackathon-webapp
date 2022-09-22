import React, { FunctionComponent, useEffect, useState } from "react"
import {
  CallbackCamera,
  SelfieCameraTypes,
  UnicoCheckBuilder,
  UnicoThemeBuilder,
} from "unico-webframe"

interface CameraProps {
  imageBase64: string
}

const Camera: FunctionComponent<CameraProps> = ({ imageBase64 }) => {
  const [showBoxCamera, setShowBoxCamera] = useState(false)
  const [base64, setBase64] = useState("")

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
        // console.log(obj.base64)
        setBase64(obj.base64)
        // console.log(obj.encrypted)
      },
      error: (error) => {
        alert("Ocorreu um erro :(")
        //confira na aba "Configurações" sobre os tipos de erros
      },
      support: (supportMessage) => {
        console.log(supportMessage)
      },
    },
  }

  useEffect(() => {
    if (base64) {
      imageBase64 = base64
    }
  }, [setBase64, callback])

  return (
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
        Biometria
      </button>
    </div>
  )
}

export default Camera
