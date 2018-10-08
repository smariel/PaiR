// get all the resistor value from a Exx serie, starting from a min, to a max
var eserie = function(eserie, min, max) {
  let eseries = {
    'E3': [1.00, 2.20, 4.70],
    'E6': [1.00, 1.50, 2.20, 3.30, 4.70, 6.80],
    'E12': [1.00, 1.20, 1.50, 1.80, 2.20, 2.70, 3.30, 3.90, 4.70, 5.60, 6.80, 8.20],
    'E24': [1.00, 1.10, 1.20, 1.30, 1.50, 1.60, 1.80, 2.00, 2.20, 2.40, 2.70, 3.00, 3.30, 3.60, 3.90, 4.30, 4.70, 5.10, 5.60, 6.20, 6.80, 7.50, 8.20, 9.10],
    'E48': [1.00, 1.05, 1.10, 1.15, 1.21, 1.27, 1.33, 1.40, 1.47, 1.54, 1.62, 1.69, 1.78, 1.87, 1.96, 2.05, 2.15, 2.26, 2.37, 2.49, 2.61, 2.74, 2.87, 3.01, 3.16, 3.32, 3.48, 3.65, 3.83, 4.02, 4.22, 4.42, 4.64, 4.87, 5.11, 5.36, 5.62, 5.90, 6.19, 6.49, 6.81, 7.15, 7.50, 7.87, 8.25, 8.66, 9.09, 9.53],
    'E96': [1.00, 1.02, 1.05, 1.07, 1.10, 1.13, 1.15, 1.18, 1.21, 1.24, 1.27, 1.30, 1.33, 1.37, 1.40, 1.43, 1.47, 1.50, 1.54, 1.58, 1.62, 1.65, 1.69, 1.74, 1.78, 1.82, 1.87, 1.91, 1.96, 2.00, 2.05, 2.10, 2.15, 2.21, 2.26, 2.32, 2.37, 2.43, 2.49, 2.55, 2.61, 2.67, 2.74, 2.80, 2.87, 2.94, 3.01, 3.09, 3.16, 3.24, 3.32, 3.40, 3.48, 3.57, 3.65, 3.74, 3.83, 3.92, 4.02, 4.12, 4.22, 4.32, 4.42, 4.53, 4.64, 4.75, 4.87, 4.99, 5.11, 5.23, 5.36, 5.49, 5.62, 5.76, 5.90, 6.04, 6.19, 6.34, 6.49, 6.65, 6.81, 6.98, 7.15, 7.32, 7.50, 7.68, 7.87, 8.06, 8.25, 8.45, 8.66, 8.87, 9.09, 9.31, 9.53, 9.76],
    'E192': [1.00, 1.01, 1.02, 1.04, 1.05, 1.06, 1.07, 1.09, 1.10, 1.11, 1.13, 1.14, 1.15, 1.17, 1.18, 1.20, 1.21, 1.23, 1.24, 1.26, 1.27, 1.29, 1.30, 1.32, 1.33, 1.35, 1.37, 1.38, 1.40, 1.42, 1.43, 1.45, 1.47, 1.49, 1.50, 1.52, 1.54, 1.56, 1.58, 1.60, 1.62, 1.64, 1.65, 1.67, 1.69, 1.72, 1.74, 1.76, 1.78, 1.80, 1.82, 1.84, 1.87, 1.89, 1.91, 1.93, 1.96, 1.98, 2.00, 2.03, 2.05, 2.08, 2.10, 2.13, 2.15, 2.18, 2.21, 2.23, 2.26, 2.29, 2.32, 2.34, 2.37, 2.40, 2.43, 2.46, 2.49, 2.52, 2.55, 2.58, 2.61, 2.64, 2.67, 2.71, 2.74, 2.77, 2.80, 2.84, 2.87, 2.91, 2.94, 2.98, 3.01, 3.05, 3.09, 3.12, 3.16, 3.20, 3.24, 3.28, 3.32, 3.36, 3.40, 3.44, 3.48, 3.52, 3.57, 3.61, 3.65, 3.70, 3.74, 3.79, 3.83, 3.88, 3.92, 3.97, 4.02, 4.07, 4.12, 4.17, 4.22, 4.27, 4.32, 4.37, 4.42, 4.48, 4.53, 4.59, 4.64, 4.70, 4.75, 4.81, 4.87, 4.93, 4.99, 5.05, 5.11, 5.17, 5.23, 5.30, 5.36, 5.42, 5.49, 5.56, 5.62, 5.69, 5.76, 5.83, 5.90, 5.97, 6.04, 6.12, 6.19, 6.26, 6.34, 6.42, 6.49, 6.57, 6.65, 6.73, 6.81, 6.90, 6.98, 7.06, 7.15, 7.23, 7.32, 7.41, 7.50, 7.59, 7.68, 7.77, 7.87, 7.96, 8.06, 8.16, 8.25, 8.35, 8.45, 8.56, 8.66, 8.76, 8.87, 8.98, 9.09, 9.20, 9.31, 9.42, 9.53, 9.65, 9.76, 9.88]
  };


  let return_values = [];
  let range_low = Math.pow(10, parseInt(min).toString().length - 1);
  let range_high = Math.pow(10, parseInt(max).toString().length - 1);
  for (let range = range_low; range <= range_high; range *= 10) {
    for (let val of eseries[eserie]) {
      let return_value = val * range;
      if (range > 10) { 
        return_value = parseInt(return_value);
      }
      if (return_value < min || return_value > max) continue;
      return_values.push(return_value);
    }
  }

  return return_values;
};

// get the test values from the from into an array
var get_testvalues = function() {
  let list_name = $('#resistor_list').val();

  if (list_name === 'custom') {
    if ('' == $('#resistor_values').val()) return [];

    let list = $('#resistor_values').val().split(',');
    for (let i = 0; i < list.length; i++) {
      let parsed_val = parseFloat(list[i]);
      if (isNaN(parsed_val)) {
        alert(`Error: ${list[i]} is not a correct number`);
        continue;
      }
      list[i] = parsed_val;
    }
    return list;
  } else {
    let min = parseFloat($('#resistor_min').val());
    let max = parseFloat($('#resistor_max').val());
    return eserie(list_name, min, max);
  }
};

// get the equation from the form, check it, and transform it
var get_equation = function() {
  let equation = $('#input_equation').val();

  if (equation.indexOf('R1') === -1) {
    alert(`Error: can\'t find R1`);
    return false;
  }

  if (equation.indexOf('R2') === -1) {
    alert(`Error: can\'t find R2`);
    return false;
  }

  if (equation.indexOf('=') === -1) {
    alert(`Error: can\'t find = sign`);
    return false;
  }

  if ((equation.match(/=/g) || []).length > 1) {
    alert(`Error: more than 1 = sign found`);
    return false;
  }

  equation = equation.replace(/,/g, '.').replace(/x/g, '*').replace(/ /g, '');

  let equation_split = equation.split('=');
  let equation_result = parseFloat(equation_split[0]);
  let equation_calc = equation_split[1];
  if (isNaN(equation_result)) {
    equation_result = parseFloat(equation_split[1]);
    equation_calc = equation_split[0];
    if (isNaN(equation_result)) {
      alert(`Error: the equation must be of the form [number]=[equation with R1 and R2]`);
      return false;
    }
  }

  return {
    full: equation,
    calcStr: equation_calc,
    result: equation_result,
  };
};

// will only be called if Web Workers are not availables
// calculate the equation with every combination of the given values
var process = function(equation, test_values) {
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

// update the form, depending on the selection
var update_form = function() {
  let list_name = $('#resistor_list').val();
  let test_values = get_testvalues();

  if (list_name === 'custom') {
    $('.eserie_only').hide();
    $('.custom_only').show();
    $('#resistor_values').prop('disabled', false);
  } else {
    $('.custom_only').hide();
    $('.eserie_only').show();
    $('#resistor_values').prop('disabled', true);
    $('#resistor_values').val(test_values.toString());
  }

  $('#form_alert').html(`${test_values.length*test_values.length} values to evaluate`);
};

// print the result list in an array
var show_result = function(result_list, max) {
  let html = '';
  let i = 0;
  for (let result of result_list) {
    html += `<tr><td>${i++}</td><td>${result.R1}</td><td>${result.R1}</td><td>${result.val}</td></tr>`;
    if (i >= max) break;
  }

  $('#section_result>table>tbody').html(html);
};

// When the DOM is ready
$(function() {
  // first update of the form
  update_form();

  // GO button clicked
  $('#button_go').click(function() {
    // If Web Workers are available, use them. Much faster for table sorting and simple data processing.
    // https://developer.mozilla.org/fr/docs/Utilisation_des_web_workers
    if (window.Worker) {
      // change the button style to indicate some processing...
      $('#button_go').prop('disabled', true).text('Evaluating...');
      // Create a Worker and send all data to it
      var myWorker = new Worker('js/worker.js');
      myWorker.postMessage([get_equation(), get_testvalues()]);
      // Creation of an event to catch the Worker responses
      myWorker.onmessage = function(e) {
        // Get the values calulated in the Worker
        show_result(e.data, parseInt($('#nb_display').val()));
        // Clear the style of the button
        $('#button_go').prop('disabled', false).text('Go');
      };
    }
    // If the Web Workers are not available, use a slower function
    else {
      show_result(process(get_equation(), get_testvalues()), parseInt($('#nb_display').val()));
    }
  });

  // When the selection change, update the list of values
  $('#resistor_list').change(function() {
    if ($('#resistor_list').val() === "custom") {
      $('#resistor_values').val('');
    }
  });

  // When the min & max change, update the form
  $('.form-control').change(function() {
    update_form();
  });

});
