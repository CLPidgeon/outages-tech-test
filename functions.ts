import axios from "axios";
import { Outages, SiteInfo, FormattedOutage } from "./interfaces";
import { Outage } from "./classes";

// New array for the POST data
let newData = new Array();

// Constant values declared here to allow re-using of the functions
const baseURL = "https://api.krakenflex.systems/interview-tests-mock-api/v1/";
const apiKey = "<API_KEY>";

let url: string;
// Used only for the Status 500 across the 3 API calls in this case
let retryCount = 5;

// Re-usable GET function
export async function getData(flag: string) {
  try {
    // Getting the correct URL from the flag & baseURL
    if (flag === "allOutages") {
      url = baseURL + "outages";
    } else if (flag === "siteInfo") {
      url = baseURL + "site-info/norwich-pear-tree";
    } else {
      return "no flag";
    }
    // Sending the GET request
    const { data, status } = await axios.get(url, {
      headers: {
        "x-api-key": apiKey,
      },
    });
    // Determining what to do based on the response status
    switch (status) {
      case 200:
        // As the flags are currently only allOutages and siteinfo, only need to do one if / else here
        if (flag === "siteInfo") {
          return data.devices;
        } else {
          return data;
        }
      case 403:
        return data;
      case 404:
        return data;
      case 429:
        return data;
      // Retrying the requset, retryCount set outside the functions for use across the functions
      case 500:
        if (retryCount > 0) {
          retryCount -= 1;
          console.log("Status 500: Retrying. Attempts left: " + retryCount);
          getData(flag);
        } else {
          return "Run out of Status 500 retry attempts";
        }
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error message: ", error.message);
      return error.message;
    } else {
      console.log("Unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}

// Re-usable POST function
export async function postData(sortedData: FormattedOutage[]) {
  try {
    /*
    var config = {
      method: "post",
      url: "https://api.krakenflex.systems/interview-tests-mock-api/v1/site-outages/norwich-pear-tree",
      headers: {
        "x-api-key": <API_KEY>,
        "Content-Type": "application/json",
      },
      data: sortedData,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data.message));
      })
      .catch(function (error) {
        console.log(error);
      });
      */

    const { data, status } = await axios.post(
      baseURL + "site-outages/norwich-pear-tree",
      sortedData,
      {
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );
    // Determining what to do based on the response status
    switch (status) {
      case 200:
        return data;
      case 400:
        return data.message;
      case 403:
        return data;
      case 404:
        return data;
      case 429:
        return data;
      // Retrying the requset, retryCount set outside the functions for use across the functions
      case 500:
        if (retryCount > 0) {
          retryCount -= 1;
          console.log("Status 500: Retrying. Attempts left: " + retryCount);
          postData(sortedData);
        } else {
          return "Run out of Status 500 retry attempts";
        }
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error message: ", error.message);
      return error.message;
    } else {
      console.log("Unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}

export function newDataArray(outages: Outages[], siteinfo: SiteInfo[]) {
  outages.forEach(function (item) {
    for (var i = 0; i < siteinfo.length; i++) {
      if (item.id === siteinfo[i].id) {
        const formattedOutage = new Outage(
          item.id,
          siteinfo[i].name,
          item.begin,
          item.end
        );
        newData.push(formattedOutage);
      }
    }
  });

  return newData;
}
