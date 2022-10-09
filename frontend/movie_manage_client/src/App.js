import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Login from './Components/Login'
import { useSelector } from 'react-redux';
import { selectUser } from './state/reducers/userReducers';
import Dashboard from './Components/Dashboard';

function App() { 

  const isLoggedinUser = useSelector(selectUser);
 return (
  
  <div>
    {
      isLoggedinUser? <Dashboard /> : <Login />
    }
  </div>
 )
}
export default App;
