import "./IndividualAdoption.css"
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const IndividualAdoption = () => {

    let { id } = useParams();
    const [adoptionFromAPI, setAdoptionFromAPI] = useState([])
    
    const getAdoptionfromAPI = async () => {
        try {
            const response = await axios.get(`adoptions/${id}`)
            setAdoptionFromAPI(response.data)
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        getAdoptionfromAPI();
    }, []);

    return (
        <div className="IndividualAdoption__Main">
            <div className="IndividualAdoption__Second">
                <img src={adoptionFromAPI.image} className="IndividualAdoption__Image"></img>
                <p>Nombre: {adoptionFromAPI.name}</p>
                <p>Genero: {adoptionFromAPI.sex === "male" ? "Macho" : "Hembra"}</p>
                <p>Edad: {adoptionFromAPI.age} {adoptionFromAPI.year === true ? "Años" : "Meses"}</p>
                <p>Informacion extra: {adoptionFromAPI.text}</p>
                <p>Vacunas: {adoptionFromAPI.vaccines}</p>
            </div>
        </div>
    )
}

export default IndividualAdoption;