function(instance, properties, context) {
const audioPlayer = document.getElementById(instance.data.audioId);

    
    if (audioPlayer.readyState >= 2 && audioPlayer.duration !== Infinity && audioPlayer.duration > 0){
    
         if (properties.speed){
    
        audioPlayer.playbackRate = properties.speed;
    
    		}
    }

    
}