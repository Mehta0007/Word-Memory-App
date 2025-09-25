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
        const [listToLearn ,setListToLearn ] = useState([
            ...daysWords, 
            ...shuffle(daysWords),
            ...shuffle(daysWords),
            ...shuffle(daysWords),
        ])

        
    
    const word = listToLearn[wordIndex]
    const isNewWord = showDefinition || (!isEncountered(day, word) && wordIndex < daysWords.length)
    const definition = DEFINITIONS[word]

    function giveUp() {
        setListToLearn([...listToLearn, word])
        setShowDefinition(true)
    }



    return(
       <section id="challenge" >
            <h1>{word}</h1>
            {isNewWord && (<p>{definition} </p>)}
            <div className="helper" >
                <div>
                {/* CONTAINS ALL THE ERROR CORRECTION VISUAL BARS  */}
                {[...Array(definition.length).keys()].map((char, elementIdx) => {
                    // determine wether or not the user has tyoed the chareacter theythink is correct, and show red pr blur depending on whether or not it's actually correct

                    const styleToApply= inputVal.length < char + 1 ? '' : 
                    inputVal.split('')[elementIdx].toLowerCase() == definition.split('')[elementIdx].toLowerCase() ? 'correct' : 'incorrect'
 
                    return(
                        <div 
                        className={'' + styleToApply }
                        key={elementIdx}></div>
                    )

                })}
                </div>
                <input 
                value={inputVal}
                onChange={(e) => {
//if a user has entered th correct num og char we need to do few thing 1: id the entry is correct we need to incr sttpemts and move them to next word 2: if the entery is oincorrect we need to increment attpemts and if they 

if(e.target.value.length == definition.length && e.target.value.length > inputVal.length ) {
    handleIncrementAttempts()
//compare words
if(e.target.value.toLowerCase() == definition.toLowerCase()) {
//then the user correct outcome
if(wordIndex >= listToLearn.length - 1) {
    handleCompleteDay()
    return
}
setWordIndex(wordIndex + 1)
setShowDefinition(false)
setInputVal('')
return

//check if finished all the words, then end the day otherwise go to next word
}

}

                    setInputVal(e.target.value)
                }}
                type="text" placeholder="Enter the definition..." />
            </div>
            <div className="challenge-btns">
                <button 
                onClick={()=> {
                    handleChangePage(1)
                }}
                className="card-button-secondary">
                    <h6>Quit</h6>
                </button>
                <button 
                onClick={giveUp}
                className="card-button-primary" >I forgot</button>
            </div>
            <ProgressBar 
            remainder={wordIndex * 100 / listToLearn.length} 
            text={`${wordIndex} / ${listToLearn.length}`} />
       </section>

    )

}