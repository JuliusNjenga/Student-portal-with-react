import Navigation from './components/Navigation.jsx';
import LoginForm from './components/LoginForm.jsx';
import StudentCard from './components/StudentCard.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
    <Navigation />
    <Routes>
      <Route path ='/' element ={<LoginForm />} />
      <Route path = '/StudentCard' element ={<StudentCard />} />
      <Route path = '*' element = {<NotFoundPage />}/>
    </Routes>

    </>
  )
}

export default App
