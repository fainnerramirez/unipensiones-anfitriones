import React, { useEffect, useState } from 'react'
import CardAviso from '../components/CardAviso.component';
import { LoadFilePension } from "../firebase/references/images/pensions";
import { useParams } from 'react-router-dom';

//firebase
import { doc, getDoc, getDocs, collection } from "firebase/firestore"
import { db } from '../firebase/firestore/database';
//context
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const AvisoPage = () => {
    const { userId } = useParams();
    const { userAuth } = useContext(AuthContext);

    console.log("user context: ", userAuth)

    useEffect(() => {
        const userDocRef = doc(db, "users", userId);
        const querySnapshot = async () => {
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
                //setUser(docSnap.data())
                console.log("User query exit!")
            } else {
                console.log("document not found!");
            }
        }

        querySnapshot()
    }, [userId])

    const handleChangeFile = (e) => {
        const file = e.target.files[0];

        if (file) {
            LoadFilePension(file);
        }
    }

    return (
        <div>
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