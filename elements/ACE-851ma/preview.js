function(instance, properties) {

  let style;
  let inputId = 'input' + Math.random().toString(16).substring(2, 16);

  const timeProgress = document.createElement('input');
  timeProgress.id = inputId;
  timeProgress.type = 'range';
  timeProgress.min = 0;
  timeProgress.value = 0;
  timeProgress.style.width = '95%';
  timeProgress.style.height = '3px';
  timeProgress.style.appearance = 'none';
  timeProgress.style.borderRadius = '3px';
  timeProgress.style.background = properties.bg_color;


  if (properties.useprogress) {
    if (style) {
      style.innerHTML = `#${inputId}::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-style: none; 
    border-radius: 12px;
    cursor: pointer;
    background: ${properties.slider_color};
    }
    #${inputId}::-moz-range-thumb {
   	-webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-style: none; 
    border-radius: 12px;
    cursor: pointer;
    background: ${properties.slider_color};
    }`
    } else {

      style = document.createElement('style');
      style.innerHTML = `#${inputId}::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-style: none; 
    border-radius: 12px;
    cursor: pointer;
    background: ${properties.slider_color};
    }
    #${inputId}::-moz-range-thumb {
   	-webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-style: none; 
    border-radius: 12px;
    cursor: pointer;
    background: ${properties.slider_color};
    }`

      document.head.appendChild(style);
    }

    document.body.appendChild(timeProgress);
  }
}
