Esimeseks ülesandeks on kirjutada programm tekstifailist info otsimiseks.

Sinu lahendus peaks:
	*Andma õige vastuse
	*Olema puhas ja loetav
	*Olema kommenteeritud / dokumenteeritud

Ülesandes ette antud tekstiks on inglisekeelne autorikaitsest vaba Sherlock Holmes'i seikluste raamat "Baskerville'de koer" (fail raamat.txt)
Sõna tähenduseks on siin ülesandes inglise tähestiku tähtedest (A-Z ja a-z) koosnev järjestus. split('[^a-zA-Z]') Regex
Kõik muud tähemärgid lõpetavad sõna ning alustavad järgmist. Suurtel ja väikestel tähtedel ei tehta vahet.

Mõned näited:
London ja london loetakse samaks sõnaks
let's koosneb kahest sõnast: let ja s
self-help on samuti kaks sõna: self ja help
Mr. Holmes on kaks sõna: mr ja holmes
(Or was it)? koosneb kolmest sõnast: or, was, it

Ülesanne:
Kasutades vabalt valitud programmeerimiskeelt:
1) Leia tekstis esinev pikim sõna. Kui tingimusele vastab mitu sõna, leia need kõik.

2) Leia tekstis kõige sagedasem sõna, mille pikkus on 8 või rohkem tähemärki.