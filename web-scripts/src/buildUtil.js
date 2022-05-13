const path = require('path')
const fs = require('fs')
const readPkgUp = require('read-pkg-up')

const { packageJson: pkg, path: pkgPath } = readPkgUp.sync({
  cwd: fs.realpathSync(process.cwd()),
})

const rootDir = path.dirname(pkgPath)
const resolveFrom = (...p) => path.resolve(rootDir, ...p)

const buildOut = resolveFrom('dist')

const babelConfig = ({ targets, debug = false }) => {
  const isNodeTarget = !!(targets && targets.node)

  return {
    babelrc: false,
    configFile: false,
    compact: false,
    ...(targets ? { targets } : {}),
    presets: [
      isNodeTarget
        ? [require('@babel/preset-env').default]
        : [
            require('@babel/preset-env').default,
            {
              modules: false,
              debug,
            },
          ],
      require('@babel/preset-typescript').default,
      [
        require('@babel/preset-react').default,
        {
          runtime: 'automatic',
        },
      ],
    ],
    plugins: [
      require('@babel/plugin-proposal-class-properties').default,
      require('@babel/plugin-syntax-dynamic-import').default,
      require('@babel/plugin-proposal-optional-chaining').default,
      require('@babel/plugin-proposal-nullish-coalescing-operator').default,
      [
        require('@babel/plugin-transform-runtime').default,
        {
          corejs: false,
          helpers: !isNodeTarget,
          regenerator: true,
        },
      ],
    ].filter(Boolean),
  }
}

const babelLoader = ({ targets, debug, include, exclude } = {}) => ({
  test: /\.(js|jsx|ts|tsx)$/,
  exclude,
  include,
  use: [
    {
      loader: require.resolve('babel-loader'),
      options: babelConfig({ targets, debug }),
    },
  ],
})

module.exports = {
  babelLoader,
  pkg,
  buildOut,
  resolveFrom,
}
