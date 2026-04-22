# Anti-Motivator

A VS Code extension that delivers a daily anti-motivational quote at 9am — for the days when inspiration just isn't cutting it.
  
```
 😈 "Every dead body on Mt. Everest was once a highly motivated person, so… maybe calm down."
``` 

## How it works

- Every day at **9am local time**, a notification popup appears with an anti-motivational quote
- Click **New Quote** to cycle through more quotes without dismissing the daily prompt
- Click **Dismiss** (or close the popup with X) to mark today as done — you won't be bothered again until tomorrow
- The extension remembers which quotes you've already seen and avoids repeating them until you've gone through all 116
- Activates automatically when VS Code finishes loading — no setup needed after install

## Install from VSIX (local install)

1. Download the `.vsix` file
2. Open VS Code
3. Open the Command Palette: `Cmd+Shift+P` (Mac) / `Ctrl+Shift+P` (Windows/Linux)
4. Run **Extensions: Install from VSIX...**
5. Select the downloaded `.vsix` file
6. Reload VS Code when prompted

The extension will start automatically on your next VS Code launch.

## Test a quote on demand

After installing, you can trigger a quote at any time:

1. Open the Command Palette: `Cmd+Shift+P` / `Ctrl+Shift+P`
2. Run **Anti-Motivator: Show Quote Now**

## Build from source

```bash
git clone <repo-url>
cd vs-extension-01
npm install
npm run compile
```

To run in development mode, press `F5` in VS Code to launch an Extension Development Host.

To package as a `.vsix`:

```bash
npm install -g @vscode/vsce
vsce package
```

## Quote sources

The 116 quotes were sourced and curated from:

- [Bored Panda – Demotivational Quotes](https://www.boredpanda.com/demotivational-quotes/)
- [LinkedIn – 40 Amusing Demotivational Quotes](https://www.linkedin.com/pulse/40-amusing-demotivational-quotes-marks-corporate-comedian-sydney)
- [QuoteFancy – Demotivational Quotes](https://quotefancy.com/demotivational-quotes)
- [Reddit – What's your best demotivational quote?](https://www.reddit.com/r/AskReddit/comments/4c3muq/whats_your_best_demotivational_quote/)
