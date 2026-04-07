# Concreate (WritePro) — Cloud Powered

Concreate is a fast content generation web application. It has been migrated from a local-only Ollama setup to a **Cloud-powered architecture using Vercel Serverless Functions and the Groq API**. This allows the application to be used by anyone on the internet with blazing-fast Llama 3 models.

## Features

- **Cloud Powered:** Uses Groq's high-speed inference for Llama 3 and Mixtral models.
- **Vercel Native:** Ready for deployment on Vercel with zero-config backend functions.
- **Blazing Fast:** Get responses in seconds, not minutes.
- **Clean UI:** A modern web interface for prompt generation.
- **Customizable Tones & Lengths:** Adjust the output's tone and length according to your needs.
- **History & Saved Prompts:** Keep track of your generated content and save your favorites using local storage.
- **Prompt Templates:** Get started quickly with built-in templates for common tasks.

## Setup & Deployment

### 1. Get a Groq API Key
1. Go to [Groq Console](https://console.groq.com/).
2. Create a free account and generate an API key.

### 2. Deploy to Vercel
1. Push your code to a GitHub/GitLab/Bitbucket repository.
2. Import the project into [Vercel](https://vercel.com/).
3. **Environment Variable:** In the Vercel project settings, add an Environment Variable:
   - **Key:** `GROQ_API_KEY`
   - **Value:** (Your API key from step 1)
4. Redeploy the project.

## Project Structure

- `index.html`: The main frontend interface.
- `api/models.js`: Serverless function to list available Groq models.
- `api/generate.js`: Serverless function to securely handle AI generation requests.

## Development

Since this uses Vercel Functions, you can test locally using the Vercel CLI:
```bash
npm install -g vercel
vercel dev
```
Wait for the local server to start, then open the provided URL.
