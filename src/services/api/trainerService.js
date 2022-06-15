// Task API
import { ApiCore } from "../utilities/core";
const url = 'become-teacher';
const plural = 'become-teacher';
const single = 'become-teacher';

// plural and single may be used for message logic if needed in the ApiCore class.

const apiTrainers = new ApiCore({
  getAll: true,
  getSingle: true,
  post: true,
  put: false,
  patch: false,
  delete: false,
  url: url,
  plural: plural,
  single: single
});

apiTrainers.massUpdate = () => {
  // Add custom api call logic here
}

export default apiTrainers;
