import { Navbar, Articles, LogIn, Images} from "./components"
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";



export default function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
      <Route path="/" element={<LogIn/>}/>
      <Route path="/login" element={<LogIn/>}/>
      <Route path="/articles" element={<Articles/>}/>
      <Route path="/images" element={<Images/>}/>
      </Routes>
    </Router>


  )
}