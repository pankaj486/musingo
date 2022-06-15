// Task API
import { ApiCore } from "../utilities/core";
const url = 'lesson-type';
const plural = 'lesson-type';
const single = 'lesson-type';

// plural and single may be used for message logic if needed in the ApiCore class.

const apiInstruments = new ApiCore({
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


export default apiInstruments;
