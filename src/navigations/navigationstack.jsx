import { Route,Routes } from "react-router-dom"
import UserForm from "../form/form"

const NavigationStack=()=>{

    return(
        <>
            <Routes>
                <Route path="/" element={<UserForm/>}></Route>
                
            </Routes>
            </>
            
        
    )
}
export default NavigationStack