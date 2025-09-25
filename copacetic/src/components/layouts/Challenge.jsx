import { useState } from 'react'
import ProgressBar from '../ProgressBar'
import { isEncountered, shuffle } from '../../utils'
import DEFINITIONS from '../../utils/VOCAB.json'

export default function Challenge(props) {
    const {
        day, 
        daysWords, 
        handleChangePage, 
        handleIncrementAttempts, 
        handleCompleteDay, 
        PLAN } = props

        const [wordIndex, setWordIndex] = useState(0)
        const [inputVal, setInputVal] = useState('')
        const [showDefinition, setShowDefinition] = useState(false)
        const [listToLearn ,setListToLearn ] = useState({
            ...daysWords, 
            ...shuffle(daysWords),
            ...shuffle(daysWords),
            ...shuffle(daysWords),
        })

        
        
    const  word = listToLearn[wordIndex]
    const isNewWord = showDefinition || (!isEncountered(day, word)) && wordIndex < daysWords.length
    // const word = 'copacetic' 
    const definition = DEFINITIONS[word]

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