var catCodes = {
  woem: 1,
  worm: 0
}

function toOffset (fragment) {
  var preparedFragment = fragment
    .trim()
    .split('')
    .reverse()
    .join('')
    .toLowerCase()

  var punctuation = (preparedFragment[0] === '!') ? 0b10000 : 0b00000
  var tokens = preparedFragment.substr(1).split(' ')

  var multiplier = 0b1
  var sum = tokens.reduce(function (sum, current) {
    var newSum = sum + (multiplier * catCodes[current])
    multiplier *= 2
    return newSum
  }, 0)

  return sum + punctuation
}

function toCharacter (offset) {
  var code = 65 + offset
  return (code === 91) ? ' '
         : (code === 92) ? '!'
         : String.fromCharCode(code)
}

function translate (contents) {
  var regex = /((m[er]ow )*(m[er]ow)[.!])/gi
  var matches = contents.match(regex)
  return matches
    .map(toOffset)
    .map(toCharacter)
    .join('')
}

var meowBox = document.getElementById('meow-box')
var englishBox = document.getElementById('english-box')
var toEnglishButton = document.getElementById('to-english')

toEnglishButton.addEventListener('click', function () {
  englishBox.value = translate(meowBox.value)
})
