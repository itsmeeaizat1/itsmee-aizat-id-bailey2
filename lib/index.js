import chalk from 'chalk';
import gradient from 'gradient-string';
import makeWASocket from './Socket/index.js';

const rgb = {
    purple: chalk.hex('#a855f7'),
    indigo: chalk.hex('#6366f1'),
    cyan  : chalk.hex('#06b6d4'),
    amber : chalk.hex('#f59e0b'),
    green : chalk.hex('#10b981'),
};

const logoGradient = gradient(['#a855f7', '#6366f1', '#06b6d4']);

const line = rgb.indigo('═'.repeat(60));

// Logo "AIZAT" (figlet "small"), bukan gambar lama.
const logo = logoGradient.multiline([
    '    _   ___ ____   _ _____ ',
    '   /_\\ |_ _|_  /  /_\\_   _|',
    '  / _ \\ | | / /  / _ \\| |  ',
    ' /_/ \\_\\___/___|/_/ \\_\\_|  ',
].join('\n'));

// Versi dibaca dari package.json supaya selalu sama dengan versi yang terbit.
let pkgVersion = '';
try {
    const { createRequire } = await import('node:module');
    pkgVersion = createRequire(import.meta.url)('../package.json').version;
} catch { /* abaikan: banner tetap tampil tanpa versi */ }

const banner = [
    '',
    line,
    logo,
    line,
    chalk.bold(rgb.purple('  ⬡  AIZAT BAILEYS  ')) + rgb.indigo(pkgVersion ? 'v' + pkgVersion : ''),
    rgb.cyan('  ◈  By       : ') + chalk.bold.white('Aizat') + chalk.dim(' · github.com/itsmeeaizat1'),
    rgb.cyan('  ◈  GitHub   : ') + chalk.bold.cyan('github.com/itsmeeaizat1/aizat-baileys'),
    line,
    rgb.green('  ✦  Thanks for using Aizat Baileys!'),
    line,
    '',
].join('\n');

// Banner bisa dimatikan: AIZAT_BAILEYS_QUIET=1 (berguna untuk log bot/panel hosting yang bersih).
if (!process.env.AIZAT_BAILEYS_QUIET) console.log(banner);

export * from '../WAProto/index.js';
export { proto } from '../WAProto/index.js';
export * from './Utils/index.js';
export * from './Types/index.js';
export * from './Defaults/index.js';
export * from './WABinary/index.js';
export * from './WAM/index.js';
export * from './WAUSync/index.js';
export * from './Store/index.js';
export { Aizat } from './Socket/aizat.js';
export * from './Utils/rich-messages.js';
export { makeWASocket };
export default makeWASocket;
//# sourceMappingURL=index.js.map
