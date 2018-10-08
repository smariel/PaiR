// copy of the process() function in main-script.js
// calculate the equation with every combination of the given values
var process = function(equation, test_values) {
  if(false === equation || test_values.length == 0) {
    return [];
  }

  // prepare the equation that will be evaluated with every combination of test values
  // return an object containing R1, R2, the computed value and a "sort" values
  // the "sort" represent the proximity with the target, where 0:is the target and +inf=the farthest
  let calc_equation = function(R1, R2) {
    let val = eval(equation.calcStr.replace('R1', R1).replace('R2', R2)); // jshint ignore:line
    return {
      'R1': R1,
      'R2': R2,
      'val': val,
      'sort': Math.abs(val - equation.result)
    };
  };

  // prepare an empty object for the result list
  let all_result = [];

  // for each combination of R1 and R2
  for (let R1 of test_values) {
    for (let R2 of test_values) {
      all_result.push(calc_equation(R1, R2));
    }
  }

  // sort the table, nearest value first
  all_result.sort(function(a, b) {
    return a.sort - b.sort;
  });

  return all_result;
};

// Event on message received from the parent Worker
onmessage = function(e) {
  // return the result
  postMessage(process(e.data[0], e.data[1]));

  // End the Worker
  close();
};
