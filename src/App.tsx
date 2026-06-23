import './App.css'
import { Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import ListExpertises from './pages/ListExpertises';
import About from './pages/About';
import CareerTimeline from './pages/CareerTimeline';
import BeyondWork from './pages/BeyondWork';


function App() {
  return (
    <>
      <div className='container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ListExpertises" element={<ListExpertises />} />
          <Route path="/About" element={<About />} />
          <Route path="/CareerTimeline" element={<CareerTimeline />} />
          <Route path="/BeyondWork" element={<BeyondWork />} />

          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>

      </div>
    </>
  )
}

export default App
