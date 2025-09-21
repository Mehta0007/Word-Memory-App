export default function Welcome(props) {
  const { name, setName, handleCreateAccount } = props;

  function onStartClick(e) {
    e.preventDefault();
    handleCreateAccount();
  }

  return (
    <section id="welcome">
      <h3 className="text-large special-shadow">
        365 days.
        <br />
        365 words.
      </h3>
      <h6>
        Build your lexicon
        <br />
        Start the challenge today!
      </h6>
      <div>
        <form onSubmit={onStartClick}>
          <input
            value={name}
            onChange={(evt) => {
              console.log(evt.target.value);
              setName(evt.target.value);
            }}
            type="text"
            placeholder="Enter your name..."
          />
          <button disabled={!name} onClick={handleCreateAccount}>
            <h6>Start &rarr;</h6>
          </button>
        </form>
      </div>
    </section>
  );
}
