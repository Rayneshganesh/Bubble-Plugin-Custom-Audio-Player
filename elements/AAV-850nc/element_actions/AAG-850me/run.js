function(instance, properties, context) {
$(document).ready(function (){
const recorder = new MicRecorder({
      bitRate: 128
    });    
    
    instance.data.recorder = recorder;
    recorder.start().then(() => {
       instance.publishState('recording',true)
        
        let seconds = 0;
        var time = setInterval(function(){
           seconds++
           instance.publishState('time',seconds)
            
            if (properties.max != null & seconds == properties.max + 1){
           clearInterval(time);  
             instance.data.clear = true;
             instance.triggerEvent('timeended')
            }
            
        }, 1000);
        instance.data.time = time;
      }).catch((e) => {
        console.error(e);
      });
    
    
});

}