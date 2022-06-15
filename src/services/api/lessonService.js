// Task API
import { ApiCore } from "../utilities/core";
const url = 'tasks';
const plural = 'tasks';
const single = 'task';

// plural and single may be used for message logic if needed in the ApiCore class.

const apiTasks = new ApiCore({
  getAll: true,
  getSingle: true,
  post: true,
  put: false,
  patch: true,
  delete: false,
  url: url,
  plural: plural,
  single: single
});

apiTasks.massUpdate = () => {
  // Add custom api call logic here
}

export default apiTasks;

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