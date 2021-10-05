
import Navbar from "./Components/Navbar";
import axios from "axios";
import {useState,useEffect} from "react";
import {BrowserRouter,Switch,Route} from "react-router-dom";
import Card from "./Components/cards";
import Context from "./context";
import "./App.css";



function App() {
   const [state,setState] = useState([]);
    //for pagination
    let pageno=10;
   let getdata= async()=>{
       const {data} = await axios.get("https://webscrap437.herokuapp.com/products");
       console.log(data);
       setState(data);
   }
   
   useEffect(()=>{
     getdata();
   },[])

  return (
    <>
    <Context.Provider 
    value ={{
      state,
      setState,
      pageno
    }}
    >
   <BrowserRouter>
   <Navbar />
   <Switch>
     <Route exact path="/" component={Card}></Route>
     <Route path="/:id" component={Card}></Route>
   </Switch>
   </BrowserRouter>
   </Context.Provider>
  
    </>
  );
}

export default App;

//build added
