import { Container, CssBaseline } from "@mui/material"
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

function App() {

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container>
        
        
        <Outlet />
        
      </Container>
    </>
  )
}

export default App
