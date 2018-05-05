const progi = [500,1000,2000,5000,10000,20000,40000,75000,125000,250000,500000,1000000];
const player = {
	"id": 0,
	"name": null,
	"money": 0,
	"gMoney": 0,
	"lifebuoys": ["Zmień pytanie", "50/50", "Pomoc publiczności"]
};

const abcd = "ABCD";
var miGroupAccess;


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function publicHelp(arr){

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

var answer;
var shuffledAnswers = [];
var answering = false;

function changeQuestion(nr){
	let randomQuestion = Math.floor(Math.random() * quest[nr].questions.length );
	let question = quest[nr].questions[randomQuestion].contents;
	let allAnswers = quest[nr].questions[randomQuestion].q.slice(0);
	let nowMoney = quest[nr].money;
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
		if(shuffledAnswers[ans] === answer ){

			if((shuffledAnswers.id-1) == 11){
				answering = false;
				player.money = progi[shuffledAnswers.id-1];
				api.sendMessage("*[ MILIONERZY ]*"+
					`\nTak! Prawidłowa odpowiedź to:`+
					`\n${ans} - ${answer}`+
					`\n!!!!!!!!!!!!!!!!!!!`+
					`\nGratulacje wygrales 1 000 000$!!`+
					`\nGracz ${player.name} wygrał gre!`,event.threadID);
					miStop();
			}else{
				if((shuffledAnswers.id-1) == 1 || (shuffledAnswers.id-1) == 6){
					player.gMoney = progi[shuffledAnswers.id-1];
				}
				answering = false;
				player.money = progi[shuffledAnswers.id-1];
				api.sendMessage("*[ MILIONERZY ]*"+
					`\nTak! Prawidłowa odpowiedź to:`+
					`\n${ans} - ${answer}`+
					`\nMasz na koncie: ${player.money}$`+
					`\n(tabele wygranych: /mi win)`,event.threadID);
				getQuestion(shuffledAnswers.id-1);
			}
		}else{
			for(let i = 0; i < 4; i++){
				if (shuffledAnswers[abcd[i]] === answer){
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
	player.id = 0;
	player.name = null;
	player.money =  0;
	player.gMoney = 0;
	player.lifebuoys = ["Zmień pytanie", "50/50", "Pomoc publiczności"]; 
	milionerzy = false;
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

if(event.body.toLowerCase() == '/mi join') {
	if(miGroupAccess == event.threadID){
		if(milionerzy){
			if(!player.id){
				player.id = event.senderID;

		        api.getUserInfo(player.id, (err, ret) =>{
		        	if(err){
		        		console.log("Milionerzy ERROR: "+ err);
		        	}
		        	for(let prop in ret) {
		        		player.name = ret[prop].name;
		        	}
		        });

		        api.sendMessage("*[ MILIONERZY ]*"+
		        	`\nDołączył gracz ${player.name}! ( *1* / 1 )`+
		        	`\nAby wystartować wpisz: /mi gotowy`, event.threadID);

			} else{
				api.sendMessage("*[ MILIONERZY ]*"+
		        	`\nJuż ktoś dołączył do lobby milionerów! ( *1* / 1 )`, event.threadID);
			}
		} else{
			api.sendMessage("*[ MILIONERZY ]*"+
		        	`\nMilionerzy nie są włączeni! Skontaktuj się a adminem!`, event.threadID);
		}
	} else{
		api.sendMessage("*[ MILIONERZY ]*"+
		    `\nGra trwa na innej grupie!`, event.threadID);

	}
		
}

if(event.body.toLowerCase() == '/mi a' || event.body.toLowerCase() == '/mi b' || event.body.toLowerCase() == '/mi c' || event.body.toLowerCase() == '/mi d') {
	if(milionerzy){
		if(answering){
			let ansInput = event.body.toLowerCase();
			let ansSplit = ansInput.split(' ');
			let ansArgs = ansInput.slice(ansSplit[0].length + 1);
			let ansArg = ansArgs.split(' ')[0];

			playerAnswer(arr, ansArg);
		}else{
			api.sendMessage("*[ MILIONERZY ]*"+
	        	`\nNie zostało zadane żadne pytanie!`, event.threadID);
		}

	}else{
		api.sendMessage("*[ MILIONERZY ]*"+
	        	`\nMilionerzy nie są włączeni! Skontaktuj się a adminem!`, event.threadID);
	}
}

if(event.body.toLowerCase() == '/mi 50') {
	if(milionerzy){
		if(player.id == event.senderID){
			if(player.lifebuoys){
				if(player.lifebuoys.includes("50/50")){
					if(answering){
						fiftyFify(shuffledAnswers);
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
	        	`\nMilionerzy nie są włączeni! Skontaktuj się a adminem!`, event.threadID);
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
	        	`\nMilionerzy nie są włączeni! Skontaktuj się a adminem!`, event.threadID);
	}
}

if(event.body.toLowerCase() == '/mi kola') {
	if(milionerzy){
		if(player.id){
			if(player.lifebuoys){
				api.sendMessage("*[ MILIONERZY ]*"+
	        		`\nKoła ratunkowe gracza ${player.name}`+
	        		`\n${player.lifebuoys.toString()}`+
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
	        	`\nMilionerzy nie są włączeni! Skontaktuj się a adminem!`, event.threadID);
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
	        	`\nMilionerzy nie są włączeni! Skontaktuj się a adminem!`, event.threadID);
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
	        `\nMilionerzy nie są włączeni! Skontaktuj się a adminem!`, event.threadID);
	}
}

if(event.body.toLowerCase() == '/mi repeat') {
	if(milionerzy){
		if(player.id == event.senderID){
			if(answering){
				api.sendMessage("*[ MILIONERZY ]*"+
	        		`\nUwaga, powtarzam pytanie: ${miRepeat(shuffledAnswers)}`, event.threadID);
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
	        	`\nMilionerzy nie są włączeni! Skontaktuj się a adminem!`, event.threadID);
	}
}

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
	        	`\nMilionerzy nie są włączeni! Skontaktuj się a adminem!`, event.threadID);
	}
};

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
					"q": ["22", "20", "11"],
					"a": "21"
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
					"q": ["anioł", "jeleń", "drzewo"],
					"a": "piła"
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
