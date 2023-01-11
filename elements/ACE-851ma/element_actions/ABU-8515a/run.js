function(instance, properties, context) {
const audioPlayer = document.getElementById(instance.data.audioId);

    if (audioPlayer && instance.data.hasAudio) {   
       instance.data.toggleMute()
        
    }
}