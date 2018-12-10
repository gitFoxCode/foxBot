/************************************
Project: FoxBot
Role: Bot
Platform: Messenger
Author: foxCode
Technology: Node.js
Host: Heroku
Motive: Learning/Fun
**************************************/

const login = require("facebook-chat-api"),
	fs = require('fs'),
	ontime = require('ontime'), // onTime
	weather = require('weather-js'), // Weather info
    rp = require('request-promise'), //Requests
    cheerio = require('cheerio'), // jQuery (DOM)
    foxMath = require('mathjs'), // Calc
    Feed = require('rss-to-json'), // RSS 
	afox = require('./admins.js'),
    mfox = require('./hello.js'),
    funnyMessages = require('./funnyMessages.js'),
    moment = require('moment'); // Time etc.
	//mi = require('./milionerzy.js'),
const version = "1.6.5",
    authorId = "100001810636246",
	botId = "100022605855740"; // BOT ID !IMPORTANT



/*    NOTIFICATIONS    */

const NOTIFICATIONS = [
    {
        group: 1,
        time: 123,
        text: "dupa"
    },
    {
        group: 2,
        time: 123,
        text: "dupa"
    }
];

/* - - - - - - - - - - */


/*      MILIONERZY     */

var milionerzy = false;

/* - - - - - - - - - - */

var useChar = "/";
var spokoj = true,
	ai = false;

/* SETTINGS */

foxMath.import({
  'import':     function () { throw new Error('Import - Disabled') },
  'createUnit': function () { throw new Error('createUnit - Disabled') },
  'simplify':   function () { throw new Error('implify - Disabled') },
  'derivative': function () { throw new Error('derivative - Disabled') }
}, {override: true});

/*          */
const cfox = require("./app/commands.js");
/*module.exports = {
   version,
   authorId,
   botId,
   NOTIFICATIONS
}*/
/* ########## EXPORTS ########## */

module.exports.version = version;
module.exports.authorId = authorId;
module.exports.botId = botId;
module.exports.NOTIFICATIONS = NOTIFICATIONS;
module.exports.useChar = useChar;

/* ############################## */

//eval(fs.readFileSync('./app/commands.js')+'');

/*function read(f) {
  return fs.readFileSync(f).toString();
}
function include(f) {
  eval.apply(global, [read(f)]);
}

include('app/commands.js');
*/
//cfox.cmds;

// Logowanie:

login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
	if(err){
		return console.error(err);
	}
	api.setOptions({ listenEvents: false }); // Słuchanie eventów: True
	// api.sendMessage("Pomyślny restart \n Witam ponownie :)", defaultGroupId);




// ######################################################################
// ########################## DAILY MESSAGES ############################
// ######################################################################
////// REMINDER
ontime({
    cycle: '17:00:00'
}, function (ot) {
    api.sendMessage('⚠ Reminder: https://instaling.pl/', '1341400789301697');
    ot.done();
    return;
})
ontime({
    cycle: '19:00:00'
}, function (ot) {
    api.sendMessage('⚠ Reminder: https://instaling.pl/', '100001810636246');
    ot.done();
    return;
})



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
        todayis = "😓 Poniedziałek";
        break;
    case "Tuesday":
        todayis = "🚓 Wtorek";
        break;
    case "Wednesday":
        todayis = "🍆 Środa";
        break;
    case "Thursday":
        todayis = "🚬 Czwartek";
        break;
    case "Friday":
        todayis = "🍕 Piątek!";
        break;
    case "Saturday":
        todayis = "🍸 Sobota!";
        break;
    case "Sunday":
        todayis = "🍲 Niedziela!";
        break;
    default:
        console.log("Day error.");
}


let todayRandNumber = Math.floor(Math.random() * mfox.helloList.length);

 let roptions = {
                  uri: `https://www.kalendarzswiat.pl/dzisiaj`,
                  transform: function (body) {
                    return cheerio.load(body);
                  }
                };
 rp(roptions).then(($) => {
    let quoteDay = $('.quote-of-the-day').text().replace(/\s+/g, " ");
    let moon = $('.dc_moon_phase').text().replace(/\s+/g, " ");
    let daysToEnd = $('.side_card div:nth-child(6)').text().replace(/\s+/g, " ");


/*api.sendMessage(`‼⏰⏰⏰⏰🔊📢📢📢🔔🔔🔔‼️
📰 *DZIEŃ DOBRY*! 📰
🏁 *Dzień:* *${todayis}*
📆 *Data*: ${dateis}
🔴 *Temperatura*: ${nowTemp}°C
🕗 *Godzina*: ${h}:0${m}
📜 *Cytat na dzisiaj:* ${quoteDay}
🌝 ${moon}
⌛ ${daysToEnd}
‼⏰⏰⏰⏰🔊📢📢📢🔔🔔🔔️‼️`, '1943585119007892');*/
let groupID2 = "1404205732928620"; // IT
let komixxy = "625244260932803";
let own = "473427749508360";
let dailyHello = [groupID2, komixxy, own];

dailyHello.forEach((e,i)=>{
    api.sendMessage(`‼⏰⏰⏰⏰🔊📢📢📢🔔🔔🔔‼️
    📰 *DZIEŃ DOBRY*! 📰
    🏁 *Dzień:* *${todayis}*
    📆 *Data*: ${dateis}
    🔴 *Temperatura*: ${nowTemp}°C
    🕗 *Godzina*: ${h}:0${m}
    📜 *Cytat na dzisiaj:* ${quoteDay}
    🌝 ${moon}
    ⌛ ${daysToEnd}
    ‼⏰⏰⏰⏰🔊📢📢📢🔔🔔🔔️‼️`, e);
});
/*
api.sendMessage(`‼⏰⏰⏰⏰🔊📢📢📢🔔🔔🔔‼️
📰 *DZIEŃ DOBRY*! 📰
🏁 *Dzień:* *${todayis}*
📆 *Data*: ${dateis}
🔴 *Temperatura*: ${nowTemp}°C
🕗 *Godzina*: ${h}:0${m}
📜 *Cytat na dzisiaj:* ${quoteDay}
🌝 ${moon}
⌛ ${daysToEnd}
‼⏰⏰⏰⏰🔊📢📢📢🔔🔔🔔️‼️`, own);
                
api.sendMessage(`‼⏰⏰⏰⏰🔊📢📢📢🔔🔔🔔‼️
📰 *DZIEŃ DOBRY*! 📰
🏁 *Dzień:* *${todayis}*
📆 *Data*: ${dateis}
🔴 *Temperatura*: ${nowTemp}°C
🕗 *Godzina*: ${h}:0${m}
📜 *Cytat na dzisiaj:* ${quoteDay}
🌝 ${moon}
⌛ ${daysToEnd}
‼⏰⏰⏰⏰🔊📢📢📢🔔🔔🔔️‼️`, groupID2);
*/
    
  }) .catch((err) => {
      console.log(err);
  });

});

    ot.done();
    return;
});

// ######################################################################
// ####################### PERSONAL MESSAGES ############################
// ######################################################################
ontime({
    cycle: `00:00:00`
}, function (ot) {
    //Reset all random personal messeges
    setRandomMessages();
    ot.done();
    return;
})
const randomMessages = [{
        id: '100001810636246',
        messages: ['test','test2','test3'],
        time: ['16','17'], // Array with intervals eg. 16-17 -> From 16:00 to 17:00 msg can be send.
        rMinutes: true,
        exactTime: [], // hh:mm
    },{
        id: '100001810636246',
        messages: ['Testowa wiadomość nr. 1','Testowa wiadomość nr.2', 'Testowa wiadomość nr. 3'],
        time: ['17','19'], 
        rMinutes: false,
        exactTime: ['19:00']
    },{
        id: '100004072840517',
        messages: ['Wstawaj wampi! <3', 'Dzień dobry! <3', 'Dzień dobry wampi <3'],
        time: [], 
        rMinutes: false,
        exactTime: ['06:11']
    },{
        id: '100004072840517',
        messages: ['Dobranoc! <3', 'Dobranoc Wampi <3!', 'Miłych snów <3', '<3 kc dobranoc'],
        time: [], 
        rMinutes: false,
        exactTime: ['01:00']
    },{
        id: '100004072840517',
        messages: ['KC! <3', 'Kc Wampi <3', 'KOCHAM CIE WAMPI!!! <3', 'kc','kckckckkc', 'czesc C:', '🙈'],
        time: ['12','24'], 
        rMinutes: true,
        exactTime: []
    },{
        id: '100004072840517',
        messages: funnyMessages.funnyMsg,
        time: ['12','24'], 
        rMinutes: true,
        exactTime: []
    }
];
function setRandomMessages(){
    randomMessages.forEach((e,i)=>{
        ontime({
            cycle: e['exactTime'].length ? e['exactTime'][0] : String(~~((Math.random()*((e['time'][1]-e['time'][0])+1)) + parseInt(e['time'][0],10)) + (  e['rMinutes'] ? ":"+String(~~(Math.random() * 60) + 1 ) : ":00" ) )
        }, function (ot) {
            
            api.sendMessage(e['messages'][~~(Math.random() * e['messages'].length)],e['id']);

            ot.done();
            return;
        });
    }); 
}

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
            		api.sendMessage("[AI] "+event.body, event.threadID);
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
				/// Strefa testów:
            	//////////// WORK WORK WORK
		        if (typeof(event.body) == "string") {
					var input = event.body.toLowerCase();
					var inputNc = event.body;
					var split = input.split(' ');
		                    
					if(input == "cmdchar"){
						cfox.cmds[3].func(api, event, "");
					}
					if(input[0] == useChar){
						var cmd = split[0].substring(1);
						var args = inputNc.slice(split[0].length + 1);
		                        
						for(let i = 0; i < cfox.cmds.length; i++){   
							if(cmd == cfox.cmds[i].cmd){
								if(typeof(cfox.cmds[i].func) == "function"){
									if (!cfox.cmds[i].groupAccess){
									console.log("Executed: '" + cmd + "'");
								cfox.cmds[i].func(api, event, args);
								} else{ // Group Access == ID
									if(cfox.cmds[i].groupAccess == event.threadID){
										console.log("Group "+ event.threadID +" Executed: " + cmd);
										cfox.cmds[i].func(api, event, args);
									}
									else{
										console.log("Group without permissions.");
									}
								  }
								}
								else{
									api.sendMessage(JSON.stringify(cfox.cmds[i]), event.threadID);
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
    let randomQuestion = Math.floor(Math.random() * mData.quest[nr].questions.length );
    question = mData.quest[nr].questions[randomQuestion].contents;
    let allAnswers = mData.quest[nr].questions[randomQuestion].q.slice(0);
    nowMoney = mData.quest[nr].money;
    answer = mData.quest[nr].questions[randomQuestion].a;
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

///quest 
const mData = require("./app/milionare_data.js");

