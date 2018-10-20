// Event on message received from the parent Worker
onmessage = function(e) {
  const equation     = e.data[0];
  const test_values  = e.data[1];
  const max          = e.data[2];
  const start        = e.data[3];
  const stop         = e.data[4];


  // return nothing if no equation or no test values
  if(false === equation || test_values.length == 0) {
    // return the result ans close the worker
    postMessage([]);
    close();
    return;
  }


  /*
  index of all possible values
  0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 ==> n = test_values.length^equation.rn

  indexes of R(i) = test_values[i]
  0  1  2  3  0  1  2  3  0  1  2  3  0  1  2  3  0  1  2  3  ==> i0 = n % test_values.length
  0  0  0  0  1  1  1  1  2  2  2  2  3  3  3  3  0  0  0  0  ==> i1 = Math.floor(n/Math.pow(test_values.length,1)) % test_values.length
  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  1  1  1  1  ==> i2 = Math.floor(n/Math.pow(test_values.length,2)) % test_values.length
  ...
  */

  // init
  let all_result = [];
  let indexes    = new Array(equation.rn);
  let rvals      = new Array(equation.rn);

  // for all values to evaluate
  for(let n=start; n<=stop; n++) {
    // compute indexes
    indexes[0] = n % test_values.length;
    indexes[1] = Math.floor(n/test_values.length) % test_values.length;
    for(let i=2; i<indexes.length; i++) {
      indexes[i] = Math.floor(n/Math.pow(test_values.length,i)) % test_values.length;
    }

    // construct the equation
    let equ = equation.calcStr;
    for(let i=0; i<equation.rn; i++) {
      rvals[i] = test_values[indexes[i]];
      equ = equ.replace('R'+(i+1), rvals[i]);
    }

    // eval the equation and check the result
    let val = eval(equ);
    if(isNaN(val) || Infinity == val) continue;

    // puth the final result
    all_result.push({
      rvals: rvals.slice(0),
      val  : val,
      sort : Math.abs(val - equation.result)
    });
  }

  // sort the table, nearest value first
  all_result.sort(function(a, b) {
    return a.sort - b.sort;
  });

  // return the result ans close the worker
  postMessage(all_result.slice(0,max-1));
  close();
};
