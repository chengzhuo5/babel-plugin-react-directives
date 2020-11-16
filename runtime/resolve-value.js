function resolveValue(args) {
  if (args[0] && args[0].nativeEvent && args[0].nativeEvent.text) {
    return args[0].nativeEvent.text
  }
  var target = args[0] && args[0].target;
  if(target && target.nodeType === 1) {
    return target.value;
  }
  return args[0];
}

module.exports = resolveValue;
