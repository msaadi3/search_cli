#!/usr/bin/env node

import inquirer from 'inquirer';
import axios from 'axios';
import open from 'open';
import { execa } from 'execa';

const searchEngines = {
  Google: 'https://www.google.com/search?q=',
  Bing: 'https://www.bing.com/search?q=',
  DuckDuckGo: 'https://duckduckgo.com/?q=',
};

const browsers = ['google-chrome', 'firefox', 'microsoft-edge', 'safari'];
let availableBrowsers = [];

async function detectInstalledBrowsers() {
  for (const browser of browsers) {
    try {
      await execa(browser, ['--version']);
      availableBrowsers.push(browser);
    } catch (error) {
      // Skip browsers that are not installed
    }
  }
}

async function getUserInput() {
  const { engine } = await inquirer.prompt([
    {
      type: 'list',
      name: 'engine',
      message: 'Select a search engine:',
      choices: Object.keys(searchEngines),
    },
  ]);

  const { query } = await inquirer.prompt([
    {
      type: 'input',
      name: 'query',
      message: 'Enter your search query:',
    },
  ]);

  return { engine, query };
}

async function fetchResults(engine, query) {
  const url = `${searchEngines[engine]}${encodeURIComponent(query)}`;
  console.log(`Fetching results from ${engine}...`);
  try {
    const response = await axios.get(url);
    return { html: response.data, url }; // return both HTML and URL for potential display or opening
  } catch (error) {
    console.error('Error fetching results:', error.message);
    return null;
  }
}

async function displayResults(results) {
  console.log('Displaying results...');

  // As a placeholder, offering user options to open search or exit
  const options = [
    { name: 'Open Search in Browser', url: results.url },
    { name: 'Exit', url: null },
  ];

  const { selected } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selected',
      message: 'Select a result to open in the browser:',
      choices: options.map((option, idx) => `${idx + 1}. ${option.name}`),
    },
  ]);

  const index = parseInt(selected.split('.')[0]) - 1;
  if (options[index].url) {
    await openInBrowser(options[index].url);
  } else {
    console.log('Exiting...');
  }
}

async function openInBrowser(url) {
  if (availableBrowsers.length === 1) {
    await open(url, { app: availableBrowsers[0] });
  } else if (availableBrowsers.length > 1) {
    const { browserChoice } = await inquirer.prompt([
      {
        type: 'list',
        name: 'browserChoice',
        message: 'Select a browser to open the link:',
        choices: availableBrowsers,
      },
    ]);
    await open(url, { app: browserChoice });
  } else {
    await open(url); // Open with default system browser
  }
}

async function run() {
  await detectInstalledBrowsers();
  const { engine, query } = await getUserInput();

  const results = await fetchResults(engine, query);
  if (results) {
    await displayResults(results);
  } else {
    console.log('No results found.');
  }
}

run();
