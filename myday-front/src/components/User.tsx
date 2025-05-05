import React, { useEffect, useState } from "react";
import { IFeelings } from "../models/Model";
import UserLabel from "./atoms/UserLabel";

const UserComponent: React.FC = () => {

    const [feelings, setFeeling] = useState<IFeelings>();
    const [comment, setComment] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            const API_URL = "http://localhost:4000"
            const response = await fetch(`${API_URL}/user-feelings`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include'
            });
            const dataFeelings = await response.json();
            // Mapper les emotions envoyés pour avoir la liste des
            setFeeling(dataFeelings)

        }

        fetchUser();

        // Get the current User connected
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //setRating(e.target.value);

        // Mettre ici les infos 
    };

    // Emotions
    const emotions = (feelings ? feelings.feelings : [] as string[]);
    const emotonsComponents = emotions.map((emotion) => {
        return <>
            <div key={emotion} className="flex items-center justify-center ">
                <span className="text-lg text-left font-medium mr-6">{emotion}</span>
                <div className="join rating rating-xxl">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <input
                            key={`rating-${emotion}-${value} `}
                            type="radio"
                            name={`rating-${emotion} `}
                            className="mask mask-star-2 bg-orange-400"
                            value={value}
                            onChange={handleChange}
                        />
                    ))}
                </div>
            </div >
        </>
    })
    return (<>
        <div className="flex flex-col w-full">
            <UserLabel />
            <section id='feeling'>
                <h1 className="text-2xl font-semibold mb-6">
                    Comment te sens-tu aujourd’hui ?
                </h1>
                {emotonsComponents}
            </section>


            <section id="gracefull" className="pt-4">
                <div className="mt-8">
                    <textarea
                        className="textarea textarea-bordered w-full"
                        placeholder="Décris ton humeur du jour..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
            </section>

            <button type="submit" className="btn btn-primary w-full text-white tracking-wide font-semibold mt-6">
                Valider
            </button>

        </div >
    </>);
}

export default UserComponent;
