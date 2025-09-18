export default function Welcome(props) {

console.log('PROPS', props)

const {name, setName} = props

function handleChangePage(pageIndex) {
    setSelectedPage(pageIndex)
}

function handleCreateAccount() {
    if (!name) {return}
    localStorage.setItem('username', name)
    handleChangePage(1)
}

    return(
    <section id="welcome">
            <h3 className="text-large special-shadow">
                365 days. <br /> 365 words.
            </h3>
            <h6>Build your lexicon. <br /> Start the challenge today! </h6>
            <div>
                <input value={name} onChange={(ent) => {
                    console.log(ent.target.value)
                    setName(ent.target.value)
                }} type="text" placeholder="Enter your name..." />
                <button>
                    <h6> Start &rarr; </h6>
                </button>
            </div>
    </section>
    )

}
