import Dashboard from "./components/layouts/Dashboard";
import Layout from "./components/layouts/Layout";
import Welcome from "./components/layouts/Welcome";
import Challenge from "./components/layouts/Challenge";
import { useState, useEffect } from "react";

import WORDS from "./utils/VOCAB.json";

import { getWordByIndex, PLAN } from "./utils";

function App() {
  const [selectedPage, setSelectedPage] = useState(0);

  const [name, setName] = useState("");
  // const selectedPage = 2 //zero is for welcome , 1 is for dashboard, 2 is for challenge
  const [day, setDay] = useState(1);
  const [dateTime, setDateTime] = useState(null);
  const [history, setHistory] = useState([]);
  const [attempts, setAttempts] = useState(0);

  const daysWords = PLAN[day].map((idx) => {
    return getWordByIndex(WORDS, idx).word;
  });

  function handleChangePage(pageIndex) {
    setSelectedPage(pageIndex);
  }

  function handleCreateAccount() {
    if (!name) {
      alert("Please enter your name first!");
      return;
    }
    localStorage.setItem("username", name);
    handleChangePage(1); // move to Dashboard
  }

  function handleCompleteDay() {
 const newDay =  day + 1
 const newDatetime = Date.now()
 setDay(newDay)
 setDateTime(newDatetime)

 localStorage.setItem('day', JSON.stringify( {
  day: newDay, 
  datetime: newDatetime}))
  setSelectedPage(1)
  }

  function handleIncrementAttempts() {
//take the current attmp number, and add one and save it to local storage
const  newRecord = attempts + 1
localStorage.setItem('attempts', newRecord )
setAttempts(newRecord)
  }

  useEffect(() => {
    //this callback is triggered on pg load
    if (!localStorage) {
      return;
    } //if we don't yet have access to db then exit the callbk funtion

    if (localStorage.getItem("username")) {
      //if we find the item (so get get item returns something), then we enter the if block
      setName(localStorage.getItem("username"));

      //we have a name , so we can skip  the dashboard
      setSelectedPage(1);
    }
  }, []);

  const pages = {
    0: (
      <Welcome
        handleCreateAccount={handleCreateAccount}
        username="hello"
        name={name}
        setName={setName}
      />
    ),
    1: (
      <Dashboard
        name={name}
        attempts={attempts}
        PLAN={PLAN}
        day={day}
        handleChangePage={handleChangePage}
        daysWords={daysWords}
        dateTime={dateTime}
        history={history}
      />
    ),
    2: <Challenge
        day={day}
        daysWords={daysWords}
        handleChangePage={handleChangePage} 
        handleIncrementAttempts={handleIncrementAttempts}
        handleCompleteDay={handleCompleteDay}
        PLAN={PLAN}
    />,
  };

  return (
    <div>
      <Layout>{pages[selectedPage]}</Layout>
    </div>
  );
}

export default App;
