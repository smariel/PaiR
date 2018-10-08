// copy of the process() function in main-script.js
// calculate the equation with every combination of the given values
var process = function(equation, test_values) {
  if(false === equation || test_values.length == 0) {
    return [];
  }

  // for each combination of R1 and R2
  let all_result = [];
  for (let R1 of test_values) {
    for (let R2 of test_values) {
      // evaluate the equation
      let val = eval(equation.calcStr.replace('R1', R1).replace('R2', R2));
      // store the result
      // the "sort" represent the proximity with the target, where 0 is the target and +inf=the farthest
      all_result.push({
        'R1': R1,
        'R2': R2,
        'val': val,
        'sort': Math.abs(val - equation.result)
      });
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
