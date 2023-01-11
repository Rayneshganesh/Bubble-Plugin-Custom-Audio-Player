function(instance, properties, context) {
const audioPlayer = document.getElementById(instance.data.audioId);
    
	if (audioPlayer){
    
    	if(properties.url === null){
    
    	instance.data.audioReload()
            
    	} else {
        
        audioPlayer.src = properties.url;
        }
    }
}