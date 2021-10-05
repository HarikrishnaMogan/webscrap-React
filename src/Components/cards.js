
import {useState,useEffect,useContext} from "react";
import Context from "../context";
import axios from "axios";
function Card({match})
{
    const context = useContext(Context);
    const [card, setCard] = useState([]);


   //to get or fetch data
    let getsearch = async()=>{
        if(context.state.length !==0 || match.path==="/:id")
        {
            if(match.path==="/:id")
            {
                const {data} = await axios.get(`https://webscrap437.herokuapp.com/products/${match.params.id}`);
                console.log("search");
                console.log(data);
                setCard(data);
            }
            else
            {
            //setCard(context.state);
             console.log("home");
             paginate(context.state);
             
            }
        }else
        {
            const {data} = await axios.get("https://webscrap437.herokuapp.com/products");
           // setCard(data);
            paginate(data);
        }
    }

   
  useEffect(()=>{
           getsearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


 //to change states when params change
  useEffect(()=>{
         getsearch();
// eslint-disable-next-line react-hooks/exhaustive-deps
 },[match.params.id]);




 //for pagination
let allvalues =[];

let paginate = (data)=>{

    allvalues = [...data];
    console.log(allvalues);
    prevpage();
}
let nextpage =()=>{
    
    if(allvalues.length===0)
    {
        allvalues = [...context.state];
        console.log(allvalues);
    }
    let temp=[];
      
      let startindex = context.pageno;
      let endindex = context.pageno+10;
      for(let i=startindex;i<endindex;i++)
      {
       temp.push(allvalues[i]);
      }
      setCard(temp);
      context.pageno= endindex;
      if(context.pageno >=allvalues.length)
      {
         context.pageno= allvalues.length-10;
      }
    
}
let prevpage = ()=>{
    if(allvalues.length===0)
    {
        allvalues = [...context.state];
    }
    let temp=[];
  
    let endindex = context.pageno;
    let startindex = context.pageno-10;
    for(let i=startindex;i<endindex;i++)
    {
     temp.push(allvalues[i]);
    
    }
    setCard(temp);
    context.pageno=startindex;
    if(context.pageno <=0)
    {
        context.pageno=10;
    }
}

    return(
        <>
        <div className="container-fluid mt-4 cardgrid">
            {
              card.map((x)=>{
                return <div className="card" key={x._id}>
                    <img className="card-img-top cardimg" alt="laptops" style={{width:"100%"}} src={x.image}></img>
                    <div className="card-body">
                      <p className="title">{x.title}</p>
                      <p className="rating">Rating:{x.rating}</p>
                      <p className="offerprice">{x.offerprice}</p>
                      <p className="price">{x.price}</p>
                    </div>
                 </div>

              })
            }
       
        </div>
        {
            match.params.id ? (<></>):(
                <>
                <button type="button" className="btn btn-dark mr-md-2 mb-4" onClick={prevpage}>Prev</button>
                <button type="button" className="btn btn-dark mb-4"onClick={nextpage}>Next</button>
                </>
            )
        }
       
        </>
    );
}
export default Card;