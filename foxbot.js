const login = require("facebook-chat-api"),
	fs = require('fs'),
	ontime = require('ontime'), // onTime
	weather = require('weather-js'), // Weather info
    foxMath = require('mathjs'), // Calc
    Feed = require('rss-to-json'), // RSS 
	afox = require('./admins.js'),
    mfox = require('./hello.js'),
    //mi = require('./milionerzy.js'),
	version = "1.5.0",
	botId = "100022605855740"; // BOT ID !IMPORTANT


/*    GAMES SETTINGS   */

/*        VERSUS       */

    var vsPLAYERS = [];
    var vsGROUP = "";
    var vsWINNER = "";

/* - - - - - - - - - - */
/*      MILIONERZY     */

var milionerzy = false;

/* - - - - - - - - - - */


/*                     */

var useChar = "/";
var spokoj = true,
	ai = false;


/* SETTINGS */

foxMath.import({
  'import':     function () { throw new Error('Function import is disabled') },
  'createUnit': function () { throw new Error('Function createUnit is disabled') },
  'simplify':   function () { throw new Error('Function simplify is disabled') },
  'derivative': function () { throw new Error('Function derivative is disabled') }
}, {override: true});

/*          */

var commands = [ // All commands starts here:
	{
		cmd: "help",
		groupAccess: false,
		transform: true,
		hidden: false,
		syntax: " --",
		desc: "Pomoc",
		func: (api, event, args) => {
 			api.sendMessage("Pomoc (0/10)", event.threadID);
		}
	},
    {
        cmd: "cmds",
        groupAccess: false,
        transform: true,
        hidden: false,
        syntax: " --",
        desc: "Komendy",
        func: (api, event, args) => {
            api.sendMessage(`
----- foxBot -----
Komendy: 
*/help* - Jeszcze nic nie robi
*/cmdchar* [znak] - Zmienia znak '/' na wlasny
*/bash* - Losowy tekst z basha
*/zart* - Losowy zart
*/news* - Losowy news
*/time* - Wyświetla czas serwera
*/calc* [wyrażenie] - Kalkulator
*/color* [kolor] - Zmienia kolor (usuniete przez cukierberka, mozna tylko kolory ktore są dostepne przez messenger)
*/emoji* [emoji] - Zmienia emoji
*/echo* [text] - Bot wypisuje text 
*/muka* - Muka
*/add* [userID/uName] - Bot dodaje uzytkownika do grupy
*/senderid* - Wyswietla Twoje id
*/temperatura* - pokazuje temperature w C
*/random* [numer] - Losowa liczba 
*/wypierdalac* - Usuwa wszystkich z konfy prócz bota i Twórcy
*/destroy* - Usuwa wszystkich z konfy, usuwa konferencje
*/msginfo* - Liczba napisanych wiadomości od momentu dodania bota
*/bot* [nazwa] - Zmienia pseudonim bota
*/kick* [nick/userID/uName] - Usuwa uzytkownika z konferencji
*/search* [uName/nick]- Wyszukuje ID uzytkownika 
*/selfkick* - Wyrzuca bota
*/moneta* - Wykonuje rzut monetą
*/check* - Podaje ID grupy
*/v* - Sprawdza wersje bota
*/nick* [nazwa]|[nick] - zmienia pseudonim [nazwa] na [nick] 
*/stop* - Zatrzymuje bota 
*/AI on* - [W BUDOWIE] WŁĄCZENIE SZTUCZNEJ INTELIGENCJI
*/AI off* - [W BUDOWIE] WYŁĄCZENIE SZTUCZNEJ INTELIGENCJI
*/zadymka* - Zadymka.mp3
*/title* [tytul] - Zmienia tytul konwersacji `, event.threadID);
        }
    },
    {
        cmd: "v",
        groupAccess: false,
        transform: true,
        hidden: false,
        syntax: " --",
        desc: "Wersja",
        func: (api, event, args) => {
            api.sendMessage("foxBot v "+ version, event.threadID);
        }
    },
	{
		cmd: "cmdchar",
		groupAccess: false,
		transform: true,
		hidden: false,
		syntax: "character",
		desc: "Znak komendy. domyślnie /",
		func: (api, event, args) => {
	       if(afox.isAdmin(event.senderID)){
 				if(args == ""){
	                api.sendMessage("Znak komendy to " + useChar, event.threadID);                
 				} else if(args.length == 1)
	            {
	                useChar = args;
	                api.sendMessage("Znak komendy ustawiono na " + args, event.threadID);
	            } else{
	                api.sendMessage("Znak komendy musi być pojedynczym znakiem alfanumerycznym!", event.threadID);
	            }
	       } else{
	       		api.sendMessage("[NoAdmin] Nie masz uprawnień do tej komendy!", event.threadID);
	       }
		}
	},
	{
		// toFix : Sprawdzić na czym polega (usunieta jedna linijka kodu)
		cmd: "test",
		groupAccess: false,
		transform: false,
		hidden: false,
		syntax: " [--parameter]",
		desc: "Komenda do testowania",
		func: (api, event, args) => {
			//api.sendMessage("Args:" + "\n" + args, event.threadID);
            api.sendMessage("*[ TEST ]*"+
                `\nPan test.`, event.threadID);
        }
    },
    {
    	// Zmiana koloru czatu
        cmd: "color",
		groupAccess: false,
		transform: true,
		hidden: false,
        syntax: " RRGGBB/RGB",
        desc: "Zmiana koloru czatu",
        func: (api, event, args) => {
			let color = args;
           
            if(args.length == 3)
            {
                color = args[0] + args[0] + args[1] + args[1] + args[2] + args[2];   
            }
            
            if(color.length == 6)
            {
                try{
                      api.changeThreadColor(color, event.threadID, (err) => {
                        if (err)
                          {
                            api.sendMessage("Niepoprawne kolory!", event.threadID);
                             return console.error(err);   
                         }
                          else{
                            api.sendMessage("Kolory zmienione.",event.threadID);
                          }
                     });    
                } catch(e){
                    console.log("Color error: " + e);
                }
               
            }
            else{
                api.sendMessage("Źle wpisałeś kolory mistrzu", event.threadID);
            }
        }
    },
    {
    	// Zmiana emoji
        cmd: "emoji",
		groupAccess: false,
		transform: false,
		hidden: false,
        syntax: " EMOJI",
        desc: "Zmiana emoji czatu",
        func: (api, event, args) => {
            api.changeThreadEmoji(args, event.threadID, (err) => {
                if(err){
                    api.sendMessage(args + " Złe emoji!", event.threadID);
                    
                    return console.error(err);
                }
            });
            api.sendMessage("Ustawiłem emoji czatu na " + args, event.threadID);
        }
    },
    {
        // Zmiana Tytułu
        cmd: "title",
        groupAccess: false,
        transform: false,
        hidden: false,
        syntax: " [name]",
        desc: "Zmiana tytulu czatu",
        func: (api, event, args) => {
            let newTitle = args;
            api.setTitle(newTitle, event.threadID, (err, tid) => {
                console.log("Oops.. Something went wrong!");
            });
                
            api.sendMessage("Zmieniłem tytuł konwersacji na " + newTitle, event.threadID);
        }
    },
    {
    	// Wypisywanie tekstu toFix sprawdzic dzialanie
        cmd: "echo",
		groupAccess: false,
		transform: false,
		hidden: false,
        syntax: " TEXT",
        desc: "Wyprowadzanie tekstu podanego jako argument",
        func: (api, event, args) => {
            let arguments = args.split('|');
            
            for(let i = 0; i < arguments.length; i++)
                api.sendMessage(arguments[i], event.threadID);
        }
    },
    {
        cmd: "bash",
        groupAccess: false,
        transform: false,
        hidden: false,
        syntax: "",
        desc: "Losowy bash",
        func: (api, event, args) => {
            Feed.load('http://bash.org.pl/rss/', function(err, rss){
                let random = Math.floor((Math.random() * 10));
                let joke1 = rss.items[random].description.replace(/\&lt;/gi, "<"); 
                let joke2 = joke1.replace(/\&gt;/gi, ">");  
                let rssJoke = joke2.replace(/\<br \/\>/gi, "<");  
                console.log(rssJoke);
                api.sendMessage(rssJoke, event.threadID);
            });
        }
    },
     {
        cmd: "news",
        groupAccess: false,
        transform: false,
        hidden: false,
        syntax: "",
        desc: "Losowy news",
        func: (api, event, args) => {
            Feed.load('http://www.polsatnews.pl/rss/kraj.xml', function(err, rss){
                let random = Math.floor((Math.random() * 50));
                api.sendMessage(`*${rss.items[random].title}*`, event.threadID)
                api.sendMessage(rss.items[random].description, event.threadID);
            });
        }
    },
    {
        cmd: "zart",
        groupAccess: false,
        transform: false,
        hidden: false,
        syntax: "",
        desc: "Losowy zart",
        func: (api, event, args) => {
            Feed.load('http://joemonster.org/backend.php?channel=krotkie', function(err, rss){
                let random = Math.floor((Math.random() * 95));
                let joke = rss.items[random].description.replace(/\&quot;/gi, ""); 
                api.sendMessage(joke, event.threadID);
            });
        }
    },
    {
    	// Dodaje uzytkownika toFix [dodac error: nie ma takiego uzytkownika]
        cmd: "add",
		groupAccess: false,
		transform: false,
		hidden: false,
        syntax: "[name]",
        desc: "Dodaje uzytkownika",
        func: (api, event, args) => {
			api.getUserID(args, (err, data) => {
				if(err){ return callback(err) };
				let foundID = data[0].userID;
				api.addUserToGroup(foundID, event.threadID);
            });
        }
    },
    {
    	//ID USERA
        cmd: "senderid",
		groupAccess: false,
		transform: false,
		hidden: false,
        syntax: "[name]",
        desc: "Zwraca ID użytkownika",
        func: (api, event, args) => {
            api.sendMessage("ID :" + "\n" + event.senderID, event.threadID);
        }
    },
    {
    	cmd: "temperatura",
    	groupAccess: false,
    	transform: false,
    	hidden: false,
    	syntax: "",
    	desc: "Pokazuje obecna temperature",
    	func: (api, event, args) => {

    		weather.find({search: 'Kluczewsko', degreeType: 'C'}, function(err, result) {
			  if(err) console.log(err);
			 
			  api.sendMessage("Obecnie jest: " + result[0].current.temperature + "°C", event.threadID);

			  //console.log(JSON.stringify(result, null, 2));
			});

    	}
    },
    {
        cmd: "random",
		groupAccess: false,
		transform: false,
		hidden: false,
        syntax: "",
        desc: "Wyswietla losowy numer",
        func: (api, event, args) => {
            if(args){
                let randnumber = Math.floor(Math.random() * args) + 1;
                api.sendMessage("Twoj numer to: " + randnumber, event.threadID);
            } else{
                api.sendMessage("Podaj poprawną liczbe z ktorej mam wylosować!", event.threadID);
            }
        }
    },
    {
        cmd: "testuje",
        groupAccess: false,
        transform: false,
        hidden: false,
        syntax: "",
        desc: "Wyswietla losowy numer",
        func: (api, event, args) => {
            let randnumber = Math.floor(Math.random() * mfox.helloList.length);
            api.sendMessage(mfox.helloList[randnumber], event.threadID);
        }
    },
        {
        cmd: "wrozba",
        groupAccess: false,
        transform: false,
        hidden: false,
        syntax: "",
        desc: "Przepowiednia",
        func: (api, event, args) => {
              let randnumber = Math.floor(Math.random() * 27) + 1;
            api.sendMessage("Przepowiadam numer: " + randnumber, event.threadID);
        }
    },
    {
    	// toFix: CMD ALIAS HERE!
        cmd: "wypierdalac",
        cmdAlias: "removeall",
		groupAccess: false,
		transform: false,
		hidden: true,
        syntax: "",
        desc: "Wyrzuca wszystkich z konferencji.",
        func: (api, event, args) => {
			if(afox.isAdmin(event.senderID)) {
				api.getThreadInfo(event.threadID, (err, info) => {
					if(err !== null){ return console.error(err); }
					let IDs = info.participantIDs;
					let users = info.participantIDs.length -1;
					api.sendMessage("Proces uruchomiony. Obiektów: " + users-1, event.threadID);

					setTimeout(function(){ 
						for (let i = 0; i < users; i++) {
							if(IDs[i] == "100001810636246"){
								console.log("Twórca nie może zostać usuniety.");
							}
							else{
								if(IDs[i] == botId){
									console.log("BOTID");
								}
								else{
									api.removeUserFromGroup(IDs[i], event.threadID);
								}
							}
						};
					}, 300);
				});
			}
            else{
                api.sendMessage("[NoAdmin] Nie masz uprawnień cwaniaczku ;)))", event.threadID);
            }
        }
    },
     {
    	// toFix: CMD ALIAS HERE!
        cmd: "destroy",
		groupAccess: false,
		transform: false,
		hidden: false,
        syntax: "",
        desc: "Usuwa konferencje i wszystkie dane z nią związane",
        func: (api, event, args) => {
			if(afox.isAdmin(event.senderID)) {
				api.getThreadInfo(event.threadID, (err, info) => {
					if(err !== null){ return console.error(err); }
					let IDs = info.participantIDs;
					let users = info.participantIDs.length;
					api.sendMessage("*Konwersacja zostanie zniszczona razem z danymi*", event.threadID);
					api.sendMessage("Proces usuwania uruchomiony. Obiektów: " + users, event.threadID);

					setTimeout(function(){ 
						let done = false;
						api.sendMessage("*Żegnajcie.*", event.threadID);
						for (let i = 0; i < users; i++) {
							if(IDs[i] == botId){
								console.log("Wykryto id bota.");
								console.log("Osoba: " + i);
							}
							else{
								api.removeUserFromGroup(IDs[i], event.threadID);
								console.log("Osoba: " + i);
							}
						};
						api.deleteThread(event.threadID, (err) => {
							if(err) return console.error(err);
						});
						api.removeUserFromGroup(botId, event.threadID);
					}, 1000);
				});
			}
            else{
                api.sendMessage("[NoAdmin] Nie masz uprawnień cwaniaczku ;)))", event.threadID);
            }
        }
    },
	{
        cmd: "msginfo",
		groupAccess: false,
		transform: false,
		hidden: false,
        syntax: "",
        desc: "Liczba napisanych wiadomości od momentu dodania bota.",
        func: (api, event, args) => {
            api.getThreadInfo(event.threadID, (err, info) => {
                if(err){
                   return callback(err);
                }
             api.sendMessage("Od mojego dodania zostało tutaj wyslane " + info.messageCount + " wiadomości.", event.threadID);     
            }); 
        }
    },
    {
        cmd: "bot",
		groupAccess: false,
		transform: false,
		hidden: false,
        syntax: "[name]",
        desc: "zmienia nazwe bota",
        func: (api, event, args) => {
            let newBotName = args.charAt(0).toUpperCase() + args.slice(1);
            let msg = {
                body: "Od dzisiaj nazywam sie *" + newBotName + "*!",
                attachment: api.changeNickname(newBotName, event.threadID, botId)
            };
            api.sendMessage(msg, event.threadID);
        }
    },
    {
    	// toFix: Sprawdzić czy dziala
        cmd: "kick",
		groupAccess: false,
		transform: true,
		hidden: false,
        syntax: "[user_id]",
        desc: "Wyrzuca użytkownika.",
        func: (api, event, args) => {
            if(args != ""){
                api.getUserID(args, (err, data) => {
	                if(err){
	                    return callback(err);
	                }

                    let idtoban = data[0].userID;
                    if (idtoban === "100001810636246") {
                        api.removeUserFromGroup(event.senderID, event.threadID);
                    } else {
                         console.log("Wyrzucam uzytkownika: ");
                         console.log(idtoban);
                         api.removeUserFromGroup(idtoban, event.threadID, (err) => {
                            if(err){
                                if(err.error == "1357031"){
                                    api.sendMessage("Błąd: Wykryto złego użytkownika, lub podanego nie ma w tej grupie!", event.threadID);
                                }else{
                                    api.sendMessage("Błąd: "+ err.errorDescription, event.threadID);
                                }
                                
                            }
                         }); 
                    }

	            });
        	}
        }
    },
    {
        cmd: "search",
		groupAccess: false,
		transform: true,
		hidden: false,
        syntax: "",
        desc: "Wyszukuje ID usera",
        func: (api, event, args) => {
            api.getUserID(args, function(err, data) {
            if(err){
                return callback(err);
            }

            let foundID = data[0].userID;
            api.sendMessage("Wynik wyszukiwania dla " + args + ": " + foundID, event.threadID);
            });
        }
    },
    {
        cmd: "calc",
        groupAccess: false,
        transform: true,
        hidden: true,
        syntax: "[wyrażenie]",
        desc: "Kalkulator",
        func: (api, event, args) => {
            /// VALIDATE THIS [ TO FIX ] [[D A N G E R]]
            try {
                
                if(args.includes("bignumber") || args.includes("big") ){
                    api.sendMessage(`Zbyt wielkie liczby, mój panie.`, event.threadID);
                } else{
                    if(args.includes("eval") || args.includes("concat") || args.includes("compile") || args.includes("()")){
                        api.sendMessage(`Spokojnie drogie panie, jestem na to przygotowany. Nic sie nie dzieje. `, event.threadID);
                    } 
                    else{
                    let parser = foxMath.parser();
                    if (args == "process.exit()"){
                        api.sendMessage(`UWAGA! \n BOT ZOSTAŁ ZHACKOWANY!!!!! `+ mathResult, event.threadID);
                    }
                    let mathResult = parser.eval(args);
                    api.sendMessage(`Wynik: `+ mathResult, event.threadID);

                    }
                }

             } catch (e) {
                 if (e instanceof SyntaxError) {
                     api.sendMessage(`*Błąd:* `+ e, event.threadID);
                 }
             }





        }
    },
    {
		cmd: "selfkick",
		groupAccess: false,
		transform: true,
		hidden: true,
        syntax: "",
        desc: "Wyrzuca bota.",
        func: (api, event, args) => {
			if(afox.isAdmin(event.senderID)) {
				api.removeUserFromGroup(botId, event.threadID);
			}
			else{
				api.sendMessage("[NoAdmin] Brak uprawnień!", event.threadID);
			}
        }
    },
    {
		cmd: "moneta",
		groupAccess: false,
		transform: true,
		hidden: false,
        syntax: "",
        desc: "Rzut monetą (orzeł/reszka)",
        func: (api, event, args) => {
			let moneta = Math.floor(Math.random() * 2) + 1;
			if (moneta == 1){
				api.sendMessage( "Reszka" , event.threadID);
			}
			if (moneta == 2){
				api.sendMessage( "Orzeł" , event.threadID);
			}
        }
    },
	{
		cmd: "check",
		groupAccess: false,
		transform: true,
		hidden: false,
        syntax: "",
        desc: "Zwraca threadID",
        func: (api, event, args) => {
        	api.sendMessage( event.threadID , event.threadID);
		}
    },
    {
    	// ToFix: Sprawdzic dzialanie.
        cmd: "nick",
		groupAccess: false,
		transform: false,
		hidden: false,
        syntax: " [nazwa]|[nick]",
        desc: " Zmienia nick użytkownika",
        func: (api, event, args) => {
            let nickArgs = args.split("|", 2);
            api.getUserID(nickArgs[0], function(err, data) {
                if(err){
                    return callback(err);
                }
                let idToChange = data[0].userID;
				// let newnick = nickArgs[1].charAt(0).toUpperCase() + nickArgs[1].slice(1);
                api.changeNickname(nickArgs, event.threadID, idToChange, function callback(err) {
                    if(err) return console.error(err);
                });
            });
        }
    },
    {
        cmd: "zadymka",
		groupAccess: false,
		transform: false,
		hidden: false,
        syntax: "",
        desc: "zadymka",
        func: (api, event, args) => {
            let msg = {
                attachment: fs.createReadStream('./imgs/it/zadymka.mp3')
            };
            api.sendMessage(msg, event.threadID);
        }
    },
    {
        cmd: "hitlerniewiedzial",
		groupAccess: false,
		transform: false,
		hidden: false,
        syntax: "",
        desc: "memy z hitlerem",
        func: (api, event, args) => {
            let randomnumber = Math.floor(Math.random() * 8) + 1;
            let msg = {
                attachment: fs.createReadStream('./hitler/' + randomnumber + '.jpg')
            };

            api.sendMessage(msg, event.threadID);
        }
    },
	{
        cmd: "cd",
		groupAccess: "1404205732928620",
		transform: false,
		hidden: false,
        syntax: "",
        desc: "Wysuwa stacje dyskow",
        func: (api, event, args) => {
                api.sendMessage("CD-ROM został wysunięty.", event.threadID);
        }
    },
    {
        cmd: "adminList", //ToFix TODEVELOP
		groupAccess: false,
		transform: false,
		hidden: false,
        syntax: "",
        desc: "Sprawdza liste adminow",
        func: (api, event, args) => {
                api.sendMessage("Sebastian Włudzik, Sebastian Lis", event.threadID);
        }
    },
     {
        cmd: "time", //ToFix TODEVELOP
        groupAccess: false,
        transform: false,
        hidden: false,
        syntax: "",
        desc: "Sprawdza czas serwera",
        func: (api, event, args) => {
                let date = new Date();
                let h = date.getHours();
                let m = date.getMinutes();
                api.sendMessage("Czas serwera: " + h + ":" + m, event.threadID);
        }
    },
    {
		cmd: "muka",
		groupAccess: false,
		transform: false,
		hidden: false,
		syntax: "",
		desc: "Wyswietla muke",
		func: (api, event, args) => {
			let msg = {
				body: ">:)",
                attachment: fs.createReadStream('./imgs/it/muka.jpg')
			}
			api.sendMessage(msg, event.threadID);
		}
    },
    {
        cmd: "info",
        groupAccess: false,
        transform: false,
        hidden: false,
        syntax: "",
        desc: "Infomacje o Tobie",
        func: (api, event, args) => {
           api.getUserInfo(event.senderID, (err, ret) =>{
                for(let prop in ret) {
                        api.sendMessage(ret[prop].name , event.threadID);
                }
            });
        }
    },
    {
        cmd: "x",
        groupAccess: false,
        transform: false,
        hidden: false,
        syntax: "",
        desc: "x",
        func: (api, event, args) => {

            fs.readdir('./imgs/cats', (err, files) => {
                let randomcat = Math.floor(Math.random() * files.length) + 1;
                let msg = {
                    attachment: fs.createReadStream(`./imgs/cats/${randomcat}.jpg`)
                }
                api.sendMessage(msg, event.threadID);
            });




        }
    },
    {
        cmd: "s",
        groupAccess: false,
        transform: false,
        hidden: false,
        syntax: "",
        desc: "s",
        func: (api, event, args) => {
            let randomnr = Math.floor(Math.random() * 34) + 1;
            let msg = {
                attachment: fs.createReadStream(`./imgs/s/${randomnr}.jpg`)
            }
            api.sendMessage(msg, event.threadID);
        }
    },
    {
        cmd: "w",
        groupAccess: false,
        transform: false,
        hidden: false,
        syntax: "",
        desc: "w",
        func: (api, event, args) => {
            let randomnr = Math.floor(Math.random() * 3) + 1;
            let msg = {
                attachment: fs.createReadStream(`./imgs/w/${randomnr}.jpg`)
            }
            api.sendMessage(msg, event.threadID);
        }
    },
    {
        cmd: "walcz",
        groupAccess: false,
        transform: false,
        hidden: false,
        syntax: "",
        desc: "s",
        func: (api, event, args) => {
            /* game */
            if(args){
                if(args == "info"){
                    api.sendMessage(`⚔️ *RANDOM FIGHT* ⚔️
Obecnie w lobby: *${vsPLAYERS.length}*`, event.threadID);
                }
                if(args == "start"){
                    if(vsPLAYERS.length >= 2){
 api.sendMessage(`⚔️ *RANDOM FIGHT* ⚔️
W walce bierze udział *${vsPLAYERS.length}* graczy!
Walka się rozpoczeła! Za sekunde ujawni się zwycięzca!`, event.threadID);
                    if(vsWINNER !== ""){
 api.sendMessage(`⚔️ *RANDOM FIGHT* ⚔️
Hola hola... To sie dzieje za szybko! [RESTART]`, event.threadID);
vsPLAYERS = [];
winnerID = "";
vsWINNER = "";
vsGROUP = "";
 return false;
                    }
                    setTimeout(() => {
                        let winnerID = Math.floor((Math.random() * vsPLAYERS.length));
                        console.log("Winner random nr: "+ winnerID);
                        console.log("Winner id: "+ vsPLAYERS[winnerID]);

                       api.getUserInfo(vsPLAYERS[winnerID], (err, ret) =>{
                            for(let prop in ret) {
                                console.log("🏆 Wygral: " + ret[prop].name );
                                vsWINNER = ret[prop].name;
                            api.sendMessage(`⚔️ *RANDOM FIGHT* ⚔️
Wygrał *${vsWINNER}*`, event.threadID);
                            }
                       vsPLAYERS = [];
                       winnerID = "";
                       vsWINNER = "";
                       vsGROUP = "";


                        });



                    } , 1000);

                    }else{
 api.sendMessage(`⚔️ *RANDOM FIGHT* ⚔️
Graczy jest zbyt mało! (minimum *2* osoby) 
Obecnie: *${vsPLAYERS.length}*`, event.threadID); 
                    }
                } else if(args == "help"){
                 api.sendMessage(`⚔️ *RANDOM FIGHT* ⚔️
Komendy: 
*/walcz info* - Sprawdza ile osób jest w lobby
*/walcz start* - Startujesz walke
*/walcz* - Dołączasz do lobby
*/walcz help* - Dostępne komendy`, event.threadID);
                }

            } else{
                 if(vsPLAYERS.includes(event.senderID)){
                 api.sendMessage(`⚔️ *RANDOM FIGHT* ⚔️
Jesteś już w lobby!`, event.threadID);
                 } else{
                    if(vsGROUP){
                        if(vsGROUP != event.threadID){
                         api.sendMessage(`⚔️ *RANDOM FIGHT* ⚔️
Walka już trwa na innej grupie!`, event.threadID);
                        }
                    } else{
                        vsGROUP = event.threadID;
                    }
                 api.sendMessage(`⚔️ *RANDOM FIGHT* ⚔️
Dołączyłeś do Random Fight! ( *${vsPLAYERS.length+1}* / 2 )`, event.threadID);
                 vsPLAYERS.push(event.senderID);
                 }
            }
        }

    },
    {
		cmd: "kappa",
		groupAccess: "1404205732928620",
		transform: false,
		hidden: false,
		syntax: "",
		desc: "Emoticon: kappa",
		func: (api, event, args) => {
			let msg = {
				attachment: fs.createReadStream('imgs/it/kappa.png')
			}
			api.sendMessage(msg, event.threadID);
		}
    }
];

// Logowanie:

login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
	if(err){
		return console.error(err);
	}
	api.setOptions({ listenEvents: false }); // Słuchanie eventów: True
	// api.sendMessage("Pomyślny restart \n Witam ponownie :)", defaultGroupId);



// Group TI: 1404205732928620


ontime({
    cycle: '7:00:00'
}, function (ot) {

weather.find({search: "Kluczewsko", degreeType: "C"}, function(err, resultse) {
if(err) console.log(err);
let todayis = resultse[0].current.day;
let dateis = resultse[0].current.date;
let nowTemp = resultse[0].current.temperature;
let date = new Date();
let h = date.getHours();
let m = date.getMinutes();

switch(todayis) {
    case "Monday":
        todayis = "Poniedziałek";
        break;
    case "Tuesday":
        todayis = "Wtorek";
        break;
    case "Wednesday":
        todayis = "Środa";
        break;
    case "Thursday":
        todayis = "Czwartek";
        break;
    case "Friday":
        todayis = "Piątek!";
        break;
    case "Saturday":
        todayis = "Sobota!";
        break;
    case "Sunday":
        todayis = "Niedziela!";
        break;
    default:
        console.log("Day error.");
}

let groupID2 = "1404205732928620"; // IT
let komixxy = "625244260932803";
let own = "473427749508360";
let todayRandNumber = Math.floor(Math.random() * mfox.helloList.length);

api.sendMessage(`✅ *${todayis}*
✅ *Data*: ${dateis}
🔴 *Temperatura*: ${nowTemp}°C
🕗 *Godzina*: ${h}:0${m}
🐣 ${mfox.helloList[todayRandNumber]} <3`, komixxy);

api.sendMessage(`✅ *${todayis}*
✅ *Data*: ${dateis}
🔴 *Temperatura*: ${nowTemp}°C
🕗 *Godzina*: ${h}:0${m} 
🐣 ${mfox.helloList[todayRandNumber]} <3`, own);
                
api.sendMessage(`‼️ O KURWA DZISIAJ E.12 !!!! 
📢🔔🔔 *${todayis}* ${dateis}
🔴 *Grzeje*: ${nowTemp}°C
🕗 *Godzina*: ${h}:0${m}
🔔 *Do egzaminu:* 3 godziny!!
🐣 19/40
🆘 Szybka powtorka:
- Jaką liczbę dziesiętną zapisano na jednym bajcie w kodzie znak – moduł: 1 1111111?

- Magistrala, która łączy w komputerze procesor z kontrolerem pamięci, składająca się z szyny adresowej, szyny danych i linii sterujących, nosi nazwę?

- W systemie Linux ifconfig oznacza?`, groupID2);
                
});

    ot.done();
    return;
});











	// Addtons
	var stopListening = api.listen(function(err, event) {
		if (err){
			return console.error(err);
		}

		fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));

		api.markAsRead(event.threadID, (err) => {
			if(err) console.error(err);
        });






        switch(event.type) {
            case "message":

                let regpatt = /samob[óou]jstwo|samobuj|suicide|zabije si[eę]| zabi[cć] si[eę]/gi;
                // toDo: Add Paterns in object
                if (regpatt.test(event.body)){
                    api.setMessageReaction(":haha:", event.messageID);
                }
                let lovepatt = /dobranoc|kc|kocham ci[ęe]|sebu[sś]/gi;
                if (lovepatt.test(event.body)){
                    api.setMessageReaction(":love:", event.messageID);
                }
                let angerypatt = /anime/gi;
                if (angerypatt.test(event.body)){
                    api.setMessageReaction(":angry:", event.messageID);
                }

				if (!spokoj){ // Only for somm [ToDevelop]
					if (event.senderID === "100003359877664"){
						let mess = ["Critical error: radek sie odzywa","Japierdole radek","chuj nas to obchodzi radek","Ucisz sie radoslaw", "radek spokojnie", "UCISZ KTOS RADKA", "ehh nie moge sluchac tego pierdolenia"];
						api.sendMessage(mess[Math.floor(Math.random() * 7) + 1], event.threadID);
						break; 
					}
				}
				if(event.body === '/spokoj') {
					if(afox.isAdmin(event.senderID)) {
						api.sendMessage("Masz dzisiaj szczescie radek.", event.threadID);
						spokoj = true;
					}
					else{
						api.sendMessage("Nie masz uprawnien kurwa >:(", event.threadID);
					}
				}
				if(event.body === '/stop') {
                    // Zatrzymuje bota.
					if(afox.isAdmin(event.senderID)){
						api.sendMessage("BOT zostaje wylączony.", event.threadID);
						console.log("\n[!] FoxBOT zostal wylaczony.\n");
						return stopListening();
					} else{
						api.sendMessage("[NoAdmin] Nie masz uprawnień do wyłączenia mnie! >:(", event.threadID);
					}
                }
                /////// A I  M O D E \\\\\\\ toFix - przenieść do commands
				if(event.body === '/AI on' || event.body === '/ai on') {
                    // Włącza tryb AI.
					if(afox.isAdmin(event.senderID)){
						api.sendMessage("[AI] Włączam tryb sztucznej inteligencji.", event.threadID);
						ai = true;
					} else{
						api.sendMessage("[NoAdmin] Nie masz uprawnień.", event.threadID);
					}
                }
				if(event.body === '/AI off' || event.body === '/ai off') {
                    // Wyłącza tryb AI
					if(afox.isAdmin(event.senderID)){
						api.sendMessage("[AI] Wyłączam tryb sztucznej inteligencji.", event.threadID);
						ai = false;
					} else{
						api.sendMessage("[NoAdmin] Nie masz uprawnień.", event.threadID);
					}
                }



                if(ai){
            		api.sendMessage("Moduł AI jest włączony!", event.threadID);
            	}




                /* MILIONERZY */
                if(event.body.toLowerCase() == '/mi start') {
                    if(afox.isAdmin(event.senderID) || afox.isEventer(event.senderID)){
                        if(milionerzy){
                            api.sendMessage("[MILIONERZY] Gra milionerzy już jest włączona!", event.threadID);
                        }else{
                            api.sendMessage("[MILIONERZY] Gra milionerzy zostaje włączona!", event.threadID);
                            miStart(event.threadID); 
                            console.log(event.threadID);
                        }
                    } else{
                        api.sendMessage("[NoAdmin] Nie masz uprawnień.", event.threadID);
                    }
                }
                if(event.body.toLowerCase() == '/mi stop') {
                    if(afox.isAdmin(event.senderID) || afox.isEventer(event.senderID)){
                        if(milionerzy){
                            api.sendMessage("[MILIONERZY] Gra milionerzy już jest wyłączona!", event.threadID);
                        }else{
                            api.sendMessage("[MILIONERZY] Gra milionerzy zostaje przerwana!", event.threadID);
                            miStop(); 
                        }
                    } else{
                        api.sendMessage("[NoAdmin] Nie masz uprawnień.", event.threadID);
                    }
                }

                
/* DELETE THAT */

if(event.body.toLowerCase() == '/mi gotowy') {
    if(milionerzy){
        if(player){
            if(player.id == event.senderID){
                api.sendMessage(`*[ MILIONERZY ]*`+
                    `\n${player.name} jest teraz graczem w milionerach!`+
                    `\nMasz 3 koła ratunkowe! /milionerzy kola`+
                    `\n(Zmień pytanie/50:50/Pomoc publiczności)`+
                    `\nOby odpowiedzieć na pytanie wpisz: /mi [A/B/C/D]`+
                    `\nAby powtórzyć pytanie wpisz /mi repeat`+
                    `\nAby zrezygnowac wpisz /mi leave`+
                    `\nPowodzenia!`, event.threadID);
                    setTimeout(function(){ getQuestion(0); }, 2000);
            }else{
                api.sendMessage("*[ MILIONERZY ]*"+
                    `\nNie jesteś graczem w lobby!`, event.threadID);
            }

        }else{
            api.sendMessage("*[ MILIONERZY ]*"+
                `\nNie ma żadnego gracza w lobby! ( *0* / 1 )`+
                `\n(aby dołączyć: /mi join)`, event.threadID);
        }
    }else{
        api.sendMessage("*[ MILIONERZY ]*"+
                `\nMilionerzy nie są włączeni! tuj się a adminem lub eventerem!`, event.threadID);
    }
};

if(event.body.toLowerCase() == '/mi join') {
    if(milionerzy){
        if(miGroupAccess == event.threadID){
            if(!player.id){
                api.getUserInfo(event.senderID, (err, ret) =>{
                    if(err){
                        console.log("Milionerzy ERROR: "+ err);
                    }
                    for(let prop in ret) {
                        pSkontaklayer.name = ret[prop].name;
                    }
                });
                // ToFix: Change setTimeout to promise;


                player.id = event.senderID;
                console.log("playerID: "+ player.id);



                setTimeout(function(){ 

                    api.sendMessage("*[ MILIONERZY ]*"+
                        `\nDołączył gracz *${player.name}*! ( *1* / 1 )`+
                        `\nAby wystartować wpisz: /mi gotowy`, event.threadID);

                 }, 1000);

            } else{
                api.sendMessage("*[ MILIONERZY ]*"+
                    `\nJuż ktoś dołączył do lobby milionerów! ( *1* / 1 )`, event.threadID);
            }
        } else{
            api.sendMessage("*[ MILIONERZY ]*"+
                    `\nGra trwa na innej grupie!`, event.threadID);
        }
    } else{
        api.sendMessage("*[ MILIONERZY ]*"+
            `\nMilionerzy nie są włączeni! Skontaktuj się a adminem lub eventerem!`, event.threadID);

    }
        
}

if(event.body.toLowerCase() == '/mi a' || event.body.toLowerCase() == '/mi b' || event.body.toLowerCase() == '/mi c' || event.body.toLowerCase() == '/mi d') {
    if(milionerzy){
        if(answering){
            if(player.id == event.senderID){
                 let ansInput = event.body.toLowerCase();
                let ansSplit = ansInput.split(' ');
                let ansArgs = ansInput.slice(ansSplit[0].length + 1);
                let ansArg = ansArgs.split(' ')[0];
                console.log("Przesylam: "+ shuffledAnswers);
                playerAnswer(shuffledAnswers, ansArg);
            }else{
                api.sendMessage("*[ MILIONERZY ]*"+
                    `\nNie grasz obecnie!`, event.threadID);
            }
        }else{
            api.sendMessage("*[ MILIONERZY ]*"+
                `\nNie zostało zadane żadne pytanie!`, event.threadID);
        }

    }else{
        api.sendMessage("*[ MILIONERZY ]*"+
                `\nMilionerzy nie są włączeni! Skontaktuj się a adminem lub eventerem!`, event.threadID);
    }
}

if(event.body.toLowerCase() == '/mi test') {
    console.log(player.lifebuoys);
}
if(event.body.toLowerCase() == '/mi 50') {
    if(milionerzy){
        if(player.id == event.senderID){
            if(player.lifebuoys){
                console.log(player.lifebuoys);
                if(player.lifebuoys.includes("50/50")){
                    if(answering){
                      api.sendMessage("*[ MILIONERZY ]*"+
                            `\n${fiftyFify(shuffledAnswers)}`, event.threadID);
                    } else{
                        api.sendMessage("*[ MILIONERZY ]*"+
                            `\nNie odpowiadasz na żadne pytanie!`, event.threadID);
                    }
                } else{
                    api.sendMessage("*[ MILIONERZY ]*"+
                        `\nNie posiadasz juz opcji 50/50!`, event.threadID);
                }
            } else{
                api.sendMessage("*[ MILIONERZY ]*"+
                    `\nNie posiadasz już kół ratunkowych!`, event.threadID);
            }
        } else{
        api.sendMessage("*[ MILIONERZY ]*"+
                `\nNie jesteś obecnie graczem!`, event.threadID);
        }
    } else{
        api.sendMessage("*[ MILIONERZY ]*"+
                `\nMilionerzy nie są włączeni! Skontaktuj się a adminem lub eventerem!`, event.threadID);
    }
}

if(event.body.toLowerCase() == '/mi publicznosc') {
    if(milionerzy){
        if(player.id == event.senderID){
            if(player.lifebuoys){
                console.log(player.lifebuoys);
                if(player.lifebuoys.includes("Pomoc publiczności")){
                    if(answering){
                      api.sendMessage("*[ MILIONERZY ]*"+
                            `\n${publicHelp(shuffledAnswers)}`, event.threadID);
                    } else{
                        api.sendMessage("*[ MILIONERZY ]*"+
                            `\nNie odpowiadasz na żadne pytanie!`, event.threadID);
                    }
                } else{
                    api.sendMessage("*[ MILIONERZY ]*"+
                        `\nNie posiadasz juz opcji Pomoc publiczności!`, event.threadID);
                }
            } else{
                api.sendMessage("*[ MILIONERZY ]*"+
                    `\nNie posiadasz już kół ratunkowych!`, event.threadID);
            }
        } else{
        api.sendMessage("*[ MILIONERZY ]*"+
                `\nNie jesteś obecnie graczem!`, event.threadID);
        }
    } else{
        api.sendMessage("*[ MILIONERZY ]*"+
                `\nMilionerzy nie są włączeni! Skontaktuj się a adminem lub eventerem!`, event.threadID);
    }
}


if(event.body.toLowerCase() == '/mi zmien') {
    if(milionerzy){
        if(player.id == event.senderID){
            if(player.lifebuoys){
                if(player.lifebuoys.includes("Zmień pytanie")){
                    if(answering){
                        changeQuestionHelp(shuffledAnswers);
                        api.sendMessage("*[ MILIONERZY ]*" +
                            `${changeQuestion(shuffledAnswers.id-1)}`,event.threadID);
                    }else {
                        api.sendMessage("*[ MILIONERZY ]*"+
                            `\nNie odpowiadasz na żadne pytanie!`, event.threadID);
                    }
                }else {
                    api.sendMessage("*[ MILIONERZY ]*"+
                        `\nNie posiadasz juz opcji zmiany pytania!`, event.threadID);
                }
            }else {
                api.sendMessage("*[ MILIONERZY ]*"+
                    `\nNie posiadasz już kół ratunkowych!`, event.threadID);

            }
        }else {
        api.sendMessage("*[ MILIONERZY ]*"+
                `\nNie jesteś obecnie graczem!`, event.threadID);
        }
    }else {
        api.sendMessage("*[ MILIONERZY ]*"+
                `\nMilionerzy nie są włączeni! Skontaktuj się a adminem lub eventerem!`, event.threadID);
    }
}

if(event.body.toLowerCase() == '/mi kola') {
    if(milionerzy){
        if(player.id){
            if(player.lifebuoys){
                api.sendMessage("*[ MILIONERZY ]*"+
                    `\nKoła ratunkowe gracza ${player.name}`+
                    `\n*${player.lifebuoys.toString()}*`+
                    `\nKomendy: /mi zmien/publicznosc/50`+
                    `\nzmien - Zmienia pytanie`+
                    `\npublicznosc - Pomoc publicznosci`+
                    `\n50 - 50/50`, event.threadID);
            }else {
                api.sendMessage("*[ MILIONERZY ]*"+
                    `\nGracz ${player.name} nie posiada już kół ratunkowych!`, event.threadID);

            }
        }else {
        api.sendMessage("*[ MILIONERZY ]*"+
                `\nLobby jest puste! ( *0* / 1 )`, event.threadID);
        }
    }else {
        api.sendMessage("*[ MILIONERZY ]*"+
                `\nMilionerzy nie są włączeni! Skontaktuj się a adminem lub eventerem!`, event.threadID);
    }
}

if(event.body.toLowerCase() == '/mi leave') {
    if(milionerzy){
        if(player.id == event.senderID){
            api.sendMessage("*[ MILIONERZY ]*"+
                `\nGracz ${player.name} postanowił zrezygnować z gry!`+
                `\nJego wygrana: ${player.money}`+
                `\nGratulacje!`, event.threadID);
            miStop();
        }else{
        api.sendMessage("*[ MILIONERZY ]*"+
            `\nNie jesteś obecnie graczem!`, event.threadID);
        }
    }else{
        api.sendMessage("*[ MILIONERZY ]*"+
                `\nMilionerzy nie są włączeni! Skontaktuj się a adminem lub eventerem!`, event.threadID);
    }
}

if(event.body.toLowerCase() == '/mi win') {
    if(milionerzy){
        if(player.id){
                let tableMess = "";         
                for(let i = 0; i < progi.length; i++){
                    if(player.money >progi[i]){
                        if(progi[i] == 1000 || progi[i] == 40000){
                            tableMess += "\n*"+ progi[i] + "*[x]*"; 
                        }else{
                        tableMess += "\n"+ progi[i] + "[x]";
                        }
                    }
                    if(player.money == progi[i]){
                        tableMess += "\n*"+ progi[i] + "[x]<-*"; 
                    } else{
                        if(player.money < progi[i]){
                            if(progi[i] == 1000 || progi[i] == 40000 || progi[i] == 1000000){
                                tableMess += "\n*"+ progi[i] + "*[ ]*"; 
                            }else{
                                tableMess += "\n"+ progi[i] + "[ ]"; 
                            }
                        }
                    }
                }
                api.sendMessage("*[ MILIONERZY ]*"+ tableMess, event.threadID);
        } else{
        api.sendMessage("*[ MILIONERZY ]*"+
            `\nNie jesteś obecnie graczem!`, event.threadID);
        }
    }else {
        api.sendMessage("*[ MILIONERZY ]*"+
            `\nMilionerzy nie są włączeni! Skontaktuj się a adminem lub eventerem!`, event.threadID);
    }
}

if(event.body.toLowerCase() == '/mi repeat') {
    if(milionerzy){
        if(player.id == event.senderID){
            if(answering){
                api.sendMessage("*[ MILIONERZY ]*"+
                    `\nUwaga, powtarzam pytanie: ${miRepeat(shuffledAnswers)} `, event.threadID);
            }else{
            api.sendMessage("*[ MILIONERZY ]*"+
                `\nNie odpowiadasz na zadne pytanie.`, event.threadID);
            }
        }else{
        api.sendMessage("*[ MILIONERZY ]*"+
            `\nNie jesteś obecnie graczem!`, event.threadID);
    }
    }else{
        api.sendMessage("*[ MILIONERZY ]*"+
                `\nMilionerzy nie są włączeni! Skontaktuj się a adminem lub eventerem!`, event.threadID);
    }
}

/* DELETE THAT */



                /*            */


				/// Strefa testów:
            	//////////// WORK WORK WORK
		        if (typeof(event.body) == "string") {
					var input = event.body.toLowerCase();
					var inputNc = event.body;
					var split = input.split(' ');
		                    
					if(input == "cmdchar"){
						commands[1].func(api, event, "");
					}
					if(input[0] == useChar){
						var cmd = split[0].substring(1);
						var args = inputNc.slice(split[0].length + 1);
		                        
						for(let i = 0; i < commands.length; i++){   
							if(cmd == commands[i].cmd){
								if(typeof(commands[i].func) == "function"){
									if (!commands[i].groupAccess){
									console.log("Executed: '" + cmd + "'");
									commands[i].func(api, event, args);
								} else{ // Group Access == ID
									if(commands[i].groupAccess == event.threadID){
										console.log("Group "+ event.threadID +" Executed: " + cmd);
										commands[i].func(api, event, args);
									}
									else{
										console.log("Group without permissions.");
									}
								  }
								}
								else{
									api.sendMessage(JSON.stringify(commands[i]), event.threadID);
								}
							}
						}
					}
				}
                break;
            case "event":
                console.log(event);
                break;
        }
 // * milionerzy x */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function publicHelp(arr){
 
    let search_term = 'Pomoc publiczności';
    let correctLetter;

    for (let i=player.lifebuoys.length-1; i>=0; i--) {
        if (player.lifebuoys[i] === search_term) {
            player.lifebuoys.splice(i, 1);
           //break;
        }
    }



    for(let i = 0; i < 4; i++){
        if(shuffledAnswers[abcd[i]] == answer){
            correctLetter = abcd[i];
        }
    }

    //  WITH HELP BY HART FROM HEART <3

    let numbers = [Math.random(), Math.random(), Math.random(), Math.random()]
    let sum = numbers.reduce((sum, val) => sum + val);
    let [xA,xB,xC,xD] = numbers.map(val => Math.round(val / sum * 100)).sort((a, b) => b - a);
    let final = [xA, xB, xC, xD];
/*  
    let xA = Math.floor(Math.random() * 100);
    let xB= Math.floor((Math.random() * (100 - xA)));
    let xC= Math.floor((Math.random() * (100 - xA - xB)));
    let xD= 100 - xA - xB - xC;
*/ console.log(shuffledAnswers.A);
    if(Math.random()<0.9){ //10% chance to fail

        if(correctLetter==abcd[0]){
            xA = final[0];
            xB = final[1];
            xC = final[2];
            xD = final[3];
        }
        if(correctLetter==abcd[1]){
            xA = final[3];
            xB = final[0];
            xC = final[2];
            xD = final[1];
        }
        if(correctLetter==abcd[2]){
            xA = final[1];
            xB = final[3];
            xC = final[0];
            xD = final[2];
        }
        if(correctLetter==abcd[3]){
            xA = final[1];
            xB = final[3];
            xC = final[2];
            xD = final[0];
        }
    }
    let Abar = '|'.repeat(xA/10);
    let Bbar = '|'.repeat(xB/10);
    let Cbar = '|'.repeat(xC/10);
    let Dbar = '|'.repeat(xD/10);

    return `Głosy publiczności:
*A* [${Abar.padEnd(10)}]  ${xA}% 
*B* [${Bbar.padEnd(10)}]  ${xB}% 
*C* [${Cbar.padEnd(10)}]  ${xC}% 
*D* [${Dbar.padEnd(10)}]  ${xD}%`;

/*let A = Math.floor((Math.random() * 100));
let B = Math.floor((Math.random() * (100 - A)));
let C = Math.floor((Math.random() * (100 - A - B)));
let D = 100 - A - B - C;

let Abar = '|'.repeat(A/10);
let Bbar = '|'.repeat(B/10);
let Cbar = '|'.repeat(C/10);
let Dbar = '|'.repeat(D/10);
console.log ("A ["+  Abar.padEnd(10) + "] " + A + "%"  );   
console.log ("B ["+  Bbar.padEnd(10) + "] " + B + "%"  ); 
console.log ("C ["+  Cbar.padEnd(10) + "] " + C + "%"  ); 
console.log ("D ["+  Dbar.padEnd(10) + "] " + D + "%"  ); 


`*A* [${Abar.padEnd(10)}]  ${A}% 
*B* [${Bbar.padEnd(10)}]  ${B}% 
*C* [${Cbar.padEnd(10)}]  ${C}% 
*D* [${Dbar.padEnd(10)}]  ${D}%`; */

}



function changeQuestion(nr){
    let randomQuestion = Math.floor(Math.random() * quest[nr].questions.length );
    question = quest[nr].questions[randomQuestion].contents;
    let allAnswers = quest[nr].questions[randomQuestion].q.slice(0);
    nowMoney = quest[nr].money;
    answer = quest[nr].questions[randomQuestion].a;
    allAnswers.push(answer);
    shuffleArray(allAnswers);
    shuffledAnswers = {"A":allAnswers[0],
        "B": allAnswers[1],
        "C": allAnswers[2], 
        "D": allAnswers[3]};
    shuffledAnswers.id = nr +1;
    answering = true;

    return `${shuffledAnswers.id} pytanie za ${nowMoney}:
[ ${question} ]
A: ${shuffledAnswers.A}
B: ${shuffledAnswers.B}
C: ${shuffledAnswers.C}
D: ${shuffledAnswers.D}
(/mi [A/B/C/D] - /mi kola)` ;


}

function miRepeat(arr){
    return `${shuffledAnswers.id} pytanie za ${nowMoney}:
[ ${question} ]
A: ${shuffledAnswers.A}
B: ${shuffledAnswers.B}
C: ${shuffledAnswers.C}
D: ${shuffledAnswers.D}
(/mi [A/B/C/D] - /mi kola)` ;
}

function getQuestion(nr){
 if(nr == 0){
    api.sendMessage(`*[ MILIONERZY ]*`+
        `\nWitam w teleturnieju! Rozpoczynamy!`, event.threadID);
    api.sendMessage(changeQuestion(nr), event.threadID);
 }
 else if(nr == 11){
    api.sendMessage(`*[ MILIONERZY ]*`+
        `\nOSTATNIE PYTANIE! Jeżeli odpowiesz dobrze okrągły milion jest Twój!`, event.threadID);
    api.sendMessage(changeQuestion(nr), event.threadID);
 }else{
    let randMessage = Math.random();
    if (randMessage < 0.5){
        api.sendMessage(`*[ MILIONERZY ]*`+
            `\nŚwietnie! Następne pytanie ${changeQuestion(nr)}`, event.threadID);
    }
    else if (randMessage < 0.7){
        api.sendMessage(`*[ MILIONERZY ]*`+
            `\nZnakomicie! Kolejne pytanie ${changeQuestion(nr)}`, event.threadID);
    }
    else{
        api.sendMessage(`*[ MILIONERZY ]*`+
            `\nPrzejdzmy teraz do pytania numer ${changeQuestion(nr)}`, event.threadID);
    }
 }
}
//debul
function changeQuestionHelp(arr){
    let search_term = 'Zmień pytanie';

    for (let i = player.lifebuoys.length-1; i>=0; i--) {
        if (player.lifebuoys[i] === search_term) {
            player.lifebuoys.splice(i, 1);
           //break;
        }
    }

}

function fiftyFify(arr){

    let search_term = '50/50';

    for (let i=player.lifebuoys.length-1; i>=0; i--) {
        if (player.lifebuoys[i] === search_term) {
            player.lifebuoys.splice(i, 1);
           //break;
        }
    }

if(shuffledAnswers.A == answer){
    return `${shuffledAnswers.id} pytanie za ${nowMoney}:
[ ${question} ]
A: ${shuffledAnswers.A}
C: ${shuffledAnswers.C}
(/mi [A/B/C/D] - /mi kola)` ;
    }else if(shuffledAnswers.B == answer){
    return `${shuffledAnswers.id} pytanie za ${nowMoney}:
[ ${question} ]
B: ${shuffledAnswers.B}
D: ${shuffledAnswers.D}
(/mi [A/B/C/D] - /mi kola)` ;
    }else if(shuffledAnswers.C == answer){
    return `${shuffledAnswers.id} pytanie za ${nowMoney}:
[ ${question} ]
A: ${shuffledAnswers.A}
C: ${shuffledAnswers.C}
(/mi [A/B/C/D] - /mi kola)` ;
    }else if(shuffledAnswers.D == answer){
    return `${shuffledAnswers.id} pytanie za ${nowMoney}:
[ ${question} ]
C: ${shuffledAnswers.C}
D: ${shuffledAnswers.D}
(/mi [A/B/C/D] - /mi kola)` ;
    }
}

function playerAnswer(arr, ans){
    if(answering){
        let panAns = ans.toUpperCase();
        if(arr[panAns] == answer ){


            if((arr.id-1) == 11){
                answering = false;
                player.money = progi[arr.id-1];
                api.sendMessage("*[ MILIONERZY ]*"+
                    `\nTak! Prawidłowa odpowiedź to:`+
                    `\n${panAns} - ${answer}`+
                    `\n!!!!!!!!!!!!!!!!!!!`+
                    `\nGratulacje wygrales 1 000 000$!!`+
                    `\nGracz ${player.name} wygrał gre!`,event.threadID);
                    miStop();
            }else{
                if((arr.id-1) == 1 || (arr.id-1) == 6){
                    player.gMoney = progi[arr.id-1];
                }
                answering = false;
                player.money = progi[arr.id-1];
                api.sendMessage("*[ MILIONERZY ]*"+
                    `\nTak! Prawidłowa odpowiedź to:`+
                    `\n${panAns} - ${answer}`+
                    `\nMasz na koncie: ${player.money}$`+
                    `\n(tabele wygranych: /mi win)`,event.threadID);
                getQuestion(arr.id);
            }
        }else{
            for(let i = 0; i < 4; i++){
                if (arr[abcd[i]] === answer){
                    var realAnswer = abcd[i];
                }
            }
            answering = false;
            api.sendMessage("*[ MILIONERZY ]*"+
                `\nNiestety błąd! :( Prawidłowa odpowiedź to:`+
                `\n${realAnswer} - ${answer}`+
                `\nTwoja wygrana: ${player.gMoney}$`,event.threadID);
            miStop();
        }
    }else{
        api.sendMessage("*[ MILIONERZY ]*"+
            `\nNie zostało zadane żadne pytanie!`, event.threadID);
    }
}

function miStop(){
    milionerzy = false;
    player.id = 0;
    player.name = "";
    player.money =  0;
    player.gMoney = 0;
    player.lifebuoys = ["Zmień pytanie", "50/50", "Pomoc publiczności"]; 
    realAnswer = "";
    answering = false;
    answer = "";
    shuffledAnswers = [];
    miGroupAccess = "";
    api.sendMessage("*[ MILIONERZY ]*"+
        `\nGra została wyłączona!`, event.threadID);
}


function miStart(groupID){
    milionerzy = true;
    miGroupAccess = groupID;
    api.sendMessage(`*[ MILIONERZY ]*
Gra Milionerzy wystartowała! Kto chce sie zmierzyc z pytaniami i wygrac MILION $?
Komenda: /mi join (! MAX *1* OSOBA !)`, event.threadID);

}

    });
});


/* MILIONERZY */

const progi = [500,1000,2000,5000,10000,20000,40000,75000,125000,250000,500000,1000000];
const player = {
    "id": 0,
    "name": "",
    "money": 0,
    "gMoney": 0,
    "lifebuoys": ["Zmień pytanie", "50/50", "Pomoc publiczności"]
};
const abcd = "ABCD";
var answer;
var shuffledAnswers = [];
var answering = false;

const quest = [
        {
            "money": 500,
            "questions": [
                {
                    "contents": "Co powstanie z wody, gdy ją zamrozimy?",
                    "q": ["Ogień", "Chmura gazu", "Nic"],
                    "a": "Lód"
                },
                {
                    "contents": "Odwrócona flaga Polski to flaga:",
                    "q": ["Kanady", "USA", "Niemiec"],
                    "a": "Monako"
                },
                {
                    "contents": "Co kochani wycinają na pniach drzew?",
                    "q": ["dłonie złączone szarfą", "mózg z wbitą różą", "motyle w brzuchu"],
                    "a": "serce przebite strzałą"
                },
                {
                    "contents": "Która religia jest politeistyczna?",
                    "q": ["Muzułmanizm", "Katolicyzm", "Judaizm"],
                    "a": "Buddyzm"
                },
                {
                    "contents": "Grota to potoczne, lecz niefachowe określenie:",
                    "q": ["tunelu", "przejścia podziemnego", "korytarza górniczego"],
                    "a": "jaskini"
                },
                {
                    "contents": "Dokończ przysłowie: Jeszczesię taki nie urodził, co by",
                    "q": ["w drogę nie wchodził", "na wszystko zaradził", "wszystkich pogodził"],
                    "a": "każdemu dogodził"
                },
                {
                    "contents": "Jakie to liczby: 2,3,5,7,11",
                    "q": ["parzyste", "kolejne", "złożone"],
                    "a": "pierwsze"
                },
                {
                    "contents": "Kapuśniaczkiem określa się:",
                    "q": ["niesfornego urwipołcia", "obżarciucha warzyw", "smaczną potrawę z kapusty"],
                    "a": "drobne opady deszczu"
                },
                {
                    "contents": "Kto odkrył Amerykę?",
                    "q": ["Ferdynand Magellan", "Ferdynand Kiepski", "Vinventy van Gogh"],
                    "a": "Krzysztof Kolumb "
                },
                {
                    "contents": "Czym jest Słońce?",
                    "q": ["statelitą", "kometą", "planetą"],
                    "a": "gwiazdą  "
                },
                {
                    "contents": "Które z wymienionuch znaczeń nie odnosi się do urodzin?",
                    "q": ["prezent", "rocznica", "album grupy Dżem"],
                    "a": "święto ku czci Geniusza"
                },
                {
                    "contents": "Co w wolnym tłumaczeniu oznacza słowo fraszka?",
                    "q": ["gałązka", "krótka myśl", "ptaszek"],
                    "a": "wierszyk"
                },
                {
                    "contents": "Stolicą Ukrainy jest:",
                    "q": ["Praga", "Kopenhaga", "Bratysława"],
                    "a": "Kijów"
                },
                {
                    "contents": "Udomowioną formą zająca jest:",
                    "q": ["zając wielkouchy", "zając bielak", "zając szarak"],
                    "a": "królik europejski"
                },
                {
                    "contents": "W układzie SI podstawową jednostką miary długości jest:",
                    "q": ["centymetr", "kilometr", "milimetr"],
                    "a": "metr"
                },
                {
                    "contents": "Z jakim zwierzęciem utożsamiamy przejście dla pieszych?",
                    "q": ["z psem", "z żyrafą", "z lampartem"],
                    "a": "z zebrą"
                },
                {
                    "contents": "W godle polskim orzeł znajduje się na tle:",
                    "q": ["czarnym", "zielonym", "fioletowym"],
                    "a": "czerwonym"
                },
                {
                    "contents": "Biblijna liczba bestii to:",
                    "q": ["997", "2137", "69"],
                    "a": "666"
                },
                {
                    "contents": "Jakiego koloru jest czerwony maluch?",
                    "q": ["Żółty", "Zielony", "Biały"],
                    "a": "Czerwony"
                },
                {
                    "contents": "Ile jest papierosów w standardowej paczce?",
                    "q": ["15", "22", "10"],
                    "a": "20"
                },
                {
                    "contents": "Jakiego koloru rybka obiecała rybakowi spełnić jego trzy życzenia?",
                    "q": ["Zielonego", "Pomarańczowego", "Białego"],
                    "a": "Złotego"
                },
                {
                    "contents": "Czym jest wynik dodawania?",
                    "q": ["różnicą", "ilorazem", "iloczynem"],
                    "a": "sumą"
                },
                {
                    "contents": "Czym jest wynik odejmowania?",
                    "q": ["sumą", "ilorazem", "iloczynem"],
                    "a": "różnicą"
                },
                {
                    "contents": "Czym jest wynik mnożenia?",
                    "q": ["różnicą", "ilorazem", "sumą"],
                    "a": "iloczynem"
                },
                {
                    "contents": "Czym jest wynik dzielenia?",
                    "q": ["różnicą", "sumą", "iloczynem"],
                    "a": "ilorazem"
                },
                {
                    "contents": "Jak nazywa się światowa sieć komputerowa?",
                    "q": ["światłowód", "LAN", "kablówka"],
                    "a": "Internet"
                },
                {
                    "contents": "Czym Chińczycy jadają potrawy z ryżu?",
                    "q": ["widelcami", "nożami", "łyżkami"],
                    "a": "pałeczkami"
                }
            ]
        },
        {
            "money": 1000,
            "questions": [
                {
                    "contents": "Puklerz to rodzaj:",
                    "q": ["Miecza", "Hełmu", "Zbroi"],
                    "a": "Tarczy"
                },
                {
                    "contents": "Który z ciuchów to bomberka?",
                    "q": ["spódnica", "koszulka", "czapka"],
                    "a": "kurtka"
                },
                {
                    "contents": "Jak nazywa sie najgłębszy rów oceaniczny na świecie?",
                    "q": ["Kermadec", "Rów Tonga", "Riukiu"],
                    "a": "Rów Mariański"
                },
                {
                    "contents": "Jakimi zwierzętami zajmuje się w Indiach kornak?",
                    "q": ["świniami", "koniami", "krowami"],
                    "a": "sloniami"
                },
                {
                    "contents": "Prohibicja to zakaz spożywania:",
                    "q": ["warzyw", "wieprzowiny", "pokarmów mięsnych"],
                    "a": "alkoholu"
                },
                {
                    "contents": "Co krył koń trojański?",
                    "q": ["wojowników trojańskich", "ładunek wybuchowy", "wiele nieszczęść"],
                    "a": "wojoników greckich"
                },
                {
                    "contents": "Na którym kontynencie znajduje sie Góra Kościuszki?",
                    "q": ["w Europie", "w Afryce", "w Azji"],
                    "a": "w Australii"
                },
                {
                    "contents": "Który anioł zwiastował narodzenie Chrystusa?",
                    "q": ["Michał", "Wódź Wojska Pana", "Lucyfer"],
                    "a": "Gabriel"
                },
                {
                    "contents": "Jaka legenda jest związana z Warszawą?",
                    "q": ["O smoku wawelskim", "O Szymonie", "O wsi za miastem"],
                    "a": "O Syrence"
                },
                {
                    "contents": "W którym roku rozpoczęła się II Wojna Światowa?",
                    "q": ["1854", "1911", "1945"],
                    "a": "1939"
                },
                {
                    "contents": "Marmolady nie zrobimy z:",
                    "q": ["truskawek", "agrestu", "pomarańczy"],
                    "a": "pomidorów"
                },
                {
                    "contents": "Faraonowie rządzili:",
                    "q": ["Polską", "Persją", "Spartą"],
                    "a": "Egiptem"
                },
                {
                    "contents": "Droga Krzyżowa dzieli się na:",
                    "q": ["misje", "sanktuaria", "haramy"],
                    "a": "stacje"
                },
                {
                    "contents": "Zespół nabytego upośledzenia odporności to:",
                    "q": ["anemia", "NSM", "BCB"],
                    "a": "AIDS"
                },
                {
                    "contents": "Który z podanych opisów dotyczy glukozy?",
                    "q": ["sok", "cytoplazma", "przepustowość"],
                    "a": "cukier prosty"
                }
            ]
        },
        {
            "money": 2000,
            "questions": [
                {
                    "contents": "Jaki kształt ma budynek Pentagonu?",
                    "q": ["Trapezu", "Koła", "Deltoidu"],
                    "a": "Pięciokąta"
                },
                {
                    "contents": "Delta w matematyce jest róznoznaczna z:",
                    "q": ["ilorazem", "sumą", "iloczynem"],
                    "a": "różnicą"
                },
                {
                    "contents": "Synonimem Stwórcy jest wyrażenie alfa i",
                    "q": ["beta", "delta", "gamma"],
                    "a": "omega"
                },
                {
                    "contents": "Który z tych wyrazów znajdzie swe miejsce w słowniku ortograficznym?",
                    "q": ["zachachmencić", "zachahmęcić", "zahachmęcić"],
                    "a": "zachachmęcić"
                },
                {
                    "contents": "Do ilu punktów liczy się set w tenisie stołowym?",
                    "q": ["22", "20", "21"],
                    "a": "11"
                },
                {
                    "contents": "Lekarz leczący zęby nazywa się..",
                    "q": ["Laryngologiem", "Weterynarzem", "Głupcem"],
                    "a": "Stomatologiem"
                },
                {
                    "contents": "Preambuła to inaczej:",
                    "q": ["rozwinięcie", "zakończenie", "errata"],
                    "a": "wstęp"
                },
                {
                    "contents": "Świeta księga islamu to:",
                    "q": ["Kordian", "Kornik", "Kolon"],
                    "a": "Koran"
                },
                {
                    "contents": "Ile bajtów zawarte jest w 4 kB?",
                    "q": ["4000", "4192", "4012"],
                    "a": "4096"
                },
                {
                    "contents": "1dm to:",
                    "q": ["100 cm", "1 cm", "1000 mm"],
                    "a": "100 mm"
                },
                {
                    "contents": "Które z zanieczyszczeń powietrza powodują powstawanie kwaśnych opadów?",
                    "q": ["tlenek wapnia", "sadza", "pyły"],
                    "a": "tlenek siarki"
                }
            ]
        },
        {
            "money": 5000,
            "questions": [
                {
                    "contents": "Która część roweru posiada bieżnik?",
                    "q": ["szprycha", "rama", "hamulec"],
                    "a": "opona"
                },
                {
                    "contents": "Jeśli powiemy że suknia ma kolor ametysowy to znaczy że ma kolor zbliżony do:",
                    "q": ["błękitnego", "zielonego", "beżowego"],
                    "a": "fioletowego"
                },
                {
                    "contents": "Co dosłownie oznacza słowo Biblia?",
                    "q": ["słowo", "prawo", "przymierze"],
                    "a": "księgi"
                },
                {
                    "contents": "Które ciało stałe ma najmniejszą gęstość:",
                    "q": ["beton", "piasek", "szkło"],
                    "a": "drewno"
                },
                {
                    "contents": "Ile miesięcy liczy kwartał?",
                    "q": ["cztery", "dwa", "jeden"],
                    "a": "trzy"
                },
                {
                    "contents": "11 listopada to rocznica:",
                    "q": ["powstania listopadowego", "uchwalenia konstytucji", "wybuchu I wojny światowej"],
                    "a": "odzyskania niepodległości"
                },
                {
                    "contents": "Przedstawiciele, której gromady składają skrzek?",
                    "q": ["gady", "ryby", "ssaki"],
                    "a": "płazy"
                }
            ]
        },
        {
            "money": 10000,
            "questions": [
                {
                    "contents": "Co istnieje w herbie miasta Piła?",
                    "q": ["anioł", "piła", "drzewo"],
                    "a": "jeleń"
                },
                {
                    "contents": "Symbolem portalu nasza-klasapl jest:",
                    "q": ["Pan Kurczak", "Kitka Anitka", "Panda Wanda"],
                    "a": "Pan Gąbka"
                },
                {
                    "contents": "W którym roku została ochrzczona Polska?",
                    "q": ["996", "699", "969"],
                    "a": "966"
                },
                {
                    "contents": "Cząsteczka DNA zbudowana jest z:",
                    "q": ["jednej nici", "czterech nici", "trzech nici"],
                    "a": "dwóch nici"
                },
                {
                    "contents": "Nie u wszystkich organizmów występuje:",
                    "q": ["DNA", "węglodowany", "tłuszcze"],
                    "a": "chlorofil"
                },
                {
                    "contents": "Larwa muchy i pszczoły to:",
                    "q": ["pędrak", "gąsiennica", "poczwarka"],
                    "a": "czerw"
                }
            ]
        },
        {
            "money": 20000,
            "questions": [
                {
                    "contents": "Co nie jest nazwą stylu pływackiego?",
                    "q": ["Delfin", "Kraul", "Żabka"],
                    "a": "Rekin"
                },
                {
                    "contents": "Ile w Polsce można jechać na drodze o dwóch pasach ruchu w jednym kierunku poza terenem zabudowanym?",
                    "q": ["90 hm/h", "80 km/h", "110 km/h"],
                    "a": "100 km/h"
                },
                {
                    "contents": "Woda to tlenek",
                    "q": ["węgla", "srebra", "żelaza"],
                    "a": "wodoru"
                },
                {
                    "contents": "Międzynarodowa organizacja policyjna ścigająca przestępstwa kryminalne to:",
                    "q": ["Mosad", "Czeka", "Secret Service"],
                    "a": "Interpol"
                },
                {
                    "contents": "Które z określeń nie oznacza wysłannika?",
                    "q": ["poseł", "emisariusz", "kurier"],
                    "a": "ordynat"
                },
                {
                    "contents": "Pamięć operacyjna (o swobodnym dostępie) jest określana symbolem",
                    "q": ["ROM", "GB", "RMM"],
                    "a": "RAM"
                },
                {
                    "contents": "Wafel pieczony z delikatnego ciasta w specjalnych foremkach to:",
                    "q": ["wafel light", "bajgiel", "beza"],
                    "a": "andrut"
                }
            ]
        },
        {
            "money": 40000,
            "questions": [
                {
                    "contents": "Które ze słów nie jest synonimem wyrażenia - gumowe ucho?",
                    "q": ["konfident", "denuncjant", "figurant"],
                    "a": "dyskretny"
                },
                {
                    "contents": "Czym jest migotka?",
                    "q": ["odświeżeniem diody LED", "natężeniem żarówki", "elementem budowy aparatu"],
                    "a": "trzecią powieką"
                },
                {
                    "contents": "Constans oznacza wartość:",
                    "q": ["sinusoidy", "stale malejącą", "stale rosnącą"],
                    "a": "stałą"
                },
                {
                    "contents": "Czym żywił się Jan Chrzciciel?",
                    "q": ["mrówkami", "larwami", "chrabąszczami"],
                    "a": "szarańczą"
                },
                {
                    "contents": "Ile jest znaków zodiaku?",
                    "q": ["11", "10", "14"],
                    "a": "12"
                },
                {
                    "contents": "Jaka część mowy odpowiada na pytania: kto, co?",
                    "q": ["czasownik", "przymiotnik", "dopełniacz"],
                    "a": "rzeczownik"
                },
            ]
        },
        {
            "money": 75000,
            "questions": [
                {
                    "contents": "Czyją siedzibą jest Belweder?",
                    "q": ["marszałka sejmu", "premiera", "papieża"],
                    "a": "prezydenta"
                },
                {
                    "contents": "Wiecznie żywe idee to idee:",
                    "q": ["Stalina", "Marksa", "Engelsa"],
                    "a": "Lenina"
                },
                {
                    "contents": "Działalność techniczna polegająca na ujednolicaniu towarów i doprowadzaniu jego cech do wymmagań odpowiednich norm to:",
                    "q": ["normalizacja", "typizacja", "certyfikacja"],
                    "a": "standaryzacja"
                },
                {
                    "contents": "Jakim wersetem zaczyna się Biblia?",
                    "q": ["Na początku było Słowo, a Słowo było u Boga, a Bogiem było Słowo.", "I stworzył Bóg człowieka na obraz swój.", "I rzekł Bóg: Niech stanie się światłość."],
                    "a": "Na początku stworzył Bóg niebo i ziemię."
                },
                {
                    "contents": "Symbolem Ducha Świętego nie jest?",
                    "q": ["gołębica", "wiatr", "woda"],
                    "a": "burza"
                },
                {
                    "contents": "Jakie miasto było tłem burzliwego i tragicznego romansu Romea i Julii?",
                    "q": ["Wenecja", "Wenezuela", "Florencja"],
                    "a": "Werona"
                },
                {
                    "contents": "Z gry, na jakim instrumencie słynie Czesław Mozil:",
                    "q": ["na kornecie", "na ksylofonie", "na djembe"],
                    "a": "na akordeonie"
                },
                {
                    "contents": "Ekliptyka to droga pozornego rocznego ruchu:",
                    "q": ["Ziemi", "Księżyca", "Marsa"],
                    "a": "Słońca"
                }
            ]
        },
        {
            "money": 125000,
            "questions": [
                {
                    "contents": "Największy szczyt Sudetów to:",
                    "q": ["Łysocina", "Wielki Szyszak", "Przedział"],
                    "a": "Śnieżka"
                },
                {
                    "contents": "Odpowiedzialność konstytucyjna jest ponoszona przed:",
                    "q": ["Sądem Najwyższym", "Trybunałem Konstytucyjnym", "Sądem Krajowym"],
                    "a": "Trybunałem Stanu"
                },
                {
                    "contents": "W którym mieście zmarł Karol Wojtyła Senior?",
                    "q": ["w Lipniku", "w Warszawie", "w Wadowicach"],
                    "a": "w Krakowie"
                },
                {
                    "contents": "Przysłowiowa ciekawość:",
                    "q": ["prowadzi do nikąd", "zniszczyła nadzieję", "rujnuje przyjaźń"],
                    "a": "zbiła kota"
                },
                {
                    "contents": "Za pomoca czego otrzymuje się obraz w kserokipiarce bądź też drukarce laserowej?",
                    "q": ["promiennika czerwieni", "lasera", "atrametnu"],
                    "a": "tonera"
                },
                {
                    "contents": "Jakie pojęcie - w starożytnej kulturze - określa komentarz, dopowiedzenie lub charakterystykę, wypowiedziane przez chór?",
                    "q": ["eksodus", "epeisodia", "parados"],
                    "a": "stasimon"
                },
                {
                    "contents": "Ciut to nie?",
                    "q": ["ociupina", "zdziebko", "krztyna"],
                    "a": "w bród"
                },
                {
                    "contents": "Kto wypowiedział słowa: Ja nie z soli ani z roli, ale z tego, co mnie boli?",
                    "q": ["Jan III Sobieski", "Bartosz Głowacki", "Józef Piłsudzki"],
                    "a": "Stefan Czarniecki"
                }
            ]
        },
        {
            "money": 250000,
            "questions": [
                {
                    "contents": "Ile występuje faz rozwoju demograficznego?",
                    "q": ["4 fazy", "3 fazy", "6 faz"],
                    "a": "5 faz"
                },
                {
                    "contents": "W herbie Watykanu przecinają się dwa klucze Jakiego są one koloru?",
                    "q": ["obydwa złotego", "srebrnego i brązowego", "złotego i brązowego"],
                    "a": "złotego i srebrnego"
                },
                {
                    "contents": "Bumelant:",
                    "q": ["to współczesny sędzia", "szpieguje firmy handlowe", "wyszukuje bubli prawnych"],
                    "a": "regularnie unika pracy"
                },
                {
                    "contents": "Największym przyjacielem Czesia z serialu Włatcy Móch nie jest:",
                    "q": ["Wacek", "Wujek Alfred", "Miś Przekliniak"],
                    "a": "Marcel"
                },
                {
                    "contents": "Kto był pierwszym męczennikiem?",
                    "q": ["Piotr", "Jakub", "Barnaba"],
                    "a": "Szczepan"
                },
                {
                    "contents": "Ile trwała wojna stuletnia?",
                    "q": ["100 lat", "144 lat", "99 lat"],
                    "a": "116 lat"
                },
                {
                    "contents": "Ile gwiazd znajduje się na fladze państwowej Australii?",
                    "q": ["cztery", "osiem", "pięć"],
                    "a": "sześć"
                },
                {
                    "contents": "Jak nazywa się jednostka monetarna Turcji:",
                    "q": ["Pira", "Dira", "Mira"],
                    "a": "Lira"
                },
                {
                    "contents": "Religią dominująca w Turcji jest",
                    "q": ["Buddyzm", "Bahaizm", "Jazydyzm"],
                    "a": "Islam"
                }
            ]
        },
        {
            "money": 500000,
            "questions": [
                {
                    "contents": "W latach 80 rekord Guinessa w ilości sprzedawanych komputerów pobił model",
                    "q": ["Apple II", "ZX Spectrum", "Amiga 500"],
                    "a": "Commodore C64"
                },
                {
                    "contents": "Kto wygrał pierwszą edycję popularnego programu rozrywkowego Taniec z gwiazdam?",
                    "q": ["Anna Guzik", "Katarzyna Cichopek", "Kinga Rusin"],
                    "a": "Olivier Janiak"
                },
                {
                    "contents": "Kto w latach 1992-1995 prowadził teleturniej Koło Fortuny:",
                    "q": ["Krzysztof Tyniec", "Andrzej Kopiczyński", "Paweł Wawrzecki"],
                    "a": "Wojciech Pijanowski"
                },
                {
                    "contents": "Która z ofiar kwietniowej katastrofy Tu-154 w Smoleństku sprawowała mandat senatorski?",
                    "q": ["Leszek Duptała", "Arkadiusz Rybicki", "Edward Wojtas"],
                    "a": "Stanisław Zając"
                },
                {
                    "contents": "Z ilu znaków składa się numer identyfikacyjny VIN?",
                    "q": ["z 13", "z 19", "z 15"],
                    "a": "z 17"
                },
                {
                    "contents": "Które zdanie współrzędnie złożone nie istnieje?",
                    "q": ["przeciwstawne", "wynikowe", "synonimiczne"],
                    "a": "homonimiczne"
                },
                {
                    "contents": "Likier maraskino produkuje się z maraski, czyli odmiany:",
                    "q": ["jabłoni", "figi", "gruszy"],
                    "a": "wiśni"
                },
                {
                    "contents": "Pliki o rozszerzeniu nazwy COM to pliki",
                    "q": ["multimedialne", "inicializacyjne", "rozruchowe"],
                    "a": "wykonywalne"
                },
                {
                    "contents": "W którym roku została wynaleziona żarówka?",
                    "q": ["1979", "1679", "1875"],
                    "a": "1879"
                }
            ]
        },
        {
            "money": 1000000,
            "questions": [
                {
                    "contents": "Na jaki kolor zabarwi się uniewersalny papierek wskaźnikowy włożony do roztworu mocnej zasady?",
                    "q": ["na czerwony", "na zielony", "na pomarańczowy"],
                    "a": "na granatowy"
                },
                {
                    "contents": "Umowa międzynarodowa obowiązująca w UE od 1 grudnia 2009 została podpisana w:",
                    "q": ["Hadze", "Kopenhadze", "Atenach"],
                    "a": "Lizbonie"
                },
                {
                    "contents": "Jaką nazwę nosił silny wiatr przechodzący przez Polskę w dniach 1 i 2 marca 2008?",
                    "q": ["Gloria", "Konga", "Puma"],
                    "a": "Emma"
                },
                {
                    "contents": "W którym roku odbyła się premiera filmu animowanego pt. Król Lew?",
                    "q": ["w 1993", "w 1995", "w 1996"],
                    "a": "w 1994"
                },
                {
                    "contents": "Które państwo europejskie posługuje się dewizą - Bóg i moje prawo",
                    "q": ["Włochy", "Francja", "Niemcy"],
                    "a": "Wielka Brytania"
                },
                {
                    "contents": "Dokument ogłoszony przez Marcina Lutra w Wittenberdze 31 października 1517 roku to zbiór ilu tez?",
                    "q": ["90ciu", "85ciu", "100tu"],
                    "a": "95ciu"
                },
                {
                    "contents": "Ile jest Psalmów?",
                    "q": ["140", "145", "155"],
                    "a": "150"
                },
                {
                    "contents": "Ile centymetrów wynosi całkowita długość kortu do badmintona w grze pojedynczej?",
                    "q": ["1304", "1430", "1520"],
                    "a": "1340"
                },
                {
                    "contents": "Jakie nazwisko nosił mąż Elizy Orzeszkowej?",
                    "q": ["Orzechow", "Orzech", "Orzesznik"],
                    "a": "Orzeszko"
                },
                {
                    "contents": "Który z podanych instrumentów nie należy do grupy aerofonów?",
                    "q": ["obój", "tuba", "duda"],
                    "a": "żele"
                }
            ]
        }
    ];

