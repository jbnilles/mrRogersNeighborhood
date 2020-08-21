function createList (number) {
  let result = [];
  for(let i = 0; i < number; i++) {
    if (i.toString().includes('1')) {
      result.push('Beep!');
    } else {
      result.push(i);
    }
  }
  return result;
}