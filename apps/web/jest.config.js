const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const esmodules = ['remark', 'unified'].join('|')

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  }
}

module.exports = async (...args) => {
  const fn = createJestConfig(customJestConfig)
  const res = await fn(...args)

  res.transformIgnorePatterns = res.transformIgnorePatterns.map(pattern => {
    if (pattern === '/node_modules/') {
      return `/node_modules(/?!${esmodules}/)`
    }
    return pattern
  })

  return res
}