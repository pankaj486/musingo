import { useState } from 'react';
// import auth from '../helpers/auth'
import * as config from '../config'
/**
 * API Request handler
 * @param url - api endpoint
 * @param method - http method
 * @param bodyParams - body parameters of request
 */
export const DEFAULT_HEADER = {}
export const AUTH_HEADER = {
  'Accept' : 'application/json',
  // Authorization: 'Bearer ' + auth.getToken()
}

export const DEFAULT_PARAMS = {
  // client_id : config.uaccount.client_id,
  // device_id : auth.getDeviceId(),
}

// to Title case
export let toTitleCase = (str = '') => {
  let titleCase = str.replace(/([a-z])([A-Z])/g, function (allMatches, firstMatch, secondMatch) {
      return firstMatch + " " + secondMatch;
  }).toLowerCase()
      .replace(/([ -_]|^)(.)/g, function (allMatches, firstMatch, secondMatch) {
      return (firstMatch ? " " : "") + secondMatch.toUpperCase();
  });

  return titleCase
}

// fixed decimal
export let formatNumber = (amount = 0) => {
  if(amount && typeof amount != 'undefined') {
    // return amount.toFixed(4)
    return amount
  }
  return 0
}

// format amount
export let formatAmount = (currency, amount = 0) => {
  return (currency != null ? currency.symbol : '$') + formatNumber(amount)
}

export let formatMoney = (currency_symbol = '$', amount = 0, currency_code='USD') => {
  return (currency_symbol + formatNumber(amount) + " " +currency_code)
}

// convert object to FormData
export let objectToFormData = data => {
    let formData = new FormData() 
    for(const key in data) {
        if(data.hasOwnProperty(key)) {
            formData.append(key, data[key])
        }
    }
    return formData;
}

export let sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// sum of array of object by key
export let arraySum = (array, key) => {
  return array.reduce((a, b) => a + (b[key] || 0), 0);
}

// search array of object by key
export let arraySearch = (array, key, value) => {
  return array.find(item => item[key] == value)
}

// search array of object by key
export let arrayFilter = (array, key, value) => {
  return array.filter(item => item[key] == value)
}

// convert date DD-MM-YYYY
export let convertDate = data => {
  let dateTime = new Date(data)
  return dateTime.getDate() + "-" + (dateTime.getMonth() + 1) + "-" + dateTime.getFullYear();
}

export let displayDateTime = data => {
  let dateTime = new Date(data)
  return dateTime.toUTCString();
}

export let formatDateInput = data => {
  if(!data) return data
  let dateTime = new Date(data)
  return (`${dateTime.getFullYear()}-${('0'+(dateTime.getMonth()+1)).slice(-2)}-${('0'+dateTime.getDate()).slice(-2)}`)
}


// return current date  YYYY-MM-DD
export let now = () => {
  let dateTime = new Date()
  // return (dateTime.getFullYear()+'-'+(dateTime.getMonth()+1)+'-'+dateTime.getDate())
  // '1984-01-18' date type input
  // 'YYYY-MM-DD' laravel input
  return (`${dateTime.getFullYear()}-${('0'+(dateTime.getMonth()+1)).slice(-2)}-${('0'+dateTime.getDate()).slice(-2)}`)
}

export let dateForHuman = data => {
  let dateTime = new Date(data)
  return dateTime.toUTCString().split(' ').slice(0, 4).join(' ');
  // return dateTime.toLocaleDateString().split(' ').slice(0, 4).join(' ');
}

// file from url
export let getUrlFile = (url) => {
  let file = new File(url)
  let reader  = new FileReader();

  reader.onloadend = function () {
    console.log(reader.result); //this is an ArrayBuffer
  }
  reader.readAsArrayBuffer(file);
}

export let fileExist = (url) => {
    return new Promise(function (resolve, reject) {
      var timeout = 5000;
      var timer, img = new Image();
      img.onerror = img.onabort = function () {
          clearTimeout(timer);
          reject(false);
      };
      img.onload = function () {
          clearTimeout(timer);
          resolve(true);
      };
      timer = setTimeout(function () {
          // reset .src to invalid URL so it stops previous
          // loading, but doesn't trigger new load
          img.src = "";
          reject(false);
      }, timeout);
      img.src = url;
  });
}

// custom helper to take input field
export let useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  let handleChange = e => setValue(e.target.value)
  return [value, handleChange, setValue]
}

export let useFormFields = (initialState) => {
  const [fields, setValues] = useState(initialState);  
  return [
    fields,
    (event) => {
      setValues({
        ...fields,
        [event.target.id]: event.target.value
      });
    },
    setValues
  ];
}

export let useSwitchFields = (initialState) => {
  const [checkSwitch, setCheckSwitch] = useState(initialState);  
  
  return [
    checkSwitch,
    name => event => {
      setCheckSwitch({
        ...checkSwitch,
        [name]: event.target.checked
      });
    },
    setCheckSwitch
  ];
}


//file upload
export let useFileInput = initialValue => {
  // {preview: '', raw: ''}
  const [value, setValue] = useState(initialValue);

  let handleChange = event => {
    if(event.target && event.target.files.length) {
      let raw = event.target.files[0]
      let reader = new FileReader();
      reader.onloadend = (e) => {
        setValue({
          file : raw,
          image: reader.result
        });
      }
      reader.readAsDataURL(event.target.files[0])
    }
  }
  
  return [
    value,
    handleChange,
    setValue
  ]
}

export let showImage = file => {
  let reader = new FileReader();
  let ImageSrc = null;
    if(file) {
      reader.onloadend = () => {
        // setShowFileImage(reader.result)
        ImageSrc = reader.result
    }
    reader.readAsDataURL(file)
  }
  
  return ImageSrc
}

// api request
export const apiRequest = async (
    url,
    method,
    bodyParams
  )  => {
    const response = await fetch(url, {
      method,
      headers: {
        Accept: "application/json"
      },
      body: bodyParams ? JSON.stringify(bodyParams) : undefined
    });
  return await response.json();
  };

export const defaultImages = {
  send_money: 'https://www.r1cu.org/images/convenience/send-money2.png',
  cash_out: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSg3oqQbTBgYJcvkl4vCgSCzi5J-7M76xM5SIDTjgC0k9LgXA07',
  invoice: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSNZYkTevF6yPvS1fRCXLAztzx8jvoPI-dfAkYu_m-IuDL8idio',
};

export const getRandomColor = () => {
  let letters = '0123456789ABCDE';
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 15)];
  }
  return color;
}