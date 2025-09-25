import Dashboard from "./components/layouts/Dashboard";
import Layout from "./components/layouts/Layout";
import Welcome from "./components/layouts/Welcome";
import Challenge from "./components/layouts/Challenge";
import { useState, useEffect } from "react";

import WORDS from "./utils/VOCAB.json";

import { countdownIn24Hours, getWordByIndex, PLAN } from "./utils";

function App() {
  const [selectedPage, setSelectedPage] = useState(0);

  const [name, setName] = useState("");
  // const selectedPage = 2 //zero is for welcome , 1 is for dashboard, 2 is for challenge
  const [day, setDay] = useState(1);
  const [dateTime, setDateTime] = useState(null);
  const [history, setHistory] = useState({});
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

    if (localStorage.getItem('attempts')) {
      //then we found attempts
      let data = parseInt(localStorage.getItem('attempts'))
      setAttempts(data)
    }

    if (localStorage.getItem('history')) {
      setHistory(JSON.parse(
        localStorage.getItem('history')
      ))
    }

    if (localStorage.getItem('day')) {
      const {day: d, datetime: dt } =  JSON.parse(localStorage.getItem('day'))
      setDateTime(dt)
      setDay(d)

      if (d > 1 && dt) {
        const diff = countdownIn24Hours(dt) 
        if (diff < 0) {
          console.log('Failed challenge')
          let newHistory = {...history}
          const timestamp = new Date(dt)
          const formattedTimestamp = timestamp.toString().split(' ').slice(1, 4).join(' ')
          newHistory[formattedTimestamp] = d
          setHistory(newHistory)
          setDay(1)
          setDateTime(null)
          setAttempts(0)

          localStorage.setItem('attempts', 0)
          localStorage.setItem('history', JSON.stringify(newHistory))
          localStorage.setItem( 'day',  JSON.stringify({
            day: 1, datetime: null
          }))
        }
      }
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
