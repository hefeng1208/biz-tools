module.exports = (statement, targetFnName, varToValue) => {
  const result = {};
  if (statement.type === 'ReturnStatement' && statement.argument.type === 'CallExpression') {
    const { callee, arguments } = statement.argument;
    if (callee.name === targetFnName) {
      if (arguments[0].type === 'BinaryExpression') {
        const { left, right } = arguments[0];
        const moduleName = varToValue[left.name]?.replace(/\//g, '');
        if (!result[moduleName]) {
          result[moduleName] = [];
        }
        if (right.type === 'StringLiteral') {
          result[moduleName].push(right.value);
        } else if (right.type === 'TemplateLiteral') {
          const rightValue = right.quasis[0].value.raw;
          result[moduleName].push(rightValue);
        }
      } else if (arguments[0].type === 'TemplateLiteral') {
        const leftName = arguments[0]?.expressions?.[0]?.name
        const quasis = arguments[0].quasis
        const rightValues = quasis.map(quasy => quasy.value.raw).filter(Boolean)
        const moduleName = varToValue[leftName]?.replace(/\//g, '');
        if (!result[moduleName]) {
          result[moduleName] = [];
        }
        result[moduleName].push(...rightValues);
      }
    }
  }
  return result
}
