import ProgressBar from '../ProgressBar'


export default function Challenge() {
    
    const word = 'copacetic' 
    const definition = 'In excellent order'

    return(
       <section id="challenge" >
            <h1>{word}</h1>
            <p>{definition} </p>
            <div className="helper" >
                <div>
                {/* CONTAINS ALL THE ERROR CORRECTION VISUAL BARS  */}
                {[...Array(definition.length).keys()].map((element, elementIdx) => {
                    // determine wether 

                    return(
                        <div key={elementIdx}></div>
                    )

                })}
                </div>
                <input type="text" placeholder="Enter the definition..." />
            </div>
            <div className="challenge-btns">
                <button className="card-button-secondary">
                    <h6>Quit</h6>
                </button>
                <button className="card-button-primary" >I forgot</button>
            </div>
            <ProgressBar/>
       </section>

    )

}