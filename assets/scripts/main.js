let splashScreen, mainMenu, videoPage, videoTitle, backButton, videoPlayer;
let resetTimeout;

const Videos = [
  { title: 'Science Discoveries Beyond Earth', image: 'science-discoveries.png', video: 'science-discoveries.mp4'},
  { title: 'Desert Research and Technology Studies (RATS)', image: 'rats.png', video: 'rats.mp4'},
  { title: 'Lynn Carter (Research Space Scientist)', image: 'lynn-carter.png', video: 'lynn-carter.mov'},
  { title: 'Mars Planetary Rover Challenge', image: 'rover.png', video: 'rover.mp4'},
  { title: 'Intelligent Robotics Team Rover Test (ARC)', image: 'arc.png', video: 'arc.mov'},
  { title: 'Technology Drives Exploration', image: 'technology-drives.png', video: 'technology-drives.mp4'},
  { title: 'Propulsion Systems and American Leadership', image: 'propulsion-system.png', video: 'propulsion-system.mp4'},
  { title: 'Taking the Next Giant Leap - Back to the Moon', image: 'giant-leap.png', video: 'giant-leap.mp4'},
  { title: 'SpaceX Science Delivery to the International Space Station', image: 'spacex.png', video: 'spacex.mp4'},
  { title: 'Space to Ground - One Year in Space', image: 'one-year.png', video: 'one-year.mp4'},
  { title: 'Brent Garry, Geologist at Goddard Space Center', image: 'brent-garry.png', video: 'brent-garry.mov'},
  { title: 'Discussing the Return to the Moon', image: 'discussing.png', video: 'discussing.mp4'}
];

const startup = () => {
  splashScreen = document.getElementById('splash-screen');
  mainMenu = document.getElementById('main-menu');
  videoPage = document.getElementById('video-page');
  videoTitle = document.getElementById('video-title');
  backButton = document.getElementById('back-button');
  videoPlayer = document.getElementById('video-player');

  goToSplashScreen();
  addVideosToMainMenu();

  // add touch events
  splashScreen.addEventListener('click', goToMainMenu);
  backButton.addEventListener('click', goToMainMenu);
  videoPlayer.onended = goToMainMenu;

  // prevent context menu from appearing
  window.addEventListener("contextmenu", function(e) { e.preventDefault(); });
};

const addVideosToMainMenu = () => {
  Videos.forEach(video => {
    let videoNode = document.createElement('div');
    videoNode.className = 'video';

    let videoContainerNode = document.createElement('div');
    videoContainerNode.className = 'video-container';
    videoContainerNode.addEventListener('click', () => goToVideoPage(video));

    let imageNode = document.createElement('div');
    imageNode.className = 'video-image';
    imageNode.style.backgroundImage = `url('assets/images/${video.image}')`;

    let labelNode = document.createElement('div');
    labelNode.className = 'video-label';
    labelNode.innerHTML = video.title;

    videoContainerNode.appendChild(imageNode);
    videoContainerNode.appendChild(labelNode);
    videoNode.appendChild(videoContainerNode);
    mainMenu.appendChild(videoNode);
  });
};

const handleReset = () => {
  goToSplashScreen();
  resetTimeout = null;
};

const cancelReset = () => {
  if (resetTimeout) {
    clearTimeout(resetTimeout);
    resetTimeout = null;
  }
};

const goToSplashScreen = () => {
  splashScreen.style.display = 'flex';
  mainMenu.style.display = 'none';
  videoPage.style.display = 'none';
};

const goToMainMenu = () => {
  splashScreen.style.display = 'none';
  mainMenu.style.display = 'flex';
  videoPage.style.display = 'none';

  videoPlayer.pause();

  resetTimeout = setTimeout(handleReset, 60000);
};

const goToVideoPage = video => {
  splashScreen.style.display = 'none';
  mainMenu.style.display = 'none';
  videoPage.style.display = 'flex';

  cancelReset();

  videoTitle.innerText = video.title;
  videoPlayer.src = `assets/videos/${video.video}`;
  videoPlayer.volume = 1.0;
  videoPlayer.play();
};