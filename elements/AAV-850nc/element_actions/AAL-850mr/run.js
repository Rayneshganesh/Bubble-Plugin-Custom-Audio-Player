function(instance, properties, context) {

  if (instance.data.actions == true){
var link = document.createElement('a');

    if (typeof link.download === 'string') {

        link.href = instance.data.url;
        link.download = properties.filename+".mp3";

        document.body.appendChild(link);
        link.click();document.body.removeChild(link);
        }
    };


}