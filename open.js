'use strict'

function canvasLoad(){
    const setCanvas = document.querySelectorAll('canvas');
    for (const arrCanvas of setCanvas){
      const searchCanvas = arrCanvas.getContext('2d');
      searchCanvas.fillStyle = 'lightgreen';
      searchCanvas.fillRect(0, 0, 100, 80 );
    }
}

canvasLoad()