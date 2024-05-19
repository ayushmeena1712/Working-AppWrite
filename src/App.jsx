import { useEffect, useState } from 'react'
import { Header, Footer } from './components/index'
import authService from './Appwrite/auth'
import './App.css'
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom'
import { login, logout } from './store/authSlice';
 
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService.getCurrentUser()
    .then((data) => {
    if(data){
      dispatch(login({data}))
    }else{
      dispatch(logout())
    }}
  )
    .finally(()=> {setIsLoading(false)})
   
  }, [])
  

  return (
    <>
      <Header/>
      {isLoading && <h1>Loading...</h1>} 
      {!isLoading && <Outlet />}
      <Footer/> 
    </>
  )
}

export default App