import { Outages, SiteInfo, FormattedOutage } from "./interfaces";

import { getData, postData, newDataArray } from "./functions";

let outages: Outages[];

let siteinfo: SiteInfo[];

// New array for the POST data
let newData = new Array();

let filteredData: FormattedOutage[];

let sortedData: FormattedOutage[];

export default async function mainFunction() {
  // Logging the start as backend only
  console.log("Start");

  // Getting the two different data sets
  outages = await getData("allOutages");
  siteinfo = await getData("siteInfo");

  /*
  // Logging the two different data sets for debugging
  console.log("Outages \n" + JSON.stringify(outages));
  console.log("\n SIte info \n" + JSON.stringify(siteinfo));
  */

  // Iterating over the outages, if the id is also in the siteinfo data set, add the name and push to a new array
  newData = newDataArray(outages, siteinfo);

  // Filtering all of the outages to be a after 2022-01-01T00:00:00.000Z
  filteredData = newData.filter(function (outage) {
    return new Date(outage.begin) > new Date("2022-01-01T00:00:00.000Z");
  });

  // Sorting by name
  sortedData = filteredData.sort((a, b) => (a.name > b.name ? 1 : -1));

  /*
  // Logging for debugging purposes only
  console.log("\nSorted the data \n" + JSON.stringify(sortedData));
  */

  // Posting the filtered, formatted and sorted outage data
  await postData(sortedData);

  // Logging the end as backend only
  console.log("\n Finished");
}

mainFunction();
