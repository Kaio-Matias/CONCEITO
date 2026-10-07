import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ClientArea from './pages/ClientArea'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cliente" element={<ClientArea />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
