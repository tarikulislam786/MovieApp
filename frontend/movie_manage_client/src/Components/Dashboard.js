import { useEffect, useState } from "react";
import {Link, useNavigate, Route, Routes,useRoutes,Router, useParams, Navigate} from 'react-router-dom'
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../state/reducers/userReducers";
import { movieList, selectMovie } from "../state/reducers/movieReducers";

const Parse = require('html-react-parser');

const Dashboard = ()  =>  {

 const { email } = useParams(); 
 const [movies, setMovies] = useState([]); 

 const navigate = useNavigate();
 const dispatch = useDispatch();
 const user = useSelector(selectUser);
 const movie = useSelector(selectMovie);
 const handleLogout = (e) => {
  e.preventDefault();
  
  dispatch(logout());
  navigate("/");
 }
  useEffect(() => {

    async function allowNavigate(){
    if(!localStorage.getItem('token')){
       // redirect('/');
        return <Navigate replace to="/" />;
    } else {
      return (
        <div>
          <p>Welcome to your Dashboard</p>
        </div>
      );
    } 
   }
   allowNavigate();
   getMovieList();

  }, []);

  const getMovieList = () => {
    let token=localStorage.getItem("token");

    axios
    .get(
      `http://localhost:8000/movies/movieList`,{
      headers: {'Authorization': `bearer ${token}`}
      })
    .then( (response) => {
      const posts = response.data;
      setMovies(posts);
    })
    .catch(function(err) {
        console.error(err);
    });
}

  return (
  <>
  <nav className="navbar navbar-expand-xl navbar-dark bg-dark">
	<a href="#" className="navbar-brand"><i className="fa fa-cube"></i>Brand<b>Name</b></a>  		
	<button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
		<span className="navbar-toggler-icon"></span>
	</button>

	<div id="navbarCollapse" className="collapse navbar-collapse justify-content-start">		
		<form className="navbar-form form-inline">
			<div className="input-group search-box">								
				<input type="text" id="search" className="form-control" placeholder="Search here..." />
				<span className="input-group-addon"><i className="material-icons">&#xE8B6;</i></span>
			</div>
		</form>
		<div className="navbar-nav ml-auto">
			<a href="#" className="nav-item nav-link active"><i className="fa fa-home"></i><span>Home</span></a>
			<a href="#" className="nav-item nav-link"><i className="fa fa-gears"></i><span>Projects</span></a>
			<a href="#" className="nav-item nav-link"><i className="fa fa-users"></i><span>Team</span></a>
			<a href="#" className="nav-item nav-link"><i className="fa fa-pie-chart"></i><span>Reports</span></a>
			<a href="#" className="nav-item nav-link"><i className="fa fa-briefcase"></i><span>Careers</span></a>
			<a href="#" className="nav-item nav-link"><i className="fa fa-envelope"></i><span>Messages</span></a>		
			<a href="#" className="nav-item nav-link"><i className="fa fa-bell"></i><span>Notifications</span></a>
      
			<div className="nav-item dropdown">
				<a href="#" data-toggle="dropdown" className="nav-item nav-link dropdown-toggle user-action"><img src="https://www.tutorialrepublic.com/examples/images/avatar/3.jpg" className="avatar" alt="Avatar" /> {user? user.email:''} <b className="caret"></b></a>
				<div className="dropdown-menu">
					<a href="#" className="dropdown-item"><i className="fa fa-user-o"></i> Profile</a>
					<a href="#" className="dropdown-item"><i className="fa fa-calendar-o"></i> Calendar</a>
					<a href="#" className="dropdown-item"><i className="fa fa-sliders"></i> Settings</a>
					<div className="divider dropdown-divider"></div>
					<a href="#" className="dropdown-item"><i className="material-icons">&#xE8AC;</i> Logout</a>
				</div>
			</div>
      <a href="#" className="nav-item nav-link" onClick={(e) => handleLogout(e)}><i className="fa fa-bell"></i><span>Logout</span></a>
		</div>
	</div>
</nav>
    <div className="container">
    <div className="panel panel-default">
      <div className="panel-body">Movie List</div>
    </div>
         <table className="table">
          <thead className="thead-dark">
            <tr>
              {/* <th scope="col">#</th> */}
              <th scope="col">Title</th>
              <th scope="col">Release Date</th>
              <th scope="col">Movie Type</th>
              <th scope="col">Movie Director</th>
            </tr>
          </thead>
          <tbody>
          {
          movies.map(movie =>
            <tr key={movie._id}>
              {/* <th scope="row">{movie._id}</th> */}
              <td>{movie.movieTitle}</td>
              <td>{movie.releaseDate}</td>
              <td>{movie.movieType}</td>
              <td>{movie.movieDirector}</td>
            </tr>
          )
          }
          </tbody>
         </table>
      </div>
  </>
    
  );
};
export default Dashboard;