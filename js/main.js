
function getGreeting() {
    let hour = new Date().getHours();
    if(hour >= 21  || hour <= 6) {
        return "Buenas noches!";
    } else if(hour >= 7 && hour <= 11) {
        return "Buenos dias!";
    } else if(hour >= 12 && hour <= 20) {
        return "Buenas tardes!";
    } else {
        return "En que planeta vives? Cód. Error: 0x234";
    }
}
if(!document.location.search.includes(";SEARCH:")) {
    document.querySelector("#greeting").innerText = getGreeting();
}

let songs = [
    {"songname":"Let's go", "songartist": "Lensko", "totalname": "lensko-letsgo", "imagetype":"jpg", "licence":"http://ncs.io/letsgo"},
    {"songname":"Take me back", "songartist": "More Plastic", "totalname": "moreplastic-takemeback", "imagetype":"jpg", "licence":"Track: More Plastic - Take Me Back [NCS Release]. Music provided by NoCopyrightSounds. Watch: http://ncs.lnk.to/takemebackAT/youtube. Free Download / Stream: http://ncs.io/takemeback"},
    {"songname":"Fearless pt. II (feat. Chris Liton)", "songartist": "Lost Sky", "totalname": "lostsky-fearlessptIIftechrislinton", "imagetype":"jpg", "licence":"Track: Lost Sky - Fearless pt.II (feat. Chris Linton) [NCS Release]. Music provided by NoCopyrightSounds. Free Download / Stream: http://ncs.io/Fearless2YO"},
    {"songname":"Shine", "songartist":"Spektrem", "totalname":"spektrem-shine", "imagetype":"jpg","licence":"Song: Spektrem - Shine [NCS Release]\nMusic provided by NoCopyrightSounds\nFree Download/Stream: http://ncs.io/shine\nWatch: http://youtu.be/n4tK7LYFxI0"}
];

let audio = new Audio();
let palyed = false;
let aloop = false;
let played = false;
let lasttime = audio.currentTime;
let searchInput = document.querySelector("#input").value;

document.querySelector("#input").addEventListener('input', (e) => {
    searchInput = document.querySelector("#input").value;
});

document.querySelector("#loop").addEventListener('click', (e) => {
    if(aloop == false) aloop = true
    else aloop = false;
    audio.loop = aloop;
    if(aloop) { document.querySelector("#loop").style.backgroundColor = "rgb(3, 94, 10)" }
    else { document.querySelector("#loop").style.backgroundColor = ""; }
});

document.querySelector("#pauseplay").addEventListener('click', (e) => {
    if(played == false) played = true
    else played = false;
    
    if(played) { document.querySelector("#pauseplay").style.backgroundColor = "rgb(3, 94, 10)"; audio.pause() }
    else { document.querySelector("#pauseplay").style.backgroundColor = ""; audio.play() }
});

function loop() {  
    let strCurrentTime = audio.currentTime + "";
    strCurrentTime = strCurrentTime.slice(0, strCurrentTime.lastIndexOf("."));
    let strCalcDuration = (audio.duration - audio.currentTime) + "";
    strCalcDuration = strCalcDuration.slice(0, strCalcDuration.lastIndexOf("."));
    let strDuration = audio.duration + "";
    strDuration = strDuration.slice(0, strDuration.lastIndexOf("."));
    
    document.querySelector("#myRange").max = strDuration;
        lasttime = audio.currentTime;
        document.querySelector("#myRange").value = strCurrentTime;
   

    document.querySelector("#time-duration").innerText = strCurrentTime + "segs - " + strCalcDuration + "segs - " + strDuration + "segs";
    setTimeout("loop()",1000);
}

if(document.location.search != "" && palyed == false && document.location.search.includes(";SEARCH:")) {
    for(let i = 0; i < songs.length; i++) {
        document.querySelector("#results").innerHTML += "<li class='" + songs[i].totalname + "'><img width='160' height='100' src='db/images/" + songs[i].totalname + "." + songs[i].imagetype + "'><p>" + songs[i].songname + " - " + songs[i].songartist + "</p></li>";
    }
}

window.addEventListener('click', (e) => {
    if(document.location.search != "" && palyed == false && document.location.search.includes(";SEARCH:")) {
        // ?SONG:x;TIME:x;SEARCH:search
        let songname = document.location.search.slice(6, document.location.search.indexOf(";"));
        let time = document.location.search.slice(document.location.search.indexOf(";TIME:") + 6, document.location.search.indexOf(";SEARCH:"));
        
        audio.src = "db/music/" + songname + ".mp3";
        audio.currentTime = time;
        audio.play();
        let array;
        for(let i = 0; i < songs.length; i++) {
            if(songs[i].totalname == songname) {
                document.querySelector("#songname").innerText = songs[i].songname;
                document.querySelector("#songartist").innerText = songs[i].songartist;
                document.querySelector("#songimage").src = "db/images/" + songs[i].totalname + "." + songs[i].imagetype;
            }
        }
        palyed = true;
        played = true;
        loop()
    } else if(document.location.search != "" && palyed == false) {
        let songname = document.location.search.slice(6,document.location.search.lastIndexOf(';'));
        let time = document.location.search.slice(document.location.search.lastIndexOf(':') + 1);
        audio.src = "db/music/" + songname + ".mp3";
        audio.currentTime = time;
        audio.play();
        let array;
        for(let i = 0; i < songs.length; i++) {
            if(songs[i].totalname == songname) {
                document.querySelector("#songname").innerText = songs[i].songname;
                document.querySelector("#songartist").innerText = songs[i].songartist;
                document.querySelector("#songimage").src = "db/images/" + songs[i].totalname + "." + songs[i].imagetype;
            }
        }
        palyed = true;
        played = true;
        loop()
    }
})

if(!document.location.search.includes(";SEARCH:")) {
    for(let i = 0; i < songs.length; i++) {
        let randnum = Math.floor(Math.random() * songs.length);
        document.querySelector("#disc1").innerHTML += "<li class='" + songs[randnum].totalname + "'><img width='160' height='100' src='db/images/" + songs[randnum].totalname + "." + songs[randnum].imagetype + "'><p>" + songs[randnum].songname + " - " + songs[randnum].songartist + "</p></li>";
    }
}

document.querySelector("#reloadButton").addEventListener('click', (e) => {
    document.querySelector("#disc1").innerHTML = "";
    if(!document.location.search.includes(";SEARCH:")) {
        for(let i = 0; i < songs.length; i++) {
            let randnum = Math.floor(Math.random() * songs.length);
            document.querySelector("#disc1").innerHTML += "<li class='" + songs[randnum].totalname + "'><img width='160' height='100' src='db/images/" + songs[randnum].totalname + "." + songs[randnum].imagetype + "'><p>" + songs[randnum].songname + " - " + songs[randnum].songartist + "</p></li>";
        }
        songs.forEach(song => {
            document.querySelectorAll("li." + song.totalname).forEach(elem => {
                elem.addEventListener('click', (e) => {
                    if(!e.ctrlKey) {
                        audio.src = "db/music/" + song.totalname + ".mp3";
                        document.querySelector("#songname").innerText = song.songname;
                        document.querySelector("#songartist").innerText = song.songartist;
                        document.querySelector("#songimage").src = "db/images/" + song.totalname + "." + song.imagetype;
                        audio.play();
                        document.querySelector("#gotomain").addEventListener('click', (e) => {
                            document.location.href = "index.html?SONG:" + song.totalname + ";TIME:" + audio.currentTime;
                        });
                        document.querySelector("#searchButton").addEventListener('click', (e) => {
                            document.location.href = "search.html?SONG:" + song.totalname + ";TIME:" + audio.currentTime + "?SEARCH:" + searchInput;
                        });
                        /*
                        document.querySelector("#deLite").addEventListener('click', (e) => {
                            document.location.href = "deLite.html?SONG:" + song.totalname + ";TIME:" + audio.currentTime;
                        });*/
                                
                        palyed = true;
                        played = true;
                        loop()
                    } else {
                        alert(song.licence)
                    }
                });
            }); 
        });
    }
});

songs.forEach(song => {
    document.querySelectorAll("li." + song.totalname).forEach(elem => {
        elem.addEventListener('click', (e) => {
            if(!e.ctrlKey && !e.altKey) {
            
                audio.src = "db/music/" + song.totalname + ".mp3";
                document.querySelector("#songname").innerText = song.songname;
                document.querySelector("#songartist").innerText = song.songartist;
                document.querySelector("#songimage").src = "db/images/" + song.totalname + "." + song.imagetype;
                audio.play();
                document.querySelector("#gotomain").addEventListener('click', (e) => {
                    document.location.href = "index.html?SONG:" + song.totalname + ";TIME:" + audio.currentTime;
                });
                document.querySelector("#searchButton").addEventListener('click', (e) => {
                    document.location.href = "search.html?SONG:" + song.totalname + ";TIME:" + audio.currentTime + "?SEARCH:" + searchInput;
                });
                /*
                document.querySelector("#deLite").addEventListener('click', (e) => {
                    document.location.href = "deLite.html?SONG:" + song.totalname + ";TIME:" + audio.currentTime;
                });*/
                
        palyed = true;
        played = true;
        loop()
            } else if(e.ctrlKey && !e.altKey) {
                document.querySelector("#license").innerText = song.licence;
                document.querySelector("#licenseModal").style.display = "block";
            } if(e.altKey && !e.ctrlKey) {

                document.location.href = "mailto:abc@example.com?subject = Escucha esta cancion en Lite Music&body = Te comparto esta cancion de Lite Music: " + "index.html?SONG:" + song.totalname + ";TIME:0";
            }
        });
    }); 
});

document.querySelector("#btn").addEventListener('click', (e) => {
    document.location.href = "search.html?SONG:" + audio.currentSrc.slice(10, audio.currentSrc.length - 3) + ";TIME:" + audio.currentTime + ";SEARCH:" + searchInput;
});
