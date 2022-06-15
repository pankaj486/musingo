import User from "./user";
import { API_BASE_URL } from "src/config";
// import { UserContext } from "src/components/ProfileCreation/ProfileCreationWizard";
// import { useContext } from "react";

const axios = require("axios");
const adapter = require("axios/lib/adapters/http");

export const JWT_CREATE_URL = "/token/create";
export const JWT_REFRESH_URL = "/token/refresh";
export const JWT_VERIFY_URL = "/token/verify";
export const USER_URL = "/user/me";

let remember = false;
let current_user = undefined;
let loginHandlers = [];

// const [, setVal] = useContext(UserContext);


const subscribeOnLogin = (fn) => {
  loginHandlers.push(fn);
};

const unsubscribeOnLogin = (fn) => {
  loginHandlers = loginHandlers.filter((item) => (item !== fn ? item : false));
};

const loadFromStorage = () => {
  // Load user from persistent storage if possible
  let current_user_data = sessionStorage.getItem("current_user");

  if (current_user_data !== null) {
    remember = false;
    current_user_data = JSON.parse(current_user_data);
    current_user = new User(
      current_user_data.id,
      current_user_data.email,
      current_user_data.remember
    );
    return;
  }
  current_user_data = localStorage.getItem("current_user");

  if (current_user_data !== null) {
    remember = true;
    current_user_data = JSON.parse(current_user_data);
    current_user = new User(
      current_user_data.id,
      current_user_data.email,
      current_user_data.remember
    );
  }
};
loadFromStorage();

const saveToStorage = () => {
  if (current_user && current_user.remember) {
    localStorage.setItem("current_user", JSON.stringify(current_user));
    sessionStorage.removeItem("current_user");
  } else if (current_user) {
    sessionStorage.setItem("current_user", JSON.stringify(current_user));
    localStorage.removeItem("current_user");
  }
};

const registerUser = (email, password) => {
  return axios
    .request({
      method: "POST",
      url: `${API_BASE_URL}/user/me`,
      data: {
        email: email,
        password: password,
      },
    })
    .then(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.log(error)
        return Promise.reject(error);
      }
    );
};


// const createProfileApi = async (formData) => {
//   const token = localStorage.getItem("token");
//   return axios
//     .request({
//       method: "POST",
//       url: `${API_BASE_URL}/user/me/profile`,
//       data: formData,
//       headers: {
//         Accept: "application/json; charset=utf-8",
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     .then(
//       (response) => {
//         console.log(response)
//       },
//       (error) => {
//         console.log(error)
//         return Promise.reject(error);
//       }
//     );
// }

const updateProfileApi = async (formData) => {
  const token = localStorage.getItem("token");
  return axios
    .request({
      method: "PATCH",
      url: `${API_BASE_URL}/user/me/profile`,
      data: formData,
      headers: {
        Accept: "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.log(error)
        return Promise.reject(error);
      }
    );
}


const login = (email, password, remember_me = true) => {
  return axios
    .request({
      method: "POST",
      url: `${API_BASE_URL}${JWT_CREATE_URL}`,
      headers: {
        Accept: "application/json; charset=utf-8",
        "Content-Type": "application/json; charset=utf-8",
      },
      data: {
        email: email,
        password: password,
      },
      adapter: adapter,
    })
    .then(
      async (response) => {
        return axios
          .request({
            method: "GET",
            url: `${API_BASE_URL}${USER_URL}`,
            headers: {
              Accept: "application/json; charset=utf-8",
              Authorization: `Bearer ${response.data["access"]}`,
            },
          })
          .then(
            (user_response) => {
              console.log("user_response", user_response);
              current_user = new User(
                user_response.data["id"],
                email,
                remember_me,
                response.data["access"],
                response.data["refresh"]
              );
              // TODO:: this details have to be here
              // user_type
              // photo
              // first_name
              // last_name
              saveToStorage();

              for (const loginHandler of loginHandlers) {
                loginHandler(current_user);
              }

              return current_user;
            },
            (error) => Promise.reject(error)
          );
      },
      (error) => {
        return Promise.reject(error);
      }
    );
};

const logout = () => {
  current_user = undefined;
  localStorage.removeItem("current_user");
  localStorage.removeItem("jwt_refresh");
  localStorage.removeItem("jwt_access");
  sessionStorage.removeItem("current_user");
  sessionStorage.removeItem("jwt_refresh");
  sessionStorage.removeItem("jwt_access");

  for (const loginHandler of loginHandlers) {
    loginHandler(undefined);
  }
};

const refresh = () => {
  return axios
    .request({
      method: "POST",
      url: API_BASE_URL + JWT_REFRESH_URL,
      headers: {
        Accept: "application/json; charset=utf-8",
        "Content-Type": "application/json; charset=utf-8",
      },
      data: {
        refresh: current_user.jwt_refresh,
      },
    })
    .then((response) => {
      current_user.jwt_refresh = response.data["refresh"];
      current_user.jwt_access = response.data["access"];
      saveToStorage();
    });
};

const is_logged_in = () => {
  // TODO: Check validity of token
  return current_user !== undefined;
};

const get_current_user = () => {
  return current_user;
};

const get_user_profile = () => {
  const token = localStorage.getItem("token");
  return axios
    .request({
      method: "GET",
      url: `${API_BASE_URL}/user/me/profile`,
      headers: {
        Accept: "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
    });
}

export const getUser = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_BASE_URL}/user/me`, {
    headers: {
      Accept: "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    }
  }
  );

  return response;

}

export const getInstrument = async () => {
  const response = await axios.get(`${API_BASE_URL}/instrument/`);
  return response;
};

export const getAgeGroup = async () => {
  const response = await axios.get(`${API_BASE_URL}/age-group`);
  return response;
}

export const getPaymentMethod = async () => {
  const getUserId = JSON.parse(localStorage.getItem("current_user"));
  const token = localStorage.getItem("token");
  const params = { id: getUserId.id };
  const response = await axios.get(`${API_BASE_URL}/payment-method`, { params }, {
    headers: {
      Accept: "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    }
  });
  return response;
}

const postBookingSummary = async (formData) => {
  const token = localStorage.getItem("token");
  return axios
    .request({
      method: "POST",
      url: `${API_BASE_URL}/experience/private/bookings/student/`,
      data: formData,
      headers: {
        Accept: "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.log(error)
        return Promise.reject(error);
      }
    );
}

export const updateExperienceListing = async (id, formData,) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/experience/private/lessons/${id}/`, formData);
    console.log('response', response);
  } catch (e) {
    console.log("createExperienceListError", e);
    return e
  }
}

export const updateUserProfile = async (formData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/user/me/profile`, formData);
    console.log('response', response);
  } catch (e) {
    console.log("updateuserProfileError", e);
    return e
  }
}

export const getMusicianViewList = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/experience/private/lessons/`);
    console.log('musicianView', response);
    return response
  } catch (e) {
    console.log("getMusicianViewListError", e);
    return e
  }
}


export const getMusicianViewListById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/experience/private/lessons/${id}`);
    console.log('musicianView', response);
    return response
  } catch (e) {
    console.log("getMusicianViewListError", e);
    return e
  }
}


export const getTrainerView = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/experience/private/bookings/teacher/`);
    console.log('trainerView', response);
    return response
  } catch (e) {
    console.log("trainerViewError", e);
    return e
  }
}


export const service = {
  refresh: refresh,
  is_logged_in: is_logged_in,
  get_current_user: get_current_user,
  login: login,
  logout: logout,
  registerUser: registerUser,
  subscribeOnLogin: subscribeOnLogin,
  unsubscribeOnLogin: unsubscribeOnLogin,
  // createProfileApi: createProfileApi,
  get_user_profile: get_user_profile,
  getUser: getUser,
  updateProfileApi: updateProfileApi,
  getInstrument: getInstrument,
  getAgeGroup: getAgeGroup,
  getPaymentMethod: getPaymentMethod,
  postBookingSummary: postBookingSummary,
  updateExperienceListing: updateExperienceListing,
  updateUserProfile: updateUserProfile,
  getMusicianViewList: getMusicianViewList,
  getMusicianViewListById:getMusicianViewListById,
  getTrainerView:getTrainerView,
};
