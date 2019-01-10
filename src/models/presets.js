import path from 'path';
const fs = window.cep.fs || null;
if (!fs) {
  throw new Error('Cannot find window.cep,fs');
}

export default class Preset {
  constructor(params) {
    this._fullPath = params.fullPath || '';
  }

  static getPresets(basePath) {
    const r =  new RegExp(/.*\.epr$/);
    const files = fs.readdir(basePath).data;
    console.log(files);
    return files.filter(f => r.test(f) === true).map(f => new Preset({ fullPath: path.join(basePath, f) }));
  }

  get fullPath() { return this._fullPath; }

  set fullPath(value) { this._fullPath = value; }

  get name() { return path.basename(this._fullPath); }
}