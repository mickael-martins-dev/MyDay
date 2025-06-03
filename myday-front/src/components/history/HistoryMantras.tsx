import { IHistory } from "@common/Model";

interface IProps {
    history: IHistory[]
}

const HistoryMantrasComponent = (props: IProps) => {

    const components = props.history.map(history => <>
        {history.phraseGratitude}
    </>)

    return <>
        {components}
    </>

};

export default HistoryMantrasComponent;
