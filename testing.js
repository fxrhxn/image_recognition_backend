var _ = require('lodash')


var testing_arr = [ 'digital clock (score = 0.24095)',
'analog clock (score = 0.14511)',
'wall clock (score = 0.10627)',
'street sign (score = 0.06813)',
'stopwatch, stop watch (score = 0.04726)' ]

var split_arr = testing_arr[0].split('(');

var description = split_arr[0]

var numbertype = split_arr[1].split('=')[1].slice(0, -1) * 100


var datashit = _.forEach(testing_arr, function(type, i){

    var arr = []
    
    var split_arr = type.split('(');
    
    var description = split_arr[0]
    
    var numbertype = split_arr[1].split('=')[1].slice(0, -1) * 100
        
    var new_data = {
        name : description,
        percentage : numbertype
    }

    arr.push(new_data)

    
})


var arr = [{num: 1}, {num: 2}];

arr = arr.map(function(item, i) {

  return {somethingElse: i};
});


testing_arr = testing_arr.map(function(test){


    var split_arr = test.split('(');
    
    var description = split_arr[0]
    
    var numbertype = split_arr[1].split('=')[1].slice(0, -1) * 100
        
    return {
        name : description,
        percentage : numbertype
    }

})


