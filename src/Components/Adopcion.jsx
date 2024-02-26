import "./Adopcion.css"

const Adopcion = (props) => {

    const adoptionImage = props.info.image
    const adoptionName = props.info.name
    const adoptionSex = props.info.sex
    const adoptionAge = { age : props.info.age, years : props.info.years}

    const dateString = props.info.createdAt;
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based, so add 1 to get the correct month.
    const year = date.getFullYear();

    const adoptionDate = `${day}/${month}/${year}`

    return (
        <a href={`/adoption/${props.info.id}`} className="Adopcion_Main">
            {(props.info.adopted === true) && <p className="Asoption_Adopted_Message">Adoptado<span className="material-symbols-outlined" style={{paddingTop:"2px"}}>favorite</span></p>}
            <div className="Adopcion_Image_Section">
                <img src={adoptionImage} alt="Perro" className="Adopcion_Image_Section_Image"></img>
            </div>
            <div style={{height:"70px"}}>
                <p style={{fontWeight:"600"}}>Nombre: {adoptionName}</p>
                <p>Sexo: {adoptionSex === "female"? "Femenino" : "Masculino" }</p>
                <p>Edad: {adoptionAge.age} {adoptionAge.years === true? "Años" : "Meses"}</p>
            </div>
            <div className="Adopcion_Date_Section">
                <p>{adoptionDate}</p>
            </div>
        </a>
    )
}

export default Adopcion;