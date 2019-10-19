const t = require('@babel/types');
const assert = require('assert');

/**
 * 构建成员调用表达式，第一个参数为对象，其后参数为属性
 * @param args
 * @return {expression}
 */
function buildMemberExpression(...args) {
  assert(args.length >= 2, 'at least 2 parameters are required');

  return args.reduce((prev, curr) => {
    if (!prev) {
      return curr;
    }
    return t.memberExpression(prev, curr, t.isNumericLiteral(curr));
  });
}

module.exports = {
  buildMemberExpression
};
