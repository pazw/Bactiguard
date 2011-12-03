var test = 0;

function drawVisualization() {
  var patients = numberOfPatients.value;
  var data = new google.visualization.DataTable();
  var raw_data = [['With', patients*0.3, patients*0.3, patients*0.3],
                  ['Without', patients*0.1, patients*0.1, patients*0.1]];
  
  var years = [2011, 2012, 2013];
                  
  data.addColumn('string', 'Year');
  for (var i = 0; i  < raw_data.length; ++i) {
    data.addColumn('number', raw_data[i][0]);    
  }
  data.addRows(years.length);

  for (var j = 0; j < years.length; ++j) {    
    data.setValue(j, 0, years[j].toString());    
  }
  for (var i = 0; i  < raw_data.length; ++i) {
    for (var j = 1; j  < raw_data[i].length; ++j) {
      data.setValue(j-1, i+1, raw_data[i][j]);    
    }
  }
  
  // Create and draw the visualization.
  new google.visualization.ColumnChart(document.getElementById('graph')).
      draw(data,
           {title:"Amount of patients with infection", 
            width:600, height:400,
            hAxis: {title: "Year"}}
      );
}


// Interface code.
(function () {
	// Join party page
	$('#numberOfPatients').on('change keydown keypress keyup', function () {
			var value = $(this).val();
			if (value.toUpperCase() != value) {
				$(this).val(value = value.toUpperCase());
			}
			$(this)
				.removeClass('invalid')
				.toggleClass('good', value.length > 0)
				.toggleClass('error', /^$|[^0-9]/.test(value));
		})
		.on('animationEnd mozAnimationEnd webkitAnimationEnd', function () {
			$(this).removeClass('invalid');
		});
	/*	
	$('#calculate').click(function () {
		$('button.nav').attr('disabled', true);
		var button = $('#number-of-patients');
		joinParty(button.val(),
			function () {
				$('button.nav').attr('disabled', false);
				button.removeClass('good').addClass('invalid');
			});
	});*/
})();

