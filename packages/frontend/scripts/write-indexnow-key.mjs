import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = path.resolve(__dirname, '../public')

const KEY = process.env.INDEXNOW_KEY

function isValid(key) {
  return /^[a-zA-Z0-9-]{8,128}$/.test(key)
}

if (!KEY) {
  console.log('IndexNow: INDEXNOW_KEY 미설정 → 키 파일 생성 스킵')
  process.exit(0)
}

if (!isValid(KEY)) {
  console.warn('IndexNow: INDEXNOW_KEY 형식 오류 (8~128자 영숫자/하이픈) → 스킵')
  process.exit(0)
}

fs.mkdirSync(PUBLIC_DIR, { recursive: true })
const target = path.join(PUBLIC_DIR, `${KEY}.txt`)
fs.writeFileSync(target, KEY, 'utf-8')
console.log(`✓ IndexNow key → ${target}`)
