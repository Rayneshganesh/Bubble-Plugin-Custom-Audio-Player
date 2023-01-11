function(instance, context) {
  instance.data.audioId = 'audio-player' + Math.random().toString(16).substring(2, 14);
  instance.data.progressBarId = 'progress-bar-slider' + Math.random().toString(16).substring(2, 14);
  instance.data.useProgress = false;
  instance.data.autoPlay = false;

  let detectDevice = navigator.userAgent;
  let userDevice;
  let errors = [];
  let colorProgress, bgColor

  if (detectDevice.indexOf('iPhone') > 0 && detectDevice.indexOf('CPU iPhone') > 0 && detectDevice.indexOf('IOS iPhone') && detectDevice.indexOf('Mobile')) {
    userDevice = 'iPhone'
  } else if (detectDevice.indexOf('Android') > 0 && detectDevice.indexOf('Chrome') > 0 && detectDevice.indexOf('Mobile') > 0) {
    userDevice = 'Android';
  } else if (detectDevice.indexOf('iPad') > 0 && detectDevice.indexOf('CPU OS') > 0 && detectDevice.indexOf('Mobile')) {
    userDevice = 'iPad';
  } else if (detectDevice.indexOf('Safari') > 0 && detectDevice.indexOf('Macintosh') > 0) {
    userDevice = 'Safari Desktop';
  } else {
    userDevice = 'Desktop';
  }

  instance.publishState('userdevice', userDevice);

  const timeProgress = document.createElement('input');
  timeProgress.id = instance.data.progressBarId;
  timeProgress.type = 'range';
  timeProgress.min = 0;
  timeProgress.value = 0;
  timeProgress.style.width = '100%';
  timeProgress.style.height = '3px';
  timeProgress.style.appearance = 'none';
  timeProgress.style.borderRadius = '3px';

  const audioPlayer = document.createElement('audio');
  audioPlayer.id = instance.data.audioId;
  audioPlayer.setAttribute('preload', 'auto');
  audioPlayer.setAttribute('webkit-playsinline', '');
  audioPlayer.setAttribute('playsinline', '');
  audioPlayer.setAttribute('hidden', 'hidden');
  audioPlayer.controls = false;
  audioPlayer.muted = true;

  document.body.appendChild(audioPlayer);

  instance.data.activeProgress = function(bg, color) {
    colorProgress = color;
    bgColor = bg;

    instance.canvas.append(timeProgress)

    timeProgress.parentElement.style.padding = '0.5rem';
  }

  function timeUpdate() {
    timeProgress.value = audioPlayer.currentTime;
    let value = (100 * timeProgress.value) / timeProgress.max;
    timeProgress.style.background = `linear-gradient(to right, ${colorProgress} ${value}%, ${bgColor} ${value}%)`;
  }

  async function inputUpdate() {
    let value = (100 * timeProgress.value) / timeProgress.max;
    if (audioPlayer.duration > 0 && audioPlayer.duration !== Infinity) {
      audioPlayer.currentTime = timeProgress.value;
      timeProgress.style.background = `linear-gradient(to right, ${colorProgress} ${value}%, ${bgColor} ${value}%)`;
      audioPlayer.play();
    }
  }

  async function Play() {

    try {
      await audioPlayer.play()
      audioPlayer.play()
    } catch (err) {
      errors.push(err.message)
      instance.publishState('errors', errors);
    }
  }

  instance.data.audioReload = function() {
    audioPlayer.load()
  }

  function hasAudioCheck() {
    if (userDevice === 'iPhone' || userDevice === 'iPad' || userDevice === 'Desktop Safari') {
      return (Boolean(audioPlayer.audioTracks.length))
    } else {
      return (audioPlayer.mozHasAudio || Boolean(audioPlayer.webkitAudioDecodedByteCount))
    }
  }

  function hasAudio() {
    instance.data.hasAudio = hasAudioCheck()
    if (instance.data.hasAudio) {
      instance.publishState('hasaudio', true)
    } else {
      instance.publishState('hasaudio', false)
    }

    if (audioPlayer.muted) {
      instance.publishState('muted', true)
      instance.publishState('volume', audioPlayer.volume)
    } else {
      instance.publishState('muted', false)
      instance.publishState('volume', audioPlayer.volume)
    }

  }

  function audioIsReady() {
    if (this.readyState >= 2 && this.duration !== null && this.duration !== Infinity && this.duration > 0) {
      let hours = Math.floor(this.currentTime / 3600);
      let mins = Math.floor(this.currentTime % 3600 / 60);
      let secs = Math.floor(this.currentTime % 3600 % 60);
      let percentage = ((100 * this.currentTime) / this.duration).toFixed(0)

      if (hours <= 0) {
        instance.publishState('currentstring', mins + ':' + String(secs).padStart(2, '0'))
      } else {
        instance.publishState('currentstring', hours + ':' + mins + ':' + String(secs).padStart(2, '0'))
      }
      timeUpdate();
      instance.publishState('currentnumber', audioPlayer.currentTime);
      instance.publishState('percentage', percentage);
    }
  }

  async function getDuration() {
    timeProgress.value = audioPlayer.currentTime;
    timeProgress.max = Math.round(audioPlayer.duration);

    const hours = Math.floor(audioPlayer.duration / 3600)
    const mins = Math.floor(audioPlayer.duration % 3600 / 60)
    const secs = Math.floor(audioPlayer.duration % 3600 % 60)

    if (hours <= 0) {

      instance.publishState('durationstring', mins + ':' + String(secs).padStart(2, '0'))

    } else {

      instance.publishState('durationstring', hours + ':' + mins + ':' + String(secs).padStart(2, '0'))
    }


    instance.publishState('readystate', audioPlayer.readyState);
    instance.publishState('currentsrc', audioPlayer.src);
    instance.publishState('durationnumber', audioPlayer.duration);

    audioPlayer.addEventListener('timeupdate', audioIsReady)

    if (instance.data.autoPlay) {
      audioPlayer.muted = true;
      audioPlayer.play()

    } else {
      audioPlayer.muted = false;
    }

    hasAudio();
  }

  async function isInfinity() {
    audioPlayer.currentTime = 0
    audioPlayer.removeEventListener('timeupdate', isInfinity)

    if (audioPlayer.duration > 0) {

      getDuration()
    }
  }

  audioPlayer.addEventListener('loadeddata', function() {

    if (audioPlayer.duration === Infinity) {
      audioPlayer.currentTime = 1e101;
      audioPlayer.addEventListener('timeupdate', isInfinity)
    } else if (audioPlayer.duration > 0) {

      getDuration()

    } else {

      errors.push('Audio source is not compatible, could not get the metadata.')
      instance.publishState('errors', errors)

    }

  })

  audioPlayer.addEventListener('loadstart', (event) => {

    if (userDevice === 'iPhone' || userDevice === 'iPad') {

      audioPlayer.muted = true;
      audioPlayer.play();
      audioPlayer.pause();

      if (instance.data.autoPlay === false) {

        audioPlayer.muted = false;
      }

    }
  })

  audioPlayer.addEventListener('play', function() {

    instance.publishState('event', 'play');

  })

  audioPlayer.addEventListener('pause', function() {

    instance.publishState('event', 'pause');

  })

  audioPlayer.addEventListener('ended', function() {

    instance.publishState('event', 'ended')
    instance.triggerEvent('ended')

  })

  audioPlayer.addEventListener('error', function() {

    errors.push(audioPlayer.error.message)
    instance.publishState('errors', errors)

  })

  instance.data.play = function() {

    if (audioPlayer.paused && audioPlayer.readyState >= 2) {

      Play()

    } else {

      audioPlayer.pause()

    }
  }

  instance.data.toggleMute = function() {

    if (audioPlayer.muted) {
      audioPlayer.muted = false;
    } else {
      audioPlayer.muted = true;
    }

    instance.data.toggleVolume()
  }

  instance.data.toggleVolume = function() {

    if (audioPlayer.volume === 0 || audioPlayer.muted) {

      instance.publishState('muted', true)
      instance.publishState('volume', 0);

    } else {

      instance.publishState('muted', false)
      instance.publishState('volume', audioPlayer.volume);

    }
  }

  timeProgress.addEventListener('input', inputUpdate)
}
