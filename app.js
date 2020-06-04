//mapping to the HTML document
const song= document.querySelector(".song");
const play= document.querySelector(".play");
const replay= document.querySelector(".replay");
const video= document.querySelector(".vid-container video");
const outline= document.querySelector(".moving-outline circle");
//sounds
const sounds= document.querySelectorAll(".sound-picker button");
//display
const timeDisplay= document.querySelector(".time-display");
const outlineLength = outline.getTotalLength();
//duration
const timeSelect= document.querySelectorAll(".time-select button");
let fakeDuration= 10;
//--------------------------------------------------------------------------------------------------------
// ::??
//
outline.style.strokeDashoffset= outlineLength;
outline.style.strokeDasharray= outlineLength;

timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
    fakeDuration % 60
  )}`;
//-----------------------------------------------------------------------------------------------------------
// event Listeners. what happens when buttons are clicked
//this.getAttribute::??
  sounds.forEach(sound => {
      sound.addEventListener("click", function(){
          song.src= this.getAttribute("data-sound");
          video.src= this.getAttribute("data-video");
          checkPlaying(song);
      });
  });
  play.addEventListener("click", function() {
    checkPlaying(song);
  });
  
  replay.addEventListener("click", function() {
      restartSong(song);
      
    });
    timeSelect.forEach(option =>{
        option.addEventListener("click", function(){
            if(option == document.getElementById("custom")){
                fakeDuration = document.getElementById("ctime").value
            }else{
           fakeDuration= this.getAttribute("data-time");
            }
           timeDisplay.textContent= `${Math.floor(fakeDuration / 60)}:${
            Math.floor(fakeDuration % 60) 
           }`;
        });
    });
//-------------------------------------------------------------------------------------------------------------------
//the restart and check playing functions. 
//check playing function: what to do depending on playing song
    const restartSong = song =>{
        let currenttime= song.currentTime;
        song.currentTime= 0;
    } 
    
  const checkPlaying= song=>{
      if (song.paused) {
          song.play();
          video.play();
          play.src = "./svg/pause.svg";
      }else{
          song.pause();
          video.pause();
          play.src = "./svg/play.svg"
      }
    };
//-------------------------------------------------------------------------------------------------------------------
//::??
//
song.ontimeupdate = function(){
    let currentTime = song.currentTime;
    let elapsed= fakeDuration - currentTime;
    let seconds= Math.floor(elapsed % 60);
    let minutes= Math.floor(elapsed / 60);
    timeDisplay.textContent= `${minutes}:${seconds}`;
    let progress= outlineLength - (currentTime/fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    if(currentTime >= fakeDuration){
        song.pause();
        song.currentTime = 0;
        play.src = "./svg/play.svg";
        video.pause();

    }
};
    
