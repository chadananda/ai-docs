# 🚀 `ai_docs`: Your AI's Guide to the Modern Web!

Hello, innovator! 🌟 Welcome to the future of AI-assisted development!

**The Problem**:
Most LLMs, like GPT-4, have a last training cut-off, often missing out on modern library updates post that date. This can lead to outdated or incorrect code suggestions.

**The Solution**:
`ai_docs`! It auto-generates machine-readable library documentation from your `package.json`, allowing AI to reference updated documentation for better code suggestions!

## 🌟 Features:
- 🔄 Automatic Version Checking: Keep your AI updated!
- 📡 Documentation Fetching: Fetch the freshest docs!
- 🤖 GPT-4 Integration: Convert raw docs into AI-friendly versions.
- 📁 Local Storage in `_ai-docs`: Neatly organized docs!

## 🚀 Getting Started:

- Install `ai_docs`:
    `npm install ai_docs --save-dev`

- Add to your `package.json` scripts:
    `"scripts": {
        "generate-docs": "ai_docs"
    }`

- Run:
    `npm run generate-docs`

## 🤖 Automate `ai_docs` Generation with `postinstall`

Automatically keep your `_ai-docs` up-to-date every time you add or update a package in your project. Set up `ai_docs` to run after every `npm install` by using the `postinstall` script.

### 📝 How to Set Up:

1. **Modify `package.json` scripts**: Add the `postinstall` script to run `ai_docs`:
```json
"scripts": {
    "generate-docs": "ai_docs",
    "postinstall": "ai_docs"
}
```

That's it! Now, every time you run npm install, ai_docs will automatically regenerate documentation if there are changes in your package dependencies. 🎉

❗ Note: If you're using a package manager like yarn, the setup steps might vary slightly. Check their documentation for postinstall or equivalent hooks.




## 📂 Directory Breakdown:
- `src`: Core functionalities.
- `fetchers`: Doc fetching scripts.
- `parsers`: Scripts to refine docs.
- `_ai-docs`: Where the magic gets stored!

## 💖 Support and Contribution:
Love `ai_docs`? Please give us a star! ⭐️ Issues or suggestions? Let us know!

## 🎉 Acknowledgements:
Kudos to everyone supporting us, our contributors, and a big shoutout to OpenAI for GPT-4!

## License:
MIT License. Share the love! 🌍❤️
