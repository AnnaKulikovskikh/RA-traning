import React from "react"

 export default function Record(props) {
    const dateReform = `${props.date.slice(8,10)}.${props.date.slice(5,7)}.${props.date.slice(2,4)}`
    
     return(
         <li className="record">
             <div>{dateReform}</div>
             <div>{props.distance}</div>
             <div>
                 <button onClick={(event) => props.edit(event, props.id)} className="btnRec">✎ </button>
                 <button onClick={(event) => props.delete(event, props.id)} className="btnRec">✘</button>
             </div>
         </li>
     )
 }