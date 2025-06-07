const nextButton = document.querySelector('.btn-conteiner');
const video = document.querySelector('.hero-video');

const movieList = ['videos/background1.mp4', 'videos/background2.mp4', 'videos/background3.mp4', 'videos/background5.mp4'];

let index = 0;
nextButton.addEventListener('click', function(){

    index+=1
    video.src = movieList[index]

    if (index === 3){
        index = -1;
    }
})