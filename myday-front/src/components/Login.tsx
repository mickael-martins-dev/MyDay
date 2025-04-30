import React, { useState } from "react";
import Cookies from 'universal-cookie';
import { TEmotion, User } from "../models/Model";

const Login: React.FC = () => {
    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");

    const login = async (): Promise<string> => {
        // TODO : Edit the URL 

        const response = await fetch('https://myday-back.onrender.com/Login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body:
                new URLSearchParams({
                    password: password,
                    pseudo: pseudo
                })
        });


        const { data } = await response.json();
        if (response.ok) {
            console.log(data);
            return 'ok';
        }
        throw new Error("400");
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Refaire une passe la dessus
        const user: User = {
            email: 'mickael.martins@admin.com',
            pseudo: pseudo,
            uuid: 'UA',
            emotions: [
                TEmotion.acceptation,
                TEmotion.admiration,
                TEmotion.amour,
                TEmotion.averion
            ]
        };

        // TODO: sans doute mettre un hook react pour avoir le maximum de forme
        const cookies = new Cookies(null, { path: '/' });
        cookies.set('my-day.cookie', user)

        /*
        login()
            .then(value => console.log(value))
            .catch(reason => console.error('Failed to login : ' + reason));

        console.log("pseudo:", pseudo, "Password:", password);
        */
    };

    return (
        <div className='min-h-screen flex flex-col items-center justify-center px-4'>

            <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-8 dark:bg-neutral/80 transition duration-300 ease-in-out">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Bienvenue 👋</h1>
                    <p className="text-sm text-gray-500 mt-2 dark:text-gray-300">Connecte-toi à ton compte</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-control mb-5">
                        <label className="label">
                            <span className="label-text text-gray-700 dark:text-gray-200">Pseudo</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered input-md w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="John"
                            value={pseudo}
                            onChange={(e) => setPseudo(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-control mb-6">
                        <label className="label">
                            <span className="label-text text-gray-700 dark:text-gray-200">Mot de passe</span>
                        </label>
                        <input
                            type="password"
                            className="input input-bordered input-md w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label className="label justify-end mt-2">
                            <a href="#" className="text-sm text-primary hover:underline">Mot de passe oublié ?</a>
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary w-full text-white tracking-wide font-semibold">
                        Connexion
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-300">
                    Pas encore de compte ? <a href="/register" className="link link-primary">Créer un compte</a>
                </div>
            </div>
        </div>
    );
};

export default Login;