import "./Adopciones.css"
import Adopcion from "./Adopcion"
import axios from "axios"
import { useState, useEffect } from "react"

const Adopciones = () => {

    const [adoptionsFromAPI, setAdoptionsFromAPI] = useState([])
    const [adoptionsFormated, setAdoptionsFormated] = useState([])

    const getAdoptionsfromAPI = async() => {
        try {
            const response = await axios.get("/adoptions")
            setAdoptionsFromAPI(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    const formatAdoptions = () => {
        // console.log(adoptionsFromAPI);
        let adoptionsMapped = []
        adoptionsFromAPI.forEach(adoption => adoptionsMapped.push(
            <Adopcion info={adoption} key={adoption.id}></Adopcion>
        ))
        // console.log(adoptionsMapped);
        setAdoptionsFormated(adoptionsMapped);
    }

    useEffect(() => {
        getAdoptionsfromAPI();
        // console.log("Entra aqui");
    }, []);

    useEffect(() => {
        
        if(adoptionsFromAPI.length > 0) {
            // console.log("Entra despues");
            formatAdoptions()
        }
    }, [adoptionsFromAPI]);

    return (
        <div className="Adopciones_Main">
            <div className="Adopciones_Second">
                {adoptionsFormated}

            </div>
        </div>
    )
}

export default Adopciones;