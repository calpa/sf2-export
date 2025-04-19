#!/usr/bin/env node
import { Command } from 'commander';
import SF2Synth from '@logue/sf2synth';
import fs from 'fs/promises';
import wavEncoder from 'wav-encoder';
import chalk from 'chalk';
import path from 'path';
import { existsSync, mkdirSync } from 'fs';
import cliProgress from 'cli-progress';

const program = new Command();

program
  .name('sf2-export')
  .description('🎵 Extract samples from SoundFont 2 (SF2) files and save them as WAV files!')
  .option('-i, --input <sf2>', 'Input SF2 file path', './src/MSXSpirit+.sf2')
  .option('-o, --out <dir>', 'Output directory', 'output')
  .option('-f, --filter <name>', 'Filter samples by name (substring match)')
  .parse(process.argv);

const options = program.opts();

/**
 * Main function to process SF2 file and extract samples
 */
async function main(): Promise<void> {
  try {
    const sf2Path = options.input;
    const outputDir = options.out;
    const filter = options.filter;

    console.log(chalk.cyanBright.bold('SF2 Sample Extractor'));
    console.log(chalk.blue(`Reading SF2 file: ${sf2Path}`));

    let buf: Buffer;
    try {
      buf = await fs.readFile(sf2Path);
    } catch (err) {
      console.error(chalk.redBright(`SF2 file not found: ${sf2Path}`));
      process.exit(1);
    }
    const parser = new SF2Synth.Parser(new Uint8Array(buf));
    console.log(chalk.blue('Parsing SF2 file...'));
    parser.parse();

    let indices = [...Array(parser.sampleHeader.length).keys()];
    if (filter) {
      indices = indices.filter(i => parser.sampleHeader[i].sampleName.includes(filter));
      console.log(chalk.yellow(`Filtering samples by name: '${filter}' (${indices.length} matched)`));
    }

    console.log(chalk.greenBright(`Found ${indices.length} samples to export.`));
    const bar = new cliProgress.SingleBar({
      format: 'Extracting Samples |' + chalk.cyan('{bar}') + '| {percentage}% || {value}/{total} Samples || {sample}',
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      hideCursor: true
    });
    bar.start(indices.length, 0, { sample: '' });

    for (let idx = 0; idx < indices.length; idx++) {
      const i = indices[idx];
      const sampleName = parser.sampleHeader[i].sampleName.trim().replace(/\s+/g, '_').replace(/\x00/g, '');
      try {
        await processSample(parser, i, outputDir);
      } catch (err) {
        bar.stop();
        console.error(chalk.red(`Error processing sample ${sampleName}:`), err);
        bar.start(indices.length, idx + 1, { sample: sampleName });
      }
      bar.update(idx + 1, { sample: sampleName });
    }
    bar.stop();

    console.log(chalk.green.bold('All samples processed successfully.'));
  } catch (error) {
    console.error(chalk.red('Error processing SF2 file:'), error);
  }
}

/**
 * Process a single sample from the SF2 file
 * @param parser - The SF2 parser object
 * @param index - The index of the sample to process
 * @param outputDir - The directory to save the processed sample
 */
async function processSample(parser: SF2Synth.Parser, index: number, outputDir: string): Promise<void> {
  const s = parser.sample[index];
  const header = parser.sampleHeader[index];

  const name = header.sampleName.trim().replace(/\s+/g, '_').replace(/\x00/g, '');
  const outputPath = path.join(outputDir, `${name}.wav`);

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir);
  }

  const float32 = new Float32Array(s.length).map((_, i) => s[i] / 32768);

  const wav = await wavEncoder.encode({
    sampleRate: header.sampleRate,
    channelData: [float32],
  });

  await fs.writeFile(outputPath, Buffer.from(wav));
}

main();
