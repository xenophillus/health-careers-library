import test from 'node:test';
import assert from 'node:assert/strict';
import { parseCSV, convertRows, markdownToHtml } from './import-profile.mjs';
import { PROFILE_SECTION_NAMES } from '../assets/data/profile-standard.js';
const sample=[['Working Profile ID','Section Number','Section Title','Content (HTML or Markdown)'],...PROFILE_SECTION_NAMES.map((name,i)=>['test',String(i+1),name,i===13?'1. [BLS](https://www.bls.gov/)':'Career **detail**.'])];
test('CSV supports comma, quoted text and multiline cells',()=>assert.deepEqual(parseCSV('x,y\n"a, ""b""\nc",z\n'),[['x','y'],['a, "b"\nc','z']]));
test('valid profile yields fourteen sections',()=>assert.equal(convertRows(sample,'test','example').length,14));
test('missing tab fails',()=>assert.throws(()=>convertRows(sample.slice(0,-1),'test','example'),/Expected 14/));
test('renamed tab fails',()=>{const copy=sample.map(x=>[...x]);copy[2][2]='Wrong';assert.throws(()=>convertRows(copy,'test','example'),/Incorrect section/);});
test('safe basic Markdown',()=>{assert.match(markdownToHtml('<script>'),/&lt;script&gt;/);assert.match(markdownToHtml('[Source](https://www.bls.gov/)'),/href="https:\/\/www.bls.gov\//);});

test('bare bibliography URLs are clickable',()=>{const html=markdownToHtml('1. U.S. agency. https://www.bls.gov/ooh/healthcare/');assert.match(html,/<a href="https:\/\/www.bls.gov\/ooh\/healthcare\/"(?:\s|>)/);assert.equal((html.match(/<a /g)||[]).length,1);});
test('explicit Markdown links are not double-linked',()=>{const html=markdownToHtml('[BLS](https://www.bls.gov/)');assert.equal((html.match(/<a /g)||[]).length,1);});
test('HTML is escaped in source cells',()=>assert.doesNotMatch(markdownToHtml('<img src=x onerror=alert(1)>'),/<img /));
test('empty article section fails',()=>{const copy=sample.map(x=>[...x]);copy[2][3]='';assert.throws(()=>convertRows(copy,'test','example'),/Empty section/);});
