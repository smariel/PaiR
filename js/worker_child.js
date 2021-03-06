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
  index of all equations to evaluate
  0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 ==> n = test_values.length^equation.rnames.length

  in each equation to evaluate,
  indexes of R(i) = test_values[i]
  0  1  2  3  0  1  2  3  0  1  2  3  0  1  2  3  0  1  2  3  ==> i0 = n % test_values.length
  0  0  0  0  1  1  1  1  2  2  2  2  3  3  3  3  0  0  0  0  ==> i1 = Math.floor(n/Math.pow(test_values.length,1)) % test_values.length
  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  1  1  1  1  ==> i2 = Math.floor(n/Math.pow(test_values.length,2)) % test_values.length
  ...
  */

  // init
  let all_result    = [];
  let indexes       = new Array(equation.rnames.length);
  let rvals         = new Array(equation.rnames.length);
  let progress      = 0;
  let progress_q    = 100/(stop - start);
  let progress_step = 1;

  // for all values to evaluate
  for(let n=start; n<=stop; n++) {
    // return 10 progress steps to the parent worker
    progress += progress_q;
    if(progress > progress_step*10) {
      postMessage({
        message:  'progress',
        progress:  progress_step
      });
      progress_step++;
    }

    // compute indexes
    indexes[0] = n % test_values.length;
    indexes[1] = Math.floor(n/test_values.length) % test_values.length;
    for(let i=2; i<indexes.length; i++) {
      indexes[i] = Math.floor(n/Math.pow(test_values.length,i)) % test_values.length;
    }

    // construct the equation
    let equ = equation.calcStr;
    for(let i=0; i<equation.rnames.length; i++) {
      rvals[i] = test_values[indexes[i]];
      equ = equ.replace(new RegExp(`${equation.rnames[i]}`,'g'), rvals[i]);
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
  postMessage({
    message: 'result',
    result:   all_result.slice(0,max-1)
  });
  close();
};
