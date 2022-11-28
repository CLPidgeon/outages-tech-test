import { Outage } from "./classes";
import { newDataArray } from "./functions";

describe("Function test suite", () => {
  test("new Outage construction", () => {
    let outage = new Outage(
      "002b28fc-283c-47ec-9af2-ea287336dc1b",
      "Battery 1",
      "2022-05-23T12:21:27.377Z",
      "2022-11-13T02:16:38.905Z"
    );
    expect(outage).toEqual({
      id: "002b28fc-283c-47ec-9af2-ea287336dc1b",
      name: "Battery 1",
      begin: "2022-05-23T12:21:27.377Z",
      end: "2022-11-13T02:16:38.905Z",
    });
  });
});

test("Testing the new data array creation", () => {
  let newData = newDataArray(
    [
      {
        id: "111183e7-fb90-436b-9951-63392b36bdd2",
        begin: "2021-09-23T22:00:06.724Z",
        end: "2022-05-15T05:19:25.794Z",
      },
      {
        id: "86b5c819-6a6c-4978-8c51-a2d810bb9318",
        begin: "2022-09-29T08:57:26.711Z",
        end: "2022-12-27T05:13:42.586Z",
      },
      {
        id: "cb6a5b78-11f1-434c-ad52-255377692dd4",
        begin: "2021-08-23T02:15:05.821Z",
        end: "2021-11-07T12:39:29.276Z",
      },
    ],
    [
      { id: "111183e7-fb90-436b-9951-63392b36bdd2", name: "Battery 1" },
      { id: "86b5c819-6a6c-4978-8c51-a2d810bb9318", name: "Battery 2" },
    ]
  );
  expect(newData).toEqual([
    {
      id: "111183e7-fb90-436b-9951-63392b36bdd2",
      name: "Battery 1",
      begin: "2021-09-23T22:00:06.724Z",
      end: "2022-05-15T05:19:25.794Z",
    },
    {
      id: "86b5c819-6a6c-4978-8c51-a2d810bb9318",
      name: "Battery 2",
      begin: "2022-09-29T08:57:26.711Z",
      end: "2022-12-27T05:13:42.586Z",
    },
  ]);
});

test("Filtering by date test", () => {
  let newData = [
    {
      id: "111183e7-fb90-436b-9951-63392b36bdd2",
      name: "Battery 1",
      begin: "2021-09-23T22:00:06.724Z",
      end: "2022-05-15T05:19:25.794Z",
    },
    {
      id: "111183e7-fb90-436b-9951-63392b36bdd2",
      name: "Battery 1",
      begin: "2022-09-29T08:57:26.711Z",
      end: "2022-12-27T05:13:42.586Z",
    },
    {
      id: "86b5c819-6a6c-4978-8c51-a2d810bb9318",
      name: "Battery 2",
      begin: "2022-09-29T08:57:26.711Z",
      end: "2022-12-27T05:13:42.586Z",
    },
  ];
  const filteredData = newData.filter(function (outage) {
    return new Date(outage.begin) > new Date("2022-01-01T00:00:00.000Z");
  });
  expect(filteredData).toEqual([
    {
      id: "111183e7-fb90-436b-9951-63392b36bdd2",
      name: "Battery 1",
      begin: "2022-09-29T08:57:26.711Z",
      end: "2022-12-27T05:13:42.586Z",
    },
    {
      id: "86b5c819-6a6c-4978-8c51-a2d810bb9318",
      name: "Battery 2",
      begin: "2022-09-29T08:57:26.711Z",
      end: "2022-12-27T05:13:42.586Z",
    },
  ]);
});
