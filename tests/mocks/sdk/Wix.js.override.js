if(Wix){ 
	Wix.__disableStandaloneError__ = true;
	Wix.Settings.getSiteColors = function(){
		return [
			{value:'#FFF', reference:'color-1'},
			{value:'#666', reference:'color-2'},
			{value:'#000', reference:'color-3'}
		];
	};
    Wix.Styles.getStyleFontByReference = function(presetName){
        return { fontFamily: 'arial',
                 size: '12px' };
    };
    Wix.Styles.getEditorFonts = function(){
        return [{ lang:'',
            fonts:[
            {displayName:"Arial","fontFamily":"arial","cdnName":"","genericFamily":"sans-serif","provider":"system","characterSets":["latin","latin-ext","cyrillic"],"permissions":"all","fallbacks":"helvetica","spriteIndex":5,"cssFontFamily":"\"arial\", \"helvetica\", \"sans-serif\""},
            {cdnName: "", characterSets: ["latin", "latin-ext", "cyrillic"], cssFontFamily: "\"arial black\",\"arial-w01-black\",\"arial-w02-black\",\"arial-w10 black\",\"sans-serif\"", displayName: "Arial Black",  fallbacks: "arial-w01-black,arial-w02-black,arial-w10 black", fontFamily: "arial black", genericFamily: "sans-serif", permissions: "all", provider: "system"},
            {displayName:"ComicSansMS",fontFamily:"comicsansms",cdnName:"","genericFamily":"cursive","provider":"system","characterSets":["latin","latin-ext","cyrillic"],"permissions":"all",fallbacks:"comic-sans-w01-regular, comic-sans-w02-regular, comic-sans-w10-regular","spriteIndex":22,"cssFontFamily":"\"comicsansms\", \"comic-sans-w01-regular\", \"comic-sans-w02-regular\",\"comic-sans-w10-regular\""}
        ]}];
    }


	
} else {
	throw new Error('Wix SDK is not loaded');
}