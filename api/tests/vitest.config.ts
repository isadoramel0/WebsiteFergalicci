import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
        reportsDirectory: 'tests/coverage',
        provider: 'v8',
        include: ["controllers/usuario.controller.js", "util/token.js"],
        exclude: [...configDefaults.exclude, "sandbox/", "util/fileDeleter.js", "util/fileHandler.js"]
    },
  },
})