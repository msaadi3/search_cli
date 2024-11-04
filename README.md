# Terminal Web Search CLI

A command-line interface (CLI) that allows users to perform web searches directly from their terminal (Bash, Zsh, or PowerShell) using various search engines like Google, Bing, and DuckDuckGo. The CLI displays search results in the terminal and provides the option to open a specific result in the browser of the user's choice.

# Disclaimer

This project is not done yet and is still in development. It is a work in progress and may contain bugs or incomplete features. Use at your own risk.

## Features

- Select a search engine (Google, Bing, DuckDuckGo) for web search.
- Perform searches and display top results in the terminal.
- Option to open a result in the browser.
- Detects installed browsers and allows the user to choose which one to use.
- Opens links in an existing browser window (if available) or a new window.

## Installation

### Prerequisites

- Node.js (v12 or higher recommended)
- NPM (comes with Node.js) or Yarn

### Steps

1. Clone this repository:

   ```bash
   git clone https://github.com/msaadi3/search_cli.git
   ```

   ```bash
   cd search_cli
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Link the CLI globally (to use it from any location):

   ```bash
   npm link
   ```

   This command creates a symlink for the CLI command in your system path.

4. Add to the PATH

   ```bash
   echo "export PATH=$PATH:$(pwd)" >> ~/.bashrc
   ```

## Usage

Run the CLI in your terminal:

```
search_cli
```

Follow the prompts:

- Select a Search Engine: Choose from Google, Bing, or DuckDuckGo.
- Enter Search Query: Type in your search term and press Enter.
- View Results: The CLI will fetch and display the top results for your query.
- Open in Browser: Select a result to open in your preferred browser. If multiple browsers are installed, a prompt will let you choose which one to use.

## Contributing

Feel free to fork the repository, make improvements, and open a pull request. Contributions are welcome!

## License

This project is licensed under the MIT License.
