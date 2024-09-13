import { RouterProvider } from "react-router-dom"
import { AppBody } from "./components/AppBody"
import { router } from "./routes"

function App() {
  return (
    <AppBody>
      <RouterProvider router={router} />
    </AppBody>
  )
}

export default App
