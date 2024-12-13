import Card from "./Card"
import { Link } from "react-router-dom";

function Home()
{

    const mobileSize={};
    return(
       <>
             <div className="Hero" style={{display:'flex', justifyContent:"space-around",  }}>
            <div className="left" style={{width:'50%',height:"100%", marginLeft:"50px", marginTop:"80px"}}>
                <h1 style={{color:"#243642", fontSize:"4.2vw", marginBottom:"35px"}}>Welcome to Travel Companion</h1>
                <p style={ {fontSize: "1.2vw",
                             fontWeight: "600",
                            color:" #243642",
                            width: "80%",
                            marginBottom:"35px"
                            }}>Your ultimate travel assistant! With easy access to a Currency Converter, Expense Tracker, and Weather Checker, this app ensures your travels are smooth, organized, and stress-free. Let us take care of the details, so you can focus on the adventure ahead.</p>
              <a href="https://www.linkedin.com/in/ghulam-muttaqa-shah-frontend-developer/" target="_blank">  <button  style={{backgroundColor:"#243642", color:"#E2F1E7",  fontSize: "1.2vw",padding: "1vw 2vw", cursor:"pointer",  border: "none",borderRadius: "5px",
    fontWeight: "700",}}>Contact Us!</button> </a>
            </div>
            <div className="right" style={{height:"100%", width:"50%", backgroundColor: "transparent"}}>
                <img src="./src/Home/Hero2.png" alt="" width={'100%'} height={"100%"} />
            </div>
        </div>
        <h1 style={{color:"#243642", marginLeft:"25px", fontSize:"4.2vw"}}>Tools</h1>
        <div className="cards" style={{display:"flex", justifyContent:"space-around", flexWrap:"wrap"}}  >
            <Link to="/weather"> 
                <Card title={"Weather App"} image={"./src/Home/weather-forecast.png"} description={"Get real-time weather updates for your travel destination with a 5-day forecast by simply entering your city name."}/>
            </Link>
            <Link to="/currency-converter"> 
                <Card title={"Currency Converter"}image={"./src/Home/change.png"}description={"Convert currencies instantly with accurate exchange rates."}/>
            </Link>
            <Link to="/expensetracker">
                <Card title={"Expense Tracker"} image={"./src/Home/expense.png"} description={"Easily track and manage your travel expenses."}/>
            </Link>
        </div>
       </>
    )


    
    
    
    
    

}

export default Home