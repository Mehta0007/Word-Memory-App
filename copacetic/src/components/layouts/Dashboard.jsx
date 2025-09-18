import Countdown from "../Countdown";
import History from "../History";
import Stats from "../Stats";

export default function Dashboard() {
    return(
      <section id="dashboard">
            <Stats/>
            <Countdown/>
            <History/>

      </section>
    )

}