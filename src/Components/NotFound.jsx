import "./NotFound.css"

const NotFound = () => {
    return (
        <div className="Not_Found_Main">
            <img src="https://res.cloudinary.com/dyiymsxec/image/upload/v1708623396/AdoptaGT/error%20404.jpg" className="Not_Found_Main_Image"></img>
            <h1>Pagina no encontrada</h1>
            No pudimos encontrar la pagina, probablemente fue eliminada o movida a otra direccion.

            <a className="Not_Found_Main_Button" href="/inicio">Ir a Inicio</a>
        </div>    
    )
}

export default NotFound;