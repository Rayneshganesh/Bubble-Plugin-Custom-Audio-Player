function(instance, properties, context) {
    
const audioPlayer = document.getElementById(instance.data.audioId);
   
         audioPlayer.pause()
         audioPlayer.currentTime = 0
    
}