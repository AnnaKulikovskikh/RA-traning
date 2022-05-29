import History from "./History"
import { useState } from 'react'
import { useEffect } from 'react'
import {nanoid} from 'nanoid'

function Form() {
    
    const [history, setHistory] = useState(
        () => JSON.parse(localStorage.getItem('history')) || []
    )

    useEffect(() => {
        localStorage.setItem('history', JSON.stringify(history))
    }, [history])
    
    const handleSubmit = event => {
        event.preventDefault()
        if (event.target.date.value === "" || event.target.distance.value === "") return
        const realDate = new Date(event.target.date.value)
        const newRecord = {
            id: nanoid(),
            date: event.target.date.value,
            distance: parseFloat(event.target.distance.value),  
            realDate: realDate
        }
        // setHistory(prev => {
        //     const arr = [newRecord, ...prev]
        //     return arr.sort((a, b) => b.realDate - a.realDate)
        // })

        setHistory(prev => {
            let have = false
            let arr = []
            prev.forEach(rec => {
                // prev.map(rec => {
                //   return rec.date === newRecord.date 
                //      ? {...rec, distance: rec.distance += newRecord.distance}
                //      : rec
                // })
                if (newRecord.date === rec.date) {
                    have = true
                    arr.push({...rec, distance: rec.distance += newRecord.distance/2})
                } else {
                    arr.push(rec)
                }
            })
            if (!have) {arr = [newRecord, ...prev]}
            return arr.sort((a, b) => b.realDate - a.realDate)
        })
    }

    function deleteRec(event, recId) {
        event.stopPropagation()
        setHistory(prevRecs => prevRecs.filter(rec => rec.id !== recId))
    }

    function editRec(event, recId) {
        event.stopPropagation()
        history.forEach(rec => {
            if (rec.id === recId) {
                document.getElementById('date').value = rec.date
                document.getElementById('distance').value = rec.distance
            }
        })
        setHistory(prevRecs => prevRecs.filter(rec => rec.id !== recId))
    }


    return (
        <main>
            <form className="tracker" onSubmit={handleSubmit}>
                <div className="input">
                    <label htmlFor="date">Дата</label>
                    <input id="date" name="date" type="date" />
                </div>
                <div className="input">
                    <label htmlFor="distance">Пройдено км</label>
                    <input id="distance" name="distance" type="number" min="0" step="0.1"/>
                </div>
                <button type="submit" className="btnForm">Ok</button>
            </form>
            <History 
                history={history}
                delete={deleteRec}
                edit={editRec}
            />
         </main>   
    )
}

export default Form