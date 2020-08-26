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
let RULES = new RulesList;

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

RulesList.prototype.resetRules = function() {
  this.rules = [];
}
 RulesList.prototype.addRule = function (replace, replaceWith, value) {
  this.rules.push(new Rule(replace, replaceWith, value));
}
RulesList.prototype.getAmountOfRules = function () {
  return this.rules.length;
}
 RulesList.prototype.increaseRuleOrder = function(index) {
  if(this.rules.length > 1) {
    if(index > 0 ) {
      this.rules[index].value--;
      this.rules[index - 1].value++;
    }
 
  }
}
RulesList.prototype.decreaseRuleOrder = function(index) {
  if(this.rules.length > 1) {
    if(index < rules.length - 1 ) {
      this.rules[index].value++;
      this.rules[index + 1].value--;
    }
  }
}
RulesList.prototype.sortRulesByImportance = function() {
  this.rules.sort(function (a,b) {
    return a.value - b.value;
  });
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

function makeCustomList(number) {
  let result = [];
  for(let i = 0; i <= Math.abs(number); i++) {
    RULES.rules.forEach(element => {
      if (i.toString().includes(element.replace)) {
        result.push(replaceWith);
      } 
    });
  }
  return result;
}
function writeRulesToList(dom) {
  dom.html('');
  RULES.rules.forEach(element => {
    dom.append('<li>Replace ' + element.toReplace + ' with ' + element.toReplaceWith + '</li>');
    
  });
}
$(document).ready(function () {
  
  RULES.createDefaultRules();
  writeRulesToList($('#rulesList'));

  $('#listForm').submit(function (event) {
    event.preventDefault();
    let userNumber = parseInt($('#listInput').val());
    let userName = $('#nameInput').val().trim();
    if(RULES.isDefaultRules) {
      let result = makeList(userNumber, userName);
      $('#resultList').prepend('<li>' + userNumber + ': <ul><li>' + result.join(', ') + '</li></ul></li>');
    } else {
      let result = makeCustomList(userNumber);
      $('#resultList').prepend('<li>' + userNumber + ': <ul><li>' + result.join(', ') + '</li></ul></li>');
    }
    
    $('#resultCard').show();
  });

  $('#reverseButton').click(function (event) {
    event.preventDefault();
    let userNumber = parseInt($('#listInput').val());
    let userName = $('#nameInput').val().trim();
    let result = makeList(userNumber, userName);
    if(result.length) {
      if(RULES.isDefaultRules) {
        let result = makeList(userNumber, userName);
        $('#resultList').prepend('<li>' + userNumber + ': <ul><li>' + result.reverse().join(', ') + '</li></ul></li>');
      } else {
        let result = makeCustomList(userNumber);
        $('#resultList').prepend('<li>' + userNumber + ': <ul><li>' + result.reverse.join(', ') + '</li></ul></li>');
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
    RULES.resetRules();
    RULES.setCustomRules();
    writeRulesToList($('#rulesList'));
    $('#ruleForm').show();
    $('#nameP').hide();
    $('#nameLabel').hide();
    $('#nameInput').hide();


    
  });
  $('#defaultButton').click(function () {
    
    $('#customButton').prop('disabled', false);
    $('#defaultButton').prop('disabled', true);
    RULES.createDefaultRules();
    RULES.setDefaultRules();
    writeRulesToList($('#rulesList'));
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
    RULES.addRule(replace, replaceWith, RULES.getAmountOfRules - 1);
    //resetRules();
    //alert(RULES);
    writeRulesToList($('#rulesList'));
  });

});