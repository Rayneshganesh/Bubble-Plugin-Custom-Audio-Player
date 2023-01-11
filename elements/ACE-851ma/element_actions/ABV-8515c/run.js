function(instance, properties, context) {
const audioPlayer = document.getElementById(instance.data.audioId);
   
    if (audioPlayer && instance.data.hasAudio) {
    
       audioPlayer.volume = properties.volume;
        
       instance.data.toggleVolume()
        
    }
}