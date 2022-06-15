// Task API
import { ApiCore } from "../utilities/core";
const url = 'instrument';
const plural = 'instrument';
const single = 'instrument';

// plural and single may be used for message logic if needed in the ApiCore class.

const apiLessonTypes = new ApiCore({
  getAll: true,
  getSingle: true,
  post: false,
  put: false,
  patch: false,
  delete: false,
  url: url,
  plural: plural,
  single: single
});


export default apiLessonTypes;
