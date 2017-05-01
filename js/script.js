// Searchbar Handler
$(function(){
	var searchField = $('#query');
	var icon = $('#search-btn');
	
	// Focus Event Handler
	$(searchField).on('focus', function(){
		$(this).animate({
			width:'100%'
		},400);
		$(icon).animate({
			right: '10px'
		}, 400);
	});
	
	// Blur Event Handler
	$(searchField).on('blur', function(){
		if(searchField.val() == ''){
			$(searchField).animate({
				width:'45%'
			},400, function(){});
			$(icon).animate({
				right:'360px'
			},400, function(){});
		}
	}); 
    //prevent default 
	$('#search-form').submit(function(e){
		e.preventDefault();
	});	
    
    //Submit Event  
    
    
});


function search(){
		//clear html
		$('#results').html('');
		$('#buttons').html('');
		//get query
		var q = $('#query').val();

		//get api data
		$.get('https://www.googleapis.com/youtube/v3/search', {
			q: q,
			part: 'snippet, id',
			type: 'video',
			key: 'AIzaSyDvKgT0bn8E2OEU4LpVp7hBdjtyBSXFwnE'
			}, function(data){
                console.log(data);
                //get page tokens
                var nextToken = data.nextPageToken;
                var prevToken = data.prevPageToken;
                
                //display output
                $.each(data.items, function(i, item){
                    var output = getOutput(item);
                    $('#results').append(output);
                });
            
                //display buttons  
                var buttons = getButtons(nextToken, prevToken, q);
                $('#buttons').append(buttons);
            }
        );
        
    }
 function getOutput(item){
//        var results = "";1
        //console.log(item);
        //console.log(item.snippet);
        var channel = item.snippet.channelTitle;
        var title = item.snippet.title;
        var description = item.snippet.description;
        var date = item.snippet.publishedAt; 
        var imgUrl = item.snippet.thumbnails.high.url;
        var videoId = item.id.videoId;
        var itemDiv = $(
            '<li>' +
    '<div class="list-left">' +
    '<img src="'+imgUrl+'">' +
    '</div>' +
    '<div class="list-right">' +
    '<h3><a  class="iframe"  href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>' +
    '<small>By <span class="cTitle">'+channel+'</span> on '+date+'</small>' +
    '<p>'+description+'</p>' +
    '</div>' +
    '</li>' +
    '<div class="clearfix"></div>' +
    ''
            );
        return itemDiv; 
    }

//$('#next-btn').on('click',function(){
     function nextPage(){
        console.log('1');
        //clear html
         var token = $('#next-btn').attr('token');
        var q = $('#next-btn').attr('query');
        $('#results').html('');
		$('#buttons').html('');
        
        console.log('token',token);
       
        q = $('#query').val();

        //get api data
		$.get('https://www.googleapis.com/youtube/v3/search', {
			q: q,
			part: 'snippet, id',
			type: 'video',
			key: 'AIzaSyDvKgT0bn8E2OEU4LpVp7hBdjtyBSXFwnE',
            pageToken: token
			}, function(data){
                console.log(data);
                //get page tokens
                var nextToken = data.nextPageToken;
                var prevToken = data.prevPageToken;
                
                //display output
                $.each(data.items, function(i, item){
                    var output = getOutput(item);
                    $('#results').append(output);
                });
            
                //display buttons                
                var buttons = getButtons(nextToken, prevToken, q);
                $('#buttons').append(buttons);
            }
        );
        
    }


    function prevPage(){
        console.log('1');
        //clear html
         var token = $('#next-btn').attr('token');
        var q = $('#next-btn').attr('query');
        $('#results').html('');
		$('#buttons').html('');
        
        console.log('token',token);
       
        q = $('#query').val();

        //get api data
		$.get('https://www.googleapis.com/youtube/v3/search', {
			q: q,
			part: 'snippet, id',
			type: 'video',
			key: 'AIzaSyDvKgT0bn8E2OEU4LpVp7hBdjtyBSXFwnE',
            pageToken: token
			}, function(data){
                console.log(data);
                //get page tokens
                var nextToken = data.nextPageToken;
                var prevToken = data.prevPageToken;
                
                //display output
                $.each(data.items, function(i, item){
                    var output = getOutput(item);
                    $('#results').append(output);
                });
            
                //display buttons                
                var buttons = getButtons(nextToken, prevToken, q);
                $('#buttons').append(buttons);
            }
        );
        
    }


    function getButtons(nextToken, prevToken,q){
        console.log('q',q);
        console.log('preToken',prevToken);
        console.log('nextToken',nextToken);
        if (!prevToken){
            var buttonDiv = 
                '<div class="button-container">'+
                '<button id="next-btn" class="paging-button" token="'+nextToken+'" query="'+q+'"' +
		'onclick="nextPage();">Next Page</button></div>';
        }else{
            var buttonDiv = 
                '<div class="button-container">'+
		        '<button id="prev-btn" class="paging-button" token="'+prevToken+'" query="'+q+'"' +
        'onclick="nextPage();">Prev Page</button>' +
		        '<button id="next-btn" class="paging-button" token="'+nextToken+'" query="'+q+'"' +
		'onclick="nextPage();">Next Page</button></div>';
        }
        return buttonDiv;
    }
    
    

    


