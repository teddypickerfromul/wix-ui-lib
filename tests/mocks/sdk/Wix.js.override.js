if(Wix){ 
	Wix.__disableStandaloneError__ = true;
	Wix.Settings.getSiteColors = function(){
		return [
			{value:'#FFF', reference:'color-1'},
			{value:'#666', reference:'color-2'},
			{value:'#000', reference:'color-3'}
		];
	};	
	
} else {
	throw new Error('Wix SDK is not loaded');
}