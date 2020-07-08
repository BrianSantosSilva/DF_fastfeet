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

function replaceURLAPI(text, apiURL) {
  let newVar = text.split('/files');

  let newURL = apiURL + '/files' + newVar[1];

  return newURL;
}

function ramdomName(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export { eZero, truncText, replaceURLAPI, ramdomName };
