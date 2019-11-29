/**
 * 基于 babel-plugin-tester@7.0.1 修改：
 *   1. 兼容babel6
 *   2. 支持fixtures文件夹下配置error.js断言错误
 *   3. fixture文件夹名包含.skip表示跳过，包含.only表示只执行，包含.output表示强制输出output.js文件
 *
 * https://github.com/babel-utils/babel-plugin-tester/blob/v7.0.1/src/index.js
 */

/* eslint-disable import/no-dynamic-require */
const assert = require('assert');
const path = require('path');
const fs = require('fs');
const pathExists = require('path-exists');
const { EOL } = require('os');
const mergeWith = require('lodash.mergewith');
const invariant = require('invariant');
const stripIndent = require('strip-indent');
const { oneLine } = require('common-tags');

const noop = () => {
};

// thanks to node throwing an error if you try to use instanceof with an arrow
// function we have to have this function. I guess it's spec... SMH...
// NOTE: I tried doing the "proper thing" using Symbol.hasInstance
// but no matter what that did, I couldn't make that work with a SyntaxError
// because SyntaxError[Symbol.hasInstance]() returns false. What. The. Heck!?
// So I'm doing this .prototype stuff :-/
function instanceOf(inst, cls) {
  return cls.prototype !== undefined && inst instanceof cls;
}

module.exports = pluginTester;

const fullDefaultConfig = {
  babelOptions: {
    parserOpts: {},
    generatorOpts: {},
    babelrc: false,
  },
};

function mergeCustomizer(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
  return undefined;
}

function pluginTester(
  {
    /* istanbul ignore next (TODO: write a test for this) */
    babel = require('@babel/core'),
    plugin = requiredParam('plugin'),
    pluginName = getPluginName(plugin, babel),
    title: describeBlockTitle = pluginName,
    pluginOptions,
    tests,
    fixtures,
    fixtureOutputName = 'output',
    filename,
    endOfLine = 'lf',
    ...rest
  } = {}
) {
  let testNumber = 1;
  if (fixtures) {
    testFixtures({
      plugin,
      pluginName,
      pluginOptions,
      title: describeBlockTitle,
      fixtures,
      fixtureOutputName,
      filename,
      babel,
      endOfLine,
      ...rest,
    });
  }
  const testAsArray = toTestArray(tests);
  if (!testAsArray.length) {
    return;
  }
  const testerConfig = mergeWith({}, fullDefaultConfig, rest, mergeCustomizer);

  describe(describeBlockTitle, () => {
    testAsArray.forEach((testConfig) => {
      if (!testConfig) {
        return;
      }

      const {
        skip,
        only,
        title,
        code,
        babelOptions,
        output,
        snapshot,
        error,
        setup = noop,
        teardown,
        formatResult = (r) => r,
      } = mergeWith({}, testerConfig, toTestConfig(testConfig), mergeCustomizer);
      assert(
        (!skip && !only) || skip !== only,
        'Cannot enable both skip and only on a test',
      );

      if (skip) {
        it.skip(title, testerWrapper);
      } else if (only) {
        it.only(title, testerWrapper);
      } else {
        it(title, testerWrapper);
      }

      async function testerWrapper() {
        const teardowns = teardown ? [teardown] : [];
        let returnedTeardown;
        try {
          returnedTeardown = await setup();
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('There was a problem during setup');
          throw e;
        }
        if (typeof returnedTeardown === 'function') {
          teardowns.push(returnedTeardown);
        }
        try {
          tester();
        } finally {
          try {
            await Promise.all(teardowns.map((t) => t()));
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error('There was a problem during teardown');
            // eslint-disable-next-line no-unsafe-finally
            throw e;
          }
        }
      }

      // eslint-disable-next-line complexity
      function tester() {
        invariant(
          code,
          oneLine`
            A string or object with a \`code\` or
            \`fixture\` property must be provided
          `,
        );
        invariant(
          !babelOptions.babelrc || babelOptions.filename,
          'babelrc set to true, but no filename specified in babelOptions',
        );
        invariant(
          !snapshot || !output,
          '`output` cannot be provided with `snapshot: true`',
        );

        let result;
        let errored = false;

        try {
          result = formatResult(
            fixLineEndings(
              babel.transform(code, babelOptions).code,
              endOfLine,
              code,
            ),
          );
        } catch (err) {
          if (error) {
            errored = true;
            result = err;
          } else {
            throw err;
          }
        }

        const expectedToThrowButDidNot = error && !errored;
        assert(
          !expectedToThrowButDidNot,
          'Expected to throw error, but it did not.',
        );

        if (snapshot) {
          invariant(
            result !== code,
            oneLine`
              Code was unmodified but attempted to take a snapshot.
              If the code should not be modified, set \`snapshot: false\`
            `,
          );
          const separator = '\n\n      ↓ ↓ ↓ ↓ ↓ ↓\n\n';
          const formattedOutput = [code, separator, result].join('');
          expect(`\n${formattedOutput}\n`).toMatchSnapshot(title);
        } else if (error) {
          assertError(result, error);
        } else if (typeof output === 'string') {
          assert.equal(result, output, 'Output is incorrect.');
        } else {
          assert.equal(
            result.trim(),
            code.trim(),
            'Expected output to not change, but it did',
          );
        }
      }
    });
  });

  function toTestConfig(testConfig) {
    if (typeof testConfig === 'string') {
      testConfig = { code: testConfig };
    }
    const {
      title,
      fixture,
      code = getCode(filename, fixture),
      fullTitle = title || `${testNumber++}. ${pluginName}`,
      output = getCode(filename, testConfig.outputFixture) || undefined,
      pluginOptions: testOptions = pluginOptions,
    } = testConfig;
    return mergeWith(
      {
        babelOptions: { filename: getPath(filename, fixture) },
      },
      testConfig,
      {
        babelOptions: { plugins: [[plugin, testOptions]] },
        title: fullTitle,
        code: stripIndent(code).trim(),
        ...(output ? { output: stripIndent(output).trim() } : {}),
      },
      mergeCustomizer,
    );
  }
}

function removeMultipleSpaces(str) {
  return str.replace(/\s+/g, ' ').trim();
}

function fixLineEndings(code, endOfLine, input) {
  return code.replace(/\r?\n/g, getReplacement());

  function getReplacement() {
    switch (endOfLine) {
      case 'lf': {
        return '\n';
      }
      case 'crlf': {
        return '\r\n';
      }
      case 'auto': {
        return EOL;
      }
      case 'preserve': {
        const match = input.match(/\r?\n/);
        if (match === null) {
          return EOL;
        }
        return match[0];
      }
      default: {
        throw new Error('Invalid \'endOfLine\' value');
      }
    }
  }
}

const createFixtureTests = (fixturesDir, options) => {
  if (!fs.statSync(fixturesDir).isDirectory()) return;

  const rootOptionsPath = path.join(fixturesDir, 'options.json');
  let rootFixtureOptions = {};
  if (pathExists.sync(rootOptionsPath)) {
    rootFixtureOptions = require(rootOptionsPath);
  }

  fs.readdirSync(fixturesDir).forEach((caseName) => {
    const fixtureDir = path.join(fixturesDir, caseName);
    const optionsPath = path.join(fixtureDir, 'options.json');
    const errorPath = path.join(fixtureDir, 'error.js');
    const jsCodePath = path.join(fixtureDir, 'code.js');
    const tsCodePath = path.join(fixtureDir, 'code.ts');
    const jsxCodePath = path.join(fixtureDir, 'code.jsx');
    const tsxCodePath = path.join(fixtureDir, 'code.tsx');
    const blockTitle = caseName.replace(/__/g, ' > ').replace(/_/g, ' ');
    const codePath = (pathExists.sync(jsCodePath) && jsCodePath)
      || (pathExists.sync(tsCodePath) && tsCodePath)
      || (pathExists.sync(jsxCodePath) && jsxCodePath)
      || (pathExists.sync(tsxCodePath) && tsxCodePath);
    let fixturePluginOptions = {};
    if (pathExists.sync(optionsPath)) {
      fixturePluginOptions = require(optionsPath);
    }
    let error = null;
    if (pathExists.sync(errorPath)) {
      error = require(errorPath);
    }

    if (!codePath) {
      describe(blockTitle, () => {
        createFixtureTests(fixtureDir, {
          ...options,
          pluginOptions: {
            ...rootFixtureOptions,
            ...options.pluginOptions,
            ...fixturePluginOptions,
          },
        });
      });
      return;
    }

    const forceOutput = /\.output(\.|\b)/.test(caseName);
    let testFn = it;
    if (/\.only(\.|\b)/.test(caseName)) {
      testFn = it.only;
    } else if (/\.skip(\.|\b)/.test(caseName)) {
      testFn = it.skip;
    }

    const ext = `.${codePath.split('.').pop()}`;
    testFn(blockTitle, () => {
      const {
        plugin,
        pluginOptions,
        fixtureOutputName,
        babel,
        endOfLine,
        formatResult = (r) => r,
        ...rest
      } = options;

      const babelRcPath = path.join(fixtureDir, '.babelrc');

      const { babelOptions } = mergeWith(
        {},
        fullDefaultConfig,
        {
          babelOptions: {
            plugins: [
              [
                plugin,
                {
                  ...rootFixtureOptions,
                  ...pluginOptions,
                  ...fixturePluginOptions,
                },
              ],
            ],
            // if they have a babelrc, then we'll let them use that
            // otherwise, we'll just use our simple config
            babelrc: pathExists.sync(babelRcPath),
          },
        },
        rest,
        mergeCustomizer,
      );

      const input = fs.readFileSync(codePath).toString();

      let actual;
      let errored = false;

      try {
        if (babel.transformSync) { // babel 7
          actual = formatResult(
            fixLineEndings(
              babel.transformSync(input, {
                ...babelOptions,
                filename: codePath
              }).code,
              endOfLine,
              input,
            ),
          );
        } else { // babel 6
          actual = formatResult(
            fixLineEndings(
              babel.transformFileSync(codePath, babelOptions).code,
              endOfLine,
              input,
            ),
          );
        }
      } catch (e) {
        if (error) {
          assertError(e, error);
          errored = true;
          return;
        }
        throw e;
      }

      assert(
        forceOutput || !error || errored,
        'Expected to throw error, but it did not.',
      );

      const outputPath = path.join(fixtureDir, `${fixtureOutputName}${ext}`);
      if (forceOutput || !fs.existsSync(outputPath)) {
        fs.writeFileSync(outputPath, actual);
        return;
      }

      const output = fs.readFileSync(outputPath, 'utf8');

      assert.equal(
        removeMultipleSpaces(actual),
        removeMultipleSpaces(output),
        `actual output does not match ${fixtureOutputName}${ext}`,
      );
    });
  });
};

function testFixtures(
  {
    title: describeBlockTitle,
    fixtures,
    filename,
    ...rest
  }
) {
  describe(`${describeBlockTitle} fixtures`, () => {
    const fixturesDir = getPath(filename, fixtures);
    createFixtureTests(fixturesDir, rest);
  });
}

function toTestArray(tests) {
  tests = tests || []; // null/0/false are ok, so no default param
  if (Array.isArray(tests)) {
    return tests;
  }
  return Object.keys(tests).reduce((testsArray, key) => {
    let value = tests[key];
    if (typeof value === 'string') {
      value = { code: value };
    }
    testsArray.push({
      title: key,
      ...value,
    });
    return testsArray;
  }, []);
}

function getCode(filename, fixture) {
  if (!fixture) {
    return '';
  }
  return fs.readFileSync(getPath(filename, fixture), 'utf8');
}

function getPath(filename, basename) {
  if (!basename) {
    return undefined;
  }
  if (path.isAbsolute(basename)) {
    return basename;
  }
  return path.join(path.dirname(filename), basename);
}

// eslint-disable-next-line complexity
function assertError(result, error) {
  if (typeof error === 'function') {
    if (!(instanceOf(result, error) || error(result) === true)) {
      throw result;
    }
  } else if (typeof error === 'string') {
    assert(result.message.includes(error), 'Error message is incorrect');
  } else if (error instanceof RegExp) {
    assert(
      error.test(result.message),
      `Expected ${result.message} to match ${error}`,
    );
  } else {
    invariant(
      typeof error === 'boolean',
      'The given `error` must be a function, string, boolean, or RegExp',
    );
  }
}

function requiredParam(name) {
  throw new Error(`${name} is a required parameter.`);
}

function getPluginName(plugin, babel) {
  let name;
  try {
    name = plugin(babel).name;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      oneLine`
        Attempting to infer the name of your plugin failed.
        Tried to invoke the plugin which threw the error.
      `,
    );
    throw error;
  }
  invariant(name, 'The `pluginName` must be inferable or provided.');
  return name;
}
