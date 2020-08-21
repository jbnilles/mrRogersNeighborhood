function listWithNumber (number) {
  let result = [];
  for(let i = 0; i < number; i++) {
    if (i.toString().includes('3')) {
      result.push("Won't you be my neighbor?");
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
function isName(name) {
  if(name === "") {
    return false;
  }
  return true;
}
function listWithName (number, name) {
  let result = [];
  for(let i = 0; i < number; i++) {
    if (i.toString().includes('3')) {
      result.push("Won't you be my neighbor, " + name + "?");
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
function createList (number, name) {
  if(isName(name)) {
    return listWithName(number, name);
  } else {
    return listWithNumber(number);
  }

}




$(document).ready(function () {

  $('#listForm').submit(function () {
    event.preventDefault();
    let userNumber = parseInt($('#listInput').val());
    let userName = $('#nameInput').val();
    let result = createList(userNumber, userName);
    $('#resultList').prepend('<li>' + userNumber + ': <ul><li>' + result.join(', ') + '</li></ul></li>');
    $('#resultCard').show();
    //alert($('#nameInput').val());
  });
  $('#reverseButton').click(function () {
    event.preventDefault();
    let userNumber = parseInt($('#listInput').val());
    let userName = $('#nameInput').val();
    let result = createList(userNumber, userName);
    $('#resultList').prepend('<li>' + userNumber + ': <ul><li>' + result.reverse().join(', ') + '</li></ul></li>');
    $('#resultCard').show();
  });
  $('#nameP').click(function () {
    $('#nameInput').val('');
    $('#nameLabel').fadeToggle();
    $('#nameInput').fadeToggle();

  });
  $('#clearButton').click(function () {
    $('#resultList').text('');
  });


});