function Rule () {
  this.toReplace;
  this.toReplaceWith;
}
function Rule (replace, replaceWith) {
  this.toReplace = replace;
  this.toReplaceWith = replaceWith;
}
function isName(name) {
  if(name === "") {
    return false;
  }
  return true;
}

function makeList(number, name) {
  let result = [];
  if(isName(name)) {
    name = ', ' + name;
  }
  for(let i = 0; i <= Math.abs(number); i++) {
    if (i.toString().includes('3')) {
      result.push("Won't you be my neighbor" + name + "?");
    } else if(i.toString().includes('2')) {
      result.push('Boop!');
    } else if (i.toString().includes('1')) {
      result.push('Beep!');
    } else {
      result.push(i);
    }
  }
  return result;
}
function makeCustomList(number, name, rules) {
  let result = [];
  if(isName(name)) {
    name = ', ' + name;
  }
  for(let i = 0; i <= Math.abs(number); i++) {
    rules.forEach(element => {
      if (i.toString().includes(element.replace)) {
        result.push(replaceWith);
      } 
    });
  }
  return result;
}

$(document).ready(function () {

  $('#listForm').submit(function () {
    event.preventDefault();
    let userNumber = parseInt($('#listInput').val());
    let userName = $('#nameInput').val().trim();
    let result = makeList(userNumber, userName);
    $('#resultList').prepend('<li>' + userNumber + ': <ul><li>' + result.join(', ') + '</li></ul></li>');
    $('#resultCard').show();
  });

  $('#reverseButton').click(function () {
    event.preventDefault();
    let userNumber = parseInt($('#listInput').val());
    let userName = $('#nameInput').val().trim();
    let result = makeList(userNumber, userName);
    if(result.length) {
      $('#resultList').prepend('<li>' + userNumber + ': <ul><li>' + result.reverse().join(', ') + '</li></ul></li>');
      $('#resultCard').show();
    }
    
  });

  $('#nameP').click(function () {
    $('#nameInput').val('');
    $('#nameLabel').toggle();
    $('#nameInput').toggle();

  });
  $('#clearButton').click(function () {
    $('#resultList').text('');
  });

});