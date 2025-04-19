<div align="center">
  <h1>SF2 Sample Extractor</h1>
  <p>🎵 Extract samples from SoundFont 2 (SF2) files and save them as WAV files!</p>
  <p>
    <a href="https://www.npmjs.com/package/@logue/sf2synth"><img src="https://img.shields.io/npm/v/@logue/sf2synth?color=orange&label=sf2synth" alt="npm"></a>
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
    <a href="https://github.com/calpa/sf2-export/pulls"><img src="https://img.shields.io/github/issues-pr/calpa/sf2-export?color=green" alt="Pull Requests"></a>
  </p>
</div>

---

## ✨ Features

- 🎼 Reads SoundFont 2 (SF2) files
- 🔎 Extracts all audio samples
- 🎶 Converts samples to high-quality WAV files
- 💾 Saves each sample as a separate, well-named file
- 🛠️ Customizable input file and output directory
- 🗂️ Automatically creates output directory if missing

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation
```bash
# Clone the repository
$ git clone https://github.com/calpa/sf2-export.git
$ cd sf2-export

# Install dependencies
$ yarn
```

### Usage

**Build first (TypeScript):**
```bash
yarn build
```

You can use this tool as a CLI with flexible options and a beautiful progress bar:

```bash
npx sf2-export --input ./src/my.sf2 --out ./samples --filter Mandolin
```

**Options:**
- `--input`, `-i` : Specify the SF2 file path (default: `./src/MSXSpirit+.sf2`)
- `--out`, `-o`   : Output directory for WAV files (default: `output`)
- `--filter`, `-f`: Filter samples by name (substring match)

**Features:**
- 🚀 Fast extraction with a live progress bar (cli-progress)
- 🏷️ Filter by sample name
- 🗂️ Output directory auto-created if missing

**Examples:**
```bash
# Build first (if using TypeScript source)
yarn build

# Basic usage with default paths
npx sf2-export

# Specify input SF2 and output directory
npx sf2-export --input ./src/my.sf2 --out ./samples

# Export only samples with 'Mandolin' in their name
npx sf2-export --input ./src/my.sf2 --filter Mandolin
```

#### 📦 Publish as npm CLI

To use as a global CLI after publishing:

```bash
npm publish
npx sf2-export --input ./My.sf2
```

### 🛠️ Troubleshooting
- **TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts"**
  - Make sure to run `yarn build` first, and that you are running the compiled JS in `dist/`.
- **Module not found**
  - Run `yarn install` to install all dependencies.
- **Permission denied (shebang)**
  - If you get a permission error, try `chmod +x dist/extract_sf2_samples.js`.

## 📦 Dependencies
- [`@logue/sf2synth`](https://www.npmjs.com/package/@logue/sf2synth) — SF2 parser
- [`wav-encoder`](https://www.npmjs.com/package/wav-encoder) — WAV file encoder
- [`fs/promises`](https://nodejs.org/api/fs.html#fspromises)

## 📝 FAQ
- **Q: File not found error?**
  - Make sure your SF2 file is in the `src` directory and the filename matches the code.
- **Q: Output directory missing?**
  - The script will create it automatically.
- **Q: WAV files not playing?**
  - Ensure your SF2 file is valid, or try another audio player.

## 🤝 Contributing
Contributions are welcome! Please open an [issue](https://github.com/calpa/sf2-export/issues) to discuss major changes, or submit a pull request.

## 🧑‍💻 Author
[Calpa Liu](https://github.com/calpa)

## 📄 License
This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ for music creators and developers!</p>
