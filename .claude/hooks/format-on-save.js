const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

async function main() {
  let input = ''
  for await (const chunk of process.stdin) input += chunk

  const data = JSON.parse(input)
  const filePath = data.tool_input?.file_path
  if (!filePath) return

  try {
    execSync(`pnpm prettier --write "${filePath}"`, { stdio: 'ignore' })
  } catch {}

  let dir = path.dirname(filePath)
  while (dir !== path.parse(dir).root) {
    const hasConfig =
      fs.existsSync(path.join(dir, 'eslint.config.js')) ||
      fs.existsSync(path.join(dir, 'eslint.config.mjs')) ||
      fs.existsSync(path.join(dir, 'eslint.config.cjs'))
    if (hasConfig) {
      try {
        execSync(`pnpm eslint --fix "${filePath}"`, { cwd: dir, stdio: 'ignore' })
      } catch {}
      break
    }
    dir = path.dirname(dir)
  }
}

main()
