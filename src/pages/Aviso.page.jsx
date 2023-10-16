import React, { useEffect, useState } from 'react'
import CardAviso from '../components/CardAviso.component';
import { LoadFilePension } from "../firebase/references/images/pensions";
import { useParams } from 'react-router-dom';

//firebase
import { doc, getDoc, getDocs, collection } from "firebase/firestore"
import { db } from '../firebase/firestore/database';

const AvisoPage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState();

    useEffect(() => {
        const userDocRef = doc(db, "users", userId);
        const querySnapshot = async () => {
            const docSnap = await getDoc(userDocRef);
           
            if (docSnap.exists()) {
                setUser(docSnap.data())
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
                {user && <h1>Bienvenido de nuevo {user.username} !</h1>}
            </div>
        </div>
    )
};

export default AvisoPage