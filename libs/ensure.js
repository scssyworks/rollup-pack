import fs from 'fs-extra';
import { err, log } from './logs.js';

/**
 * @typedef EnsureResult
 * @type {object}
 * @property {string} filePath Output file path
 * @property {boolean} isDirectory Type of output file
 * @property {string} cwd New current working directory
 */

/**
 *
 * @param {string} path Input path
 * @param {string} [content=''] Optional file content
 * @param {string} [cwd] Optional current working directory path. Defaults to process.cwd().
 * @param {boolean} [throwErr=true] Optional flag to throw error if file path exists
 * @returns {false | EnsureResult} Returns false if file exists or in case of error. Otherwise returns a Result object
 */
export function ensure(
  path,
  content = '',
  cwd = process.cwd(),
  throwErr = true
) {
  const targetPath = `${cwd}/${path}`;
  const isScheduled = this && this.isScheduled;
  if (fs.existsSync(targetPath)) {
    if (throwErr) err(`Path: "${targetPath}" already exists!`);
    return false;
  }
  try {
    const parts = path.split(/[\\/]/);
    const file = parts.splice(parts.length - 1, 1)[0];
    const destPath = parts.join('/');
    const dest = `${cwd}${destPath ? `/${destPath}` : ''}`;
    if (!isScheduled) {
      fs.mkdirsSync(dest);
    }
    if (file) {
      const filePath = `${dest}/${file}`;
      const isFile = file.indexOf('.') > -1;
      if (!isScheduled) {
        if (isFile) {
          // We are creating a file
          fs.writeFileSync(filePath, content, {
            encoding: 'utf-8',
          });
        } else {
          // We are creating a directory
          fs.mkdirSync(filePath);
        }
        log(targetPath, 'CREATE');
      }
      return {
        filePath,
        isDirectory: !isFile,
        cwd: isFile ? dest : filePath,
      };
    }
    err(`Empty paths cannot be created!`);
    return false;
  } catch (e) {
    err(`Cannot create path: ${path}. Path or file already exists!`);
    return false;
  }
}
