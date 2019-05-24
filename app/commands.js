//const moment = require('moment'); // Time etc.
const foxbot = require('../foxbot.js');
const afox = require('../admins.js');
const fs = require('fs'),
    ontime = require('ontime'), // onTime
    weather = require('weather-js'), // Weather info
    rp = require('request-promise'), //Requests
    cheerio = require('cheerio'), // jQuery (DOM)
    foxMath = require('mathjs'), // Calc
    Feed = require('rss-to-json'), // RSS 
    moment = require('moment'), // Time etc.
    Jimp = require("jimp");

/*    GAMES SETTINGS   */

/*        VERSUS       */

    var vsPLAYERS = [];
    var vsGROUP = "";
    var vsWINNER = "";

/* - - - - - - - - - - */

const commands = [
	{
		cmd: "help",
		groupAccess: false,
		transform: true,
		hidden: false,
		syntax: false,
		desc: "pomoc",
		func: (api, event, args) => {
            api.sendMessage("Brak...", event.threadID);
 			api.sendMessage("Pomoc (0/10)", event.threadID);
		}
	},
    {
        cmd: "cmds",
        groupAccess: false,
        transform: true,
        hidden: false,
        syntax: false,
        desc: "lista komend",
        func: (api, event, args) => {
            let bodyMessage = "";
            bodyMessage += "##########################\n";

            bodyMessage += `######## FoxBot v.${foxbot.version} #######\n`;
            bodyMessage += "########   KOMENDY   #######\n";
            commands.forEach((item,i)=>{
                if(!commands[i]["hidden"]){
                    if(commands[i]["syntax"]){
                        bodyMessage += `/${commands[i]["cmd"]} [${commands[i]["syntax"]}] - ${commands[i]["desc"]}\n`;
                    }else{
                        bodyMessage += `/${commands[i]["cmd"]} - ${commands[i]["desc"]}\n`;
                    }
                } 
            });
            api.sendMessage(bodyMessage,event.threadID);
        }
    },
    {
        cmd: "v",
        groupAccess: false,
        transform: true,
        hidden: false,
        syntax: false,
        desc: "wersja bota",
        func: (api, event, args) => {
            api.sendMessage("foxBot v "+ foxbot.version, event.threadID);
        }
    },
	{
		cmd: "cmdchar",
		groupAccess: false,
		transform: true,
		hidden: false,
		syntax: "znak",
		desc: "znak komendy (domyślnie /)",
		func: (api, event, args) => {
	       if(afox.isAdmin(event.senderID)){
 				if(args == ""){
	                api.sendMessage("Znak komendy to " + foxbot.useChar, event.threadID);                
 				} else if(args.length == 1)
	            {
	                foxbot.useChar = args;
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
		hidden: true,
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
        desc: "zmiana koloru czatu (zablokowane)",
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
        syntax: "EMOJI",
        desc: "zmiana emoji chatu",
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
        // Powiadomienia [*!] TODO
        cmd: "powiadomienie",
        groupAccess: false,
        transform: false,
        hidden: true,
        syntax: "[GODZINA] [TEXT]",
        desc: "dodaje powiadomienia",
        func: (api, event, args) => {
            if(args){
                if(args.trim().split(/\s+/).length >= 2){
                    let time = args.replace(/ .*/,'');

                    if(moment(time, "kk", true).isValid()){

                        let text = args.substr(args.indexOf(" ") + 1);

                        console.log("Ustawiony czas: ", time);
                        console.log("Tekst: ", text);
                        console.log("ID Grupy: ", event.threadID);
                        console.log("Dodano notifications:", foxbot.NOTIFICATIONS[foxbot.NOTIFICATIONS.length-1]);

                        api.sendMessage("[!] Dodano Przypomnienie!", event.threadID);

                        foxbot.NOTIFICATIONS.push({
                            group: event.threadID, 
                            time: time,
                            text: text
                        });

                        api.sendMessage(`[!] O godzinie ${time} o treści "${text}"`, event.threadID);

                    }else{
                        api.sendMessage("[!] Godzina musi być liczbą całkowitą od 1 do 24", event.threadID);
                    }
                }else{
                    api.sendMessage("[!] Musisz podać godzinę oraz wiadomość, która ma zostać wysłana", event.threadID);
                }
            } else{
                api.sendMessage("[!] /powiadomienie [GODZINA] [WIADOMOŚĆ]", event.threadID);
            }
        }
    },
    {
        // Zmiana Tytułu TODO
        cmd: "title",
        groupAccess: false,
        transform: false,
        hidden: false,
        syntax: "tytuł",
        desc: "zmiana tytułu chatu",
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
        syntax: "text",
        desc: "napisanie wiadomości",
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
        syntax: false,
        desc: "losowy bash",
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
        syntax: false,
        desc: "losowy news",
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
        syntax: false,
        desc: "losowy zart",
        func: (api, event, args) => {
            Feed.load('http://joemonster.org/backend.php?channel=krotkie', function(err, rss){
                let random = Math.floor((Math.random() * 95));
                let joke = rss.items[random].description.replace(/\&quot;/gi, ""); 
                api.sendMessage(joke, event.threadID);
            });
        }
    },
    {
    	// Dodaje uzytkownika
        cmd: "add",
		groupAccess: false,
		transform: false,
		hidden: false,
        syntax: "nazwa/id/mail",
        desc: "dodaje uzytkownika",
        func: (api, event, args) => {
			api.getUserID(args, (err, data) => {
				if(err){ 
                    api.addUserToGroup("Nie znaleziono użytownika" + args, event.threadID);
                    return callback(err) 
                };
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
        syntax: "nazwa",
        desc: "zwraca ID użytkownika",
        func: (api, event, args) => {
            api.sendMessage("ID :" + "\n" + event.senderID, event.threadID);
        }
    },
    {
    	cmd: "temperatura",
    	groupAccess: false,
    	transform: false,
    	hidden: false,
    	syntax: false,
    	desc: "pokazuje obecna temperature",
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
        syntax: "przedział od 0",
        desc: "wyswietla losowy numer",
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
        cmd: "imagetext",
        groupAccess: false,
        transform: false,
        hidden: true,
        syntax: "tekst1 tekst2",
        desc: "tekst na obrazku",
        func: (api, event, args) => {
            let fileName = 'app/template.png';
            let newFile = 'app/done.png';
            let imageCaption = args;
            let loadedImage;

            Jimp.read(fileName)
                .then(function (image) {
                    loadedImage = image;
                    return Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
                })
                .then(function (font) {
                    loadedImage.print(font, 40, 40, imageCaption)
                               .write(newFile);
                    setTimeout(function(){ 
                        let msg = {
                            attachment: fs.createReadStream('app/done.png')
                        }
                        api.sendMessage(msg, event.threadID);
                    }, 1000);


                })
                .catch(function (err) {
                    console.error(err);
                });

        }
    },
    {
        cmd: "memegenerator",
        groupAccess: false,
        transform: false,
        hidden: true,
        syntax: "tekst1",
        desc: "tekst na obrazku",
        func: (api, event, args) => {

            let imageCaption = args.split(" ").slice(1).join(" ");
            let loadedImage;
            console.log(args);
            console.log(args.split(" "));
            console.log(args.split(" ").slice(1).join(" "));
            if(args.split(" ")[0] == 'oldman' || args.split(" ")[0] == 'pikachu'){
                let fileName = 'app/'+args.split(" ")[0]+'.png';
                let newFile = 'app/'+args.split(" ")[0]+'_d.png';
                Jimp.read(fileName)
                    .then(function (image) {
                        loadedImage = image;
                        return Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
                    })
                    .then(function (font) {
                        loadedImage.print(font, 10, 10, imageCaption,320)
                                   .write(newFile);
                        setTimeout(function(){ 
                            let msg = {
                                attachment: fs.createReadStream('app/'+args.split(" ")[0]+'_d.png')
                            }
                            api.sendMessage(msg, event.threadID);
                        }, 1000);


                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            } else{
                api.sendMessage("Brak template mema o nazwie " + args.split(" ")[0], event.threadID);
            }
           

        }
    },
    {
        cmd: "cytat",
        groupAccess: false,
        transform: false,
        hidden: false,
        syntax: false,
        desc: "cytat dnia",
        func: (api, event, args) => {
              let roptions = {
                  uri: `https://www.kalendarzswiat.pl/dzisiaj`,
                  transform: function (body) {
                    return cheerio.load(body);
                  }
                };

                rp(roptions)
                  .then(($) => {
                    let quoteDay = $('.quote-of-the-day').text().replace(/\s+/g, " ");
                    //let moon = $('.dc_moon_phase').text().replace(/\s+/g, " ");
                    //let testo = $('.side_card div:nth-child(6)').text();
                    //quoteDayDone = quoteDay.replace(/^\s+|\s+$/g, "");
                    //quoteDayDone = quoteDay.replace(/\s+/g, " ");
                    api.sendMessage("Cytat na dzisiaj: " + quoteDay, event.threadID);
                    //api.sendMessage(moon, event.threadID);
                    //api.sendMessage(testo, event.threadID);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
           // api.sendMessage("Przepowiadam numer: " + randnumber, event.threadID);
        }
    },
    {
        cmd: "lotto",
        groupAccess: false,
        transform: false,
        hidden: false,
        syntax: false,
        desc: "numery lotto z dzisiaj",
        func: (api, event, args) => {
                let roptions = {
                  uri: `https://app.lotto.pl/wyniki/?type=dl`,
                  transform: function (body) {
                    return cheerio.load(body);
                  }
                };

                rp(roptions)
                  .then(($) => {
                    let returnNumbers = "";
                    let numbers = $('body').text().split("\n");
                    numbers.shift();
                    numbers.pop();
                    numbers.forEach(number => returnNumbers += number + " " );
                    api.sendMessage("Dzisiejsze numery lotto: " + returnNumbers, event.threadID);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
           // api.sendMessage("Przepowiadam numer: " + randnumber, event.threadID);
        }
    },
    {
        cmd: "lottorandom",
        groupAccess: false,
        transform: false,
        hidden: false,
        syntax: false,
        desc: "losowe numery lotto",
        func: (api, event, args) => {
                let returnNumbers = "";
                let numbers = Array.from({length: 6}, () => Math.floor(Math.random() * 48)+1);
                numbers.forEach(number => returnNumbers += number + " " );
                api.sendMessage("Jutrzejsze numery lotto: " + returnNumbers, event.threadID);
           // api.sendMessage("Przepowiadam numer: " + randnumber, event.threadID);
        }
    },
    {
    	// toFix: CMD ALIAS HERE!
        cmd: "wypierdalac",
        cmdAlias: "removeall",
		groupAccess: false,
		transform: false,
		hidden: true,
        syntax: false,
        desc: "wyrzuca wszystkich z konferencji.",
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
								if(IDs[i] == foxbot.botId){
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
        syntax: false,
        desc: "usuwa konferencje i wszystkie dane z nią związane",
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
							if(IDs[i] == foxbot.botId){
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
						api.removeUserFromGroup(foxbot.botId, event.threadID);
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
        syntax: false,
        desc: "liczba napisanych wiadomości od momentu dodania bota.",
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
        syntax: "nazwa",
        desc: "zmienia nazwe bota",
        func: (api, event, args) => {
            let newBotName = args.charAt(0).toUpperCase() + args.slice(1);
            let msg = {
                body: "Od dzisiaj nazywam sie *" + newBotName + "*!",
                attachment: api.changeNickname(newBotName, event.threadID, foxbot.botId)
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
        syntax: "user/id",
        desc: "wyrzuca użytkownika.",
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
        syntax: "argument",
        desc: "wyszukuje ID usera",
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
        desc: "kalkulator",
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
		hidden: false,
        syntax: false,
        desc: "wyrzuca bota.",
        func: (api, event, args) => {
			if(afox.isAdmin(event.senderID)) {
				api.removeUserFromGroup(foxbot.botId, event.threadID);
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
        syntax: false,
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
        syntax: false,
        desc: "zwraca threadID",
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
        syntax: "user|nick",
        desc: "zmienia nick użytkownika",
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
        syntax: false,
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
		hidden: true,
        syntax: false,
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
		hidden: true,
        syntax: false,
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
        syntax: false,
        desc: "lista adminow",
        func: (api, event, args) => {
            console.log("Hello!");
            let bodyMessage = "###### foxBot Admins ######\n";
            afox.adminList.forEach((item,i)=>{
                bodyMessage += `- ${afox.adminList[i]["name"]} (${afox.adminList[i]["rank"]})\n`;
            });
            afox.adminList.forEach((item,i)=>{
                bodyMessage += `- ${afox.eventerList[i]["name"]} (${afox.eventerList[i]["rank"]})\n`;
            });
            api.sendMessage(bodyMessage, event.threadID);
            console.log('eee');
        }
    },
    {
        cmd: "wisielecx",
        groupAccess: false,
        transform: false,
        hidden: true,
        syntax: "[number]",
        desc: "test wisielca",
        func: (api, event, args) => {
                wiStage(args[0]);
                console.log(args);
        }
    },
     {
        cmd: "time", //ToFix TODEVELOP
        groupAccess: false,
        transform: false,
        hidden: false,
        syntax: false,
        desc: "sprawdza czas serwera",
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
		syntax: false,
		desc: "wyswietla muke",
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
        syntax: false,
        desc: "infomacje o Tobie",
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
        syntax: false,
        desc: "(cat.jpg)",
        func: (api, event, args) => {

            fs.readdir('./imgs/cats', (err, files) => {
               // let randomcat = Math.floor(Math.random() * files.length) + 1;
                //let msg = {
                //    attachment: fs.createReadStream(`./imgs/cats/${randomcat}.jpg`)
                //}
                let randomcat = files[Math.floor(Math.random()*files.length)];
                let msg = {
                    attachment: fs.createReadStream(`./imgs/cats/${randomcat}`)
                }
                //console.log(randomcat);

                api.sendMessage(msg, event.threadID);
            });
        }
    },
    {
        cmd: "s",
        groupAccess: false,
        transform: false,
        hidden: false,
        syntax: false,
        desc: "(sad.jpg)",
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
        syntax: false,
        desc: "(angry.jpg)",
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
        syntax: "info/start",
        desc: "minigra walka",
        func: (api, event, args) => {
            /* game */
            if(args){
                if(args == "info"){
                    api.sendMessage(`⚔️ *RANDOM FIGHT* ⚔️\n`
                        + `Obecnie w lobby: *${vsPLAYERS.length}*`, event.threadID);
                }
                if(args == "start"){
                    if(vsPLAYERS.length >= 2){
                        api.sendMessage(`⚔️ *RANDOM FIGHT* ⚔️\n`
                            +`W walce bierze udział *${vsPLAYERS.length}* graczy!\n`
                            +`Walka się rozpoczeła! Za sekunde ujawni się zwycięzca!`, event.threadID);
                    if(vsWINNER !== ""){
                        api.sendMessage(`⚔️ *RANDOM FIGHT* ⚔️\n`
                            +`Hola hola... To sie dzieje za szybko! [RESTART]`, event.threadID);
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
                                //console.log("🏆 Wygral: " + ret[prop].name );
                                vsWINNER = ret[prop].name;
                            api.sendMessage(`⚔️ *RANDOM FIGHT* ⚔️\n`
                                +`Wygrał *${vsWINNER}*`, event.threadID);
                            }
                            vsPLAYERS = [];
                            winnerID = "";
                            vsWINNER = "";
                            vsGROUP = "";
                        });
                    } , 1000);

                    }else{
                        api.sendMessage(`⚔️ *RANDOM FIGHT* ⚔️\n`
                            +`Graczy jest zbyt mało! (minimum *2* osoby)\n`
                            +`Obecnie: *${vsPLAYERS.length}*`, event.threadID); 
                    }
                } else if(args == "help"){
                    api.sendMessage(`⚔️ *RANDOM FIGHT* ⚔️\n`
                        +`Komendy: \n`
                        +`*/walcz info* - Sprawdza ile osób jest w lobby\n`
                        +`*/walcz start* - Startujesz walke\n`
                        +`*/walcz* - Dołączasz do lobby\n`
                        +`*/walcz help* - Dostępne komendy`, event.threadID);
                }
            } else{
                 if(vsPLAYERS.includes(event.senderID)){
                    api.sendMessage(`⚔️ *RANDOM FIGHT* ⚔️\n`
                        +`Jesteś już w lobby!`, event.threadID);
                 } else{
                    if(vsGROUP){
                        if(vsGROUP != event.threadID){
                         api.sendMessage(`⚔️ *RANDOM FIGHT* ⚔️\n`
                            +`Walka już trwa na innej grupie!`, event.threadID);
                        }
                    } else{
                        vsGROUP = event.threadID;
                    }
                 api.sendMessage(`⚔️ *RANDOM FIGHT* ⚔️\n`
                    +`Dołączyłeś do Random Fight! ( *${vsPLAYERS.length+1}* / 2 )`, event.threadID);
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
		syntax: false,
		desc: "emotikona kappa",
		func: (api, event, args) => {
			let msg = {
				attachment: fs.createReadStream('imgs/it/kappa.png')
			}
			api.sendMessage(msg, event.threadID);
		}
    }
]

/* ************* HANGMAN *************** */
var hangman = 0;

function wiStart(groupID){
    alphabet = "abcćdefghijklmnńopqrsśtuvwxyzżź";
    hangman = groupID;
    api.sendMessage(`[ WISIELEC ]
Gra w wisielca wystartowała! Kto chce dać słowo, które reszta musi zgadnąć?
Komenda: /wi join (! MAX *1* OSOBA !)`, event.threadID); 
}


var hangman_canvas = "--WISIELEC--";

function wiStage(nr, alphabet){
    console.log("Wistage: "+ nr);
    switch (nr) {
        case '1':
        console.log('case 1');
            hangman_canvas = `\`\`\`
|        
|              
|                
|                 
|               
|                   
|___ 
\`\`\``;
            break;
        case '2':
            hangman_canvas = `\`\`\`
_________
|        
|              
|                
|                 
|               
|                   
|___ 
\`\`\``;
            break;
        case '3':
            hangman_canvas = `\`\`\`
_________
|/   |      
|              
|                
|                 
|               
|                   
|___  
\`\`\``;
            break;
        case '4':
            hangman_canvas = `\`\`\`
_________       
|/   |              
|   (_)
|                         
|                       
|                         
|                          
|___ 
\`\`\``;
            break;
        case '5':
            hangman_canvas = `\`\`\`
________               
|/   |                   
|   (_)                  
|    |                     
|    |                    
|                           
|                            
|___ 
\`\`\``;
            break;
        case '6':
            hangman_canvas = `\`\`\`
________               
|/   |                   
|   (_)                  
|    |                     
|    |                    
|   /                      
|                            
|___ 
\`\`\``;
            break;
        case '7':
            hangman_canvas = `\`\`\`
________               
|/   |                   
|   (_)                  
|    |                     
|    |                    
|   / \\                     
|                            
|___ 
\`\`\``;
        break;
        case '8':
            hangman_canvas = `\`\`\`
 ________               
|/   |                   
|   (_)                  
|   /|                     
|    |                    
|   / \\                    
|                            
|___ 
\`\`\``;
            break;
        case '9':
            hangman_canvas = `\`\`\`
________               
|/   |                   
|   (_)                  
|   /|\\                     
|    |                    
|   / \\                    
|                            
|___ 
\`\`\``;
            break;
        case '10':
            hangman_canvas = `\`\`\`
 ________               
 |/   |                   
 |   (x_x)                  
 |   /|\\                    
 |    |                    
 |   / \\                   
 |                             
 |___ 
 PRZEGRAŁEŚ! 
\`\`\``;
            break;
        default:
            hangman_canvas = "[Wystąpił błąd.]";
            console.log("Case: " + nr);
            break;
    }
    api.sendMessage(hangman_canvas,event.threadID);
}

/*if(event.body.toLowerCase().includes('/wisielec')) {
                let ansInput = event.body.toLowerCase();
                let ansSplit = ansInput.split(' ');
                let ansArgs = ansInput.slice(ansSplit[0].length + 1);
                let ansArg = ansArgs.split(' ')[0];
                wiStage(ansArg);
}*/
  /* WISIELEC */
/*
                if(event.body.toLowerCase() == '/wi start') {
                    if(afox.isAdmin(event.senderID) || afox.isEventer(event.senderID)){
                        if(hangman){
                            api.sendMessage("[WISIELEC] Gra w wisielca już jest włączona!", event.threadID);
                        }else{
                            api.sendMessage("[WISIELEC] Gra w wisielca zostaje włączona!", event.threadID);
                            wiStart(event.threadID); 
                            console.log(event.threadID);
                        }
                    } else{
                        api.sendMessage("[NoAdmin] Nie masz uprawnień.", event.threadID);
                    }
                }
                if(event.body.toLowerCase() == '/wi stop') {
                    if(afox.isAdmin(event.senderID) || afox.isEventer(event.senderID)){
                        if(hangman){
                            api.sendMessage("[WISIELEC] Gra w wisielca już jest wyłączona!", event.threadID);
                        }else{
                            api.sendMessage("[WISIELEC] Gra w wisielca zostaje przerwana!", event.threadID);
                            wiStop(); 
                        }
                    } else{
                        api.sendMessage("[NoAdmin] Nie masz uprawnień.", event.threadID);
                    }
                }*/

/* ************************************ */

module.exports.cmds = commands;