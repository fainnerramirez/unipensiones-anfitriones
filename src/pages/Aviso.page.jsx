import React, { useEffect, useState } from 'react'
import CardAviso from '../components/CardAviso.component';
import { LoadFilePension } from "../firebase/references/images/pensions";
import { useParams } from 'react-router-dom';
//context
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import Sidebar from '../components/Sidebar.component';

const AvisoPage = () => {
    const { userId } = useParams();
    const { userAuth } = useContext(AuthContext);

    console.log("user context: ", userAuth)

    const handleChangeFile = (e) => {
        const file = e.target.files[0];

        if (file) {
            LoadFilePension(file);
        }
    }

    return (
        <div>
            <Sidebar />
            <div style={{ marginTop: "200px", display: "flex", justifyContent: "center" }}>
                <div>
                    <input type="file" onChange={(e) => handleChangeFile(e)} />
                </div>
            </div>
            <div>
                {userAuth && <h1>Bienvenido de nuevo {userAuth.displayName} !</h1>}
            </div>
        </div>
    )
};

export default AvisoPage