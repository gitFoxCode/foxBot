const progi = [500,1000,2000,5000,10000,20000,40000,75000,125000,250000,500000,1000000];
const player = {
	"name": null,
	"money": 0,
	"gMoney": 0,
	"lifebuoys": ["Zmień pytanie", "50/50", "Pomoc publiczności"]

};


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

var answer;
var shuffledAnswers = [];

function publicHelp(arr){


let A = Math.floor((Math.random() * 100));
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

}

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

	return `${shuffledAnswers.id} pytanie za ${nowMoney}:
[ ${question} ]
A: ${shuffledAnswers.A}
B: ${shuffledAnswers.B}
C: ${shuffledAnswers.C}
D: ${shuffledAnswers.D}` ;


}

function playerAnswer(arr, ans){
	if(shuffledAnswers[ans] === answer ){
		console.log("Poprawnie! :)");
	}else{
		console.log("Niepoprawnie! :(");
	}
}

changeMoney(newMoney){
	player.money = newMoney
}


const quest = [
		{
			"money": 500,
			"questions": [
				{
					"contents": "Ile lat ma anon?",
					"q": ["10", "15", "65"],
					"a": "12"
				}
			]
		},
		{
			"money": 1000,
			"questions": [
				{
					"contents": "Ile lat ma anon?",
					"q": ["10", "15", "65"],
					"a": "12"
				}
			]
		}
	];









milionerzy: false

	/milionerzy start: [milionerzy: false]
		- milionerzy: true
		- player: none
		- money: 0
		- gMoney: 0
	mess:
	[ MILIONERZY ] 
	Milionerzy zostali wystartowani! Kto chce sie zmierzyc z pytaniami i wygrac MILION?
	Komenda: /milionerzy join (! MAX 1 OSOBA !)

	/milionerzy join: [milionerzy: true, player: none]
		- player: senderID
mess:
[ MILIONERZY ] 
Imie Nazwisko jest teraz graczem w milionerach!
Masz 3 koła ratunkowe! /milionerzy koła 
(Zmień pytanie/50:50/Pomoc publiczności)
Oby odpowiedzieć na pytanie wpisz: /mi [A/B/C/D]
Aby powtórzyć pytanie wpisz /mi repeat
Aby zrezygnowac wpisz /mi leave
Powodzenia!

[ MILIONERZY ]
Pytanie za 100zł:
W którym roku odbyła się bitwa pod Grunwaldem?
A: 1000, B: 1000, C: 1000, D:1000
/mi [A/B/C/D] lub koło /mi koło

[ MILIONERZY ]
Niestety! Prawidłowa odpowiedź to:
C - 1000 
Twoja wygrana: gMoney
(milionerzy zostaja wylaczeni!)

		- milionerzy: false
		- player: none
		- money: 0
		- gMoney: 0

[ MILIONERZY ]
Tak! A - 1000 to poprawna odpowiedz!
Twoja wygrana: 100zł
Aby sprawdzić tabele wygranych wpisz /mi win 

/mi win:
[ MILIONERZY ]
[1 000 000 zł] []
[500 000 zł] []
[250 000 zł] []
[125 000 zł] []
[75 000 zł] []
[40 000 zł*] []
[20 000 zł] []
[10 000 zł] []
[5000 zł] []
[2000 zł] []
[1000 zł*] []
[500 zł] []


^^^ Jezeli gracz jest na danym etapie: pogrób^^

[ MILIONERZY ]
TAK! ODPOWIEDZ X - HASŁO JEST PRAWIDŁOWA!
WYGRAŁES 1.000.000 $!
player.name wygrał gre!
(milionerzy zostają wyłączeni)




500

100
200
300
400
500
600

for( let i = 0; i <= 12; i++ ){
	let liczba = 500 *i;
	let ytext = "";

	if(money >= liczba){
		ytext += ""
	} else{
		ytext += ""
	}
}


	for(let i = 0; i <= 12; i++){
		if(mi.player.money >progi[i]){
			wiadomosc += progi[i] + "[x]"; 
		}
		if(mi.player.money == progi[i]){
			wiadomosc += progi[i] + "[x] <--"; 
		} else{
		if(mi.player.money < progi[i]){
			wiadomosc += progi[i] + "[ ]"; 
		}
		}
	}

	wyswietl (wiadomosc);

