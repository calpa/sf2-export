<div align="center">
  <h1>SF2 Sample Extractor</h1>
  <p>🎵 Extract samples from SoundFont 2 (SF2) files and save them as WAV files!</p>
  <p>
    <a href="https://www.npmjs.com/package/@logue/sf2synth"><img src="https://img.shields.io/npm/v/@logue/sf2synth?color=orange&label=sf2synth" alt="npm"></a>
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
    <a href="https://github.com/calpaliu/sf2-export/pulls"><img src="https://img.shields.io/github/issues-pr/calpaliu/sf2-export?color=green" alt="Pull Requests"></a>
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
$ git clone https://github.com/calpaliu/sf2-export.git
$ cd sf2-export

# Install dependencies
$ npm install
```

### Usage
1. Place your `.sf2` file in the `src` directory (default: `MSXSpirit+.sf2`).
2. Run the extractor:
   ```bash
   node extract_sf2_samples.ts
   ```
3. Extracted `.wav` files will appear in the `output` directory (created automatically if needed).

#### 🔧 Customization
- To use a different SF2 file, edit the path in `extract_sf2_samples.ts`:
  ```js
  const buf = await fs.readFile('./src/YourSoundFont.sf2');
  ```
- You may also change the output directory as needed.

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
Contributions are welcome! Please open an [issue](https://github.com/calpaliu/sf2-export/issues) to discuss major changes, or submit a pull request.

## 🧑‍💻 Author
[Calpa Liu](https://github.com/calpaliu)

## 📄 License
This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ for music creators and developers!</p>
