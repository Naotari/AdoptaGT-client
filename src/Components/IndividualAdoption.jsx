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
                <p style={{fontSize:"50px"}}>Nombre: {adoptionFromAPI.name}</p>
                <div className="IndividualAdoption__Information">
                    <div className="IndividualAdoption__InformationLeft">
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