function eZero(num, size) {
  var s = num + '';
  while (s.length < size) s = '0' + s;
  return s;
}

function truncText(text, size) {
  if (text.length > size) {
    var s = text.substring(0, size);
    s += '...';
    return s;
  } else {
    return text;
  }
}

export { eZero, truncText };
