Last updated 28/11/2022

# Site Outages

## Overview

### What is this for?

This is a small program designed to filter all outages by site (`norwich-pear-tree`) and date (outages begining after `2022-01-01T00:00:00.000Z`)

### What is happening?

1. All outages are stored from the `/outages` endpoint.
2. Device information is stored from the `/site-info/norwich-pear-tree` endpoint
3. Outages are iterated over and only those on devices from the `norwich-pear-tree` are kept.
4. The remaining outages have any that began before `2022-01-01T00:00:00.000Z` filtered out.
5. Once the relevant data has been collected it is then posted to the `/site-outages/norwich-pear-tree` endpoint.
6. In the event of a 500 status code there are a maximum of 5 retries. 

## Getting Started

### Prerequisites
You have npm and node installed

### Quick Start Guide

- Clone the GitHub repo - the easiest way is to click the green Code button and selecting `Download ZIP` 
- Unzip the folder and open the command line in the root folder by typing `cmd` in the address bar (or press Alt+D) and pressing enter
- To install dependencies type the command `npm install`
- To compile the TypeScript type the command `npm run build` 
- To run the file type the command `npm start`
- To run the tests type the command `npm run test`

## Installing NPM and Node
[NPM docs](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

[Node docs](https://nodejs.org/en/#home-downloadhead)