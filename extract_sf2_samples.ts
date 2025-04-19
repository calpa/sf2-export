import SF2Synth from '@logue/sf2synth';
import fs from 'fs/promises';
import wavEncoder from 'wav-encoder';
import chalk from 'chalk';
import path from 'path';
import { existsSync, mkdirSync } from 'fs';

/**
 * Processes an SF2 file, extracting and saving individual samples as WAV files.
 * @async
 * @throws {Error} If there's an issue reading the file or processing samples.
 */
async function main() {
  try {
    const sf2Path = process.argv[2] || './src/MSXSpirit+.sf2';
    console.log(chalk.cyanBright.bold(' SF2 Sample Extractor'));
    console.log(chalk.blue(`Reading SF2 file: ${sf2Path}`));

    let buf;
    try {
      buf = await fs.readFile(sf2Path);
    } catch (err) {
      console.error(chalk.redBright(` SF2 file not found: ${sf2Path}`));
      process.exit(1);
    }
    const parser = new SF2Synth.Parser(new Uint8Array(buf));
    console.log(chalk.blue('Parsing SF2 file...'));
    parser.parse();

    console.log(chalk.greenBright(`Found ${parser.sampleHeader.length} samples.`));
    for (let i = 0; i < parser.sampleHeader.length; i++) {
      await processSample(parser, i);
    }

    console.log(chalk.green.bold(' All samples processed successfully.'));
  } catch (error) {
    console.error(chalk.red('Error processing SF2 file:'), error);
  }
}

/**
 * Processes a single sample from the SF2 file.
 * @async
 * @param {SF2Synth.Parser} parser - The SF2 parser object.
 * @param {number} index - The index of the sample to process.
 */
async function processSample(parser, index) {
  const s = parser.sample[index];
  const header = parser.sampleHeader[index];

  const name = header.sampleName.trim().replace(/\s+/g, '_').replace(/\x00/g, '');
  const outputDir = 'output';
  const outputPath = path.join(outputDir, `${name}.wav`);

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir);
    console.log(chalk.yellow(` Created output directory: ${outputDir}`));
  }

  console.log(chalk.magenta(`Processing sample ${index + 1}/${parser.sampleHeader.length}: ${name}`));

  const float32 = new Float32Array(s.length).map((_, i) => s[i] / 32768);

  console.log(chalk.cyan(`Encoding WAV for ${name}...`));
  const wav = await wavEncoder.encode({
    sampleRate: header.sampleRate,
    channelData: [float32],
  });

  console.log(chalk.green(`Writing ${outputPath}...`));
  await fs.writeFile(outputPath, Buffer.from(wav));
}

main();
