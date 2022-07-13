import chalk from 'chalk';

/**
 * Renders a message in red color
 * @param {string} message String message
 */
export function err(message) {
  console.error(`${chalk.bold('[ERROR]')}: ${chalk.red(chalk.bold(message))}`);
}

export function log(message, prefix = 'LOG') {
  console.error(
    `${chalk.bold(`[${prefix}]`)}: ${chalk.green(chalk.bold(message))}`
  );
}
