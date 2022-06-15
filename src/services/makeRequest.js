
import axios from "axios";
import { API_BASE_URL } from "../config";

async function getAccessToken(){
  const session = await Auth.currentSession();
  return session.getAccessToken().getJwtToken();
}

export async function get(URI) {
  const accessToken = await getAccessToken();
  const response = await axios.get(`${API_BASE_URL}${URI}`);

  if(response.status === 401) {
    reduxStore.dispatch(signOutUser())
  }
  const result = {
    status: response.status,
    body: await response.json(),
  };
  return result;
}
export async function get_no_auth(URI) {
  // const accessToken = await getAccessToken();
  const response = await axios.get(`${API_ROOT}${URI}/get-site-settings`);
    return response

  const result = {
    status: response.status,
    body: await response.json(),
  };
  return result;
}

export async function post(URI, data) {
  const accessToken = await getAccessToken();
  const response = await fetch(`${API_ROOT}${URI}`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(data),
  });

  if(response.status === 401) {
    reduxStore.dispatch(signOutUser())
  }

  const result = {
    status: response.status,
    body: await response.json(),
  };
  return result;
}

export async function delete_req(URI, data) {
  const accessToken = await getAccessToken();
  const response = await fetch(`${API_ROOT}${URI}`, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(data),
  });

  if(response.status === 401) {
    reduxStore.dispatch(signOutUser())
  }

  const result = {
    status: response.status,
    body: await response.json(),
  };
  return result;
}

export async function patch(URI, data){
  const accessToken = await getAccessToken();
  const response = await fetch(`${API_ROOT}${URI}`, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(data),
  });

  if(response.status === 401) {
    reduxStore.dispatch(signOutUser())
  }

  const result = {
    status: response.status,
    body: await response.json(),
  };
  return result;
}

export async function getPdf(pdf){
  const accessToken = await getAccessToken();
  const response = await fetch(`${API_ROOT}/pdf?pdf=${pdf}`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/pdf",
      Authorization: `Bearer ${accessToken}`,
    },
    redirect: "follow",
    referrer: "no-referrer",
  });

  if(response.status === 401) {
    reduxStore.dispatch(signOutUser())
  }

  const result = {
    status: response.status,
    body: await response.blob(),
  };
  return sresult;
}