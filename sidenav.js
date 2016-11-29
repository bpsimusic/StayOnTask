
document.addEventListener("DOMContentLoaded", function(){
  let hamburger = document.getElementById("hamburger");
  let mySideNav = document.getElementById("mySideNav");
  hamburger.addEventListener("click", openNav);
  mySideNav.addEventListener("click", closeNav);
})


function openNav() {
    document.getElementById("mySideNav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySideNav").style.width = "0";
}
