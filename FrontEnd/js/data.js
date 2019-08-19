$('#submitFormBtn').on('click',function (e){   
	// Show search section 
	$('#feature-area').fadeIn();

	$('#reviewDiv').empty();

	// Show content when search
	var x = document.getElementById("reviewDiv");
	x.style.display = "block";

	e.preventDefault();
	/* Add something like this after we catagorize data
	if (e.options[e.selectedIndex].value == "All") {
	
	}
	*/			
	var dataSize = 0;
	$(searchResultTitle).text("Search Result");
	
	var searchValue = document.getElementById("productNameTB").value;
	
	var searchDropDown = document.getElementById("searchDropDown");
	var searchCategory = searchDropDown.options[searchDropDown.selectedIndex].text;
	
	if (searchCategory == "All") {
		searchCategory = '*';
	}
	else {
		searchCategory = "'" + searchCategory + "'";
	}
	
	var startCount = document.getElementById("searchStartCount").value;
	var count = document.getElementById("searchEndCount").value;
	
	if (startCount == "" || isNaN(startCount)) {
		startCount = 1;
		count = 10;
		document.getElementById("searchStartCount").innerHTML = startCount;
		document.getElementById("searchEndCount").innerHTML = count;
		
		//document.getElementById("nextBtn").style.display = "block";
	}
	else {
		// Increment count
		startCount = startCount + 1;
		document.getElementById("searchStartCount").innerHTML = startCount;
		count = count + 10;
		document.getElementById("searchEndCount").innerHTML = count;

		//document.getElementById("nextBtn").style.display = "block";
	}

	$.ajax({
	  'url': 'http://localhost:8983/solr/4034_IR/select',
	   'data': {'wt':'json', 
				'q': "'" + searchValue + "'",
				'fq':"category:" + searchCategory, //searchCategory + "'"},
				'start': parseInt(startCount) - 1,
				'sort': ""
				//'rows': count
				}, 
	  'success': function(data) { 
		var dataSize = data.response.numFound;
	
		if (dataSize > 0) {
			$(resultsMsg1).text("Displaying");
			$(resultsMsg2).text("-");
			$(searchString).text(" results for '" + searchValue + "' | Total: " + dataSize + " results (" + data.responseHeader.QTime + "ms)" );
			
			document.getElementById("sortBy").style.display = "block";
			//document.getElementById("searchString").value = dataSize + " search results on " + searchValue + " found";
		}
		else {
			document.getElementById("searchStartCount").style.display = "none";
			document.getElementById("searchEndCount").style.display = "none";
			document.getElementById("resultsMsg1").style.display = "none";
			document.getElementById("resultsMsg2").style.display = "none";
			$(searchString).text("No results found");
			//document.getElementById("searchString").value = 
		}
		
		if (document.getElementById("searchString").innerHTML == "No results found") {
			document.getElementById("prevBtn").style.display = "none";
			document.getElementById("nextBtn").style.display = "none";
		}
		else {
			document.getElementById("nextBtn").style.display = "block";
		}
		
		if (count == dataSize || dataSize == 10) {
			document.getElementById("nextBtn").style.display = "none";
		}
		if (count > dataSize) {
			document.getElementById("searchEndCount").innerHTML = dataSize;
			document.getElementById("nextBtn").style.display = "none";
		}
				
		var i;
		for (i = 0; i < dataSize; i++) { 
		
		  //alert(data.response.docs[i]);
		  
		  //var $innerFormDiv = document.createElement("FORM");
		  //$innerFormDiv.setAttribute("name", "showAllReviewForm");	
		  //$innerFormDiv.className = "feature-item";
		
		  var $innerReviewDiv = document.createElement("div");
		  $innerReviewDiv.className = "feature-item";
		  //$("innerReviewDiv").css({"float": "right", "clear": "left"});
		 
		  // Product Image
		  var $innerReviewDivProdImg = document.createElement("img");
		  $innerReviewDivProdImg.setAttribute("src", data.response.docs[i]["image"]);
		  $innerReviewDivProdImg.setAttribute("width", "150");
		  $innerReviewDivProdImg.setAttribute("height", "200");
		  $innerReviewDivProdImg.setAttribute("class", "prodImg");
		 
		  // Product Name
		  var $innerReviewDivProdName = document.createElement("h4");
		  $innerReviewDivProdName.setAttribute("name", "pdtName");
		  $innerReviewDivProdName.innerHTML  = data.response.docs[i]["name"];
		  
		  // Product URL
		  var $innerReviewDivProdUrl = document.createElement("a");
		  $innerReviewDivProdUrl.setAttribute("href", data.response.docs[i]["url"]);
		  $innerReviewDivProdUrl.innerHTML = data.response.docs[i]["url"];
		  
		  // Product Price
		  var $innerReviewDivProdPrice = document.createElement("p");
		  $innerReviewDivProdPrice.innerHTML = "Price: $" + data.response.docs[i]["price"];
		
		  // Product 5 stars ratings
		  var $innerReviewDivProdRating5 = document.createElement("p");
		  $innerReviewDivProdRating5.innerHTML = "5 Stars Rating: " + data.response.docs[i]["ratings.5_star"] + "%";
		  
		   // Product Summary
		  var $innerReviewDivProdSummary = document.createElement("p");
		  $innerReviewDivProdSummary.innerHTML = "Review Summary: " + data.response.docs[i]["summary"];
		  
		  $innerReviewDiv.appendChild($innerReviewDivProdImg);
		  $innerReviewDiv.appendChild($innerReviewDivProdName);
		  $innerReviewDiv.appendChild($innerReviewDivProdUrl);
		  $innerReviewDiv.appendChild($innerReviewDivProdPrice);
		  $innerReviewDiv.appendChild($innerReviewDivProdRating5);
		  $innerReviewDiv.appendChild($innerReviewDivProdSummary);

		  document.getElementById("reviewDiv").appendChild($innerReviewDiv);   
		} 
	  },
	  'dataType': 'jsonp',
	  'jsonp': 'json.wrf'
	});
	$([document.documentElement, document.body]).animate({
		scrollTop: $(".feature-area").offset().top
	}, 400);
			
});		

$('#nextBtn').on('click',function (e){    

	var sortByCondition = document.getElementById("sortBy").value;
	
	// Show content when search
	var x = document.getElementById("reviewDiv");
	x.style.display = "block";

	e.preventDefault();

	var dataSize = 0;
	$(searchResultTitle).text("Search Result");
	
	var searchValue = document.getElementById("productNameTB").value;
	var searchDropDown = document.getElementById("searchDropDown");
	var searchCategory = searchDropDown.options[searchDropDown.selectedIndex].text;
	
	if (searchCategory == "All") {
		searchCategory = '*';
	}
	else {
		searchCategory = "'" + searchCategory + "'";
	}
	
	var startCount = document.getElementById("searchStartCount").innerHTML;
	var count = document.getElementById("searchEndCount").innerHTML;
	
	// Check if this is first page of results
	if (parseInt(startCount) == false) {
		startCount = 1;
		count = 10;
		document.getElementById("searchStartCount").innerHTML = startCount;
		document.getElementById("searchEndCount").innerHTML = count;
		
		document.getElementById("nextBtn").style.display = "block";
	}
	
	// Check if this is not first page of results
	else {
		$("#reviewDiv").empty(); 
	
		// Increment count
		startCount = parseInt(count) + 1;
		document.getElementById("searchStartCount").innerHTML = startCount;
		count = parseInt(count) + 10;
		document.getElementById("searchEndCount").innerHTML = count;
		
		document.getElementById("prevBtn").style.display = "block";
		document.getElementById("nextBtn").style.display = "block";
	}

	$.ajax({
	  'url': 'http://localhost:8983/solr/4034_IR/select',
	   'data': {'wt':'json', 
				'q': "'" + searchValue + "'",
				'fq':"category:" + searchCategory, //searchCategory + "'"},
				'start': parseInt(startCount) - 1,
				'sort': sortByCondition
				//'rows': parseInt(count)
				}, 
	  'success': function(data) { 

		var dataSize = data.response.numFound;
	
		if (dataSize > 0) {
			$(resultsMsg1).text("Displaying");
			$(resultsMsg2).text("-");
								$(searchString).text(" results for '" + searchValue + "' | Total: " + dataSize + " results (" + data.responseHeader.QTime + "ms)" );
			//document.getElementById("searchString").value = dataSize + " search results on " + searchValue + " found";
		}
		else {
			document.getElementById("searchStartCount").style.display = "none";
			document.getElementById("searchEndCount").style.display = "none";
			document.getElementById("resultsMsg1").style.display = "none";
			document.getElementById("resultsMsg2").style.display = "none";
			startCount = 0;
			document.getElementById("prevBtn").style.display = "none";
			$(searchString).text("No results found");
				//document.getElementById("searchString").value = 
		}
		
		if (count > dataSize) {
			count = dataSize;
			document.getElementById("searchEndCount").innerHTML = count;
			
			document.getElementById("prevBtn").style.display = "block";
			document.getElementById("nextBtn").style.display = "none";
		}
		
		if (dataSize == 10) {
			document.getElementById("nextBtn").style.display = "none";
		}
		
		if (document.getElementById("searchString").innerHTML == "No results found") {
			document.getElementById("prevBtn").style.display = "none";
		}
		
		var i;
		for (i = 0; i < dataSize; i++) { 
		  //alert(data.response.docs[i]);
		  
		  //var $innerFormDiv = document.createElement("FORM");
		  //$innerFormDiv.setAttribute("name", "showAllReviewForm");	
		  //$innerFormDiv.className = "feature-item";
		
		  var $innerReviewDiv = document.createElement("div");
		  $innerReviewDiv.className = "feature-item";
		  //$("innerReviewDiv").css({"float": "right", "clear": "left"});
		 
		  // Product Image
		  var $innerReviewDivProdImg = document.createElement("img");
		  $innerReviewDivProdImg.setAttribute("src", data.response.docs[i]["image"]);
		  $innerReviewDivProdImg.setAttribute("width", "150");
		  $innerReviewDivProdImg.setAttribute("height", "200");
		  $innerReviewDivProdImg.setAttribute("class", "prodImg");
		 
		  // Product Name
		  var $innerReviewDivProdName = document.createElement("h4");
		  $innerReviewDivProdName.setAttribute("name", "pdtName");
		  $innerReviewDivProdName.innerHTML  = data.response.docs[i]["name"];
		  
		   // Product URL
		  var $innerReviewDivProdUrl = document.createElement("a");
		  $innerReviewDivProdUrl.setAttribute("href", data.response.docs[i]["url"]);
		  $innerReviewDivProdUrl.innerHTML = data.response.docs[i]["url"];
		  
		  // Product Price
		  var $innerReviewDivProdPrice = document.createElement("p");
		  $innerReviewDivProdPrice.innerHTML = "Price: $" + data.response.docs[i]["price"];
		
		  // Product 5 stars ratings
		  var $innerReviewDivProdRating5 = document.createElement("p");
		  $innerReviewDivProdRating5.innerHTML = "5 Stars Rating: " + data.response.docs[i]["ratings.5_star"] + "%";
		  
		   // Product Summary
		  var $innerReviewDivProdSummary = document.createElement("p");
		  $innerReviewDivProdSummary.innerHTML = "Review Summary: " + data.response.docs[i]["summary"];
		  
		  $innerReviewDiv.appendChild($innerReviewDivProdImg);
		  $innerReviewDiv.appendChild($innerReviewDivProdName);
		  $innerReviewDiv.appendChild($innerReviewDivProdUrl);
		  $innerReviewDiv.appendChild($innerReviewDivProdPrice);
		  $innerReviewDiv.appendChild($innerReviewDivProdRating5);
		  $innerReviewDiv.appendChild($innerReviewDivProdSummary);
		  
		  document.getElementById("reviewDiv").appendChild($innerReviewDiv);   
		} 
	  },
	  'dataType': 'jsonp',
	  'jsonp': 'json.wrf'
	});
	
	$([document.documentElement, document.body]).animate({
		scrollTop: $(".feature-area").offset().top
	}, 400);	
});	


$('#prevBtn').on('click',function (e){    	
	var sortByCondition = document.getElementById("sortBy").value;
	
	// Show content when search
	var x = document.getElementById("reviewDiv");
	x.style.display = "block";

	e.preventDefault();

	var dataSize = 0;
	$(searchResultTitle).text("Search Result");
	
	var searchValue = document.getElementById("productNameTB").value;
	var searchDropDown = document.getElementById("searchDropDown");
	var searchCategory = searchDropDown.options[searchDropDown.selectedIndex].text;
	
	if (searchCategory == "All") {
		searchCategory = '*';
	}
	else {
		searchCategory = "'" + searchCategory + "'";
	}
	
	var startCount = document.getElementById("searchStartCount").innerHTML;
	var count = document.getElementById("searchEndCount").innerHTML;
	
	$("#reviewDiv").empty(); 

	// Decrement count
	count = parseInt(startCount) - 1;
	document.getElementById("searchEndCount").innerHTML = count;

	startCount = parseInt(startCount) - 10;
	document.getElementById("searchStartCount").innerHTML = startCount;
	
	document.getElementById("prevBtn").style.display = "block";
	document.getElementById("nextBtn").style.display = "block";

	// Check if this is first page of results
	if ((parseInt(startCount) - 10) <= 1) {
		document.getElementById("prevBtn").style.display = "none";
		document.getElementById("prevBtn").style.float = "left";
	}
	
	$.ajax({
	  'url': 'http://localhost:8983/solr/4034_IR/select',
	   'data': {'wt':'json', 
				'q': "'" + searchValue + "'",
				'fq':"category:" + searchCategory, //searchCategory + "'"},
				'start': parseInt(startCount) - 1,
				'sort': sortByCondition
				//'rows': parseInt(count)
				}, 
	  'success': function(data) { 
	  
		var dataSize = data.response.numFound;
	
		if (dataSize > 0) {
			$(resultsMsg1).text("Displaying");
			$(resultsMsg2).text("-");
								$(searchString).text(" results for '" + searchValue + "' | Total: " + dataSize + " results (" + data.responseHeader.QTime + "ms)" );
			//document.getElementById("searchString").value = dataSize + " search results on " + searchValue + " found";
		}
		else {
			document.getElementById("searchStartCount").style.display = "none";
			document.getElementById("searchEndCount").style.display = "none";
			document.getElementById("resultsMsg1").style.display = "none";
			document.getElementById("resultsMsg2").style.display = "none";
			startCount = 0;
			document.getElementById("prevBtn").style.display = "none";
			$(searchString).text("No results found");
			//document.getElementById("searchString").value = 
		}
		
		if (document.getElementById("searchString").innerHTML == "No results found") {
			document.getElementById("prevBtn").style.display = "none";
		}
		
		if (dataSize == 10) {
			document.getElementById("nextBtn").style.display = "none";
		}
		
		var i;
		for (i = 0; i < dataSize; i++) { 
		  //alert(data.response.docs[i]);
		  
		  //var $innerFormDiv = document.createElement("FORM");
		  //$innerFormDiv.setAttribute("name", "showAllReviewForm");	
		  //$innerFormDiv.className = "feature-item";
		
		  var $innerReviewDiv = document.createElement("div");
		  $innerReviewDiv.className = "feature-item";
		  //$("innerReviewDiv").css({"float": "right", "clear": "left"});
		 
		  // Product Image
		  var $innerReviewDivProdImg = document.createElement("img");
		  $innerReviewDivProdImg.setAttribute("src", data.response.docs[i]["image"]);
		 $innerReviewDivProdImg.setAttribute("width", "150");
		  $innerReviewDivProdImg.setAttribute("height", "200");
		  $innerReviewDivProdImg.setAttribute("class", "prodImg");
		 
		  // Product Name
		  var $innerReviewDivProdName = document.createElement("h4");
		  $innerReviewDivProdName.setAttribute("name", "pdtName");
		  $innerReviewDivProdName.innerHTML  = data.response.docs[i]["name"];
		  
		   // Product URL
		  var $innerReviewDivProdUrl = document.createElement("a");
		  $innerReviewDivProdUrl.setAttribute("href", data.response.docs[i]["url"]);
		  $innerReviewDivProdUrl.innerHTML = data.response.docs[i]["url"];
		  
		  // Product Price
		  var $innerReviewDivProdPrice = document.createElement("p");
		  $innerReviewDivProdPrice.innerHTML = "Price: $" + data.response.docs[i]["price"];
		
		  // Product 5 stars ratings
		  var $innerReviewDivProdRating5 = document.createElement("p");
		  $innerReviewDivProdRating5.innerHTML = "5 Stars Rating: " + data.response.docs[i]["ratings.5_star"] + "%";
		  
		   // Product Summary
		  var $innerReviewDivProdSummary = document.createElement("p");
		  $innerReviewDivProdSummary.innerHTML = "Review Summary: " + data.response.docs[i]["summary"];
		  
		  $innerReviewDiv.appendChild($innerReviewDivProdImg);
		  $innerReviewDiv.appendChild($innerReviewDivProdName);
		  $innerReviewDiv.appendChild($innerReviewDivProdUrl);
		  $innerReviewDiv.appendChild($innerReviewDivProdPrice);
		  $innerReviewDiv.appendChild($innerReviewDivProdRating5);
		  $innerReviewDiv.appendChild($innerReviewDivProdSummary);
		  
		  document.getElementById("reviewDiv").appendChild($innerReviewDiv);   
		} 
	  },
	  'dataType': 'jsonp',
	  'jsonp': 'json.wrf'
	});
	
	$([document.documentElement, document.body]).animate({
		scrollTop: $(".feature-area").offset().top
	}, 400);
			
});	

 $("#sortBy").change(function (e) {
	$('#reviewDiv').empty();
 
	// Get sort by value	
	var sortByCondition = $(this).val();
	
	// Show content when search
	var x = document.getElementById("reviewDiv");
	x.style.display = "block";

	e.preventDefault();

	var dataSize = 0;
	$(searchResultTitle).text("Search Result");
	
	var searchValue = document.getElementById("productNameTB").value;
	var searchDropDown = document.getElementById("searchDropDown");
	var searchCategory = searchDropDown.options[searchDropDown.selectedIndex].text;
	
	if (searchCategory == "All") {
		searchCategory = '*';
	}
	else {
		searchCategory = "'" + searchCategory + "'";
	}
	
	var startCount = document.getElementById("searchStartCount").value;
	var count = document.getElementById("searchEndCount").value;
	
	if (startCount == "" || isNaN(startCount)) {
		startCount = 1;
		count = 10;
		document.getElementById("searchStartCount").innerHTML = startCount;
		document.getElementById("searchEndCount").innerHTML = count;
		
		//document.getElementById("nextBtn").style.display = "block";
	}
	else {
		// Increment count
		startCount = startCount + 1;
		document.getElementById("searchStartCount").innerHTML = startCount;
		count = count + 10;
		document.getElementById("searchEndCount").innerHTML = count;
		
		document.getElementById("prevBtn").style.display = "block";
		//document.getElementById("nextBtn").style.display = "block";
	}

	$.ajax({
	  'url': 'http://localhost:8983/solr/4034_IR/select',
	   'data': {'wt':'json', 
				'q': "'" + searchValue + "'",
				'fq':"category:" + searchCategory, //searchCategory + "'"},
				'start': startCount - 1,
				'sort': sortByCondition
				//'rows': count
				}, 
	  'success': function(data) { 
		var dataSize = data.response.numFound;
	
		if (dataSize > 0) {
			$(resultsMsg1).text("Displaying");
			$(resultsMsg2).text("-");
								$(searchString).text(" results for '" + searchValue + "' | Total: " + dataSize + " results (" + data.responseHeader.QTime + "ms)" );
			document.getElementById("sortBy").style.display = "block";
			//document.getElementById("searchString").value = dataSize + " search results on " + searchValue + " found";
		}
		else {
			document.getElementById("searchStartCount").style.display = "none";
			document.getElementById("searchEndCount").style.display = "none";
			document.getElementById("resultsMsg1").style.display = "none";
			document.getElementById("resultsMsg2").style.display = "none";
			$(searchString).text("No results found");
			//document.getElementById("searchString").value = 
		}
		
		if (count > dataSize) {
			count = dataSize;
			document.getElementById("searchEndCount").innerHTML = count;
			
			document.getElementById("prevBtn").style.display = "none";
			//document.getElementById("nextBtn").style.display = "none";
		}
		else {
			document.getElementById("nextBtn").style.display = "block";
		}
		
		if (document.getElementById("searchString").innerHTML == "No results found") {
			document.getElementById("prevBtn").style.display = "none";
		}
		
		if (dataSize == 10) {
			document.getElementById("nextBtn").style.display = "none";
		}
		
		if (startCount == 1) {
			document.getElementById("prevBtn").style.display = "none";
		}
		
		var i;
		for (i = 0; i < dataSize; i++) { 
		  //alert(data.response.docs[i]);
		  
		  //var $innerFormDiv = document.createElement("FORM");
		  //$innerFormDiv.setAttribute("name", "showAllReviewForm");	
		  //$innerFormDiv.className = "feature-item";
		
		  var $innerReviewDiv = document.createElement("div");
		  $innerReviewDiv.className = "feature-item";
		  //$("innerReviewDiv").css({"float": "right", "clear": "left"});
		 
		  // Product Image
		  var $innerReviewDivProdImg = document.createElement("img");
		  $innerReviewDivProdImg.setAttribute("src", data.response.docs[i]["image"]);
		 $innerReviewDivProdImg.setAttribute("width", "150");
		  $innerReviewDivProdImg.setAttribute("height", "200");
		  $innerReviewDivProdImg.setAttribute("class", "prodImg");
		 
		  // Product Name
		  var $innerReviewDivProdName = document.createElement("h4");
		  $innerReviewDivProdName.setAttribute("name", "pdtName");
		  $innerReviewDivProdName.innerHTML  = data.response.docs[i]["name"];
		  
		  // Product URL
		  var $innerReviewDivProdUrl = document.createElement("a");
		  $innerReviewDivProdUrl.setAttribute("href", data.response.docs[i]["url"]);
		  $innerReviewDivProdUrl.innerHTML = data.response.docs[i]["url"];
		  
		  // Product Price
		  var $innerReviewDivProdPrice = document.createElement("p");
		  $innerReviewDivProdPrice.innerHTML = "Price: $" + data.response.docs[i]["price"];
		
		  // Product 5 stars ratings
		  var $innerReviewDivProdRating5 = document.createElement("p");
		  $innerReviewDivProdRating5.innerHTML = "5 Stars Rating: " + data.response.docs[i]["ratings.5_star"] + "%";
		  
		   // Product Summary
		  var $innerReviewDivProdSummary = document.createElement("p");
		  $innerReviewDivProdSummary.innerHTML = "Review Summary: " + data.response.docs[i]["summary"];
		  
		  $innerReviewDiv.appendChild($innerReviewDivProdImg);
		  $innerReviewDiv.appendChild($innerReviewDivProdName);
		  $innerReviewDiv.appendChild($innerReviewDivProdUrl);
		  $innerReviewDiv.appendChild($innerReviewDivProdPrice);
		  $innerReviewDiv.appendChild($innerReviewDivProdRating5);
		  $innerReviewDiv.appendChild($innerReviewDivProdSummary);

		  document.getElementById("reviewDiv").appendChild($innerReviewDiv);   
		} 
	  },
	  'dataType': 'jsonp',
	  'jsonp': 'json.wrf'
	});
	$([document.documentElement, document.body]).animate({
		scrollTop: $(".feature-area").offset().top
	}, 400);
	
});

