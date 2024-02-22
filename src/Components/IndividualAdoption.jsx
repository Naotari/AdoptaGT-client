import "./IndividualAdoption.css"
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux'
import Swal from "sweetalert2";

const IndividualAdoption = () => {

    let { id } = useParams();
    const idLogged = useSelector((state) => state.LoginInfo.loginData.id)
    const [adoptionFromAPI, setAdoptionFromAPI] = useState([])
    const [AdoptionOptions, setAdoptionOptions] = useState(false)
    
    const getAdoptionfromAPI = async () => {
        try {
            const response = await axios.get(`adoptions/${id}`)
            setAdoptionFromAPI(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteAdoptionHandler = () => {
        Swal.fire({
            title: "Deseas eliminar la adopcion?",
            showCancelButton: true,
            confirmButtonColor: "#68D4CE",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar"
        }).then((result) => {
            if(result.isConfirmed) {
                axios.delete("/adoptions/" + id)
                .then((response) => {
                    Swal.fire({
                        title: "Eliminada!",
                        text: "Tu adopcion ha sido eliminada.",
                        icon: "success"
                    }).then(() => {
                        window.location.href = "../profile"
                    })
                }).catch(error => {
                    if (error.response.data.state === "error") {
                        Swal.fire({
                            title: "Error!",
                            text: "Tu adopcion no se pudo eliminar, intentalo mas tarde.",
                            icon: "error"
                        })
                    }
                })
            }
        })
    }

    const markAsAdoptionHandler = () => {
        const adoptedMessage = "¿Deseas marcarlo como no adoptado?"
        const notAdoptedMessage = "¿Deseas marcarlo como adoptado?"
        let message = ""
        let adoptionSate
        if (adoptionFromAPI.adopted) {
            message = adoptedMessage;
            adoptionSate = false
        } else {message = notAdoptedMessage; adoptionSate = true}

        Swal.fire({
            title: message,
            showCancelButton: true,
            confirmButtonColor: "#68D4CE",
            cancelButtonColor: "#d33",
            confirmButtonText: "Marcar",
        }).then(async (result) => {
            if(result.isConfirmed) {
                axios.put("/adoptions", {idAdoption: id, adopted: adoptionSate})
                .then(response => getAdoptionfromAPI())
                .catch(error => console.log(error))
            }
        })
    }


    
    useEffect(() => {
        getAdoptionfromAPI();
    }, []);

    useEffect(() => {
        console.log(adoptionFromAPI.user_id);
        console.log(idLogged);
        if ( (idLogged === adoptionFromAPI.user_id) && (typeof adoptionFromAPI.user_id === "number")) setAdoptionOptions(true);
    }, [idLogged, adoptionFromAPI])

    return (
        <div className="IndividualAdoption__Main">
            <div className="IndividualAdoption__Second">
                {adoptionFromAPI.adopted && 
                    <div className="IndividualAdoption__AdoptedMessage">
                        <p>Ya fue adoptado </p><span class="material-symbols-outlined" style={{paddingTop:"2px"}}>favorite</span>
                    </div>
                }
                {AdoptionOptions &&
                    <div className="IndividualAdoption__ButtonBox">
                        {adoptionFromAPI.adopted ?
                        <button onClick={markAsAdoptionHandler} className="IndividualAdoption__Button">No adoptado</button>:
                        <button onClick={markAsAdoptionHandler} className="IndividualAdoption__Button">Adoptado</button>
                        }
                        <button onClick={deleteAdoptionHandler} className="IndividualAdoption__Button">Eliminar</button>
                    </div>
                }
                <img src={adoptionFromAPI.image} className="IndividualAdoption__Image"></img>
                <p style={{fontSize:"50px"}}>Nombre: {adoptionFromAPI.name}</p>
                <div className="IndividualAdoption__Information">
                    <div className="IndividualAdoption__InformationLeft">
                        <p><a style={{fontWeight:"600"}}>Especie:</a> {adoptionFromAPI.pet_type === "dog" ? "Perro" : adoptionFromAPI.pet_type === "cat" ? "Gato" : adoptionFromAPI.pet_type === "rabbit" ? "Conejo" : adoptionFromAPI.pet_type === "hamster" ? "Hamster" : adoptionFromAPI.pet_type === "bird" ? "Pajaro" : adoptionFromAPI.pet_type === "fish" ? "Pez" : "Otros"}</p>
                        <p><a style={{fontWeight:"600"}}>Genero:</a> {adoptionFromAPI.sex === "male" ? "Macho" : "Hembra"}</p>
                        <p><a style={{fontWeight:"600"}}>Edad:</a> {adoptionFromAPI.age} {adoptionFromAPI.year === true ? "Años" : "Meses"}</p>
                        <p><a style={{fontWeight:"600"}}>Vacunas:</a> {adoptionFromAPI.vaccines}</p>
                        <p><a style={{fontWeight:"600"}}>Telefono:</a> {adoptionFromAPI.phone}</p>
                    </div>
                    <div className="IndividualAdoption__InformationRight">
                       <p><a style={{fontWeight:"600"}}>Informacion extra:</a> <br/> {adoptionFromAPI.text}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IndividualAdoption;