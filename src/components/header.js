import React from "react";
import Notify from "./Notify";
const Header = ({joke,message})=>{
  
    return(
        <div>
            <h1 className="phone-main-h1">Phonebook</h1>{" "}
      <h2 className="phone-main-h2"> by Rohit Mishra</h2>
      <Notify message={message} />
    <b> Joke of the day:   </b>                     " {joke}"<br/><br/>
      <label>
        <b>Search</b>
      </label>
      <br />
        </div>
    )
}
export default Header