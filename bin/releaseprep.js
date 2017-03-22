#!/usr/bin/env node
const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');
const semver = require('semver');

const level = process.argv.slice(2)[0];
const version = semver.inc(pkg.version, level);

function exec(command, extraEnv) {
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv),
  });
}

function bumpManifest() {
  const manifestPath = path.join(__dirname, '../', 'npmjs-search-autofocus', 'manifest.json');


  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  manifest.version = version;

  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, '  ')}\n`, 'utf8');
}

exec('git checkout develop');
bumpManifest();
exec('yarn bundle');
exec('git add -A');
exec(`git commit -m "chore(bundle): ${version}"`);
