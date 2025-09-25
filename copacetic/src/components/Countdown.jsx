import { useState } from "react"
import { convertMilliseconds, countdownIn24Hours } from "../utils"



export default function Countdown(props) {

    const {handleChangePage, daysWords, dateTime, day} = props


    const targetMillis = dateTime || Date.UTC(1944, 2, 17, 12, 0, 0)
    
const [remainingMs, setRemainingMs] = useState(countdownIn24Hours(targetMillis))

const timer = convertMilliseconds(remainingMs)
console.log(timer)

    return(
        <div className="card countdown-card">
            <h1 className="item-header">Day {1} </h1> 
            <div className="today-container">
                <div>
                    <p>Time Remaining</p>
                    <h3>{dateTime ? `
                    ${Math.abs(timer.hours)}H 
                    ${Math.abs(timer.minutes)}M 
                    ${Math.abs(timer.seconds)}S ` : '23H 59M 59S' } </h3>
                </div>
                <div>
                    <p>Words for today</p>
                    <h3>{daysWords.length} </h3>
                </div>
            </div>

            <button 
            onClick={() => {handleChangePage(2)} }
            className="start-task">
                Start
            </button>
        </div>
    )

}