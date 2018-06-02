onmessage = function(e) {
   let equation = e.data[0];
   let test_values = e.data[1];

   let calc_equation = function(R1,R2) {
      let val = eval(equation.calcStr.replace('R1', R1).replace('R2', R2)); // jshint ignore:line
      return {
         'R1':R1,
         'R2':R2,
         'val': val,
         'sort': Math.abs(val - equation.result)
      };
   };

   let all_result = [];

   for(let R1 of test_values) {
      for(let R2 of test_values) {
         all_result.push(calc_equation(R1,R2));
      }
   }

   all_result.sort(function(a,b){return a.sort - b.sort;});

   postMessage(all_result);

   close();
};
