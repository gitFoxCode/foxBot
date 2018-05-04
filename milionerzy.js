const mPytania = [
		{
			"money": 100,
			"questions": [
				{
					"q": "Ile lat ma anon?",
					"a": ["10", "12", "15", "65"],
					"t": "12"
				},
				{
					"q": "Rok bitwy pod grunwaldem",
					"a": ["1856", "1234", "1233", "1410"],
					"t": "12"
				}
			],
			"money": 500,
			"questions": [
				{
					"q": "Ile lat ma anon?",
					"a": ["10", "12", "15", "65"],
					"t": "12"
				}
			],
		}
	]









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
{
	if(money )
}

^^^ Jezeli gracz jest na danym etapie: pogrób^^




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

const progi = [500,1000,2000,5000]

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

switch(mi.player.money){
	case 500:{
		for(let i = 0; i <= 12; i++){
			if(progi)
		}
	}
	default:{
		"co kurwa";
	}
}

