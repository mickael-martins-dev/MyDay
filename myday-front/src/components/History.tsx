import { useEffect, useState } from "react";
import { IHistory } from "../models/Model";

const fetchHistory = async (): Promise<IHistory[]> => {
    const URL = "http://localhost:4000"
    const response = await fetch(`${URL}/user-history`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include'
    });

    if (response.ok) {
        return await response.json() as IHistory[];
    } else {
        throw new Error(`Erreur HTTP : ${response.status}`)
    }
};

const HistoryComponent = () => {

    const [history, setHistory] = useState<IHistory[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const data = await fetchHistory();
                setHistory(data);

                console.log(data);
            } catch (err) {
                console.error(err)
                setError((err as Error).message);
            }
        };
        loadHistory();
    }, []);

    return (
        <div className="flex flex-col w-full">

            <h1 className="text-2xl font-semibold mb-6">
                Votre historique <span> 30 derniers jours </span>
            </h1>

            <div className="stats shadow">
                <div className="stat place-items-center">
                    <div className="stat-title">Downloads</div>
                    <div className="stat-value">31K</div>
                    <div className="stat-desc">From January 1st to February 1st</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Users</div>
                    <div className="stat-value text-primary">4,200</div>
                    <div className="stat-desc text-primary">↗︎ 40 (2%)</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">New Registers</div>
                    <div className="stat-value">1,200</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
            </div>

            <div className="tabs tabs-border pt-4">
                <input type="radio" name="my_tabs_2" className="tab" aria-label="Mantras" defaultChecked />
                <div className="tab-content border-base-300 bg-base-100 p-10">Tab content 1</div>

                <input type="radio" name="my_tabs_2" className="tab" aria-label="Emotions" />
                <div className="tab-content border-base-300 bg-base-100 p-10">Tab content 2</div>
            </div>

        </div>);

};

export default HistoryComponent;

