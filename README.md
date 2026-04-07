# Concreate (WritePro)

Concreate is a local content generation web application powered by [Ollama](https://ollama.com/). It allows you to generate various types of content (such as Product Descriptions, Emails, Blog Posts, and more) using local LLMs. By running your models locally, you get a clean, fast UI without needing any API keys.

## Features

- **Local Execution:** Connects directly to your local Ollama instance (default `localhost:11434`).
- **Clean UI:** A modern web interface for prompt generation.
- **Multiple Models Supported:** Easily switch between `llama3.2`, `phi3`, `mistral`, `gemma2`, `deepseek-r1`, and others.
- **Customizable Tones & Lengths:** Adjust the output's tone and length according to your needs.
- **History & Saved Prompts:** Keep track of your generated content and save your favorites using local storage.
- **Prompt Templates:** Get started quickly with built-in templates for common tasks.

## Prerequisites

1. [Node.js](https://nodejs.org/) installed on your machine.
2. [Ollama](https://ollama.com/) installed and running on your machine.

## Setup & Running

1. **Start Ollama**
   Make sure Ollama is running in the background. If you don't have a model pulled yet, pull one (e.g., `llama3.2`):
   ```bash
   ollama pull llama3.2
   ollama serve
   ```

2. **Start the Concreate Server**
   Navigate to the project directory and run the Node.js server:
   ```bash
   node server.js
   ```

3. **Open the Application**
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Project Structure

- `index.html`: The main frontend interface. Includes all styles and frontend functionality.
- `server.js`: A lightweight Node.js server that serves the frontend and proxies requests to your local Ollama instance to avoid CORS issues.

## Requirements
No external dependencies are required for the Node.js server. It uses built-in modules (`http`, `https`, `fs`, `path`).
