function Rule () {
  this.toReplace;
  this.toReplaceWith;
  this.value;
}
function Rule (replace, replaceWith, value) {
  this.toReplace = replace;
  this.toReplaceWith = replaceWith;
  this.value = value;
}
let RULES = [];


function createDefaultRules () {
  RULES = [];
  RULES.push(new Rule('1','Beep!',0));
  RULES.push(new Rule('2','Boop!',1));
  RULES.push(new Rule('3',"Won't you be my neighbor?",2));
}
function writeRulesToList(dom) {
  dom.html('');
  RULES.forEach(element => {
    dom.append('<li>Replace" ' + element.toReplace + ' with ' + element.toReplaceWith + '</li>');
    
  });
}
function resetRules() {
  RULES = [];
}
function addRule(replace, replaceWith, value) {
  RULES.push(new Rule(replace, replaceWith, value));
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
function increaseRuleOrder(rules, index) {
  if(rules.length > 1) {
    if(index > 0 ) {
      rules[index].value--;
      rules[index - 1].value++;
    }
 
  }
}
function decreaseRuleOrder(rules, index) {
  if(rules.length > 1) {
    if(index < rules.length - 1 ) {
      rules[index].value++;
      rules[index + 1].value--;
    }
  }
}
function sortRulesByImportance(rules) {
  rules.sort(function (a,b) {
    return a.value - b.value;
  });
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
  createDefaultRules();
  writeRulesToList($('#rulesList'));
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
  $('#customButton').click(function () {
    event.preventDefault();
    $('#customButton').prop('disabled', true);
    $('#defaultButton').prop('disabled', false);
    resetRules();
    writeRulesToList($('#rulesList'));
    
  });
  $('#defaultButton').click(function () {
    event.preventDefault();
    $('#customButton').prop('disabled', false);
    $('#defaultButton').prop('disabled', true);
    createDefaultRules();
    writeRulesToList($('#rulesList'));
    
    
  });

});