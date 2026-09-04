// Lists every [[placeholder]] still left in the content file.
// Comment lines are skipped — the header block uses [[...]] to explain the
// convention, and those examples aren't real TODOs.
import { readFileSync } from 'node:fs'

const file = 'src/data/portfolio.ts'
const lines = readFileSync(file, 'utf8').split('\n')

const isComment = (line) => /^\s*(\/\/|\/\*|\*)/.test(line)

let count = 0
for (const [i, line] of lines.entries()) {
  if (isComment(line)) continue
  for (const match of line.matchAll(/\[\[(.+?)\]\]/g)) {
    count += 1
    console.log(`${file}:${i + 1}  ${match[1]}`)
  }
}

console.log(`\n${count} placeholder${count === 1 ? '' : 's'} remaining.`)
