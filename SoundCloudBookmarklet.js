(function(clientId){
	var getSongInfoUrl = 'https://api.soundcloud.com/resolve?url=https://soundcloud.com' + 
                         window.location.pathname + 
                         '&_status_code_map[302]=200&_status_format=json&client_id=' + 
                         clientId,
		insertionSelector = $('[class*="soundTitle__playButton"]');

	function initialize(){
		$.getJSON(getSongInfoUrl, function(songInfo){
			$.getJSON(songInfo.location.replace('?', '.json?'), function(extendedSongInfo){
				if(extendedSongInfo.streamable){
					var songUrl = (!!extendedSongInfo.download_url ? extendedSongInfo.download_url : extendedSongInfo.stream_url) + '?client_id=' + clientId;
					createButton(songUrl, extendedSongInfo.title);
				} else {
					$('<span>:(</span>').insertAfter(insertionSelector);
				}
			});
		});
	}

	function createButton(url, title){
		var a = document.createElement('a');
		a.innerText = 'Download';
		a.href = url;
		a.download = title + '.mp3';
		$a = $(a);
		$a.addClass('sc-button sc-button-download sc-button-medium sc-button-responsive');
		$a.insertAfter(insertionSelector);
	}

	initialize();
})('') //your client id goes here