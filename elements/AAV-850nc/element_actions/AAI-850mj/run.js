function(instance, properties, context) {
$(document).ready(function (){
    
    clearInterval(instance.data.time);

                  
      instance.data.recorder.stop().getMp3().then(([buffer, blob]) => {
        const file = new File(buffer, 'music.mp3', {
          type: blob.type,
          lastModified: Date.now()
        });
          
        var audio = URL.createObjectURL(file);
        instance.publishState('recording',false);
        instance.publishState('audio',audio);
        
          
          var reader = new FileReader();
reader.readAsDataURL(blob);
reader.onloadend = function () {
    var base64data = reader.result;
    instance.data.url = base64data;
    instance.data.actions = true;
    instance.triggerEvent('uploaded')
    
    if (properties.save == true){
     function uploadContentCallback(err, url) {
        if (url) {
            instance.publishState('audiobubble',url);
            instance.triggerEvent('saved', function (err){});
            
      }
      else {
          console.log("Audio Not Saved","Url Empty",err);
      }   
    }

    instance.data.uploadContentCallback= uploadContentCallback;

  var audio =  base64data.substring(base64data.indexOf(',')+1);
       context.uploadContent(properties.filename+".mp3",audio,instance.data.uploadContentCallback);    
              
    }
    
};    
                
      }).catch((e) => {
        console.error(e);
      });
    
    
    
    
    
});

}