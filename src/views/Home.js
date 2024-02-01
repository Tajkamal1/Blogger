import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';


function Home(){
    return(
    <div className='navbar1'>
        <img id="icon" src={require("../images/Blogger-App.png")} alt="Icon"/>
        <ul>
            <li><Link to='/Write'>Write</Link></li>
            <li><Link to='/LogOut'>LogOut</Link></li>
            
        </ul>
        

    </div>
      
    )
}

export default Home;
