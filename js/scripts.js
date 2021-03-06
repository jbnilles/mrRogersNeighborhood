

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

function RulesList () {
  this.rules = [];
  this.isDefaultRules;
}

RulesList.prototype.createDefaultRules = function () {
  this.resetRules();
  this.rules.push(new Rule('1','Beep!',0));
  this.rules.push(new Rule('2','Boop!',1));
  this.rules.push(new Rule('3',"Won't you be my neighbor?",2));
  this.setDefaultRules();
}

RulesList.prototype.setDefaultRules = function () {
  this.isDefaultRules = true;
}

RulesList.prototype.setCustomRules = function () {
  this.isDefaultRules = false;
}

RulesList.prototype.resetRules = function () {
  this.rules = [];
}

 RulesList.prototype.addRule = function (replace, replaceWith, value) {
  this.rules.push(new Rule(replace, replaceWith, value));
}

RulesList.prototype.getAmountOfRules = function () {
  return this.rules.length;
}

 RulesList.prototype.increaseRuleOrder = function (index) {
  if(this.rules.length > 1) {
    if(index > 0 ) {
      this.rules[index].value--;
      this.rules[index - 1].value++;
    }
  }
}

RulesList.prototype.decreaseRuleOrder = function (index) {
  if(this.rules.length > 1) {
    if(index < rules.length - 1 ) {
      this.rules[index].value++;
      this.rules[index + 1].value--;
    }
  }
}

RulesList.prototype.sortRulesByImportance = function () {
  this.rules.sort(function (a,b) {
    return a.value - b.value;
  });
}

function isName (name) {
  if(name === "") {
    return false;
  }
  return true;
}

function makeList (number, name) {
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

function makeCustomList (number, RULES) {
  let result = [];
  for(let i = 0; i <= Math.abs(number); i++) {
    for (let j = 0; j < RULES.rules.length; j++) {
      if (i.toString().includes(RULES.rules[j].toReplace)) {
        result.push(RULES.rules[j].toReplaceWith);
        break;
      } 
    }
    if(result.length <= i) {
      result.push(i);
    }
  }
  return result;
}
function writeRulesToList (dom, RULES) {
  dom.html('');
  RULES.rules.forEach(element => {
    dom.append('<li>Replace ' + element.toReplace + ' with ' + element.toReplaceWith + '</li>');
  });
}
$(document).ready(function () {
  let rules = new RulesList();
  rules.createDefaultRules();
  writeRulesToList($('#rulesList'), rules);

  $('#listForm').submit(function (event) {
    event.preventDefault();
    let userNumber = parseInt($('#listInput').val());
    let userName = $('#nameInput').val().trim();
    if(rules.isDefaultRules) {
      let result = makeList(userNumber, userName);
      $('#resultList').prepend('<li>' + userNumber + ': <ul><li>' + result.join(', ') + '</li></ul></li>');
    } else {
      let result = makeCustomList(userNumber, rules);
      $('#resultList').prepend('<li>' + userNumber + ': <ul><li>' + result.join(', ') + '</li></ul></li>');
    }
    $('#resultCard').show();
  });

  $('#reverseButton').click(function (event) {
    event.preventDefault();
    let userNumber = parseInt($('#listInput').val());
    let userName = $('#nameInput').val().trim();
    if(userNumber) {
      if(rules.isDefaultRules) {
        let result = makeList(userNumber, userName);
        $('#resultList').prepend('<li>' + userNumber + ': <ul><li>' + result.reverse().join(', ') + '</li></ul></li>');
      } else {
        let result = makeCustomList(userNumber,rules);
        $('#resultList').prepend('<li>' + userNumber + ': <ul><li>' + result.reverse().join(', ') + '</li></ul></li>');
      }
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
    $('#customButton').prop('disabled', true);
    $('#defaultButton').prop('disabled', false);
    rules.resetRules();
    rules.setCustomRules();
    writeRulesToList($('#rulesList'),rules);
    $('#ruleForm').show();
    $('#nameP').hide();
    $('#nameLabel').hide();
    $('#nameInput').hide();
  });

  $('#defaultButton').click(function () {
    $('#customButton').prop('disabled', false);
    $('#defaultButton').prop('disabled', true);
    rules.createDefaultRules();
    rules.setDefaultRules();
    writeRulesToList($('#rulesList'),rules);
    $('#ruleForm').hide();
    $('#nameP').prop('disabled', false);
    $('#nameP').show();
  });

  $('#ruleForm').submit(function (event) {
    event.preventDefault();
    let replace = $('#replaceInput').val();
    $('#replaceInput').val('');
    let replaceWith = $('#replaceWithInput').val();
    $('#replaceWithInput').val('');
    rules.addRule(replace, replaceWith, rules.getAmountOfRules - 1);
    writeRulesToList($('#rulesList'),rules);
  });
  
  $('#clearRulesButton').click(function () {
    rules.resetRules();
    writeRulesToList($('#rulesList'), rules);
  });
});