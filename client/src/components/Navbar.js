import React, {useState, useEffect} from "react";
import messenger from '../icons/messenger.png'
import bell from '../icons/bell.png'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
    const [data, setData] = useState({});
    const navigate = useNavigate();

    const getUser = () => {
        axios({
          method: "GET",
          withCredentials: true,
          url: "http://localhost:4000/user"
        }).then((res) => {
          setData(res.data)
          console.log(res.data);
        });
      }

      useEffect(() => {
        getUser();
      }, [])

    return (
        <div className="navbar">
            <h1 onClick={() => navigate('/timeline')} className='homeBtn'>Facebook</h1>
            <h3>Welcome back {data ? data.full_name : null}</h3>
            <input className="searchbar" type='text' placeholder='search' />
            <div className="navbar-images">
                <img src={messenger}></img>
                <img src={bell}></img>
            </div>
        </div>
    )
}

export default Navbar;