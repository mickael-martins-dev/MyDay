import { IHistory } from "@common/Model";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface IProps {
    history: IHistory[]
}

const HistoryChartComponent = (props: IProps) => {
    return <div className="w-full h-100">
        <ResponsiveContainer>
            <LineChart data={props.history}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value, name) => [`${value} / 5`, name]} />
                <Legend />
                <Line type="monotone" dataKey="feeling1" stroke="#3b82f6" strokeWidth={2} name="Anxiete" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="feeling2" stroke="#8b5cf6" strokeWidth={2} name="Anxiete" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="feeling3" stroke="#f97316" strokeWidth={2} name="Anxiete" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="feeling4" stroke="#10b981" strokeWidth={2} name="Anxiete" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    </div>
};

export default HistoryChartComponent;
