let mainMenu, videoPage, videoTitle, backButton, videoPlayer;

const Videos = [
  { title: 'Science Discoveries Beyond Earth', image: 'science-discoveries.png', video: 'science-discoveries.mp4'},
  { title: 'Desert Research and Technology Studies (RATS)', image: 'rats.png', video: 'rats.mp4'},
  { title: 'Lynn Carter (Research Space Scientist)', image: 'lynn-carter.png', video: 'lynn-carter.mov'},
  { title: 'Mars Planetary Rover Challenge', image: 'rover.png', video: 'rover.mp4'},
  { title: 'Intelligent Robotics Team Rover Test (ARC)', image: 'arc.png', video: 'arc.mov'},
  { title: 'Technology Drives Exploration', image: 'technology-drives.png', video: 'technology-drives.mp4'},
  { title: 'What Causes Day Length to Change from Summer to Winter', image: 'day-length.png', video: 'day-length.mp4'},
  { title: 'Taking the Next Giant Leap - Back to the Moon', image: 'giant-leap.png', video: 'giant-leap.mp4'},
  { title: 'SpaceX Science Delivery to the International Space Station', image: 'spacex.png', video: 'spacex.mp4'},
  { title: 'Space to Ground - One Year in Space', image: 'one-year.png', video: 'one-year.mp4'},
  { title: 'Brent Garry, Geologist at Goddard Space Center', image: 'brent-garry.png', video: 'brent-garry.mov'},
  { title: 'Discussing the Return to the Moon', image: 'discussing.png', video: 'discussing.mp4'}
];

const startup = () => {
  mainMenu = document.getElementById('main-menu');
  videoPage = document.getElementById('video-page');
  videoTitle = document.getElementById('video-title');
  backButton = document.getElementById('back-button');
  videoPlayer = document.getElementById('video-player');

  goToMainMenu();
  addVideosToMainMenu();

  // add touch events
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

const goToSplashScreen = () => {
  mainMenu.style.display = 'none';
  videoPage.style.display = 'none';
};

const goToMainMenu = () => {
  mainMenu.style.display = 'flex';
  videoPage.style.display = 'none';

  videoPlayer.pause();
};

const goToVideoPage = video => {
  mainMenu.style.display = 'none';
  videoPage.style.display = 'flex';

  videoTitle.innerText = video.title;
  videoPlayer.src = `assets/videos/${video.video}`;
  videoPlayer.volume = 1.0;
  videoPlayer.play();
};