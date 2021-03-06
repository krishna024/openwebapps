// Inject a new API into navigator to present a merged web & native app list
navigator.apps = (function() {
    var _state;
    var _nativeApps = {};
    var _demoNativeApps = {
        "Camera":"", "Slacker":"", "Video":"", "Gmail":"", "Swype":"",
        "AllShare":"", "YouTube":"", "Market":"", "My files":"",
        "Sound Recorder":"", "Blockbuster":"", "Amazon Kindle":"",
        "Google Search":"", "Contacts":"", "Calendar":"", "Messaging":"",
        "NYTimes":"", "Clock":"", "Contacts":"", "Email":"", "Music":"",
        "Fennec":"", "Browser":"", "Settings":"", "Talk":"", "Latitude":"",
        "NYT Web":"", "Zeit Online":"", "Marble Run":"", "Favimon":""
    };
    var webapps = {
    "http://tubagames.net": {
        "origin": "http://tubagames.net",
        "src_url": "http://tubagames.net/barfight_manifest.php",
        "manifest": {
            "icons": {
                "128": "/barfight/images/webappicon_128.png"
            },
            "installs_allowed_from": [
                "*"
            ],
            "developer": {
                "url": "http://www.tubagames.net",
                "name": "TuBaGames"
            },
            "name": "BarFight",
            "description": "BarFight is set in a 1950's Hollywood Western movie set - where the extras compete to impress the director as the inevitable bar fight breaks out. The game is an MMO and a chat room. You can meet up with your friends, chat, play a round of poker, listen to the piano player as you watch the dancing girls...oh...and smash each other over the head with chairs of course! All in glorious third person perspective (also in actual 3D if you bring your own glasses!). The wardrobe department lets you customize your character and set your stats."
        }
    },
    "http://www.davesgalaxy.com": {
        "origin": "http://www.davesgalaxy.com",
        "src_url": "http://www.davesgalaxy.com/site_media/mozilla.manifest",
        "manifest": {
            "widget": {
                "path": "/demo/",
                "height": 800,
                "width": 1000
            },
            "name": "Dave's Galaxy",
            "icons": {
                "128": "/site_media/icon128.png",
                "48": "/site_media/icon48.png",
                "16": "/site_media/favicon.png"
            },
            "installs_allowed_from": [
                "*"
            ],
            "description": "Conquer the Galaxy in less than 10 Minutes a Day",
            "version": "1.0",
            "developer": {
                "url": "http://blog.davesgalaxy.com/blog",
                "name": "Dave Case"
            }
        }
    },
    "http://shazow.net": {
        "origin": "http://shazow.net",
        "src_url": "http://shazow.net/linerage/gameon/manifest.json",
        "manifest": {
            "name": "LineRage",
            "icons": {
                "128": "/linerage/gameon/icon_128.png",
                "32": "/linerage/gameon/icon_32.png",
                "16": "/linerage/gameon/icon_16.png"
            },
            "installs_allowed_from": [
                "*"
            ],
            "description": "You are a line. Don't hit things.",
            "launch_path": "/linerage/gameon/index.html",
            "developer": {
                "url": "http://shazow.net",
                "name": "Andrey Petrov"
            }
        }
    },
    "http://regamez.com": {
        "origin": "http://regamez.com",
        "src_url": "http://regamez.com/madtanks/mozilla.webapp",
        "manifest": {
            "name": "Mad Tanks TD",
            "icons": {
                "128": "/madtanks/icon128.png"
            },
            "installs_allowed_from": [
                "*"
            ],
            "description": "Tower Defense game. In the future wars will be fought by automated tanks. In the year of 2070 something went wrong with the A.I. and now you have to defend against mad machines. There are 20 bases to defend. Killing all tanks gives you a perfect win. Please read in-game help for keyboard shortcuts. IE is not supported, it works, but poorly.",
            "launch_path": "/madtanks",
            "developer": {
                "url": "http://www.refuture.eu",
                "name": "ReFuture"
            }
        }
    },
    "http://appmanifest.org": {
        "origin": "http://appmanifest.org",
        "src_url": "http://appmanifest.org/manifest.webapp",
        "manifest": {
            "name": "Manifest Checker",
            "icons": {
                "128": "/img/logo_128.png"
            },
            "installs_allowed_from": [
                "http://people.mozilla.org",
                "http://apps.mozillalabs.com",
                "https://apps.mozillalabs.com"
            ],
            "description": "A development tool and demonstration app that helps you check your open web app manifests.",
            "launch_path": "/",
            "developer": {
                "url": "http://mozillalabs.com",
                "name": "Mozilla Labs"
            }
        }
    },
    "http://openodyssey.mibbu.eu": {
        "origin": "http://openodyssey.mibbu.eu",
        "src_url": "http://openodyssey.mibbu.eu/manifest.php",
        "manifest": {
            "name": "OpenOdyssey",
            "icons": {
                "128": "/icon_128.png"
            },
            "installs_allowed_from": [
                "*"
            ],
            "description": "Help mythical Odysseus to return home in classical top-down shooter.",
            "launch_path": "/game/index.html",
            "developer": {
                "url": "http://michalbe.blogspot.com",
                "name": "Michal Budzynski"
            }
        }
    },
    "http://photobooth.mozillalabs.com": {
        "origin": "http://photobooth.mozillalabs.com",
        "src_url": "http://photobooth.mozillalabs.com/rainbooth.webapp",
        "manifest": {
            "name": "Rainbooth",
            "default_locale": "en",
            "icons": {
                "128": "/i/rainbow_128.png",
                "256": "/i/rainbow.png",
                "48": "/i/rainbow_48.png"
            },
            "installs_allowed_from": [
                "https://apps.mozillalabs.com"
            ],
            "description": "Snap pictures and share them with friends!",
            "version": "0.1",
            "developer": {
                "url": "http://mozillalabs.com",
                "name": "Mozilla Labs"
            }
        }
    },
    "http://raptjs.com": {
        "origin": "http://raptjs.com",
        "src_url": "http://raptjs.com/manifest.webapp",
        "manifest": {
            "name": "Robots Are People Too",
            "icons": {
                "128": "/images/icon_128.png"
            },
            "installs_allowed_from": [
                "*"
            ],
            "description": "RAPT is a complex and challenging HTML5 platformer.  The exit to each level is blocked by enemies that roll, jump, fly, and shoot to prevent escape at all costs.  Gameplay is exclusively two-player and uses a unique split-screen mechanic.  The levels and enemies are designed to promote cooperation between players.\u000a\u000aRAPT also comes with a powerful level editor which allows players to create levels of any size.  Levels are saved to the player's account on the server, which has a public page listing custom levels.  Link to this page to share your levels with friends.",
            "launch_path": "/play/",
            "developer": {
                "url": "http://raptjs.com",
                "name": "Robots Are People Too"
            }
        }
    },
    "http://www.limejs.com": {
        "origin": "http://www.limejs.com",
        "src_url": "http://www.limejs.com/roundball.webapp",
        "manifest": {
            "name": "Roundball",
            "icons": {
                "128": "/static/roundball_icon_128.png"
            },
            "installs_allowed_from": [
                "*"
            ],
            "description": "Roundball is a fun match three puzzle game where you form horizontal or vertical lines of at least three similar objects by swapping two adjacent items. The more matches you make, the higher your score. Two game modes: Classic and Timed mode. Works on regular computer or on touchscreens.",
            "launch_path": "/static/roundball/index.html",
            "developer": {
                "url": "http://www.limejs.com/",
                "name": "Digital Fruit"
            }
        }
    },
    "http://sinuousgame.com": {
        "origin": "http://sinuousgame.com",
        "src_url": "http://sinuousgame.com/manifest.webapp",
        "manifest": {
            "name": "Sinuous",
            "icons": {
                "128": "/assets/images/icon_128.png"
            },
            "installs_allowed_from": [
                "*"
            ],
            "description": "Avoid the red dots in this fun and addictive game.",
            "launch_path": "/",
            "developer": {
                "url": "http://hakim.se/experiments/",
                "name": "Hakim El Hattab"
            }
        }
    },
    "http://hakim.se": {
        "origin": "http://hakim.se",
        "src_url": "http://hakim.se/experiments/html5/sketch/manifest.webapp",
        "manifest": {
            "name": "Sketch",
            "icons": {
                "128": "/experiments/html5/sketch/images/icon_128.png"
            },
            "installs_allowed_from": [
                "*"
            ],
            "description": "Draw sketches with animating lines in pseudo 3D",
            "launch_path": "/experiments/html5/sketch/",
            "developer": {
                "url": "http://hakim.se/experiments/",
                "name": "Hakim El Hattab"
            }
        }
    },
    "http://www.paulbrunt.co.uk": {
        "origin": "http://www.paulbrunt.co.uk",
        "src_url": "http://www.paulbrunt.co.uk/steamcube/manifest.webapp",
        "manifest": {
            "name": "Steamcube",
            "icons": {
                "128": "/steamcube/icon.png"
            },
            "installs_allowed_from": [
                "*"
            ],
            "description": "A simple 2.5D brain teaser block puzzle game. Find out how far can you get before time runs out?",
            "launch_path": "/steamcube/index.php",
            "developer": {
                "url": "http://www.glge.org",
                "name": "Paul Brunt"
            }
        }
    },
    "http://stillalivejs.t4ils.com": {
        "origin": "http://stillalivejs.t4ils.com",
        "src_url": "http://stillalivejs.t4ils.com/play/manifest.webapp",
        "manifest": {
            "name": "StillAliveJS",
            "icons": {
                "128": "/play/images/icon128.png"
            },
            "installs_allowed_from": [
                "*"
            ],
            "description": "StillAliveJS, or SaJS, is a puzzle game inspired by Portal: The Flash Version which is a 2D renewal of Portal, developed by Valve Corporation.\u000a\u000aSaJS consists primarily in a series of platform puzzles that must be solved by teleporting the character and other simple objects using a Portal Gun. The unusual physics allowed by this device is the emphasis of StillAliveJS.",
            "launch_path": "/play/index.html",
            "developer": {
                "url": "http://stillalivejs.t4ils.com/",
                "name": "t4ils and Zeblackos"
            }
        }
    },
    "http://www.harmmade.com": {
        "origin": "http://www.harmmade.com",
        "src_url": "http://www.harmmade.com/vectorracer/manifest.webapp",
        "manifest": {
            "name": "Vector Racer",
            "icons": {
                "128": "/vectorracer/images/vectorracer_icon_128.png"
            },
            "installs_allowed_from": [
                "*"
            ],
            "description": "Vector Racer is a turn-based racing game, which simulates a car race on a squared sheet of paper. You move from one grid point to another and have to try to get to the finish in the least amount of turns.",
            "launch_path": "/vectorracer/",
            "developer": {
                "url": "http://www.harmboschloo.com/",
                "name": "Harm Boschloo"
            }
        }
    },
    "http://websnooker.com": {
        "origin": "http://websnooker.com",
        "src_url": "http://websnooker.com/manifest.webapp",
        "manifest": {
            "icons": {
                "128": "/media/images/icon_128.png"
            },
            "installs_allowed_from": [
                "*"
            ],
            "developer": {
                "url": "http://pordesign.eu",
                "name": "Por Design"
            },
            "name": "Web Snooker",
            "description": "Free online web-based snooker game"
        }
    },
    "http://www.phoboslab.org": {
        "origin": "http://www.phoboslab.org",
        "src_url": "http://www.phoboslab.org/ztype/manifest.webapp",
        "manifest": {
            "name": "Z-Type",
            "icons": {
                "128": "/ztype/media/icon-128.png"
            },
            "installs_allowed_from": [
                "*"
            ],
            "description": "A Space Shoot'em'up where you type to shoot.",
            "launch_path": "/ztype/",
            "developer": {
                "url": "http://www.phoboslab.org/",
                "name": "Dominic Szablewski"
            }
        }
    },
    "http://www.limejs.com": {
        "origin": "http://www.limejs.com",
        "src_url": "http://www.limejs.com/zlizer.webapp",
        "manifest": {
            "name": "Zlizer",
            "icons": {
                "128": "/static/zlizer_icon_128.png"
            },
            "installs_allowed_from": [
                "*"
            ],
            "description": "Slice or join quicly! Simple and entertaining math game. Add or divide quickly to get magic number as the numbers fall, or you'll lose! It's speed math! Works on regular computer or on touchscreens.",
            "launch_path": "/static/zlizer/index.html",
            "developer": {
                "url": "http://www.limejs.com/",
                "name": "Digital Fruit"
            }
        }
    }
};            

    function doList(onsuccess, onerror) {
        navigator.service.ApplicationManager.getInstalledApplications(
            function(apps, count) {
                // Add native apps to the webapp list
                for (var i = 0; i < count; i++) {
                    if (apps[i].name in _demoNativeApps) {
                    var id = "android://" + i;
                    _nativeApps[id] = apps[i];
                    webapps[id] = {
                        origin: id,
                        manifest: {
                            name: apps[i].name,
                            description: apps[i].description,
                            icons: {
                                "48": apps[i].icon
                            }
                        }
                    };
                    }
                }
                if (onsuccess) onsuccess(webapps);
            },
            function(code, message) {
                if (onerror) onerror(message);
            }
        );
    }

    function doLaunch(id, onsuccess, onerror) {
        if (id.substr(0, 10) == "android://") {
            navigator.service.ApplicationManager.launchApplication(
                _nativeApps[id]
            );
            if (onsuccess) onsuccess(true);
        } else {
            var path = webapps[id].manifest.launch_path;
            window.open(webapps[id].origin + (path ? path : "/"));
        }
    }

    function doSaveState(state, onsuccess) {
        _state = state;
        if (onsuccess) onsuccess(true);
    }

    function doLoadState(onsuccess) {
        if (onsuccess) onsuccess(_state);
    }

    return {
        mgmt: {
            list: doList,
            launch: doLaunch,
            saveState: doSaveState,
            loadState: doLoadState
        }
    };
})();
