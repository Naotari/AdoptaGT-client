import { useState } from "react"
import "./Inicio.css"
import axios from "axios"

const Inicio = () => {

    const [ adoptionsCount, setAdoptionsCount] = useState(0)
    const [ petsCount, setPetsCount] = useState(0)

    axios.get(`adoptions/counts/adoptions`)
    .then(response => {
        if(response.data.state === "ok") {
            setAdoptionsCount(response.data.message)
        } else {setAdoptionsCount("error")}
    })
    axios.get(`adoptions/counts/adopted`)
    .then(response => {
        if(response.data.state === "ok") {
            setPetsCount(response.data.message)
        } else {setPetsCount("error")}
    })



    //Idea de numeros para mostrar
    //Porcentaje de éxito en adopciones: Destaca el porcentaje de mascotas que han sido adoptadas con éxito a través de tu plataforma en comparación con otras opciones de adopción. Esto demuestra la efectividad de tu servicio.

    return (
        <div className="Inicio_Main">
            <div className="Inicio_Left">
                <h1 className="Inicio_Tittle">Adopta GT</h1>
                <p style={{marginBottom:"10px"}}>
                    Estamos desarrollando esta plataforma con el propósito de establecer una red de adopciones en Guatemala, facilitando así que un mayor número de animales encuentren un hogar adecuado.
                </p>
                <p style={{marginBottom:"10px"}}>
                    En nuestra sección de publicaciones, tendrás la oportunidad de compartir tus reflexiones sobre temas relacionados con nuestra misión. Además, ofrecemos una sección dedicada a las adopciones, donde podrás publicar, revisar e incluso considerar la posibilidad de adoptar a una mascota que esté buscando un nuevo hogar.
                </p>
                <p style={{marginBottom:"10px"}}>
                    Es importante destacar que este proyecto está siendo desarrollado por mí, Frandel Rodríguez, y continuará evolucionando con el tiempo. Aunque esta versión actual es estable, estamos trabajando en la incorporación de nuevas funcionalidades. Es posible que durante este proceso se eliminen datos previamente ingresados, como cuentas o contenido generado por los usuarios.
                </p>
                <p style={{marginBottom:"10px"}}>
                Nuestro objetivo es crear una plataforma reconocida y útil para las mascotas necesitadas. En este momento, estamos explorando diferentes formas de obtener ingresos para mantener el proyecto en marcha. Esto podría incluir la implementación de anuncios publicitarios o la creación de una sección de donaciones. Estos recursos serán fundamentales para cubrir los costos operativos, ya que algunos de los servicios utilizados requieren de pagos.
                </p>
                <p style={{marginBottom:"10px"}}>
                Agradecemos tu apoyo y comprensión durante esta etapa de desarrollo. Estamos comprometidos en hacer de este proyecto una herramienta efectiva para promover la adopción responsable de mascotas en Guatemala.
                </p>
            </div>
            <div className="Inico_Right">
                <h1>Adopciones Creadas: {adoptionsCount}</h1>
                <h1>Mascotas Adoptadas: {petsCount}</h1>
                <h3><a className="Inicio_Links" href="/adoptions">Ver adopciones</a></h3>
                <h3><a className="Inicio_Links" href="/posts">Ver Posts</a></h3>
            </div>
        </div>    
    )
}

export default Inicio;