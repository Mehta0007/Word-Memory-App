export default function Countdown() {
    return(
        <div className="card countdown-card">
            <h1 className="item-header">Day {1} </h1>
            <div className="today-container">
                <div>
                    <p>Time Remaining</p>
                    <h3>13H 45M 23S</h3>
                </div>
                <div>
                    <p>Words for today</p>
                    <h3>16</h3>
                </div>
            </div>

            <button className="start-task">
                Start
            </button>
        </div>
    )

}