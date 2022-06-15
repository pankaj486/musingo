import axios from "axios";
import { API_BASE_URL } from "../../config";


export const getAgeGroup = async () => {
     const response = await axios.get(`${API_BASE_URL}/age-group`);
     return response;
}

export const getLessonLevel = async() =>{
    const response = await axios.get(`${API_BASE_URL}/lesson-level`);
     return response;
}

export const getinstrument = async() => {
     const response = await axios.get(`${API_BASE_URL}/instrument`);
     return response;
}

export const  becomeTeacherApi = async(data) => {
     const token = localStorage.getItem("token");

     const response = await axios.post(`${API_BASE_URL}/become-teacher` , data , 
          {headers: {
            'Authorization': `Basic ${token}`} },
          
     )
     return response;
}

export const getSingleExperience = async(id) => {
     const token = localStorage.getItem('token');
     const response = await axios.get(`${API_BASE_URL}/experience/${id}`)
     return response;

}

