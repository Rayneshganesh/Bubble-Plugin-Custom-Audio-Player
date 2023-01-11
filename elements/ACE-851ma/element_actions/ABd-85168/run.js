function(instance, properties, context) {
const audioPlayer = document.getElementById(instance.data.audioId);
   
    if (audioPlayer) {
    
    	if (audioPlayer.readystate >= 2 && audioPlayer.duration !== Infinity && audioPlayer.duration > 0 ){
        
        	if (properties.time !== null){
            
                	if (properties.time === 0 ){
                    
                        audioPlayer.currentTime = 0
                    
                    } else {
                
            		audioPlayer.currentTime = properties.time
                
                    }
            }       
        }  
    }
}