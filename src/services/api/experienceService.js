// Task API
import { ApiCore } from "../utilities/core";
import apiProvider from "../utilities/provider";

const url = "experience";
const plural = "experiences";
const single = "experience";

// plural and single may be used for message logic if needed in the ApiCore class.

const apiExperiences = new ApiCore({
  getAll: true,
  getSingle: true,
  post: true,
  put: false,
  patch: true,
  delete: false,
  url: url,
  plural: plural,
  single: single,
});

apiExperiences.getAllWithFilter = (filters) => {
  return apiProvider.getAll(url + filters);
};

apiExperiences.createExperience = (model) => {
  return apiProvider.post(url + "/private/lessons/", model);
};

export default apiExperiences;

//example code for component
// const [tasks, setTasks] = useState([]);

// useEffect(() => {
//   _getTasks();
// }, []);

// function _getTasks() {
//   apiTasks.getAll().then((res) => {
//     let arr = _parseTasks(res.results.data);
//     setTasks(arr);
//   });
// }
