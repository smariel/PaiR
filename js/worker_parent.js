let workers;

// Event on message received from the parent Worker
onmessage = function(e) {
  const message         = e.data[0];

  if('start' === message) {
    const testvalues      = e.data[1];
    const equation        = e.data[2];
    const max_values      = e.data[3];
    const thread_n        = e.data[4];
    const total_eval      = Math.pow(testvalues.length, equation.rnames.length);
    const eval_per_thread = Math.floor(total_eval/thread_n);
    let   all_result      = [];

    // create as much workers as available threads
    workers = new Array(thread_n);
    let ended_workers = 0;
    let progress = 0;
    for(let i=0; i<thread_n; i++) {
      let start = i*eval_per_thread;
      let stop = (i == thread_n -1) ? total_eval - 1 : start + eval_per_thread - 1;

      // Create a Worker and send all data to it
      workers[i] = new Worker('worker_child.js');
      workers[i].postMessage([equation, testvalues, max_values, start, stop]);

      // Creation of an event to catch the Worker responses
      workers[i].onmessage = function(e) {
        if('progress' == e.data.message) {
          progress += 10/thread_n;
          postMessage({
            message:  'progress',
            progress: progress
          });
        }
        else if ('result' == e.data.message) {

          // Get the values calulated in the Worker
          all_result = all_result.concat(e.data.result);

          // check if all workers has stopped
          ended_workers++;
          if(ended_workers >= workers.length) {
            // sort the table, nearest value first
            all_result.sort(function(a, b) {
              return a.sort - b.sort;
            });

            // trunc the table
            all_result = all_result.slice(0, max_values);

            // compute the error
            for(let result of all_result) {
              result.error = Math.round(result.sort * 10000 / equation.result)/100;
            }

            // return the result ans close the worker
            postMessage({
              message: 'result',
              result:  all_result.slice(0, max_values)
            });
            close();
          }
        }
      };
    }
  }

  else if('stop' === message) {
    // terminate each worker
    for(let i=0; i<workers.length; i++) {
      workers[i].terminate();
    }

    // return an empty result
    postMessage({
      message: 'result',
      result:  []
    });
  }
};
