// Fail CI if editorial draft modules are exposed through production registry imports.
import fs from 'node:fs';
const registry=fs.readFileSync(new URL('../assets/data/full-profiles.js',import.meta.url),'utf8');
if(/(?:from\s*['"]|import\s*\(\s*['"])[^'"]*\/drafts\//.test(registry)){
 console.error('FAIL: The production registry must never import /drafts/ modules.');
 process.exitCode=1;
}else console.log('PASS: no draft modules in production profile registry.');
