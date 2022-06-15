import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure()

export const toastifySuccessMessage = (successMessage) => {
    toast.success(successMessage) 
}


export const toastifyErrorMessage = (errorMessage) => {
    toast.error(errorMessage, {position:toast.POSITION.BOTTOM_CENTER})
}