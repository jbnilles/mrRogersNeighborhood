function createList (number) {
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



$(document).ready(function () {

  $('#listForm').submit(function () {
    event.preventDefault();
    let userInput = parseInt($('#listInput').val());
    let result = createList(userInput);
    $('#resultList').prepend('<li>' + userInput + ': <ul><li>' + result.join(', ') + '</li></ul></li>');
    $('#resultCard').show();
  });
  $('#reverseButton').click(function () {
    event.preventDefault();
    let userInput = parseInt($('#listInput').val());
    let result = createList(userInput);
    $('#resultList').prepend('<li>' + userInput + ': <ul><li>' + result.reverse().join(', ') + '</li></ul></li>');
    $('#resultCard').show();
  });

});