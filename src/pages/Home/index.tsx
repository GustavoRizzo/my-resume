import About from "../About";
import CareerTimeline from "../CareerTimeline";
import ListExpertises from "../ListExpertises";
import BeyondWork from "../BeyondWork";

export default function Home() {
    return (
      <main style={{padding: '0 1rem'}}>
        <About />
        <ListExpertises />
        <CareerTimeline />
        <BeyondWork />
      </main>
    );
  }