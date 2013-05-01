var $j = jQuery.noConflict();

$j(document).ready(function() {

	var isZA;

	jQuery('select#billing\\:country_id').live('change', function() {
		if ($j("#billing\\:country_id").val() == "ZA") {
			setZA();
		} else {
			if (isZA){
				unSetZA();
			}
		}
	});

	jQuery('select#billing\\:region_id').live('change', function() {
		if ($j("#billing\\:country_id").val() == "ZA") {
			getSuburbs();
		}
	});

	if ($j("#billing\\:country_id").val() == "ZA") {
		setZA();
	}
	
	function getSuburbs () {
		
		$j('#mds\\:billing_suburb').empty();
		$j('#mds\\:billing_suburb').append('<option value="">Loading...</option>');
		
		var data = {
			town	: 'PTA',
		};
		jQuery.ajax({
			type : 'POST',
			url : "http://localhost/magento/index.php/collivery/ajax/suburb",
			data : data,
			complete : function(response){
				$j('#mds\\:billing_suburb').empty();
				$j("#mds\\:billing_suburb").append(response['responseText']);
			}
		});
		
	}
	
	function setFields () {
		var suburb_html = 
		'<div class="mds-billing field">' +
		'	<label class="required" for="mds:billing_suburb"><em>*</em>Suburb</label>' +
		'	<div class="input-box">' +
		'		<select class="required-entry" title="Suburb" name="mds[billing_suburb]" id="mds:billing_suburb" defaultvalue="">' +
		'			<option value="">Please select a Town first</option>' +
		'		</select>' +
		'	</div>' +
		'</div>';
		$j("#billing\\:city").parent().parent().parent().prepend(suburb_html);
		$j('#billing\\:city').parent().parent().hide();
		
		var building_html = 
		'<li class="mds-billing wide">' +
		'	<label for="mds:billing_building" class="required"><em>*</em>Building Details</label>' +
		'	<div class="input-box">' +
		'		<input title="Building Details" name="mds[billing_building]" id="mds:billing_building" value="" class="input-text required-entry" type="text">' +
		'	</div>' +
		'</li>';
		$j("#billing\\:street1").parent().parent().before(building_html);
		
		var cptypes_html = 
		'<div class="mds-billing field">' +
		'	<label class="required" for="mds:billing_cptypes"><em>*</em>Location Type</label>' +
		'	<div class="input-box">' +
		'		<select class="required-entry" title="Location Type" name="mds[billing_cptypes]" id="mds:billing_cptypes" defaultvalue="">' +
		'			<option value="">Loading...</option>' +
		'		</select>' +
		'	</div>' +
		'</div>';
		$j("#billing\\:city").parent().parent().parent().append(cptypes_html);
	}
	
	function getCPTypes () {
		
		$j('#mds\\:billing_cptypes').empty();
		$j('#mds\\:billing_cptypes').append('<option value="">Loading...</option>');
		
		jQuery.ajax({
			url : "http://localhost/magento/index.php/collivery/ajax/cptypes",
			complete : function(response){
				$j('#mds\\:billing_cptypes').empty();
				$j("#mds\\:billing_cptypes").append(response['responseText']);
			}
		});
		
	}
	
	function setZA () {
		setFields();
		getCPTypes();
		isZA = true;
	}
	
	function unSetZA () {
		$j('.mds-billing').remove();
		$j('#billing\\:city').parent().parent().show();
		isZA = false;
	}

});
