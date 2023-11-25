import {useLocation} from "react-router-dom";
import updatePlanForm from "./UpdatePlanForm.tsx";

function UpdatePlanStart(){
    const {state} = useLocation();
    const { plan } = state;
    return(
        <>
            {updatePlanForm(plan)}
        </>
    )
}

export default UpdatePlanStart