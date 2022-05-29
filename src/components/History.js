import Record from "./Record"

function History(props) {

    const records = props.history.map(rec => {
        return(
            <Record
                key={rec.id}
                id={rec.id}
                date={rec.date}
                distance={rec.distance}
                delete={props.delete}
                edit={props.edit}
            />
        )
    })

    return (
        <div className="history">
            <div className="header">
                <p>Дата</p>
                <p>Пройдено</p>
                <p>Действия</p>
            </div>
            <ul className="records_list">
                {records}
            </ul>
         </div>
    )
}

export default History