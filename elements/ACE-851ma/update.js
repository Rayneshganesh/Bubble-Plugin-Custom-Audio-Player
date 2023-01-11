function(instance, properties, context) {


  const audioPlayer = document.getElementById(instance.data.audioId);

  if (audioPlayer) {
    audioPlayer.loop = properties.loop;

    if (audioPlayer.src.length === 0) {

      audioPlayer.src = properties.src

    }

    if (properties.autoplay) {
      instance.data.autoPlay = true;
    }

  }

  if (properties.useprogress) {
    if (instance.data.style) {
      instance.data.style.innerHTML = `#${instance.data.progressBarId}{
	background-color: ${properties.bg_color};
	} 
	#${instance.data.progressBarId}::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-style: none; 
    border-radius: 12px;
    cursor: pointer;
    background: ${properties.slider_color};
    }
    #${instance.data.progressBarId}::-moz-range-thumb {
   	-webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-style: none; 
    border-radius: 12px;
    cursor: pointer;
    background: ${properties.slider_color};
    }`
    } else {

      instance.data.style = document.createElement('style');
      instance.data.style.innerHTML = `#${instance.data.progressBarId}{
	background-color: ${properties.bg_color};
	} 
	#${instance.data.progressBarId}::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-style: none; 
    border-radius: 12px;
    cursor: pointer;
    background: ${properties.slider_color};
    }
    #${instance.data.progressBarId}::-moz-range-thumb {
   	-webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-style: none; 
    border-radius: 12px;
    cursor: pointer;
    background: ${properties.slider_color};
    }`

      document.head.appendChild(instance.data.style);
    }

  }

  if (properties.useprogress && instance.data.useProgress === false) {

    instance.data.useProgress = true;

    instance.data.activeProgress(properties.bg_color, properties.slider_color)

  }

}
