import React, { useEffect, useState } from "react";
import { User } from "../models/Model"
import Cookies from 'universal-cookie';


const UserComponent: React.FC = () => {

    const [user, setUser] = useState<User | undefined>();

    useEffect(() => {
        const cookies = new Cookies(null, { path: '/' });
        setUser(cookies.get('my-day.cookie') as User);

        console.log("aaaaaaa")

        // Get the current User connected
    }, [])

    // Need to fetch the current user connected by the cookie !
    return (<>



        {user && <>
            <section id='user'>
                <h1> Pseudo {user.pseudo}</h1>
                <h1> Mail {user.email}</h1>
            </section>


            <div id='history'>
                <h4> Affichage des 30 derniers jours </h4>
                <section id='graph'>
                </section>
            </div>
        </>
        }

    </>);
}

export default UserComponent;
