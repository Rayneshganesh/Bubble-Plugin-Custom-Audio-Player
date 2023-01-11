function(instance, properties, context) {

instance.data.recorder.stop();
instance.data.url = "";
instance.data.actions = false;
instance.data.clear = false;
instance.publishState('audiobubble');
instance.publishState('audio');
instance.publishState('recording',false);
instance.publishState('time',0);


}