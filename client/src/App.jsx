import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer';
import Home from './components/home/Home';
import Login from './components/login/Login.jsx';
import SignUp from './components/signup/SignUp.jsx';
import Logout from './components/logout/logout.jsx';
import FoodDetails from './components/shared/foodDetails/FoodDetails.jsx';
import NewFood from './components/food/NewFood.jsx';
import EditFood from './components/food/EditFood.jsx';
import EditFoodImages from './components/food/EditFoodImages.jsx';
import { StyledEngineProvider } from '@mui/material/styles';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import ProtectedRoutes from './components/ProtectedRoutes.jsx';
import { QueryClient, QueryClientProvider } from 'react-query'

import './App.css'

function App() {
  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <StyledEngineProvider injectFirst>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/sign-up' element={<SignUp />} />
              <Route path='/logout' element={<Logout />} />
              <Route element={<ProtectedRoutes />}>
                <Route path='/food/new' element={<NewFood />} />
                <Route path='/food/:id/edit' element={<EditFood />} />
                <Route path='/food/:id/edit/images' element={<EditFoodImages />} />
              </Route>
              <Route path='/food/:foodId' element={<FoodDetails />} />
            </Routes>
            <Footer />
          </StyledEngineProvider>
        </Router>
      </QueryClientProvider>
    </>
  )
}

export default App
