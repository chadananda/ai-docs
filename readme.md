# 🚀 `ai_docs`: Elevate Your AI's Understanding of Modern Web Libraries!

Hello, innovator! 🌟 Dive into the next generation of AI-assisted development with `ai_docs`.

**The Challenge**:
Many LLMs, like GPT-4, are trained up to a specific cut-off, often missing the latest library updates. This can lead to outdated or incorrect code suggestions.

**Our Solution**:
Introducing `ai_docs`! This tool automatically transforms library documentation from your `package.json` into machine-readable formats. With this, your AI models can access the latest library documentation, ensuring more accurate and up-to-date code suggestions.

## 🌟 Features:
- 🔄 Automatic Version Checking: Always keep your AI informed about the latest library versions.
- 📑 Local Documentation Extraction: Process and extract local npm module documentation right from your project.
- 🤖 GPT-4 Integration: Turn raw documentation into AI-digestible summaries and detailed indices.
- 📁 Organized Storage in `_ai-docs`: All your AI-friendly docs, neatly stored!

## 🚀 Getting Started:

1. **Install `ai_docs`**:
    npm install ai_docs --save-dev

2. **Add to your `package.json` scripts**:
    "scripts": {
        "generate-docs": "ai_docs"
    }

3. **Run**:
    npm run generate-docs

## 🤖 Automate `ai_docs` Generation with `postinstall`

Keep your `_ai-docs` updated every time you add or update a package. Automate `ai_docs` to run post every `npm install`.

### 📝 How to Set Up:

1. **Modify `package.json` scripts**: Add the `postinstall` script to run `ai_docs`:
    "scripts": {
        "generate-docs": "ai_docs",
        "postinstall": "ai_docs"
    }

Note: If you're using a different package manager like yarn, please refer to their documentation for postinstall or equivalent hooks.

## 📂 Directory Breakdown:
- `src`: Core functionalities.
- `_ai-docs`: The destination for your transformed docs!

## 💖 Support and Contribution:
Love `ai_docs`? Star our repository! ⭐️ Have feedback or suggestions? Let us know!

## 🎉 Acknowledgements:
Big thanks to our community, contributors, and a shoutout to OpenAI for GPT-4!

## License:
MIT License. Spread the love! 🌍❤️
