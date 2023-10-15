import React from 'react'
import CardAviso from '../components/CardAviso.component';
import { uploadBytes } from "firebase/storage";
import { LoadFilePension } from "../firebase/references/images/pensions";

const AvisoPage = () => {

    const handleChangeFile = (e) => {
        const file = e.target.files[0]; // Obtiene el primer archivo seleccionado (puede ser nulo si el usuario no selecciona ningún archivo)
        console.log(file);

        if (file) {
            LoadFilePension(file);
        }
    }

    return (
        <div style={{ marginTop: "200px", display: "flex", justifyContent: "center" }}>
            <div>
                <h1>Subir anuncio</h1>
            </div>
            <div>
                <input type="file" onChange={(e) => handleChangeFile(e)} />
            </div>
        </div>
    )
};

export default AvisoPage