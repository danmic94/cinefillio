function generateArrayOfYears() {
  var max = new Date().getFullYear();
  var min = max - 13;
  var years = [];

  for (var i = max; i >= min; i--) {
    years.push(i);
  }
  return years;
}

export { generateArrayOfYears };
