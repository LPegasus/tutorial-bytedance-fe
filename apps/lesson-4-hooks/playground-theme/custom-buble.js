/**
 * 本模块用来替换 react-live 内部使用的 buble 作为 transformer，
 * 但不支持 ts，所以这里用 babel 来实现 transformer。
 * 通过 webpack alias 配置，将 react-live 引用的 transformer 替换成本模块
 */

const { transform } = require('@babel/standalone');

/**
 *
 * @param {string} source
 * @returns
 */
exports.transform = function customTransform(source) {
  const { map, code } = transform(
    /**
     * source 的代码会被 return () 包装，这是 buble 解析的格式，babel 不支持
     * 所以在用 babel 解析前，先拆箱，返回的时候再装箱
     */
    source.replace(/^return \(/, '').replace(/\)$/, ''),
    {
      ast: false,
      presets: [
        'react',
        [
          'typescript',
          {
            allExtensions: true,
            isTSX: true,
          },
        ],
      ],
    },
  );
  return { code: `return (${code})`, map };
};

exports.features = [];
