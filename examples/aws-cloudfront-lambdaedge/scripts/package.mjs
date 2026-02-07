#!/usr/bin/env node
/**
 * Packaging script — creates lambda-edge.zip from build artifacts.
 *
 * Pure Node.js, no shell dependencies. Works on macOS, Linux, and Windows.
 * The zip contains handler.js at the root level so the Lambda handler
 * string is simply "handler.handler".
 *
 * Usage:
 *   node scripts/package.mjs              # build + zip
 *   node scripts/package.mjs --skip-build # zip only (assumes dist/ exists)
 */
import { execSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
const DIST = join(ROOT, 'dist')
const OUT_ZIP = join(ROOT, 'lambda-edge.zip')
const SKIP_BUILD = process.argv.includes('--skip-build')

// ── Step 1: Build ──────────────────────────────────────────────────────────
if (!SKIP_BUILD) {
  console.log('→ Building…')
  execSync('node esbuild.config.mjs', { cwd: ROOT, stdio: 'inherit' })
}

if (!existsSync(join(DIST, 'handler.js'))) {
  console.error('ERROR: dist/handler.js not found. Did the build succeed?')
  process.exit(1)
}

// ── Step 2: Create zip ─────────────────────────────────────────────────────
console.log('→ Packaging…')

class MiniZip {
  constructor() {
    this.entries = []
    this.offset = 0
  }

  addFile(name, data) {
    this.entries.push({ name: Buffer.from(name), data, offset: this.offset })
    this.offset += 30 + Buffer.from(name).length + data.length
  }

  toBuffer() {
    const parts = []

    for (const { name, data } of this.entries) {
      const header = Buffer.alloc(30)
      header.writeUInt32LE(0x04034b50, 0)
      header.writeUInt16LE(20, 4)
      header.writeUInt16LE(0, 6)
      header.writeUInt16LE(0, 8)
      header.writeUInt16LE(0, 10)
      header.writeUInt16LE(0, 12)
      header.writeUInt32LE(crc32(data), 14)
      header.writeUInt32LE(data.length, 18)
      header.writeUInt32LE(data.length, 22)
      header.writeUInt16LE(name.length, 26)
      header.writeUInt16LE(0, 28)
      parts.push(header, name, data)
    }

    const centralOffset = this.offset
    let centralSize = 0

    for (const { name, data, offset } of this.entries) {
      const cd = Buffer.alloc(46)
      cd.writeUInt32LE(0x02014b50, 0)
      cd.writeUInt16LE(20, 4)
      cd.writeUInt16LE(20, 6)
      cd.writeUInt16LE(0, 8)
      cd.writeUInt16LE(0, 10)
      cd.writeUInt16LE(0, 12)
      cd.writeUInt16LE(0, 14)
      cd.writeUInt32LE(crc32(data), 16)
      cd.writeUInt32LE(data.length, 20)
      cd.writeUInt32LE(data.length, 24)
      cd.writeUInt16LE(name.length, 28)
      cd.writeUInt16LE(0, 30)
      cd.writeUInt16LE(0, 32)
      cd.writeUInt16LE(0, 34)
      cd.writeUInt16LE(0, 36)
      cd.writeUInt32LE(0, 38)
      cd.writeUInt32LE(offset, 42)
      parts.push(cd, name)
      centralSize += 46 + name.length
    }

    const eocd = Buffer.alloc(22)
    eocd.writeUInt32LE(0x06054b50, 0)
    eocd.writeUInt16LE(0, 4)
    eocd.writeUInt16LE(0, 6)
    eocd.writeUInt16LE(this.entries.length, 8)
    eocd.writeUInt16LE(this.entries.length, 10)
    eocd.writeUInt32LE(centralSize, 12)
    eocd.writeUInt32LE(centralOffset, 16)
    eocd.writeUInt16LE(0, 20)
    parts.push(eocd)

    return Buffer.concat(parts)
  }
}

function crc32(buf) {
  let crc = 0xffffffff
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i]
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0)
    }
  }
  return (crc ^ 0xffffffff) >>> 0
}

const zip = new MiniZip()
zip.addFile('handler.js', readFileSync(join(DIST, 'handler.js')))

const mapFile = join(DIST, 'handler.js.map')
if (existsSync(mapFile)) {
  zip.addFile('handler.js.map', readFileSync(mapFile))
}

const buf = zip.toBuffer()
writeFileSync(OUT_ZIP, buf)

const sizeKB = (buf.length / 1024).toFixed(1)
console.log(`✓ ${OUT_ZIP}  (${sizeKB} KB)`)
