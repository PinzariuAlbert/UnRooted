document.getElementById("muteBtn").addEventListener("onclick", mute_all_sounds)
// document.getElementById("quitBtn").addEventListener("onclick", mute_all_sounds)
// document.getElementById("tutorialBtn").addEventListener("onclick", mute_all_sounds)

function mute_one_element(element){
    if(element.muted){
    element.muted = true;
    element.pause()
    }
    else {
        element.muted = false;
        element.pause();
    }
}
// this is the function that actually gets called by the MuteBtn. itmutes all the elements one by one with the function mute_one_element
function mute_all_sounds(){
    document.querySelectorAll("audio").forEach((element) => mute_one_element(element));
}