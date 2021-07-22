const timeline = gsap.timeline({ defaults: { duration: 0.5, delay: 0.5 } });

timeline
  .to("#path17", { y: "-113%", delay: 2 })
  .to("#path18", { x: "-113%" })
  .to("#path13", { y: "113%" })
  .to("#path9", { y: "113%" })
  .to("#path8", { x: "113%" })
  .to("#path7", { x: "113%" })
  .to("#path12", { y: "-113%" })
  .to("#path16", { y: "-113%" })
  .to("#path18", { x: "+=-113%" })
  .to("#path17", { y: "0" });

timeline.repeat(Infinity);

const home = document.querySelector('.home');
const leaderboard = document.querySelector('.leaderboard');
const trophy = document.querySelector('.trophy');
const back = document.querySelector('.back');
const footer = document.querySelector('.footer');

trophy.onclick = () => {
  home.classList.add('hide');
  leaderboard.classList.remove('hide');
  document.body.classList.add('white');
  footer.classList.add('grey');
}

back.onclick = () => {
  home.classList.remove('hide');
  leaderboard.classList.add('hide');
  document.body.classList.remove('white');
  footer.classList.remove('grey');
}