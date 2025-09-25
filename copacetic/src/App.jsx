import Dashboard from "./components/layouts/Dashboard";
import Layout from "./components/layouts/Layout";
import Welcome from "./components/layouts/Welcome";
import Challenge from "./components/layouts/Challenge";
import { useState, useEffect } from "react";

function App() {
  const [selectedPage, setSelectedPage] = useState(0);

  const [name, setName] = useState("");
  // const selectedPage = 2 //zero is for welcome , 1 is for dashboard, 2 is for challenge

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

  useEffect(() => {
    //this callback is triggered on pg load
    if (!localStorage) {
      return;
    } //if we don't yet have access to db then exit the callbk funtion
  
  if (localStorage.getItem('username')) {
    //if we find the item (so get get item returns something), then we enter the if block
setName(localStorage.getItem('username'))

//we have a name , so we can skip  the dashboard
setSelectedPage(1)

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
    1: <Dashboard />,
    2: <Challenge />,
  };

  return (
    <div>
      <Layout>{pages[selectedPage]}</Layout>
    </div>
  );
}

export default App;
