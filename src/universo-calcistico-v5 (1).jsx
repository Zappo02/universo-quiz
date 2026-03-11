import { useState, useEffect, useRef, useMemo } from "react";

// ── DATABASE ────────────────────────────────────────────────────────────
const DB = [
  { name:"Josep Martínez", surname:"Josep Martinez", club:"Inter", league:"Serie A", role:"Portiere", nation:"Spagna", continent:"Europa", age:27, value:9 },
  { name:"Yann Sommer", surname:"Sommer", club:"Inter", league:"Serie A", role:"Portiere", nation:"Svizzera", continent:"Europa", age:37, value:2.5 },
  { name:"Raffaele Di Gennaro", surname:"Di Gennaro", club:"Inter", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:32, value:0.3 },
  { name:"Alessandro Bastoni", surname:"Bastoni", club:"Inter", league:"Serie A", role:"Difensore", nation:"Italia", continent:"Europa", age:26, value:80 },
  { name:"Yann Bisseck", surname:"Bisseck", club:"Inter", league:"Serie A", role:"Difensore", nation:"Germania", continent:"Europa", age:25, value:35 },
  { name:"Manuel Akanji", surname:"Akanji", club:"Inter", league:"Serie A", role:"Difensore", nation:"Svizzera", continent:"Europa", age:30, value:22 },
  { name:"Stefan de Vrij", surname:"De Vrij", club:"Inter", league:"Serie A", role:"Difensore", nation:"Olanda", continent:"Europa", age:34, value:3.5 },
  { name:"Francesco Acerbi", surname:"Acerbi", club:"Inter", league:"Serie A", role:"Difensore", nation:"Italia", continent:"Europa", age:38, value:2.5 },
  { name:"Federico Dimarco", surname:"Dimarco", club:"Inter", league:"Serie A", role:"Terzino", nation:"Italia", continent:"Europa", age:28, value:50 },
  { name:"Carlos Augusto", surname:"Augusto", club:"Inter", league:"Serie A", role:"Terzino", nation:"Brasile", continent:"Sud America", age:27, value:26 },
  { name:"Denzel Dumfries", surname:"Dumfries", club:"Inter", league:"Serie A", role:"Terzino", nation:"Olanda", continent:"Europa", age:29, value:25 },
  { name:"Matteo Darmian", surname:"Darmian", club:"Inter", league:"Serie A", role:"Terzino", nation:"Italia", continent:"Europa", age:36, value:1.5 },
  { name:"Calhanoglu", surname:"Calhanoglu", club:"Inter", league:"Serie A", role:"Centrocampista", nation:"Turchia", continent:"Europa", age:32, value:22 },
  { name:"Nicolò Barella", surname:"Barella", club:"Inter", league:"Serie A", role:"Centrocampista", nation:"Italia", continent:"Europa", age:29, value:60 },
  { name:"Petar Sučić", surname:"Sucic", club:"Inter", league:"Serie A", role:"Centrocampista", nation:"Croazia", continent:"Europa", age:22, value:30 },
  { name:"Davide Frattesi", surname:"Frattesi", club:"Inter", league:"Serie A", role:"Centrocampista", nation:"Italia", continent:"Europa", age:26, value:28 },
  { name:"Andy Diouf", surname:"Diouf", club:"Inter", league:"Serie A", role:"Centrocampista", nation:"Francia", continent:"Europa", age:22, value:18 },
  { name:"Zielinski", surname:"Zielinski", club:"Inter", league:"Serie A", role:"Centrocampista", nation:"Polonia", continent:"Europa", age:31, value:10 },
  { name:"Henrikh Mkhitaryan", surname:"Mkhitaryan", club:"Inter", league:"Serie A", role:"Centrocampista", nation:"Armenia", continent:"Europa", age:37, value:3.5 },
  { name:"Luis Henrique", surname:"Luis Henrique", club:"Inter", league:"Serie A", role:"Ala", nation:"Brasile", continent:"Sud America", age:24, value:23 },
  { name:"Lautaro Martínez", surname:"Lautaro", club:"Inter", league:"Serie A", role:"Attaccante", nation:"Argentina", continent:"Sud America", age:28, value:85 },
  { name:"Marcus Thuram", surname:"Thuram", club:"Inter", league:"Serie A", role:"Attaccante", nation:"Francia", continent:"Europa", age:28, value:60 },
  { name:"Ange-Yoan Bonny", surname:"Bonny", club:"Inter", league:"Serie A", role:"Attaccante", nation:"Francia", continent:"Europa", age:22, value:35 },
  { name:"Pio Esposito", surname:"Pio Esposito", club:"Inter", league:"Serie A", role:"Attaccante", nation:"Italia", continent:"Europa", age:20, value:35 },
  { name:"Mike Maignan", surname:"Maignan", club:"Milan", league:"Serie A", role:"Portiere", nation:"Francia", continent:"Europa", age:30, value:25 },
  { name:"Filippo Terracciano", surname:"Filippo Terracciano", club:"Milan", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:36, value:1 },
  { name:"Lorenzo Torriani", surname:"Torriani", club:"Milan", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:21, value:1 },
  { name:"Strahinja Pavlović", surname:"Pavlovic", club:"Milan", league:"Serie A", role:"Difensore", nation:"Serbia", continent:"Europa", age:24, value:28 },
  { name:"Koni De Winter", surname:"De Winter", club:"Milan", league:"Serie A", role:"Difensore", nation:"Belgio", continent:"Europa", age:23, value:20 },
  { name:"Fikayo Tomori", surname:"Tomori", club:"Milan", league:"Serie A", role:"Difensore", nation:"Inghilterra", continent:"Europa", age:28, value:20 },
  { name:"Matteo Gabbia", surname:"Gabbia", club:"Milan", league:"Serie A", role:"Difensore", nation:"Italia", continent:"Europa", age:26, value:20 },
  { name:"Odogù", surname:"Odogù", club:"Milan", league:"Serie A", role:"Difensore", nation:"Germania", continent:"Europa", age:19, value:5 },
  { name:"Davide Bartesaghi", surname:"Bartesaghi", club:"Milan", league:"Serie A", role:"Terzino", nation:"Italia", continent:"Europa", age:20, value:18 },
  { name:"Estupinan", surname:"Estupinan", club:"Milan", league:"Serie A", role:"Terzino", nation:"Ecuador", continent:"Sud America", age:28, value:14 },
  { name:"Athekame", surname:"Athekame", club:"Milan", league:"Serie A", role:"Terzino", nation:"Svizzera", continent:"Europa", age:21, value:8 },
  { name:"Ardon Jashari", surname:"Jashari", club:"Milan", league:"Serie A", role:"Centrocampista", nation:"Svizzera", continent:"Europa", age:23, value:32 },
  { name:"Youssouf Fofana", surname:"Fofana", club:"Milan", league:"Serie A", role:"Centrocampista", nation:"Francia", continent:"Europa", age:27, value:28 },
  { name:"Samuele Ricci", surname:"Ricci", club:"Milan", league:"Serie A", role:"Centrocampista", nation:"Italia", continent:"Europa", age:24, value:25 },
  { name:"Adrien Rabiot", surname:"Rabiot", club:"Milan", league:"Serie A", role:"Centrocampista", nation:"Francia", continent:"Europa", age:30, value:20 },
  { name:"Ruben Loftus-Cheek", surname:"Loftus-Cheek", club:"Milan", league:"Serie A", role:"Centrocampista", nation:"Inghilterra", continent:"Europa", age:30, value:10 },
  { name:"Luka Modrić", surname:"Modric", club:"Milan", league:"Serie A", role:"Centrocampista", nation:"Croazia", continent:"Europa", age:40, value:4 },
  { name:"Alexis Saelemaekers", surname:"Saelemaekers", club:"Milan", league:"Serie A", role:"Ala", nation:"Belgio", continent:"Europa", age:26, value:25 },
  { name:"Leao", surname:"Leao", club:"Milan", league:"Serie A", role:"Ala", nation:"Portogallo", continent:"Europa", age:26, value:70 },
  { name:"Christian Pulisic", surname:"Pulisic", club:"Milan", league:"Serie A", role:"Ala", nation:"USA", continent:"Nord America", age:27, value:60 },
  { name:"Christopher Nkunku", surname:"Nkunku", club:"Milan", league:"Serie A", role:"Attaccante", nation:"Francia", continent:"Europa", age:28, value:32 },
  { name:"Santiago Gimenez", surname:"Gimenez", club:"Milan", league:"Serie A", role:"Attaccante", nation:"Messico", continent:"Nord America", age:24, value:20 },
  { name:"Niclas Füllkrug", surname:"Fullkrug", club:"Milan", league:"Serie A", role:"Attaccante", nation:"Germania", continent:"Europa", age:33, value:8 },
  { name:"Vanja Milinković-Savić", surname:"Vanja Milinkovic-Savic", club:"Napoli", league:"Serie A", role:"Portiere", nation:"Serbia", continent:"Europa", age:29, value:20 },
  { name:"Alex Meret", surname:"Meret", club:"Napoli", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:28, value:14 },
  { name:"Nikita Contini", surname:"Contini", club:"Napoli", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:29, value:0.3 },
  { name:"Elia Ferrante", surname:"Ferrante", club:"Napoli", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:19, value:0.3 },
  { name:"Alessandro Buongiorno", surname:"Buongiorno", club:"Napoli", league:"Serie A", role:"Difensore", nation:"Italia", continent:"Europa", age:26, value:45 },
  { name:"Sam Beukema", surname:"Beukema", club:"Napoli", league:"Serie A", role:"Difensore", nation:"Olanda", continent:"Europa", age:27, value:28 },
  { name:"Amir Rrahmani", surname:"Rrahmani", club:"Napoli", league:"Serie A", role:"Difensore", nation:"Kosovo", continent:"Europa", age:32, value:12 },
  { name:"Juan Jesus", surname:"Juan Jesus", club:"Napoli", league:"Serie A", role:"Difensore", nation:"Brasile", continent:"Sud America", age:34, value:2 },
  { name:"Mathías Olivera", surname:"Olivera", club:"Napoli", league:"Serie A", role:"Terzino", nation:"Uruguay", continent:"Sud America", age:28, value:18 },
  { name:"Javi Gutiérrez", surname:"Gutierrez", club:"Napoli", league:"Serie A", role:"Terzino", nation:"Spagna", continent:"Europa", age:24, value:17 },
  { name:"Leonardo Spinazzola", surname:"Spinazzola", club:"Napoli", league:"Serie A", role:"Terzino", nation:"Italia", continent:"Europa", age:32, value:4 },
  { name:"Giovanni Di Lorenzo", surname:"Di Lorenzo", club:"Napoli", league:"Serie A", role:"Terzino", nation:"Italia", continent:"Europa", age:32, value:10 },
  { name:"Pasquale Mazzocchi", surname:"Mazzocchi", club:"Napoli", league:"Serie A", role:"Terzino", nation:"Italia", continent:"Europa", age:30, value:2 },
  { name:"Billy Gilmour", surname:"Gilmour", club:"Napoli", league:"Serie A", role:"Centrocampista", nation:"Scozia", continent:"Europa", age:24, value:20 },
  { name:"Stanislav Lobotka", surname:"Lobotka", club:"Napoli", league:"Serie A", role:"Centrocampista", nation:"Slovacchia", continent:"Europa", age:31, value:18 },
  { name:"Scott McTominay", surname:"McTominay", club:"Napoli", league:"Serie A", role:"Centrocampista", nation:"Scozia", continent:"Europa", age:29, value:45 },
  { name:"Frank Anguissa", surname:"Anguissa", club:"Napoli", league:"Serie A", role:"Centrocampista", nation:"Camerun", continent:"Africa", age:30, value:25 },
  { name:"Kevin De Bruyne", surname:"De Bruyne", club:"Napoli", league:"Serie A", role:"Trequartista", nation:"Belgio", continent:"Europa", age:34, value:15 },
  { name:"Elif Elmas", surname:"Elmas", club:"Napoli", league:"Serie A", role:"Trequartista", nation:"Macedonia", continent:"Europa", age:26, value:14 },
  { name:"Enrico Vergara", surname:"Vergara", club:"Napoli", league:"Serie A", role:"Trequartista", nation:"Italia", continent:"Europa", age:23, value:3 },
  { name:"Alisson Santos", surname:"Alisson Santos", club:"Napoli", league:"Serie A", role:"Ala", nation:"Brasile", continent:"Sud America", age:23, value:4 },
  { name:"David Neres", surname:"Neres", club:"Napoli", league:"Serie A", role:"Ala", nation:"Brasile", continent:"Sud America", age:29, value:28 },
  { name:"Matteo Politano", surname:"Politano", club:"Napoli", league:"Serie A", role:"Ala", nation:"Italia", continent:"Europa", age:32, value:8 },
  { name:"Rasmus Højlund", surname:"Hojlund", club:"Napoli", league:"Serie A", role:"Attaccante", nation:"Danimarca", continent:"Europa", age:23, value:45 },
  { name:"Romelu Lukaku", surname:"Lukaku", club:"Napoli", league:"Serie A", role:"Attaccante", nation:"Belgio", continent:"Europa", age:32, value:15 },
  { name:"Giovane", surname:"Giovane", club:"Napoli", league:"Serie A", role:"Attaccante", nation:"Brasile", continent:"Sud America", age:22, value:12 },
  { name:"Michele Di Gregorio", surname:"Di Gregorio", club:"Juventus", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:28, value:18 },
  { name:"Mattia Perin", surname:"Perin", club:"Juventus", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:33, value:3 },
  { name:"Carlo Pinsoglio", surname:"Pinsoglio", club:"Juventus", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:34, value:0.3 },
  { name:"Federico Gatti", surname:"Gatti", club:"Juventus", league:"Serie A", role:"Difensore", nation:"Italia", continent:"Europa", age:27, value:20 },
  { name:"Pierre Kalulu", surname:"Kalulu", club:"Juventus", league:"Serie A", role:"Difensore", nation:"Francia", continent:"Europa", age:25, value:28 },
  { name:"Andrea Cambiaso", surname:"Cambiaso", club:"Juventus", league:"Serie A", role:"Terzino", nation:"Italia", continent:"Europa", age:26, value:30 },
  { name:"Juan Cabal", surname:"Cabal", club:"Juventus", league:"Serie A", role:"Terzino", nation:"Colombia", continent:"Sud America", age:24, value:25 },
  { name:"Emil Holm", surname:"Holm", club:"Juventus", league:"Serie A", role:"Terzino", nation:"Svezia", continent:"Europa", age:24, value:12 },
  { name:"Lloyd Kelly", surname:"Kelly", club:"Juventus", league:"Serie A", role:"Difensore", nation:"Inghilterra", continent:"Europa", age:27, value:20 },
  { name:"Gleison Bremer", surname:"Bremer", club:"Juventus", league:"Serie A", role:"Difensore", nation:"Brasile", continent:"Sud America", age:28, value:35 },
  { name:"Manuel Locatelli", surname:"Locatelli", club:"Juventus", league:"Serie A", role:"Centrocampista", nation:"Italia", continent:"Europa", age:28, value:25 },
  { name:"Miretti", surname:"Miretti", club:"Juventus", league:"Serie A", role:"Centrocampista", nation:"Italia", continent:"Europa", age:23, value:15 },
  { name:"Teun Koopmeiners", surname:"Koopmeiners", club:"Juventus", league:"Serie A", role:"Trequartista", nation:"Olanda", continent:"Europa", age:28, value:28 },
  { name:"Khéphren Thuram", surname:"Khephren Thuram", club:"Juventus", league:"Serie A", role:"Centrocampista", nation:"Francia", continent:"Europa", age:24, value:40 },
  { name:"Weston McKennie", surname:"McKennie", club:"Juventus", league:"Serie A", role:"Centrocampista", nation:"USA", continent:"Nord America", age:27, value:22 },
  { name:"Conceicao", surname:"Conceicao", club:"Juventus", league:"Serie A", role:"Ala", nation:"Portogallo", continent:"Europa", age:23, value:30 },
  { name:"Edon Zhegrova", surname:"Zhegrova", club:"Juventus", league:"Serie A", role:"Ala", nation:"Kosovo", continent:"Europa", age:26, value:20 },
  { name:"Vasilije Adžić", surname:"Adzic", club:"Juventus", league:"Serie A", role:"Trequartista", nation:"Montenegro", continent:"Europa", age:20, value:12 },
  { name:"Jonathan David", surname:"David", club:"Juventus", league:"Serie A", role:"Attaccante", nation:"Canada", continent:"Nord America", age:26, value:35 },
  { name:"Loïs Openda", surname:"Openda", club:"Juventus", league:"Serie A", role:"Attaccante", nation:"Belgio", continent:"Europa", age:26, value:40 },
  { name:"Kenan Yıldız", surname:"Yildiz", club:"Juventus", league:"Serie A", role:"Ala", nation:"Turchia", continent:"Europa", age:20, value:75 },
  { name:"Dušan Vlahović", surname:"Vlahovic", club:"Juventus", league:"Serie A", role:"Attaccante", nation:"Serbia", continent:"Europa", age:26, value:35 },
  { name:"Arkadiusz Milik", surname:"Milik", club:"Juventus", league:"Serie A", role:"Attaccante", nation:"Polonia", continent:"Europa", age:32, value:5 },
  { name:"Filip Kostić", surname:"Kostic", club:"Juventus", league:"Serie A", role:"Ala", nation:"Serbia", continent:"Europa", age:32, value:8 },
  { name:"Jérémie Boga", surname:"Boga", club:"Juventus", league:"Serie A", role:"Ala", nation:"Costa d'Avorio", continent:"Africa", age:28, value:8 },
  { name:"Mile Svilar", surname:"Svilar", club:"Roma", league:"Serie A", role:"Portiere", nation:"Serbia", continent:"Europa", age:26, value:35 },
  { name:"Pierluigi Gollini", surname:"Gollini", club:"Roma", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:30, value:1 },
  { name:"Zelezny", surname:"Zelezny", club:"Roma", league:"Serie A", role:"Portiere", nation:"Polonia", continent:"Europa", age:19, value:0.2 },
  { name:"Evan Ndicka", surname:"Ndicka", club:"Roma", league:"Serie A", role:"Difensore", nation:"Costa d'Avorio", continent:"Africa", age:26, value:30 },
  { name:"Gianluca Mancini", surname:"Mancini", club:"Roma", league:"Serie A", role:"Difensore", nation:"Italia", continent:"Europa", age:29, value:15 },
  { name:"Daniele Ghilardi", surname:"Ghilardi", club:"Roma", league:"Serie A", role:"Difensore", nation:"Italia", continent:"Europa", age:23, value:8 },
  { name:"Ziolkowski", surname:"Ziolkowski", club:"Roma", league:"Serie A", role:"Difensore", nation:"Polonia", continent:"Europa", age:20, value:8 },
  { name:"Mario Hermoso", surname:"Hermoso", club:"Roma", league:"Serie A", role:"Difensore", nation:"Spagna", continent:"Europa", age:30, value:7 },
  { name:"Angeliño", surname:"Angelino", club:"Roma", league:"Serie A", role:"Terzino", nation:"Spagna", continent:"Europa", age:29, value:17 },
  { name:"Tsimikias", surname:"Tsimikias", club:"Roma", league:"Serie A", role:"Terzino", nation:"Grecia", continent:"Europa", age:29, value:10 },
  { name:"Wesley", surname:"Wesley", club:"Roma", league:"Serie A", role:"Terzino", nation:"Brasile", continent:"Sud America", age:22, value:35 },
  { name:"Zeki Çelik", surname:"Celik", club:"Roma", league:"Serie A", role:"Terzino", nation:"Turchia", continent:"Europa", age:29, value:12 },
  { name:"Devyne Rensch", surname:"Rensch", club:"Roma", league:"Serie A", role:"Terzino", nation:"Olanda", continent:"Europa", age:23, value:9 },
  { name:"Bryan Cristante", surname:"Cristante", club:"Roma", league:"Serie A", role:"Centrocampista", nation:"Italia", continent:"Europa", age:31, value:7 },
  { name:"Manu Koné", surname:"Kone", club:"Roma", league:"Serie A", role:"Centrocampista", nation:"Francia", continent:"Europa", age:24, value:50 },
  { name:"Neil El Aynaoui", surname:"El Aynaoui", club:"Roma", league:"Serie A", role:"Centrocampista", nation:"Marocco", continent:"Africa", age:24, value:20 },
  { name:"Niccolò Pisilli", surname:"Pisilli", club:"Roma", league:"Serie A", role:"Centrocampista", nation:"Italia", continent:"Europa", age:21, value:12 },
  { name:"Lorenzo Pellegrini", surname:"Pellegrini", club:"Roma", league:"Serie A", role:"Trequartista", nation:"Italia", continent:"Europa", age:29, value:9 },
  { name:"Ignacio Zaragoza", surname:"Zaragoza", club:"Roma", league:"Serie A", role:"Ala", nation:"Spagna", continent:"Europa", age:24, value:10 },
  { name:"Stephan El Shaarawy", surname:"El Shaarawy", club:"Roma", league:"Serie A", role:"Ala", nation:"Italia", continent:"Europa", age:33, value:3 },
  { name:"Matías Soulé", surname:"Soule", club:"Roma", league:"Serie A", role:"Ala", nation:"Argentina", continent:"Sud America", age:22, value:35 },
  { name:"Christian Venturino", surname:"Venturino", club:"Roma", league:"Serie A", role:"Ala", nation:"Italia", continent:"Europa", age:19, value:2 },
  { name:"Paulo Dybala", surname:"Dybala", club:"Roma", league:"Serie A", role:"Seconda punta", nation:"Argentina", continent:"Sud America", age:32, value:5 },
  { name:"Evan Ferguson", surname:"Evan Ferguson", club:"Roma", league:"Serie A", role:"Attaccante", nation:"Irlanda", continent:"Europa", age:21, value:25 },
  { name:"Donyell Malen", surname:"Malen", club:"Roma", league:"Serie A", role:"Attaccante", nation:"Olanda", continent:"Europa", age:27, value:25 },
  { name:"Artem Dovbyk", surname:"Dovbyk", club:"Roma", league:"Serie A", role:"Attaccante", nation:"Ucraina", continent:"Europa", age:28, value:20 },
  { name:"Robinio Vaz", surname:"Vaz", club:"Roma", league:"Serie A", role:"Attaccante", nation:"Francia", continent:"Europa", age:19, value:10 },
  { name:"Marco Carnesecchi", surname:"Carnesecchi", club:"Atalanta", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:25, value:25 },
  { name:"Marco Sportiello", surname:"Sportiello", club:"Atalanta", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:33, value:1 },
  { name:"Francesco Rossi", surname:"Rossi", club:"Atalanta", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:34, value:0.3 },
  { name:"Isak Hien", surname:"Hien", club:"Atalanta", league:"Serie A", role:"Difensore", nation:"Svezia", continent:"Europa", age:27, value:25 },
  { name:"Giorgio Scalvini", surname:"Scalvini", club:"Atalanta", league:"Serie A", role:"Difensore", nation:"Italia", continent:"Europa", age:22, value:25 },
  { name:"Honest Ahanor", surname:"Ahanor", club:"Atalanta", league:"Serie A", role:"Difensore", nation:"Nigeria", continent:"Africa", age:18, value:25 },
  { name:"Odilon Kossounou", surname:"Kossounou", club:"Atalanta", league:"Serie A", role:"Difensore", nation:"Costa d'Avorio", continent:"Africa", age:25, value:22 },
  { name:"Sead Kolasinac", surname:"Kolasinac", club:"Atalanta", league:"Serie A", role:"Difensore", nation:"Bosnia", continent:"Europa", age:32, value:6 },
  { name:"Berat Djimsiti", surname:"Djimsiti", club:"Atalanta", league:"Serie A", role:"Difensore", nation:"Albania", continent:"Europa", age:33, value:5 },
  { name:"Marten de Roon", surname:"De Roon", club:"Atalanta", league:"Serie A", role:"Centrocampista", nation:"Olanda", continent:"Europa", age:34, value:4 },
  { name:"Éderson", surname:"Ederson", club:"Atalanta", league:"Serie A", role:"Centrocampista", nation:"Brasile", continent:"Sud America", age:26, value:40 },
  { name:"Yunus Musah", surname:"Musah", club:"Atalanta", league:"Serie A", role:"Centrocampista", nation:"USA", continent:"Nord America", age:23, value:18 },
  { name:"Mario Pašalić", surname:"Pasalic", club:"Atalanta", league:"Serie A", role:"Centrocampista", nation:"Croazia", continent:"Europa", age:31, value:7 },
  { name:"Raoul Bellanova", surname:"Bellanova", club:"Atalanta", league:"Serie A", role:"Terzino", nation:"Italia", continent:"Europa", age:25, value:22 },
  { name:"Davide Zappacosta", surname:"Zappacosta", club:"Atalanta", league:"Serie A", role:"Terzino", nation:"Italia", continent:"Europa", age:33, value:4 },
  { name:"Nicola Zalewski", surname:"Zalewski", club:"Atalanta", league:"Serie A", role:"Ala", nation:"Polonia", continent:"Europa", age:24, value:15 },
  { name:"Mitchell Bakker", surname:"Bakker", club:"Atalanta", league:"Serie A", role:"Terzino", nation:"Olanda", continent:"Europa", age:25, value:4 },
  { name:"Luca Bernasconi", surname:"Bernasconi", club:"Atalanta", league:"Serie A", role:"Ala", nation:"Italia", continent:"Europa", age:22, value:4 },
  { name:"Charles De Ketelaere", surname:"De Ketelaere", club:"Atalanta", league:"Serie A", role:"Trequartista", nation:"Belgio", continent:"Europa", age:25, value:35 },
  { name:"Lazar Samardžić", surname:"Samardzic", club:"Atalanta", league:"Serie A", role:"Trequartista", nation:"Serbia", continent:"Europa", age:24, value:15 },
  { name:"Kamaldeen Sulemana", surname:"Sulemana", club:"Atalanta", league:"Serie A", role:"Ala", nation:"Ghana", continent:"Africa", age:24, value:18 },
  { name:"Giacomo Raspadori", surname:"Raspadori", club:"Atalanta", league:"Serie A", role:"Seconda punta", nation:"Italia", continent:"Europa", age:26, value:22 },
  { name:"Gianluca Scamacca", surname:"Scamacca", club:"Atalanta", league:"Serie A", role:"Attaccante", nation:"Italia", continent:"Europa", age:27, value:25 },
  { name:"Nikola Krstović", surname:"Krstovic", club:"Atalanta", league:"Serie A", role:"Attaccante", nation:"Montenegro", continent:"Europa", age:25, value:20 },
  { name:"Anthony Butez", surname:"Butez", club:"Como", league:"Serie A", role:"Portiere", nation:"Francia", continent:"Europa", age:30, value:5 },
  { name:"Oscar Törnqvist", surname:"Tornqvist", club:"Como", league:"Serie A", role:"Portiere", nation:"Svezia", continent:"Europa", age:24, value:2 },
  { name:"Ivan Cavlina", surname:"Cavlina", club:"Como", league:"Serie A", role:"Portiere", nation:"Croazia", continent:"Europa", age:23, value:1 },
  { name:"Ramon", surname:"Ramon", club:"Como", league:"Serie A", role:"Difensore", nation:"Spagna", continent:"Europa", age:21, value:18 },
  { name:"Diego Carlos", surname:"Diego Carlos", club:"Como", league:"Serie A", role:"Difensore", nation:"Brasile", continent:"Sud America", age:32, value:9 },
  { name:"Nicolas Kempf", surname:"Kempf", club:"Como", league:"Serie A", role:"Difensore", nation:"Germania", continent:"Europa", age:31, value:3 },
  { name:"Edoardo Goldaniga", surname:"Goldaniga", club:"Como", league:"Serie A", role:"Difensore", nation:"Italia", continent:"Europa", age:32, value:3 },
  { name:"Valle", surname:"Valle", club:"Como", league:"Serie A", role:"Terzino", nation:"Spagna", continent:"Europa", age:21, value:10 },
  { name:"Alberto Moreno", surname:"Moreno", club:"Como", league:"Serie A", role:"Terzino", nation:"Spagna", continent:"Europa", age:33, value:1 },
  { name:"Boris Van der Brempt", surname:"Van der Brempt", club:"Como", league:"Serie A", role:"Terzino", nation:"Belgio", continent:"Europa", age:23, value:4 },
  { name:"Mergim Vojvoda", surname:"Vojvoda", club:"Como", league:"Serie A", role:"Terzino", nation:"Kosovo", continent:"Europa", age:31, value:3 },
  { name:"Stipe Smolcic", surname:"Smolcic", club:"Como", league:"Serie A", role:"Terzino", nation:"Croazia", continent:"Europa", age:25, value:3 },
  { name:"Máximo Perrone", surname:"Perrone", club:"Como", league:"Serie A", role:"Centrocampista", nation:"Argentina", continent:"Sud America", age:23, value:25 },
  { name:"Maxence Caqueret", surname:"Caqueret", club:"Como", league:"Serie A", role:"Centrocampista", nation:"Francia", continent:"Europa", age:26, value:15 },
  { name:"Da Cunha", surname:"Da Cunha", club:"Como", league:"Serie A", role:"Centrocampista", nation:"Francia", continent:"Europa", age:24, value:15 },
  { name:"Sergi Roberto", surname:"Roberto", club:"Como", league:"Serie A", role:"Centrocampista", nation:"Spagna", continent:"Europa", age:34, value:2 },
  { name:"Lahdo", surname:"Lahdo", club:"Como", league:"Serie A", role:"Centrocampista", nation:"Svezia", continent:"Europa", age:18, value:1 },
  { name:"Nico Paz", surname:"Paz", club:"Como", league:"Serie A", role:"Trequartista", nation:"Argentina", continent:"Sud America", age:21, value:65 },
  { name:"Ante Baturina", surname:"Baturina", club:"Como", league:"Serie A", role:"Trequartista", nation:"Croazia", continent:"Europa", age:23, value:18 },
  { name:"Rodriguez", surname:"Rodriguez", club:"Como", league:"Serie A", role:"Ala", nation:"Spagna", continent:"Europa", age:20, value:30 },
  { name:"Assane Diao", surname:"Diao", club:"Como", league:"Serie A", role:"Ala", nation:"Senegal", continent:"Africa", age:20, value:30 },
  { name:"Jayden Addai", surname:"Addai", club:"Como", league:"Serie A", role:"Ala", nation:"Olanda", continent:"Europa", age:20, value:20 },
  { name:"Kuhn", surname:"Kuhn", club:"Como", league:"Serie A", role:"Ala", nation:"Germania", continent:"Europa", age:26, value:15 },
  { name:"Georgios Douvikas", surname:"Douvikas", club:"Como", league:"Serie A", role:"Attaccante", nation:"Grecia", continent:"Europa", age:26, value:10 },
  { name:"Álvaro Morata", surname:"Morata", club:"Como", league:"Serie A", role:"Attaccante", nation:"Spagna", continent:"Europa", age:33, value:8 },
  { name:"Łukasz Skorupski", surname:"Skorupski", club:"Bologna", league:"Serie A", role:"Portiere", nation:"Polonia", continent:"Europa", age:34, value:3 },
  { name:"Federico Ravaglia", surname:"Ravaglia", club:"Bologna", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:26, value:2 },
  { name:"Lorenzo Pessina", surname:"Lorenzo Pessina", club:"Bologna", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:18, value:1 },
  { name:"Lucumi", surname:"Lucumi", club:"Bologna", league:"Serie A", role:"Difensore", nation:"Colombia", continent:"Sud America", age:27, value:25 },
  { name:"Mads Heggem", surname:"Heggem", club:"Bologna", league:"Serie A", role:"Difensore", nation:"Norvegia", continent:"Europa", age:27, value:14 },
  { name:"Vitik", surname:"Vitik", club:"Bologna", league:"Serie A", role:"Difensore", nation:"Repubblica Ceca", continent:"Europa", age:23, value:10 },
  { name:"Aleksander Helland", surname:"Helland", club:"Bologna", league:"Serie A", role:"Difensore", nation:"Norvegia", continent:"Europa", age:20, value:6 },
  { name:"Nicolò Casale", surname:"Casale", club:"Bologna", league:"Serie A", role:"Difensore", nation:"Italia", continent:"Europa", age:28, value:5 },
  { name:"Kevin Bonifazi", surname:"Bonifazi", club:"Bologna", league:"Serie A", role:"Difensore", nation:"Italia", continent:"Europa", age:29, value:0.5 },
  { name:"Miranda", surname:"Miranda", club:"Bologna", league:"Serie A", role:"Terzino", nation:"Spagna", continent:"Europa", age:26, value:15 },
  { name:"Charalampos Lykogiannis", surname:"Lykogiannis", club:"Bologna", league:"Serie A", role:"Terzino", nation:"Grecia", continent:"Europa", age:32, value:2 },
  { name:"Joao Mario", surname:"Joao Mario", club:"Bologna", league:"Serie A", role:"Terzino", nation:"Portogallo", continent:"Europa", age:26, value:9 },
  { name:"Nadir Zortea", surname:"Zortea", club:"Bologna", league:"Serie A", role:"Terzino", nation:"Italia", continent:"Europa", age:26, value:8 },
  { name:"Lorenzo De Silvestri", surname:"De Silvestri", club:"Bologna", league:"Serie A", role:"Terzino", nation:"Italia", continent:"Europa", age:37, value:1 },
  { name:"Ante Moro", surname:"Moro", club:"Bologna", league:"Serie A", role:"Centrocampista", nation:"Croazia", continent:"Europa", age:27, value:7 },
  { name:"Lewis Ferguson", surname:"Lewis Ferguson", club:"Bologna", league:"Serie A", role:"Centrocampista", nation:"Scozia", continent:"Europa", age:26, value:20 },
  { name:"Tommaso Pobega", surname:"Pobega", club:"Bologna", league:"Serie A", role:"Centrocampista", nation:"Italia", continent:"Europa", age:26, value:9 },
  { name:"Sohm", surname:"Sohm", club:"Bologna", league:"Serie A", role:"Centrocampista", nation:"Svizzera", continent:"Europa", age:24, value:8 },
  { name:"Remo Freuler", surname:"Freuler", club:"Bologna", league:"Serie A", role:"Centrocampista", nation:"Svizzera", continent:"Europa", age:33, value:4 },
  { name:"Odgaard", surname:"Odgaard", club:"Bologna", league:"Serie A", role:"Trequartista", nation:"Danimarca", continent:"Europa", age:26, value:15 },
  { name:"Nicolò Cambiaghi", surname:"Cambiaghi", club:"Bologna", league:"Serie A", role:"Ala", nation:"Italia", continent:"Europa", age:25, value:18 },
  { name:"Thijs Rowe", surname:"Rowe", club:"Bologna", league:"Serie A", role:"Ala", nation:"Inghilterra", continent:"Europa", age:22, value:16 },
  { name:"Dominguez", surname:"Dominguez", club:"Bologna", league:"Serie A", role:"Ala", nation:"Argentina", continent:"Sud America", age:22, value:12 },
  { name:"Riccardo Orsolini", surname:"Orsolini", club:"Bologna", league:"Serie A", role:"Ala", nation:"Italia", continent:"Europa", age:29, value:25 },
  { name:"Federico Bernardeschi", surname:"Bernardeschi", club:"Bologna", league:"Serie A", role:"Ala", nation:"Italia", continent:"Europa", age:32, value:4 },
  { name:"Santiago Castro", surname:"Castro", club:"Bologna", league:"Serie A", role:"Attaccante", nation:"Argentina", continent:"Sud America", age:21, value:35 },
  { name:"Thijs Dallinga", surname:"Dallinga", club:"Bologna", league:"Serie A", role:"Attaccante", nation:"Olanda", continent:"Europa", age:25, value:12 },
  { name:"David De Gea", surname:"De Gea", club:"Fiorentina", league:"Serie A", role:"Portiere", nation:"Spagna", continent:"Europa", age:35, value:4 },
  { name:"Oliver Christensen", surname:"Christensen", club:"Fiorentina", league:"Serie A", role:"Portiere", nation:"Danimarca", continent:"Europa", age:26, value:2 },
  { name:"Valerio Lezzerini", surname:"Lezzerini", club:"Fiorentina", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:30, value:0.3 },
  { name:"Pietro Comuzzo", surname:"Comuzzo", club:"Fiorentina", league:"Serie A", role:"Difensore", nation:"Italia", continent:"Europa", age:21, value:23 },
  { name:"Marin Pongracic", surname:"Pongracic", club:"Fiorentina", league:"Serie A", role:"Difensore", nation:"Croazia", continent:"Europa", age:28, value:8 },
  { name:"Luca Ranieri", surname:"Luca Ranieri", club:"Fiorentina", league:"Serie A", role:"Difensore", nation:"Italia", continent:"Europa", age:26, value:7 },
  { name:"Michael Kouadio", surname:"Kouadio", club:"Fiorentina", league:"Serie A", role:"Difensore", nation:"Italia", continent:"Europa", age:19, value:3 },
  { name:"Daniele Rugani", surname:"Rugani", club:"Fiorentina", league:"Serie A", role:"Difensore", nation:"Italia", continent:"Europa", age:31, value:2 },
  { name:"Kospo", surname:"Kospo", club:"Fiorentina", league:"Serie A", role:"Difensore", nation:"Bosnia", continent:"Europa", age:18, value:2 },
  { name:"Niccolò Fortini", surname:"Fortini", club:"Fiorentina", league:"Serie A", role:"Terzino", nation:"Italia", continent:"Europa", age:20, value:10 },
  { name:"Robin Gosens", surname:"Gosens", club:"Fiorentina", league:"Serie A", role:"Terzino", nation:"Germania", continent:"Europa", age:31, value:6 },
  { name:"Fabiano Parisi", surname:"Parisi", club:"Fiorentina", league:"Serie A", role:"Terzino", nation:"Italia", continent:"Europa", age:25, value:5 },
  { name:"Balbo", surname:"Balbo", club:"Fiorentina", league:"Serie A", role:"Terzino", nation:"Venezuela", continent:"Sud America", age:19, value:0.3 },
  { name:"Dodô", surname:"Dodo", club:"Fiorentina", league:"Serie A", role:"Terzino", nation:"Brasile", continent:"Sud America", age:27, value:18 },
  { name:"Lamptey", surname:"Lamptey", club:"Fiorentina", league:"Serie A", role:"Terzino", nation:"Ghana", continent:"Africa", age:25, value:8 },
  { name:"Rolando Mandragora", surname:"Mandragora", club:"Fiorentina", league:"Serie A", role:"Centrocampista", nation:"Italia", continent:"Europa", age:28, value:10 },
  { name:"Niccolò Fagioli", surname:"Fagioli", club:"Fiorentina", league:"Serie A", role:"Centrocampista", nation:"Italia", continent:"Europa", age:25, value:14 },
  { name:"Jacopo Fazzini", surname:"Fazzini", club:"Fiorentina", league:"Serie A", role:"Centrocampista", nation:"Italia", continent:"Europa", age:22, value:9 },
  { name:"Marco Brescianini", surname:"Brescianini", club:"Fiorentina", league:"Serie A", role:"Centrocampista", nation:"Italia", continent:"Europa", age:26, value:8 },
  { name:"Ndour", surname:"Ndour", club:"Fiorentina", league:"Serie A", role:"Centrocampista", nation:"Italia", continent:"Europa", age:21, value:5 },
  { name:"Giovanni Fabbian", surname:"Fabbian", club:"Fiorentina", league:"Serie A", role:"Trequartista", nation:"Italia", continent:"Europa", age:23, value:10 },
  { name:"Abdelhamid Sabiri", surname:"Sabiri", club:"Fiorentina", league:"Serie A", role:"Trequartista", nation:"Marocco", continent:"Africa", age:29, value:2 },
  { name:"Jack Harrison", surname:"Harrison", club:"Fiorentina", league:"Serie A", role:"Ala", nation:"Inghilterra", continent:"Europa", age:29, value:10 },
  { name:"Manor Solomon", surname:"Solomon", club:"Fiorentina", league:"Serie A", role:"Ala", nation:"Israele", continent:"Europa", age:26, value:9 },
  { name:"Albert Gudmundsson", surname:"Gudmundsson", club:"Fiorentina", league:"Serie A", role:"Seconda punta", nation:"Islanda", continent:"Europa", age:28, value:13 },
  { name:"Moise Kean", surname:"Kean", club:"Fiorentina", league:"Serie A", role:"Attaccante", nation:"Italia", continent:"Europa", age:26, value:45 },
  { name:"Roberto Piccoli", surname:"Piccoli", club:"Fiorentina", league:"Serie A", role:"Attaccante", nation:"Italia", continent:"Europa", age:25, value:18 },
  { name:"Ivan Provedel", surname:"Provedel", club:"Lazio", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:31, value:3 },
  { name:"Christos Motta", surname:"Christos Motta", club:"Lazio", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:21, value:1.2 },
  { name:"Luigi Furlanetto", surname:"Furlanetto", club:"Lazio", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:24, value:0.1 },
  { name:"Mario Gila", surname:"Gila", club:"Lazio", league:"Serie A", role:"Difensore", nation:"Spagna", continent:"Europa", age:25, value:30 },
  { name:"Alessio Romagnoli", surname:"Romagnoli", club:"Lazio", league:"Serie A", role:"Difensore", nation:"Italia", continent:"Europa", age:31, value:7 },
  { name:"Provstgaard", surname:"Provstgaard", club:"Lazio", league:"Serie A", role:"Difensore", nation:"Danimarca", continent:"Europa", age:22, value:4.5 },
  { name:"Samuel Gigot", surname:"Gigot", club:"Lazio", league:"Serie A", role:"Difensore", nation:"Francia", continent:"Europa", age:32, value:1.5 },
  { name:"Patric", surname:"Patric", club:"Lazio", league:"Serie A", role:"Difensore", nation:"Spagna", continent:"Europa", age:32, value:1.5 },
  { name:"Nuno Tavares", surname:"Tavares", club:"Lazio", league:"Serie A", role:"Terzino", nation:"Portogallo", continent:"Europa", age:26, value:15 },
  { name:"Luca Pellegrini", surname:"Luca Pellegrini", club:"Lazio", league:"Serie A", role:"Terzino", nation:"Italia", continent:"Europa", age:27, value:3.5 },
  { name:"Adam Marusic", surname:"Marusic", club:"Lazio", league:"Serie A", role:"Terzino", nation:"Montenegro", continent:"Europa", age:33, value:3 },
  { name:"Manuel Lazzari", surname:"Lazzari", club:"Lazio", league:"Serie A", role:"Terzino", nation:"Italia", continent:"Europa", age:32, value:2.5 },
  { name:"Elseid Hysaj", surname:"Hysaj", club:"Lazio", league:"Serie A", role:"Terzino", nation:"Albania", continent:"Europa", age:32, value:1.5 },
  { name:"Nicolò Rovella", surname:"Rovella", club:"Lazio", league:"Serie A", role:"Centrocampista", nation:"Italia", continent:"Europa", age:24, value:28 },
  { name:"Reda Belahyane", surname:"Belahyane", club:"Lazio", league:"Serie A", role:"Centrocampista", nation:"Marocco", continent:"Africa", age:21, value:8.5 },
  { name:"Danilo Cataldi", surname:"Cataldi", club:"Lazio", league:"Serie A", role:"Centrocampista", nation:"Italia", continent:"Europa", age:31, value:3.5 },
  { name:"Kenneth Taylor", surname:"Kenneth Taylor", club:"Lazio", league:"Serie A", role:"Centrocampista", nation:"Olanda", continent:"Europa", age:23, value:23 },
  { name:"Fisayo Dele-Bashiru", surname:"Dele-Bashiru", club:"Lazio", league:"Serie A", role:"Centrocampista", nation:"Nigeria", continent:"Africa", age:25, value:6.5 },
  { name:"Toni Bašić", surname:"Basic", club:"Lazio", league:"Serie A", role:"Centrocampista", nation:"Croazia", continent:"Europa", age:29, value:2.5 },
  { name:"Daniel Maldini", surname:"Maldini", club:"Lazio", league:"Serie A", role:"Trequartista", nation:"Italia", continent:"Europa", age:24, value:8 },
  { name:"Kacper Przyborek", surname:"Przyborek", club:"Lazio", league:"Serie A", role:"Trequartista", nation:"Polonia", continent:"Europa", age:19, value:7 },
  { name:"Mattia Zaccagni", surname:"Zaccagni", club:"Lazio", league:"Serie A", role:"Ala", nation:"Italia", continent:"Europa", age:30, value:15 },
  { name:"Gustav Isaksen", surname:"Isaksen", club:"Lazio", league:"Serie A", role:"Ala", nation:"Danimarca", continent:"Europa", age:24, value:17 },
  { name:"Noslin", surname:"Noslin", club:"Lazio", league:"Serie A", role:"Ala", nation:"Olanda", continent:"Europa", age:26, value:6.5 },
  { name:"Luca Cancellieri", surname:"Cancellieri", club:"Lazio", league:"Serie A", role:"Ala", nation:"Italia", continent:"Europa", age:24, value:5.5 },
  { name:"Pedro", surname:"Pedro", club:"Lazio", league:"Serie A", role:"Ala", nation:"Spagna", continent:"Europa", age:38, value:1 },
  { name:"Boulaye Dia", surname:"Dia", club:"Lazio", league:"Serie A", role:"Attaccante", nation:"Senegal", continent:"Africa", age:29, value:10 },
  { name:"Djordje Ratkov", surname:"Ratkov", club:"Lazio", league:"Serie A", role:"Attaccante", nation:"Serbia", continent:"Europa", age:22, value:7 },
  { name:"Muric", surname:"Muric", club:"Sassuolo", league:"Serie A", role:"Portiere", nation:"Kosovo", continent:"Europa", age:27, value:7.5 },
  { name:"Stefano Turati", surname:"Turati", club:"Sassuolo", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:24, value:3 },
  { name:"Giacomo Zacchi", surname:"Zacchi", club:"Sassuolo", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:22, value:0.6 },
  { name:"Gianluca Satalino", surname:"Satalino", club:"Sassuolo", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:26, value:0.4 },
  { name:"Aleks Muharemović", surname:"Muharemovic", club:"Sassuolo", league:"Serie A", role:"Difensore", nation:"Bosnia", continent:"Europa", age:23, value:14 },
  { name:"Jay Idzes", surname:"Idzes", club:"Sassuolo", league:"Serie A", role:"Difensore", nation:"Indonesia", continent:"Asia", age:25, value:10 },
  { name:"Laurens Cande", surname:"Cande", club:"Sassuolo", league:"Serie A", role:"Difensore", nation:"Guinea-Bissau", continent:"Africa", age:28, value:3 },
  { name:"Filippo Romagna", surname:"Romagna", club:"Sassuolo", league:"Serie A", role:"Difensore", nation:"Italia", continent:"Europa", age:28, value:0.8 },
  { name:"Pedro Felipe", surname:"Pedro Felipe", club:"Sassuolo", league:"Serie A", role:"Difensore", nation:"Brasile", continent:"Sud America", age:21, value:0.7 },
  { name:"Josh Doig", surname:"Doig", club:"Sassuolo", league:"Serie A", role:"Terzino", nation:"Scozia", continent:"Europa", age:23, value:5 },
  { name:"Ulisses Garcia", surname:"Garcia", club:"Sassuolo", league:"Serie A", role:"Terzino", nation:"Svizzera", continent:"Europa", age:30, value:3 },
  { name:"Luca Pieragnolo", surname:"Pieragnolo", club:"Sassuolo", league:"Serie A", role:"Terzino", nation:"Italia", continent:"Europa", age:23, value:2 },
  { name:"Sebastian Walukiewicz", surname:"Walukiewicz", club:"Sassuolo", league:"Serie A", role:"Terzino", nation:"Polonia", continent:"Europa", age:25, value:4.5 },
  { name:"Lassana Coulibaly", surname:"Coulibaly", club:"Sassuolo", league:"Serie A", role:"Terzino", nation:"Mali", continent:"Africa", age:26, value:2 },
  { name:"Mattia Boloca", surname:"Boloca", club:"Sassuolo", league:"Serie A", role:"Centrocampista", nation:"Italia", continent:"Europa", age:27, value:5 },
  { name:"Luca Lipani", surname:"Lipani", club:"Sassuolo", league:"Serie A", role:"Centrocampista", nation:"Italia", continent:"Europa", age:20, value:4.5 },
  { name:"Nemanja Matić", surname:"Matic", club:"Sassuolo", league:"Serie A", role:"Centrocampista", nation:"Serbia", continent:"Europa", age:37, value:1.8 },
  { name:"Naouirou Ahamada", surname:"Naouirou Ahamada", club:"Sassuolo", league:"Serie A", role:"Centrocampista", nation:"Canada", continent:"Nord America", age:23, value:14 },
  { name:"Kristian Thorstvedt", surname:"Thorstvedt", club:"Sassuolo", league:"Serie A", role:"Centrocampista", nation:"Norvegia", continent:"Europa", age:26, value:10 },
  { name:"Vranckx", surname:"Vranckx", club:"Sassuolo", league:"Serie A", role:"Centrocampista", nation:"Belgio", continent:"Europa", age:23, value:7 },
  { name:"Lorenzo Iannoni", surname:"Iannoni", club:"Sassuolo", league:"Serie A", role:"Centrocampista", nation:"Italia", continent:"Europa", age:24, value:0.8 },
  { name:"Cristian Volpato", surname:"Volpato", club:"Sassuolo", league:"Serie A", role:"Trequartista", nation:"Italia", continent:"Europa", age:22, value:10 },
  { name:"Nordine Bakola", surname:"Bakola", club:"Sassuolo", league:"Serie A", role:"Trequartista", nation:"Francia", continent:"Europa", age:18, value:4 },
  { name:"Armand Laurienté", surname:"Lauriente", club:"Sassuolo", league:"Serie A", role:"Ala", nation:"Francia", continent:"Europa", age:27, value:14 },
  { name:"Kamil Fadera", surname:"Fadera", club:"Sassuolo", league:"Serie A", role:"Ala", nation:"Gambia", continent:"Africa", age:24, value:4.5 },
  { name:"Domenico Berardi", surname:"Berardi", club:"Sassuolo", league:"Serie A", role:"Ala", nation:"Italia", continent:"Europa", age:31, value:7.5 },
  { name:"Andrea Pinamonti", surname:"Pinamonti", club:"Sassuolo", league:"Serie A", role:"Attaccante", nation:"Italia", continent:"Europa", age:26, value:15 },
  { name:"M'Bala Nzola", surname:"Nzola", club:"Sassuolo", league:"Serie A", role:"Attaccante", nation:"Angola", continent:"Africa", age:29, value:6 },
  { name:"Luca Moro", surname:"Luca Moro", club:"Sassuolo", league:"Serie A", role:"Attaccante", nation:"Italia", continent:"Europa", age:25, value:2 },
  { name:"Zion Suzuki", surname:"Suzuki", club:"Parma", league:"Serie A", role:"Portiere", nation:"Giappone", continent:"Asia", age:23, value:20 },
  { name:"Milan Corvi", surname:"Corvi", club:"Parma", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:24, value:0.7 },
  { name:"Alessandro Rinaldi", surname:"Rinaldi", club:"Parma", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:23, value:0.3 },
  { name:"Simon Circati", surname:"Circati", club:"Parma", league:"Serie A", role:"Difensore", nation:"Austria", continent:"Europa", age:22, value:8 },
  { name:"Enock Mwepu", surname:"Enock Ndiaye", club:"Parma", league:"Serie A", role:"Difensore", nation:"Senegal", continent:"Africa", age:23, value:6.5 },
  { name:"Troilo", surname:"Troilo", club:"Parma", league:"Serie A", role:"Difensore", nation:"Argentina", continent:"Sud America", age:22, value:6 },
  { name:"Valenti", surname:"Valenti", club:"Parma", league:"Serie A", role:"Difensore", nation:"Argentina", continent:"Sud America", age:27, value:1.5 },
  { name:"Enrico Delprato", surname:"Delprato", club:"Parma", league:"Serie A", role:"Terzino", nation:"Italia", continent:"Europa", age:26, value:6 },
  { name:"Luca Valeri", surname:"Valeri", club:"Parma", league:"Serie A", role:"Terzino", nation:"Italia", continent:"Europa", age:27, value:3 },
  { name:"Franco Carboni", surname:"Carboni", club:"Parma", league:"Serie A", role:"Terzino", nation:"Argentina", continent:"Sud America", age:22, value:0.9 },
  { name:"Britschgi", surname:"Britschgi", club:"Parma", league:"Serie A", role:"Terzino", nation:"Svizzera", continent:"Europa", age:19, value:7 },
  { name:"Keita", surname:"Keita", club:"Parma", league:"Serie A", role:"Centrocampista", nation:"Belgio", continent:"Europa", age:23, value:12 },
  { name:"Estevez", surname:"Estevez", club:"Parma", league:"Serie A", role:"Centrocampista", nation:"Argentina", continent:"Sud America", age:30, value:1.5 },
  { name:"Adrián Bernabé", surname:"Bernabe", club:"Parma", league:"Serie A", role:"Centrocampista", nation:"Spagna", continent:"Europa", age:24, value:15 },
  { name:"Casper Sørensen", surname:"Sorensen", club:"Parma", league:"Serie A", role:"Centrocampista", nation:"Danimarca", continent:"Europa", age:24, value:7.5 },
  { name:"Hans Nicolussi Caviglia", surname:"Nicolussi Caviglia", club:"Parma", league:"Serie A", role:"Centrocampista", nation:"Italia", continent:"Europa", age:25, value:7 },
  { name:"Ordonez", surname:"Ordonez", club:"Parma", league:"Serie A", role:"Centrocampista", nation:"Argentina", continent:"Sud America", age:21, value:6.5 },
  { name:"Cremaschi", surname:"Cremaschi", club:"Parma", league:"Serie A", role:"Centrocampista", nation:"USA", continent:"Nord America", age:21, value:4.5 },
  { name:"Oristanio", surname:"Oristanio", club:"Parma", league:"Serie A", role:"Trequartista", nation:"Italia", continent:"Europa", age:23, value:6 },
  { name:"Ondrejka", surname:"Ondrejka", club:"Parma", league:"Serie A", role:"Ala", nation:"Svezia", continent:"Europa", age:23, value:8 },
  { name:"Gabriel Strefezza", surname:"Strefezza", club:"Parma", league:"Serie A", role:"Ala", nation:"Brasile", continent:"Sud America", age:28, value:7 },
  { name:"Joel Almqvist", surname:"Almqvist", club:"Parma", league:"Serie A", role:"Ala", nation:"Svezia", continent:"Europa", age:26, value:2 },
  { name:"Pontus Almqvist", surname:"Pontus Almqvist", club:"Parma", league:"Serie A", role:"Attaccante", nation:"Argentina", continent:"Sud America", age:24, value:10 },
  { name:"Frigan", surname:"Frigan", club:"Parma", league:"Serie A", role:"Attaccante", nation:"Croazia", continent:"Europa", age:23, value:7.5 },
  { name:"Cyril Elphege", surname:"Elphege", club:"Parma", league:"Serie A", role:"Attaccante", nation:"Francia", continent:"Europa", age:25, value:0.5 },
  { name:"Maduka Okoye", surname:"Okoye", club:"Udinese", league:"Serie A", role:"Portiere", nation:"Nigeria", continent:"Africa", age:26, value:8 },
  { name:"Razvan Sava", surname:"Sava", club:"Udinese", league:"Serie A", role:"Portiere", nation:"Romania", continent:"Europa", age:23, value:2.5 },
  { name:"Gioele Nunziante", surname:"Nunziante", club:"Udinese", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:18, value:1.8 },
  { name:"Daniele Padelli", surname:"Padelli", club:"Udinese", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:40, value:0.15 },
  { name:"Oumar Solet", surname:"Solet", club:"Udinese", league:"Serie A", role:"Difensore", nation:"Francia", continent:"Europa", age:26, value:20 },
  { name:"Rasmus Kristensen", surname:"Kristensen", club:"Udinese", league:"Serie A", role:"Difensore", nation:"Danimarca", continent:"Europa", age:24, value:9 },
  { name:"Federico Bertola", surname:"Bertola", club:"Udinese", league:"Serie A", role:"Difensore", nation:"Italia", continent:"Europa", age:22, value:6 },
  { name:"Luka Mlacic", surname:"Mlacic", club:"Udinese", league:"Serie A", role:"Difensore", nation:"Croazia", continent:"Europa", age:18, value:4 },
  { name:"Christian Kabasele", surname:"Kabasele", club:"Udinese", league:"Serie A", role:"Difensore", nation:"Belgio", continent:"Europa", age:35, value:0.8 },
  { name:"Zemura", surname:"Zemura", club:"Udinese", league:"Serie A", role:"Terzino", nation:"Zimbabwe", continent:"Africa", age:26, value:4 },
  { name:"Hassane Kamara", surname:"Kamara", club:"Udinese", league:"Serie A", role:"Terzino", nation:"Costa d'Avorio", continent:"Africa", age:32, value:3 },
  { name:"Giovanni Zanoli", surname:"Zanoli", club:"Udinese", league:"Serie A", role:"Terzino", nation:"Italia", continent:"Europa", age:25, value:5 },
  { name:"Ehizibuwe", surname:"Ehizibuwe", club:"Udinese", league:"Serie A", role:"Terzino", nation:"Olanda", continent:"Europa", age:30, value:2 },
  { name:"Magnus Karlström", surname:"Karlstrom", club:"Udinese", league:"Serie A", role:"Centrocampista", nation:"Svezia", continent:"Europa", age:30, value:4 },
  { name:"Abdoulaye Camara", surname:"Abdoulaye Camara", club:"Udinese", league:"Serie A", role:"Centrocampista", nation:"Francia", continent:"Europa", age:17, value:1.5 },
  { name:"Atta", surname:"Atta", club:"Udinese", league:"Serie A", role:"Centrocampista", nation:"Francia", continent:"Europa", age:23, value:15 },
  { name:"Miller", surname:"Miller", club:"Udinese", league:"Serie A", role:"Centrocampista", nation:"Scozia", continent:"Europa", age:19, value:8 },
  { name:"Jurgen Ekkelenkamp", surname:"Ekkelenkamp", club:"Udinese", league:"Serie A", role:"Centrocampista", nation:"Olanda", continent:"Europa", age:25, value:7 },
  { name:"Michal Piotrowski", surname:"Piotrowski", club:"Udinese", league:"Serie A", role:"Centrocampista", nation:"Polonia", continent:"Europa", age:28, value:4.5 },
  { name:"Javi Zarraga", surname:"Zarraga", club:"Udinese", league:"Serie A", role:"Centrocampista", nation:"Spagna", continent:"Europa", age:27, value:1.8 },
  { name:"Isaias Arizala", surname:"Arizala", club:"Udinese", league:"Serie A", role:"Ala", nation:"Colombia", continent:"Sud America", age:20, value:1 },
  { name:"Nicolò Zaniolo", surname:"Zaniolo", club:"Udinese", league:"Serie A", role:"Trequartista", nation:"Italia", continent:"Europa", age:26, value:13 },
  { name:"Idrissa Gueye Jr", surname:"Gueye", club:"Udinese", league:"Serie A", role:"Attaccante", nation:"Senegal", continent:"Africa", age:19, value:4 },
  { name:"Davis", surname:"Davis", club:"Udinese", league:"Serie A", role:"Attaccante", nation:"Inghilterra", continent:"Europa", age:28, value:4 },
  { name:"Adam Buksa", surname:"Buksa", club:"Udinese", league:"Serie A", role:"Attaccante", nation:"Polonia", continent:"Europa", age:29, value:4 },
  { name:"Lamine Bayo", surname:"Bayo", club:"Udinese", league:"Serie A", role:"Attaccante", nation:"Costa d'Avorio", continent:"Africa", age:29, value:3.5 },
  { name:"Franco Israel", surname:"Israel", club:"Torino", league:"Serie A", role:"Portiere", nation:"Uruguay", continent:"Sud America", age:25, value:3.8 },
  { name:"Stefano Paleari", surname:"Paleari", club:"Torino", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:33, value:1 },
  { name:"Marco Siviero", surname:"Siviero", club:"Torino", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:19, value:0.3 },
  { name:"Saúl Coco", surname:"Coco", club:"Torino", league:"Serie A", role:"Difensore", nation:"Guinea Equatoriale", continent:"Africa", age:27, value:9 },
  { name:"Marianacci", surname:"Marianacci", club:"Torino", league:"Serie A", role:"Difensore", nation:"Italia", continent:"Europa", age:21, value:7.5 },
  { name:"Ardian Ismajli", surname:"Ismajli", club:"Torino", league:"Serie A", role:"Difensore", nation:"Albania", continent:"Europa", age:29, value:6 },
  { name:"Maripan", surname:"Maripan", club:"Torino", league:"Serie A", role:"Difensore", nation:"Cile", continent:"Sud America", age:31, value:4 },
  { name:"Ebbose", surname:"Ebbose", club:"Torino", league:"Serie A", role:"Difensore", nation:"Camerun", continent:"Africa", age:26, value:1.5 },
  { name:"Saba Sazonov", surname:"Sazonov", club:"Torino", league:"Serie A", role:"Difensore", nation:"Georgia", continent:"Europa", age:24, value:1.3 },
  { name:"Nkounkou", surname:"Nkounkou", club:"Torino", league:"Serie A", role:"Terzino", nation:"Francia", continent:"Europa", age:25, value:3.5 },
  { name:"Rafa Obrador", surname:"Obrador", club:"Torino", league:"Serie A", role:"Terzino", nation:"Spagna", continent:"Europa", age:22, value:2 },
  { name:"Cristiano Biraghi", surname:"Biraghi", club:"Torino", league:"Serie A", role:"Terzino", nation:"Italia", continent:"Europa", age:33, value:1.4 },
  { name:"Marcus Pedersen", surname:"Pedersen", club:"Torino", league:"Serie A", role:"Terzino", nation:"Norvegia", continent:"Europa", age:25, value:3.5 },
  { name:"Marco Prati", surname:"Prati", club:"Torino", league:"Serie A", role:"Centrocampista", nation:"Italia", continent:"Europa", age:22, value:6 },
  { name:"Tameze", surname:"Tameze", club:"Torino", league:"Serie A", role:"Centrocampista", nation:"Francia", continent:"Europa", age:32, value:2 },
  { name:"Cesare Casadei", surname:"Casadei", club:"Torino", league:"Serie A", role:"Centrocampista", nation:"Italia", continent:"Europa", age:23, value:14 },
  { name:"Ivan Ilić", surname:"Ilic", club:"Torino", league:"Serie A", role:"Centrocampista", nation:"Serbia", continent:"Europa", age:24, value:10 },
  { name:"Gvidas Gineitis", surname:"Gineitis", club:"Torino", league:"Serie A", role:"Centrocampista", nation:"Lituania", continent:"Europa", age:21, value:5.5 },
  { name:"Ilkhan", surname:"Ilkhan", club:"Torino", league:"Serie A", role:"Centrocampista", nation:"Turchia", continent:"Europa", age:21, value:1.5 },
  { name:"Valentino Lazaro", surname:"Lazaro", club:"Torino", league:"Serie A", role:"Ala", nation:"Austria", continent:"Europa", age:29, value:4 },
  { name:"Nikola Vlašić", surname:"Vlasic", club:"Torino", league:"Serie A", role:"Trequartista", nation:"Croazia", continent:"Europa", age:28, value:9 },
  { name:"Tino Anjorin", surname:"Anjorin", club:"Torino", league:"Serie A", role:"Trequartista", nation:"Inghilterra", continent:"Europa", age:24, value:5 },
  { name:"Avel Perciun", surname:"Perciun", club:"Torino", league:"Serie A", role:"Trequartista", nation:"Moldavia", continent:"Europa", age:19, value:1.5 },
  { name:"Karol Njie", surname:"Njie", club:"Torino", league:"Serie A", role:"Ala", nation:"Svezia", continent:"Europa", age:20, value:2.5 },
  { name:"Zakaria Aboukhlal", surname:"Aboukhlal", club:"Torino", league:"Serie A", role:"Ala", nation:"Marocco", continent:"Africa", age:26, value:9 },
  { name:"Ola Savva", surname:"Savva", club:"Torino", league:"Serie A", role:"Ala", nation:"Cipro", continent:"Europa", age:20, value:0.2 },
  { name:"Ché Adams", surname:"Adams", club:"Torino", league:"Serie A", role:"Attaccante", nation:"Scozia", continent:"Europa", age:29, value:8.5 },
  { name:"Giovanni Simeone", surname:"Simeone", club:"Torino", league:"Serie A", role:"Attaccante", nation:"Argentina", continent:"Sud America", age:30, value:5 },
  { name:"Ante Kulenović", surname:"Kulenovic", club:"Torino", league:"Serie A", role:"Attaccante", nation:"Croazia", continent:"Europa", age:26, value:4 },
  { name:"Duvan Zapata", surname:"Zapata", club:"Torino", league:"Serie A", role:"Attaccante", nation:"Colombia", continent:"Sud America", age:34, value:3 },
  { name:"Bijlow", surname:"Bijlow", club:"Genoa", league:"Serie A", role:"Portiere", nation:"Olanda", continent:"Europa", age:28, value:4 },
  { name:"Andrea Leali", surname:"Leali", club:"Genoa", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:33, value:1.5 },
  { name:"Siegrist", surname:"Siegrist", club:"Genoa", league:"Serie A", role:"Portiere", nation:"Svizzera", continent:"Europa", age:34, value:0.6 },
  { name:"Lysionok", surname:"Lysionok", club:"Genoa", league:"Serie A", role:"Portiere", nation:"Lituania", continent:"Europa", age:19, value:0.2 },
  { name:"Eugenio Sommariva", surname:"Sommariva", club:"Genoa", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:28, value:0.1 },
  { name:"Vasquez", surname:"Vasquez", club:"Genoa", league:"Serie A", role:"Difensore", nation:"Messico", continent:"Nord America", age:27, value:13 },
  { name:"Leo Østigård", surname:"Ostigard", club:"Genoa", league:"Serie A", role:"Difensore", nation:"Norvegia", continent:"Europa", age:26, value:10 },
  { name:"Zaterstrom", surname:"Zaterstrom", club:"Genoa", league:"Serie A", role:"Difensore", nation:"Svezia", continent:"Europa", age:20, value:3 },
  { name:"Mattia Marcandalli", surname:"Marcandalli", club:"Genoa", league:"Serie A", role:"Difensore", nation:"Italia", continent:"Europa", age:23, value:2.5 },
  { name:"Gustav Otoa", surname:"Otoa", club:"Genoa", league:"Serie A", role:"Difensore", nation:"Danimarca", continent:"Europa", age:21, value:2.5 },
  { name:"Martin", surname:"Martin", club:"Genoa", league:"Serie A", role:"Terzino", nation:"Spagna", continent:"Europa", age:28, value:7 },
  { name:"Brooke Norton-Cuffy", surname:"Norton-Cuffy", club:"Genoa", league:"Serie A", role:"Terzino", nation:"Inghilterra", continent:"Europa", age:22, value:16 },
  { name:"Stefano Sabelli", surname:"Sabelli", club:"Genoa", league:"Serie A", role:"Terzino", nation:"Italia", continent:"Europa", age:33, value:1.4 },
  { name:"Morten Frendrup", surname:"Frendrup", club:"Genoa", league:"Serie A", role:"Centrocampista", nation:"Danimarca", continent:"Europa", age:24, value:18 },
  { name:"Onana", surname:"Onana", club:"Genoa", league:"Serie A", role:"Centrocampista", nation:"Camerun", continent:"Africa", age:26, value:1.3 },
  { name:"Mattia Masini", surname:"Masini", club:"Genoa", league:"Serie A", role:"Centrocampista", nation:"Italia", continent:"Europa", age:25, value:6 },
  { name:"Ellertsson", surname:"Ellertsson", club:"Genoa", league:"Serie A", role:"Centrocampista", nation:"Islanda", continent:"Europa", age:23, value:3.5 },
  { name:"Gabriel Amorim", surname:"Amorim", club:"Genoa", league:"Serie A", role:"Centrocampista", nation:"Brasile", continent:"Sud America", age:20, value:2.5 },
  { name:"Ruslan Malinovskyi", surname:"Malinovsky", club:"Genoa", league:"Serie A", role:"Centrocampista", nation:"Ucraina", continent:"Europa", age:32, value:2.5 },
  { name:"Tommaso Baldanzi", surname:"Baldanzi", club:"Genoa", league:"Serie A", role:"Trequartista", nation:"Italia", continent:"Europa", age:22, value:10 },
  { name:"Maxwel Cornet", surname:"Cornet", club:"Genoa", league:"Serie A", role:"Ala", nation:"Costa d'Avorio", continent:"Africa", age:29, value:5 },
  { name:"Junior Messias", surname:"Messias", club:"Genoa", league:"Serie A", role:"Ala", nation:"Brasile", continent:"Sud America", age:34, value:1.2 },
  { name:"Vitinha", surname:"Vitinha Genoa", club:"Genoa", league:"Serie A", role:"Attaccante", nation:"Portogallo", continent:"Europa", age:25, value:8 },
  { name:"Christian Ekhator", surname:"Ekhator", club:"Genoa", league:"Serie A", role:"Attaccante", nation:"Italia", continent:"Europa", age:19, value:7 },
  { name:"Lorenzo Colombo", surname:"Colombo", club:"Genoa", league:"Serie A", role:"Attaccante", nation:"Italia", continent:"Europa", age:24, value:6 },
  { name:"Caleb Ekuban", surname:"Ekuban", club:"Genoa", league:"Serie A", role:"Attaccante", nation:"Ghana", continent:"Africa", age:31, value:1.3 },
  { name:"Elia Caprile", surname:"Caprile", club:"Cagliari", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:24, value:15 },
  { name:"Sherri", surname:"Sherri", club:"Cagliari", league:"Serie A", role:"Portiere", nation:"Albania", continent:"Europa", age:28, value:1 },
  { name:"Simone Ciocci", surname:"Ciocci", club:"Cagliari", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:24, value:0.1 },
  { name:"Dossena", surname:"Dossena", club:"Cagliari", league:"Serie A", role:"Difensore", nation:"Italia", continent:"Europa", age:27, value:7 },
  { name:"Juan Rodríguez", surname:"Juan Rodriguez", club:"Cagliari", league:"Serie A", role:"Difensore", nation:"Uruguay", continent:"Sud America", age:20, value:5 },
  { name:"Adam Obert", surname:"Obert", club:"Cagliari", league:"Serie A", role:"Difensore", nation:"Slovacchia", continent:"Europa", age:23, value:4 },
  { name:"Yerry Mina", surname:"Mina", club:"Cagliari", league:"Serie A", role:"Difensore", nation:"Colombia", continent:"Sud America", age:31, value:3 },
  { name:"Zé Pedro", surname:"Ze Pedro", club:"Cagliari", league:"Serie A", role:"Difensore", nation:"Portogallo", continent:"Europa", age:28, value:2.5 },
  { name:"Lorenzo Idrissi", surname:"Idrissi", club:"Cagliari", league:"Serie A", role:"Terzino", nation:"Italia", continent:"Europa", age:20, value:2.5 },
  { name:"Marco Palestra", surname:"Palestra", club:"Cagliari", league:"Serie A", role:"Terzino", nation:"Italia", continent:"Europa", age:21, value:25 },
  { name:"Davide Zappa", surname:"Zappa", club:"Cagliari", league:"Serie A", role:"Terzino", nation:"Italia", continent:"Europa", age:26, value:4 },
  { name:"Rik Raterink", surname:"Raterink", club:"Cagliari", league:"Serie A", role:"Terzino", nation:"Olanda", continent:"Europa", age:19, value:0.45 },
  { name:"Ibrahim Sulemana", surname:"Ibrahim Sulemana", club:"Cagliari", league:"Serie A", role:"Centrocampista", nation:"Ghana", continent:"Africa", age:22, value:6 },
  { name:"Michel Adopo", surname:"Adopo", club:"Cagliari", league:"Serie A", role:"Centrocampista", nation:"Francia", continent:"Europa", age:25, value:6 },
  { name:"Michel Folorunsho", surname:"Folorunsho", club:"Cagliari", league:"Serie A", role:"Centrocampista", nation:"Italia", continent:"Europa", age:28, value:6 },
  { name:"Kingsley Liteta", surname:"Liteta", club:"Cagliari", league:"Serie A", role:"Centrocampista", nation:"Zambia", continent:"Africa", age:20, value:2 },
  { name:"Alessandro Deiola", surname:"Deiola", club:"Cagliari", league:"Serie A", role:"Centrocampista", nation:"Italia", continent:"Europa", age:30, value:1.6 },
  { name:"Luca Mazzitelli", surname:"Mazzitelli", club:"Cagliari", league:"Serie A", role:"Centrocampista", nation:"Italia", continent:"Europa", age:30, value:1.4 },
  { name:"Gianluca Gaetano", surname:"Gaetano", club:"Cagliari", league:"Serie A", role:"Trequartista", nation:"Italia", continent:"Europa", age:25, value:4 },
  { name:"Mattia Felici", surname:"Felici", club:"Cagliari", league:"Serie A", role:"Ala", nation:"Italia", continent:"Europa", age:24, value:2.8 },
  { name:"Albarracin", surname:"Albarracin", club:"Cagliari", league:"Serie A", role:"Ala", nation:"Uruguay", continent:"Sud America", age:20, value:1.8 },
  { name:"Sebastiano Esposito", surname:"Sebastiano Esposito", club:"Cagliari", league:"Serie A", role:"Seconda punta", nation:"Italia", continent:"Europa", age:23, value:9 },
  { name:"Mert Kılıçsoy", surname:"Kilicsoy", club:"Cagliari", league:"Serie A", role:"Attaccante", nation:"Turchia", continent:"Europa", age:20, value:10 },
  { name:"Gianluca Borrelli", surname:"Borrelli", club:"Cagliari", league:"Serie A", role:"Attaccante", nation:"Italia", continent:"Europa", age:26, value:3 },
  { name:"Andrea Belotti", surname:"Belotti", club:"Cagliari", league:"Serie A", role:"Attaccante", nation:"Italia", continent:"Europa", age:32, value:1.5 },
  { name:"Claudio Trepy", surname:"Trepy", club:"Cagliari", league:"Serie A", role:"Attaccante", nation:"Francia", continent:"Europa", age:19, value:1.5 },
  { name:"Leonardo Pavoletti", surname:"Pavoletti", club:"Cagliari", league:"Serie A", role:"Attaccante", nation:"Italia", continent:"Europa", age:37, value:0.7 },
  { name:"Semper", surname:"Semper", club:"Pisa", league:"Serie A", role:"Portiere", nation:"Croazia", continent:"Europa", age:28, value:3.5 },
  { name:"Simone Scuffet", surname:"Scuffet", club:"Pisa", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:29, value:1 },
  { name:"Nicolas", surname:"Nicolas", club:"Pisa", league:"Serie A", role:"Portiere", nation:"Brasile", continent:"Sud America", age:37, value:0.1 },
  { name:"Nicholas Canestrelli", surname:"Canestrelli", club:"Pisa", league:"Serie A", role:"Difensore", nation:"Italia", continent:"Europa", age:25, value:7 },
  { name:"Dimitar Bozhinov", surname:"Bozhinov", club:"Pisa", league:"Serie A", role:"Difensore", nation:"Bulgaria", continent:"Europa", age:21, value:2.5 },
  { name:"Diego Coppola", surname:"Coppola", club:"Pisa", league:"Serie A", role:"Difensore", nation:"Italia", continent:"Europa", age:20, value:2.5 },
  { name:"Raúl Albiol", surname:"Albiol", club:"Pisa", league:"Serie A", role:"Difensore", nation:"Spagna", continent:"Europa", age:40, value:0.8 },
  { name:"Lorenzo Calabresi", surname:"Calabresi", club:"Pisa", league:"Serie A", role:"Difensore", nation:"Italia", continent:"Europa", age:29, value:0.7 },
  { name:"Andrea Caracciolo", surname:"Caracciolo", club:"Pisa", league:"Serie A", role:"Difensore", nation:"Italia", continent:"Europa", age:35, value:0.5 },
  { name:"Luca Denoon", surname:"Denoon", club:"Pisa", league:"Serie A", role:"Difensore", nation:"Svizzera", continent:"Europa", age:22, value:0.5 },
  { name:"Marius Marin", surname:"Marin", club:"Pisa", league:"Serie A", role:"Centrocampista", nation:"Romania", continent:"Europa", age:27, value:3 },
  { name:"Martin Højholt", surname:"Hojholt", club:"Pisa", league:"Serie A", role:"Centrocampista", nation:"Danimarca", continent:"Europa", age:24, value:1.2 },
  { name:"Loyola", surname:"Loyola", club:"Pisa", league:"Serie A", role:"Centrocampista", nation:"Cile", continent:"Sud America", age:25, value:8 },
  { name:"Ebenezer Akinsanmiro", surname:"Akinsanmiro", club:"Pisa", league:"Serie A", role:"Centrocampista", nation:"Nigeria", continent:"Africa", age:21, value:6.5 },
  { name:"Yusuf Vural", surname:"Vural", club:"Pisa", league:"Serie A", role:"Centrocampista", nation:"Turchia", continent:"Europa", age:19, value:5 },
  { name:"Michel Aebischer", surname:"Aebischer", club:"Pisa", league:"Serie A", role:"Centrocampista", nation:"Svizzera", continent:"Europa", age:29, value:4.5 },
  { name:"Leonardo Piccinini", surname:"Piccinini", club:"Pisa", league:"Serie A", role:"Centrocampista", nation:"Italia", continent:"Europa", age:24, value:4 },
  { name:"Toure", surname:"Toure", club:"Pisa", league:"Serie A", role:"Ala", nation:"Germania", continent:"Europa", age:27, value:6 },
  { name:"Juan Cuadrado", surname:"Cuadrado", club:"Pisa", league:"Serie A", role:"Ala", nation:"Colombia", continent:"Sud America", age:37, value:1 },
  { name:"Jacob Iling-Junior", surname:"Iling-Junior", club:"Pisa", league:"Serie A", role:"Ala", nation:"Inghilterra", continent:"Europa", age:22, value:10 },
  { name:"Filippo Angori", surname:"Angori", club:"Pisa", league:"Serie A", role:"Ala", nation:"Italia", continent:"Europa", age:22, value:5 },
  { name:"Lorran", surname:"Lorran", club:"Pisa", league:"Serie A", role:"Trequartista", nation:"Brasile", continent:"Sud America", age:19, value:7.5 },
  { name:"Matteo Tramoni", surname:"Tramoni", club:"Pisa", league:"Serie A", role:"Trequartista", nation:"Francia", continent:"Europa", age:26, value:6 },
  { name:"Calvin Stengs", surname:"Stengs", club:"Pisa", league:"Serie A", role:"Trequartista", nation:"Olanda", continent:"Europa", age:27, value:6 },
  { name:"Jérémy Léris", surname:"Leris", club:"Pisa", league:"Serie A", role:"Ala", nation:"Algeria", continent:"Africa", age:27, value:2 },
  { name:"Durosinmi", surname:"Durosinmi", club:"Pisa", league:"Serie A", role:"Attaccante", nation:"Nigeria", continent:"Africa", age:23, value:7.5 },
  { name:"Meister", surname:"Meister", club:"Pisa", league:"Serie A", role:"Attaccante", nation:"Danimarca", continent:"Europa", age:22, value:5 },
  { name:"Dragos Stojilkovic", surname:"Stojilkovic", club:"Pisa", league:"Serie A", role:"Attaccante", nation:"Svizzera", continent:"Europa", age:26, value:3 },
  { name:"Massimo Moreo", surname:"Moreo", club:"Pisa", league:"Serie A", role:"Attaccante", nation:"Italia", continent:"Europa", age:32, value:1.5 },
  { name:"Wladimiro Falcone", surname:"Falcone", club:"Lecce", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:30, value:3.5 },
  { name:"Alexander Früchtl", surname:"Fruchtl", club:"Lecce", league:"Serie A", role:"Portiere", nation:"Germania", continent:"Europa", age:26, value:1 },
  { name:"Joonas Samooja", surname:"Samooja", club:"Lecce", league:"Serie A", role:"Portiere", nation:"Finlandia", continent:"Europa", age:22, value:0.075 },
  { name:"Tiago Gabriel", surname:"Tiago Gabriel", club:"Lecce", league:"Serie A", role:"Difensore", nation:"Portogallo", continent:"Europa", age:21, value:15 },
  { name:"Jan Siebert", surname:"Siebert", club:"Lecce", league:"Serie A", role:"Difensore", nation:"Germania", continent:"Europa", age:23, value:3.8 },
  { name:"Gaspar", surname:"Gaspar", club:"Lecce", league:"Serie A", role:"Difensore", nation:"Angola", continent:"Africa", age:28, value:3.5 },
  { name:"Gaby Jean", surname:"Jean", club:"Lecce", league:"Serie A", role:"Difensore", nation:"Francia", continent:"Europa", age:26, value:2 },
  { name:"Matías Pérez", surname:"Perez", club:"Lecce", league:"Serie A", role:"Difensore", nation:"Cile", continent:"Sud America", age:20, value:0.5 },
  { name:"Antonino Gallo", surname:"Gallo", club:"Lecce", league:"Serie A", role:"Terzino", nation:"Italia", continent:"Europa", age:26, value:4 },
  { name:"Ndaba", surname:"Ndaba", club:"Lecce", league:"Serie A", role:"Terzino", nation:"Irlanda", continent:"Europa", age:26, value:0.9 },
  { name:"Danilo Veiga", surname:"Veiga", club:"Lecce", league:"Serie A", role:"Terzino", nation:"Portogallo", continent:"Europa", age:23, value:2 },
  { name:"Ylber Ramadani", surname:"Ramadani", club:"Lecce", league:"Serie A", role:"Centrocampista", nation:"Albania", continent:"Europa", age:29, value:1.8 },
  { name:"Ismaila Fofana", surname:"Ismaila Fofana", club:"Lecce", league:"Serie A", role:"Centrocampista", nation:"Togo", continent:"Africa", age:22, value:0.6 },
  { name:"Oumar Ngom", surname:"Ngom", club:"Lecce", league:"Serie A", role:"Centrocampista", nation:"Mauritania", continent:"Africa", age:22, value:0.6 },
  { name:"Ylber Berisha", surname:"Berisha", club:"Lecce", league:"Serie A", role:"Centrocampista", nation:"Albania", continent:"Europa", age:22, value:6 },
  { name:"Youssouf Coulibaly", surname:"Youssouf Coulibaly", club:"Lecce", league:"Serie A", role:"Centrocampista", nation:"Mali", continent:"Africa", age:29, value:2.5 },
  { name:"Helgason", surname:"Helgason", club:"Lecce", league:"Serie A", role:"Centrocampista", nation:"Islanda", continent:"Europa", age:25, value:2.3 },
  { name:"Sala", surname:"Sala", club:"Lecce", league:"Serie A", role:"Centrocampista", nation:"Spagna", continent:"Europa", age:24, value:1.5 },
  { name:"Gandelsman", surname:"Gandelsman", club:"Lecce", league:"Serie A", role:"Trequartista", nation:"Israele", continent:"Europa", age:25, value:5 },
  { name:"Marchwinski", surname:"Marchwinski", club:"Lecce", league:"Serie A", role:"Trequartista", nation:"Polonia", continent:"Europa", age:24, value:2.5 },
  { name:"Riccardo Sottil", surname:"Sottil", club:"Lecce", league:"Serie A", role:"Ala", nation:"Italia", continent:"Europa", age:26, value:3.5 },
  { name:"Lameck Banda", surname:"Banda", club:"Lecce", league:"Serie A", role:"Ala", nation:"Zambia", continent:"Africa", age:25, value:3 },
  { name:"Luca Pierotti", surname:"Pierotti", club:"Lecce", league:"Serie A", role:"Ala", nation:"Argentina", continent:"Sud America", age:24, value:3.5 },
  { name:"N'Dri", surname:"N'Dri", club:"Lecce", league:"Serie A", role:"Ala", nation:"Costa d'Avorio", continent:"Africa", age:25, value:1.5 },
  { name:"Francesco Camarda", surname:"Camarda", club:"Lecce", league:"Serie A", role:"Attaccante", nation:"Italia", continent:"Europa", age:18, value:15 },
  { name:"Nikola Stulic", surname:"Stulic", club:"Lecce", league:"Serie A", role:"Attaccante", nation:"Serbia", continent:"Europa", age:24, value:4.5 },
  { name:"Walid Cheddira", surname:"Cheddira", club:"Lecce", league:"Serie A", role:"Attaccante", nation:"Marocco", continent:"Africa", age:28, value:2.3 },
  { name:"Montipo", surname:"Montipo", club:"Verona", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:30, value:2 },
  { name:"Simone Perilli", surname:"Perilli", club:"Verona", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:31, value:0.4 },
  { name:"Claudio Toniolo", surname:"Toniolo", club:"Verona", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:21, value:0.075 },
  { name:"Borghi", surname:"Borghi", club:"Verona", league:"Serie A", role:"Portiere", nation:"Brasile", continent:"Sud America", age:18, value:0.05 },
  { name:"Nelsson", surname:"Nelsson", club:"Verona", league:"Serie A", role:"Difensore", nation:"Danimarca", continent:"Europa", age:27, value:7.5 },
  { name:"Armel Bella-Kotchap", surname:"Bella-Kotchap", club:"Verona", league:"Serie A", role:"Difensore", nation:"Germania", continent:"Europa", age:24, value:7.5 },
  { name:"Daniele Valentini", surname:"Valentini", club:"Verona", league:"Serie A", role:"Difensore", nation:"Argentina", continent:"Sud America", age:24, value:5 },
  { name:"Magnus Slotsager", surname:"Slotsager", club:"Verona", league:"Serie A", role:"Difensore", nation:"Danimarca", continent:"Europa", age:20, value:2 },
  { name:"Laurits Edmundsson", surname:"Edmundsson", club:"Verona", league:"Serie A", role:"Difensore", nation:"Faroe", continent:"Europa", age:25, value:0.8 },
  { name:"Frese", surname:"Frese", club:"Verona", league:"Serie A", role:"Terzino", nation:"Danimarca", continent:"Europa", age:28, value:2.5 },
  { name:"Domagoj Bradarić", surname:"Bradaric", club:"Verona", league:"Serie A", role:"Terzino", nation:"Croazia", continent:"Europa", age:26, value:2.5 },
  { name:"Nassim Belghali", surname:"Belghali", club:"Verona", league:"Serie A", role:"Terzino", nation:"Algeria", continent:"Africa", age:23, value:7 },
  { name:"Pol Lirola", surname:"Lirola", club:"Verona", league:"Serie A", role:"Terzino", nation:"Spagna", continent:"Europa", age:28, value:2 },
  { name:"Jens-Lys Cham", surname:"Cham", club:"Verona", league:"Serie A", role:"Terzino", nation:"Gambia", continent:"Africa", age:20, value:1 },
  { name:"Oyegoke", surname:"Oyegoke", club:"Verona", league:"Serie A", role:"Terzino", nation:"Inghilterra", continent:"Europa", age:23, value:0.5 },
  { name:"Omar Al-Musrati", surname:"Al-Musrati", club:"Verona", league:"Serie A", role:"Centrocampista", nation:"Libano", continent:"Asia", age:29, value:7 },
  { name:"Niasse", surname:"Niasse", club:"Verona", league:"Serie A", role:"Centrocampista", nation:"Senegal", continent:"Africa", age:26, value:2.5 },
  { name:"Sandi Lovrić", surname:"Lovric", club:"Verona", league:"Serie A", role:"Centrocampista", nation:"Slovenia", continent:"Europa", age:27, value:6 },
  { name:"Serdar", surname:"Serdar", club:"Verona", league:"Serie A", role:"Centrocampista", nation:"Germania", continent:"Europa", age:28, value:4.5 },
  { name:"Bernede", surname:"Bernede", club:"Verona", league:"Serie A", role:"Centrocampista", nation:"Francia", continent:"Europa", age:26, value:3.5 },
  { name:"Harroui", surname:"Harroui", club:"Verona", league:"Serie A", role:"Centrocampista", nation:"Marocco", continent:"Africa", age:28, value:1.8 },
  { name:"Roberto Gagliardini", surname:"Gagliardini", club:"Verona", league:"Serie A", role:"Centrocampista", nation:"Italia", continent:"Europa", age:31, value:1.4 },
  { name:"Jean-Daniel Akpa Akpro", surname:"Akpa Akpro", club:"Verona", league:"Serie A", role:"Centrocampista", nation:"Costa d'Avorio", continent:"Africa", age:33, value:0.5 },
  { name:"Tomas Suslov", surname:"Suslov", club:"Verona", league:"Serie A", role:"Trequartista", nation:"Slovenia", continent:"Europa", age:23, value:5 },
  { name:"Gift Orban", surname:"Orban", club:"Verona", league:"Serie A", role:"Attaccante", nation:"Nigeria", continent:"Africa", age:23, value:8.5 },
  { name:"Abdoulaye Sarr", surname:"Sarr", club:"Verona", league:"Serie A", role:"Attaccante", nation:"Svezia", continent:"Europa", age:25, value:3 },
  { name:"Calum Bowie", surname:"Bowie", club:"Verona", league:"Serie A", role:"Attaccante", nation:"Scozia", continent:"Europa", age:23, value:2.7 },
  { name:"Jesús Mosquera", surname:"Mosquera", club:"Verona", league:"Serie A", role:"Attaccante", nation:"Colombia", continent:"Sud America", age:26, value:2.5 },
  { name:"Caio Isaac", surname:"Isaac", club:"Verona", league:"Serie A", role:"Attaccante", nation:"Brasile", continent:"Sud America", age:21, value:0.7 },
  { name:"Emmanuel Ajayi", surname:"Ajayi", club:"Verona", league:"Serie A", role:"Attaccante", nation:"Costa d'Avorio", continent:"Africa", age:21, value:0.3 },
  { name:"Emil Audero", surname:"Audero", club:"Cremonese", league:"Serie A", role:"Portiere", nation:"Indonesia", continent:"Asia", age:29, value:3.2 },
  { name:"Marco Silvestri", surname:"Silvestri", club:"Cremonese", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:35, value:0.5 },
  { name:"Alessandro Nava", surname:"Nava", club:"Cremonese", league:"Serie A", role:"Portiere", nation:"Italia", continent:"Europa", age:22, value:0.1 },
  { name:"Faye", surname:"Faye", club:"Cremonese", league:"Serie A", role:"Difensore", nation:"Senegal", continent:"Africa", age:21, value:6 },
  { name:"Federico Terracciano", surname:"Federico Terracciano", club:"Cremonese", league:"Serie A", role:"Difensore", nation:"Italia", continent:"Europa", age:23, value:4.5 },
  { name:"Sebastiano Luperto", surname:"Luperto", club:"Cremonese", league:"Serie A", role:"Difensore", nation:"Italia", continent:"Europa", age:29, value:4 },
  { name:"Federico Baschirotto", surname:"Baschirotto", club:"Cremonese", league:"Serie A", role:"Difensore", nation:"Italia", continent:"Europa", age:29, value:4 },
  { name:"Luca Bianchetti", surname:"Bianchetti", club:"Cremonese", league:"Serie A", role:"Difensore", nation:"Italia", continent:"Europa", age:32, value:0.8 },
  { name:"Alex Folino", surname:"Folino", club:"Cremonese", league:"Serie A", role:"Difensore", nation:"Italia", continent:"Europa", age:24, value:0.7 },
  { name:"Vlad Ceccherini", surname:"Ceccherini", club:"Cremonese", league:"Serie A", role:"Difensore", nation:"Italia", continent:"Europa", age:33, value:0.4 },
  { name:"Giuseppe Pezzella", surname:"Pezzella", club:"Cremonese", league:"Serie A", role:"Terzino", nation:"Italia", continent:"Europa", age:28, value:2.5 },
  { name:"Filippo Barbieri", surname:"Barbieri", club:"Cremonese", league:"Serie A", role:"Terzino", nation:"Italia", continent:"Europa", age:23, value:4 },
  { name:"Luca Floriani Mussolini", surname:"Floriani Mussolini", club:"Cremonese", league:"Serie A", role:"Terzino", nation:"Italia", continent:"Europa", age:23, value:2.5 },
  { name:"Alberto Grassi", surname:"Grassi", club:"Cremonese", league:"Serie A", role:"Centrocampista", nation:"Italia", continent:"Europa", age:31, value:1.8 },
  { name:"Warren Bondo", surname:"Bondo", club:"Cremonese", league:"Serie A", role:"Centrocampista", nation:"Francia", continent:"Europa", age:22, value:8.5 },
  { name:"Martin Payero", surname:"Payero", club:"Cremonese", league:"Serie A", role:"Centrocampista", nation:"Argentina", continent:"Sud America", age:27, value:6 },
  { name:"Vandeputte", surname:"Vandeputte", club:"Cremonese", league:"Serie A", role:"Centrocampista", nation:"Belgio", continent:"Europa", age:30, value:4 },
  { name:"Morten Thorsby", surname:"Thorsby", club:"Cremonese", league:"Serie A", role:"Centrocampista", nation:"Norvegia", continent:"Europa", age:29, value:3 },
  { name:"Luca Collocolo", surname:"Collocolo", club:"Cremonese", league:"Serie A", role:"Centrocampista", nation:"Italia", continent:"Europa", age:26, value:3 },
  { name:"Youssef Maleh", surname:"Maleh", club:"Cremonese", league:"Serie A", role:"Centrocampista", nation:"Marocco", continent:"Africa", age:27, value:1 },
  { name:"Gianluca Zerbin", surname:"Zerbin", club:"Cremonese", league:"Serie A", role:"Ala", nation:"Italia", continent:"Europa", age:27, value:2.2 },
  { name:"Moumbagna", surname:"Moumbagna", club:"Cremonese", league:"Serie A", role:"Attaccante", nation:"Camerun", continent:"Africa", age:25, value:5 },
  { name:"Antonio Sanabria", surname:"Sanabria", club:"Cremonese", league:"Serie A", role:"Attaccante", nation:"Paraguay", continent:"Sud America", age:30, value:2.5 },
  { name:"Federico Bonazzoli", surname:"Bonazzoli", club:"Cremonese", league:"Serie A", role:"Attaccante", nation:"Italia", continent:"Europa", age:28, value:2.2 },
  { name:"David Okereke", surname:"Okereke", club:"Cremonese", league:"Serie A", role:"Attaccante", nation:"Nigeria", continent:"Africa", age:28, value:1.5 },
  { name:"Djuric", surname:"Djuric", club:"Cremonese", league:"Serie A", role:"Attaccante", nation:"Bosnia", continent:"Europa", age:35, value:1 },
  { name:"Jamie Vardy", surname:"Vardy", club:"Cremonese", league:"Serie A", role:"Attaccante", nation:"Inghilterra", continent:"Europa", age:39, value:1 },
];

// ── ROSE (25/26) ────────────────────────────────────────────────────────
const ROSE_LIST = [
  { key:"Roma", nome:"AS Roma", emoji:"🐺", giocatori:[
    "Svilar","Gollini","Zelezny","Ndicka","Mancini","Ghilardi","Ziolkowski","Hermoso",
    "Angelino","Tsimikias","Wesley","Celik","Rensch","Cristante","Kone","El Aynaoui",
    "Pisilli","Pellegrini","Zaragoza","El Shaarawy","Soule","Venturino","Dybala","Evan Ferguson",
    "Malen","Dovbyk","Vaz"
  ]},
  { key:"Inter", nome:"FC Internazionale", emoji:"⚫", giocatori:[
    "Josep Martinez","Sommer","Di Gennaro","Bastoni","Bisseck","Akanji","De Vrij","Acerbi",
    "Dimarco","Augusto","Dumfries","Darmian","Calhanoglu","Barella","Sucic","Frattesi",
    "Diouf","Zielinski","Mkhitaryan","Luis Henrique","Lautaro","Thuram","Bonny","Pio Esposito"
  ]},
  { key:"Milan", nome:"AC Milan", emoji:"🔴", giocatori:[
    "Maignan","Filippo Terracciano","Torriani","Pavlovic","De Winter","Tomori","Gabbia","Odogù",
    "Bartesaghi","Estupinan","Athekame","Jashari","Fofana","Ricci","Rabiot","Loftus-Cheek",
    "Modric","Saelemaekers","Leao","Pulisic","Nkunku","Gimenez","Fullkrug"
  ]},
  { key:"Juventus", nome:"Juventus FC", emoji:"⚪", giocatori:[
    "Di Gregorio","Perin","Pinsoglio","Gatti","Kalulu","Cambiaso","Cabal","Holm",
    "Kelly","Bremer","Locatelli","Miretti","Koopmeiners","Khephren Thuram","McKennie","Conceicao",
    "Zhegrova","Adzic","David","Openda","Yildiz","Vlahovic","Milik","Kostic",
    "Boga"
  ]},
  { key:"Napoli", nome:"SSC Napoli", emoji:"🔵", giocatori:[
    "Vanja Milinkovic-Savic","Meret","Contini","Ferrante","Buongiorno","Beukema","Rrahmani","Juan Jesus",
    "Olivera","Gutierrez","Spinazzola","Di Lorenzo","Mazzocchi","Gilmour","Lobotka","McTominay",
    "Anguissa","De Bruyne","Elmas","Vergara","Alisson Santos","Neres","Politano","Hojlund",
    "Lukaku","Giovane"
  ]},
  { key:"Atalanta", nome:"Atalanta BC", emoji:"🖤", giocatori:[
    "Carnesecchi","Sportiello","Rossi","Hien","Scalvini","Ahanor","Kossounou","Kolasinac",
    "Djimsiti","De Roon","Ederson","Musah","Pasalic","Bellanova","Zappacosta","Zalewski",
    "Bakker","Bernasconi","De Ketelaere","Samardzic","Sulemana","Raspadori","Scamacca","Krstovic"
  ]},
  { key:"Fiorentina", nome:"ACF Fiorentina", emoji:"💜", giocatori:[
    "De Gea","Christensen","Lezzerini","Comuzzo","Pongracic","Luca Ranieri","Kouadio","Rugani",
    "Kospo","Fortini","Gosens","Parisi","Balbo","Dodo","Lamptey","Mandragora",
    "Fagioli","Fazzini","Brescianini","Ndour","Fabbian","Sabiri","Harrison","Solomon",
    "Gudmundsson","Kean","Piccoli"
  ]},
  { key:"Lazio", nome:"SS Lazio", emoji:"🦅", giocatori:[
    "Provedel","Christos Motta","Furlanetto","Gila","Romagnoli","Provstgaard","Gigot","Patric",
    "Tavares","Luca Pellegrini","Marusic","Lazzari","Hysaj","Rovella","Belahyane","Cataldi",
    "Kenneth Taylor","Dele-Bashiru","Basic","Maldini","Przyborek","Zaccagni","Isaksen","Noslin",
    "Cancellieri","Pedro","Dia","Ratkov"
  ]},
  { key:"Bologna", nome:"Bologna FC", emoji:"🔴", giocatori:[
    "Skorupski","Ravaglia","Lorenzo Pessina","Lucumi","Heggem","Vitik","Helland","Casale",
    "Bonifazi","Miranda","Lykogiannis","Joao Mario","Zortea","De Silvestri","Moro","Lewis Ferguson",
    "Pobega","Sohm","Freuler","Odgaard","Cambiaghi","Rowe","Dominguez","Orsolini",
    "Bernardeschi","Castro","Dallinga"
  ]},
  { key:"Como", nome:"Como 1907", emoji:"🔵", giocatori:[
    "Butez","Tornqvist","Cavlina","Ramon","Diego Carlos","Kempf","Goldaniga","Valle",
    "Moreno","Van der Brempt","Vojvoda","Smolcic","Perrone","Caqueret","Da Cunha","Roberto",
    "Lahdo","Paz","Baturina","Rodriguez","Diao","Addai","Kuhn","Douvikas",
    "Morata"
  ]},
  { key:"Sassuolo", nome:"US Sassuolo", emoji:"🟢", giocatori:[
    "Muric","Turati","Zacchi","Satalino","Muharemovic","Idzes","Cande","Romagna",
    "Pedro Felipe","Doig","Garcia","Pieragnolo","Walukiewicz","Coulibaly","Boloca","Lipani",
    "Matic","Naouirou Ahamada","Thorstvedt","Vranckx","Iannoni","Volpato","Bakola","Lauriente",
    "Fadera","Berardi","Pinamonti","Nzola","Luca Moro"
  ]},
  { key:"Torino", nome:"Torino FC", emoji:"🟤", giocatori:[
    "Israel","Paleari","Siviero","Coco","Marianacci","Ismajli","Maripan","Ebbose",
    "Sazonov","Nkounkou","Obrador","Biraghi","Pedersen","Prati","Tameze","Casadei",
    "Ilic","Gineitis","Ilkhan","Lazaro","Vlasic","Anjorin","Perciun","Njie",
    "Aboukhlal","Savva","Adams","Simeone","Kulenovic","Zapata"
  ]},
  { key:"Udinese", nome:"Udinese Calcio", emoji:"⚫", giocatori:[
    "Okoye","Sava","Nunziante","Padelli","Solet","Kristensen","Bertola","Mlacic",
    "Kabasele","Zemura","Kamara","Zanoli","Ehizibuwe","Karlstrom","Abdoulaye Camara","Atta",
    "Miller","Ekkelenkamp","Piotrowski","Zarraga","Arizala","Zaniolo","Gueye","Davis",
    "Buksa","Bayo"
  ]},
  { key:"Parma", nome:"Parma Calcio", emoji:"🟡", giocatori:[
    "Suzuki","Corvi","Rinaldi","Circati","Enock Ndiaye","Troilo","Valenti","Delprato",
    "Valeri","Carboni","Britschgi","Keita","Estevez","Bernabe","Sorensen","Nicolussi Caviglia",
    "Ordonez","Cremaschi","Oristanio","Ondrejka","Strefezza","Almqvist","Pontus Almqvist","Frigan",
    "Elphege"
  ]},
  { key:"Genoa", nome:"Genoa CFC", emoji:"🔴", giocatori:[
    "Bijlow","Leali","Siegrist","Lysionok","Sommariva","Vasquez","Ostigard","Zaterstrom",
    "Marcandalli","Otoa","Martin","Norton-Cuffy","Sabelli","Frendrup","Onana","Masini",
    "Ellertsson","Amorim","Malinovsky","Baldanzi","Cornet","Messias","Vitinha Genoa","Ekhator",
    "Colombo","Ekuban"
  ]},
  { key:"Cagliari", nome:"Cagliari Calcio", emoji:"🔴", giocatori:[
    "Caprile","Sherri","Ciocci","Dossena","Juan Rodriguez","Obert","Mina","Ze Pedro",
    "Idrissi","Palestra","Zappa","Raterink","Ibrahim Sulemana","Adopo","Folorunsho","Liteta",
    "Deiola","Mazzitelli","Gaetano","Felici","Albarracin","Sebastiano Esposito","Kilicsoy","Borrelli",
    "Belotti","Trepy","Pavoletti"
  ]},
  { key:"Lecce", nome:"US Lecce", emoji:"🟡", giocatori:[
    "Falcone","Fruchtl","Samooja","Tiago Gabriel","Siebert","Gaspar","Jean","Perez",
    "Gallo","Ndaba","Veiga","Ramadani","Ismaila Fofana","Ngom","Berisha","Youssouf Coulibaly",
    "Helgason","Sala","Gandelsman","Marchwinski","Sottil","Banda","Pierotti","N'Dri",
    "Camarda","Stulic","Cheddira"
  ]},
  { key:"Hellas", nome:"Hellas Verona", emoji:"💛", giocatori:[
    "Montipo","Perilli","Toniolo","Borghi","Nelsson","Bella-Kotchap","Valentini","Slotsager",
    "Edmundsson","Frese","Bradaric","Belghali","Lirola","Cham","Oyegoke","Al-Musrati",
    "Niasse","Lovric","Serdar","Bernede","Harroui","Gagliardini","Akpa Akpro","Suslov",
    "Orban","Sarr","Bowie","Mosquera","Isaac","Ajayi"
  ]},
  { key:"Cremonese", nome:"US Cremonese", emoji:"🟥", giocatori:[
    "Audero","Silvestri","Nava","Faye","Federico Terracciano","Luperto","Baschirotto","Bianchetti",
    "Folino","Ceccherini","Pezzella","Barbieri","Floriani Mussolini","Grassi","Bondo","Payero",
    "Vandeputte","Thorsby","Collocolo","Maleh","Zerbin","Moumbagna","Sanabria","Bonazzoli",
    "Okereke","Djuric","Vardy"
  ]},
  { key:"Pisa", nome:"AC Pisa", emoji:"🖤", giocatori:[
    "Semper","Scuffet","Nicolas","Canestrelli","Bozhinov","Coppola","Albiol","Calabresi",
    "Caracciolo","Denoon","Marin","Hojholt","Loyola","Akinsanmiro","Vural","Aebischer",
    "Piccinini","Toure","Cuadrado","Iling-Junior","Angori","Lorran","Tramoni","Stengs",
    "Leris","Durosinmi","Meister","Stojilkovic","Moreo"
  ]},
];

// ── CARRIERE ────────────────────────────────────────────────────────────
const CAREERS = [
  { answer:"Francesco Totti", clues:[
    { club:"Roma Primavera", period:"1989–1993", apps:60,  goals:28,  note:"Debutto in prima squadra a 16 anni" },
    { club:"AS Roma",         period:"1993–2017", apps:619, goals:307, note:"1 Scudetto, 2 Coppe Italia, Capitano eterno" },
    { club:"Nazionale",       period:"1998–2006", apps:58,  goals:9,   note:"Campione del Mondo 2006" },
  ]},
  { answer:"Zlatan Ibrahimovic", clues:[
    { club:"Malmö FF",    period:"1999–2001", apps:40, goals:16, note:"Esordio professionistico in Svezia" },
    { club:"Ajax",        period:"2001–2004", apps:74, goals:35, note:"Eredivisie vinta due volte" },
    { club:"Juventus",    period:"2004–2006", apps:70, goals:23, note:"Due scudetti (poi revocati per Calciopoli)" },
    { club:"Inter",       period:"2006–2009", apps:88, goals:57, note:"Tre scudetti con Mourinho" },
    { club:"Barcellona",  period:"2009–2010", apps:29, goals:16, note:"Champions League vinta" },
    { club:"Milan",       period:"2010–12 / 2019–23", apps:163, goals:93, note:"Scudetto 2022 a 40 anni" },
  ]},
  { answer:"Alessandro Del Piero", clues:[
    { club:"Padova",   period:"1991–1993", apps:30, goals:11, note:"Esordio nei professionisti a 17 anni" },
    { club:"Juventus", period:"1993–2012", apps:705, goals:290, note:"6 Scudetti, 1 Champions League, Capitano storico" },
    { club:"Sydney FC",period:"2012–2014", apps:57, goals:27,  note:"Esperienza in Australia, idolo immediato" },
    { club:"Nazionale", period:"1995–2008", apps:91, goals:27, note:"Campione del Mondo 2006" },
  ]},
  { answer:"Roberto Baggio", clues:[
    { club:"Vicenza",   period:"1982–1985", apps:52, goals:13, note:"Esordio da giovanissimo" },
    { club:"Fiorentina",period:"1985–1990", apps:94, goals:39, note:"Beniamino di Firenze, addio contestatissimo" },
    { club:"Juventus",  period:"1990–1995", apps:141, goals:78, note:"Scudetto, Coppa UEFA, Pallone d'Oro 1993" },
    { club:"Milan",     period:"1995–1997", apps:59, goals:19, note:"Due stagioni, mai titolare fisso" },
    { club:"Bologna",   period:"1997–2000", apps:97, goals:39, note:"Rinascita dopo anni difficili" },
    { club:"Nazionale", period:"1988–2004", apps:56, goals:27, note:"Finale Mondiale 1994, rigore sbagliato" },
  ]},
  { answer:"Paolo Maldini", clues:[
    { club:"AC Milan",   period:"1985–2009", apps:902, goals:33, note:"7 Scudetti, 5 Champions League, Capitano leggendario" },
    { club:"Nazionale",  period:"1988–2002", apps:126, goals:7,  note:"Finale Mondiale 1994, Europeo 1988" },
  ]},
  { answer:"Ronaldo", clues:[
    { club:"Cruzeiro",       period:"1993–1994", apps:14, goals:12, note:"Esordio in Brasile a 16 anni" },
    { club:"PSV Eindhoven",  period:"1994–1996", apps:46, goals:42, note:"Capocannoniere Eredivisie a 17 anni" },
    { club:"Barcellona",     period:"1996–1997", apps:37, goals:34, note:"Coppa UEFA e Coppa del Re" },
    { club:"Inter",          period:"1997–2002", apps:99, goals:59, note:"Pallone d'Oro 1997 e 2002" },
    { club:"Real Madrid",    period:"2002–2007", apps:177, goals:104, note:"La Liga 2003, gol leggendari al Bernabéu" },
    { club:"Nazionale",      period:"1994–2011", apps:98, goals:62, note:"2 Mondiali vinti: 1994 e 2002" },
  ]},
  { answer:"Zinedine Zidane", clues:[
    { club:"Cannes",         period:"1989–1992", apps:61, goals:6,  note:"Esordio nel calcio professionistico francese" },
    { club:"Bordeaux",       period:"1992–1996", apps:139, goals:28, note:"Coppa UEFA 1996, si impone in Europa" },
    { club:"Juventus",       period:"1996–2001", apps:212, goals:31, note:"2 Scudetti, 2 finali Champions League" },
    { club:"Real Madrid",    period:"2001–2006", apps:227, goals:49, note:"Champions League 2002, gol di tacco in finale" },
    { club:"Nazionale",      period:"1994–2006", apps:108, goals:31, note:"Mondiale 1998, Euro 2000, finale Mondiale 2006" },
  ]},
  { answer:"Ronaldinho", clues:[
    { club:"Grêmio",         period:"1998–2001", apps:47, goals:21, note:"Esordio in Brasile, subito devastante" },
    { club:"PSG",            period:"2001–2003", apps:55, goals:17, note:"Ligue 1, si fa notare da tutta Europa" },
    { club:"Barcellona",     period:"2003–2008", apps:207, goals:94, note:"2 La Liga, Champions League 2006, Pallone d'Oro 2005" },
    { club:"Milan",          period:"2008–2010", apps:73, goals:21, note:"Due stagioni in rossonero" },
    { club:"Nazionale",      period:"1999–2013", apps:97, goals:33, note:"Mondiale 2002, Copa América 1999" },
  ]},
  { answer:"Thierry Henry", clues:[
    { club:"Monaco",         period:"1994–1999", apps:105, goals:20, note:"Esordio da ala, poi attaccante" },
    { club:"Juventus",       period:"1999–1999", apps:16,  goals:3,  note:"Breve esperienza in Serie A" },
    { club:"Arsenal",        period:"1999–2007", apps:369, goals:228, note:"2 Premier League, capocannoniere record, Invincibili 2004" },
    { club:"Barcellona",     period:"2007–2010", apps:121, goals:49, note:"Champions League 2009, La Liga" },
    { club:"Nazionale",      period:"1997–2010", apps:123, goals:51, note:"Mondiale 1998, Euro 2000" },
  ]},
  { answer:"Andrés Iniesta", clues:[
    { club:"Barcellona B",   period:"2002–2004", apps:45, goals:7,  note:"Cresciuto nella Masia dal 1996" },
    { club:"Barcellona",     period:"2004–2018", apps:674, goals:57, note:"9 La Liga, 4 Champions League, gol finale Mondiale 2010" },
    { club:"Vissel Kobe",    period:"2018–2023", apps:136, goals:20, note:"Porta il calcio spagnolo in Giappone" },
    { club:"Nazionale",      period:"2006–2018", apps:131, goals:13, note:"Mondiale 2010, Euro 2008 e 2012" },
  ]},
  { answer:"Xavi Hernández", clues:[
    { club:"Barcellona B",   period:"1997–1999", apps:39, goals:5,  note:"Prodotto della Masia" },
    { club:"Barcellona",     period:"1999–2015", apps:767, goals:85, note:"8 La Liga, 4 Champions League, faro del tiki-taka" },
    { club:"Al-Sadd",        period:"2015–2019", apps:87, goals:14, note:"Chiude la carriera in Qatar" },
    { club:"Nazionale",      period:"2000–2014", apps:133, goals:13, note:"Mondiale 2010, Euro 2008 e 2012" },
  ]},
  { answer:"Cafu", clues:[
    { club:"São Paulo",      period:"1990–1994", apps:102, goals:8,  note:"Esordio e titolo Brasileirão" },
    { club:"Roma",           period:"1997–2003", apps:170, goals:10, note:"Scudetto 2001, beniamino di Trigoria" },
    { club:"Milan",          period:"2003–2008", apps:128, goals:5,  note:"Champions League 2007" },
    { club:"Nazionale",      period:"1990–2006", apps:142, goals:5,  note:"3 Mondiali: 1994, 1998 (finale), 2002 (vinto)" },
  ]},
  { answer:"Oliver Kahn", clues:[
    { club:"Karlsruher SC",  period:"1987–1994", apps:156, goals:0, note:"Esordio e crescita nel calcio tedesco" },
    { club:"Bayern Monaco",  period:"1994–2008", apps:632, goals:0, note:"8 Bundesliga, Champions League 2001, portiere dominante" },
    { club:"Nazionale",      period:"1994–2006", apps:86,  goals:0, note:"Finale Mondiale 2002, Pallone d'Oro del torneo" },
  ]},
  { answer:"Gabriel Batistuta", clues:[
    { club:"Boca Juniors",   period:"1990–1991", apps:30, goals:13, note:"Esordio in Argentina" },
    { club:"Fiorentina",     period:"1991–2000", apps:269, goals:168, note:"Leggenda viola, top scorer all-time del club" },
    { club:"Roma",           period:"2000–2003", apps:72, goals:30, note:"Scudetto 2001 con Capello" },
    { club:"Nazionale",      period:"1991–2002", apps:78, goals:54, note:"Copa América 1991 e 1993" },
  ]},
  { answer:"Raúl González", clues:[
    { club:"Atlético Madrid B", period:"1992–1994", apps:29, goals:16, note:"Cresciuto nell'Atlético, poi passato al Real" },
    { club:"Real Madrid",    period:"1994–2010", apps:741, goals:323, note:"6 La Liga, 3 Champions League, capitano storico" },
    { club:"Schalke 04",     period:"2010–2012", apps:98, goals:40,  note:"Protagonista in Bundesliga" },
    { club:"Nazionale",      period:"1996–2006", apps:102, goals:44, note:"Euro 2000 finalista, Mondiale 2002" },
  ]},
  { answer:"Pavel Nedvěd", clues:[
    { club:"Sparta Praga",   period:"1992–1996", apps:116, goals:26, note:"Esordio e titoli cechi" },
    { club:"Lazio",          period:"1996–2001", apps:193, goals:44, note:"Scudetto 1999-2000, Coppa UEFA 1999" },
    { club:"Juventus",       period:"2001–2009", apps:327, goals:64, note:"Pallone d'Oro 2003, 5 Scudetti (3 revocati)" },
    { club:"Nazionale",      period:"1994–2006", apps:91,  goals:18, note:"Finale Euro 1996, semifinale Mondiale 2006" },
  ]},
  { answer:"Gianluigi Buffon", clues:[
    { club:"Parma",          period:"1995–2001", apps:168, goals:0, note:"Esordio a 17 anni, Coppa UEFA e Coppa Italia" },
    { club:"Juventus",       period:"2001–2018", apps:640, goals:0, note:"10 Scudetti, finale Champions League 2003 e 2015" },
    { club:"PSG",            period:"2018–2019", apps:25,  goals:0, note:"Ligue 1, esperienza parigina" },
    { club:"Nazionale",      period:"1997–2018", apps:176, goals:0, note:"Mondiale 2006, record presenze Azzurri" },
  ]},
  { answer:"Andrea Pirlo", clues:[
    { club:"Brescia",        period:"1995–2001", apps:94, goals:12, note:"Esordio e maturazione in Serie A" },
    { club:"Inter",          period:"1998–2001", apps:30, goals:2,  note:"Poco spazio, poi prestiti" },
    { club:"Milan",          period:"2001–2011", apps:401, goals:32, note:"2 Champions League, 2 Scudetti, regista totale" },
    { club:"Juventus",       period:"2011–2015", apps:164, goals:22, note:"4 Scudetti consecutivi da parametro zero" },
    { club:"Nazionale",      period:"2002–2015", apps:116, goals:13, note:"Mondiale 2006, MVP Euro 2012" },
  ]},
  { answer:"Lionel Messi", clues:[
    { club:"Barcellona B",   period:"2003–2005", apps:22, goals:6,   note:"Debutto in prima squadra a 17 anni" },
    { club:"Barcellona",     period:"2004–2021", apps:778, goals:672, note:"10 La Liga, 4 Champions League, 6 Palloni d'Oro al Barça" },
    { club:"PSG",            period:"2021–2023", apps:75,  goals:32,  note:"Due Ligue 1" },
    { club:"Inter Miami",    period:"2023–",     apps:50,  goals:38,  note:"MLS, rinascita americana" },
    { club:"Nazionale",      period:"2005–",     apps:191, goals:109, note:"Mondiale 2022, 3 Copa América, Pallone d'Oro 2023" },
  ]},
  { answer:"Cristiano Ronaldo", clues:[
    { club:"Sporting CP",    period:"2002–2003", apps:25, goals:3,   note:"Esordio in Portugal, notato da Ferguson" },
    { club:"Manchester Utd", period:"2003–2009", apps:292, goals:118, note:"3 Premier League, Champions League 2008, Pallone d'Oro 2008" },
    { club:"Real Madrid",    period:"2009–2018", apps:438, goals:450, note:"4 Champions League, 2 La Liga, record gol assoluto" },
    { club:"Juventus",       period:"2018–2021", apps:134, goals:101, note:"2 Scudetti, top scorer Serie A 2020-21" },
    { club:"Al-Nassr",       period:"2023–",     apps:80,  goals:68,  note:"Arabia Saudita, ambasciatore globale" },
    { club:"Nazionale",      period:"2003–",     apps:221, goals:135, note:"Euro 2016, Nations League 2019, record gol nazionali" },
  ]},
  { answer:"Luka Modrić", clues:[
    { club:"Dinamo Zagabria", period:"2003–2008", apps:130, goals:33, note:"Titoli croati, esplode in Croazia" },
    { club:"Tottenham",       period:"2008–2012", apps:160, goals:17, note:"Si afferma in Premier League" },
    { club:"Real Madrid",     period:"2012–2025", apps:597, goals:43, note:"5 Champions League, Pallone d'Oro 2018" },
    { club:"Milan",           period:"2025–",     apps:30,  goals:2,  note:"Serie A a 40 anni" },
    { club:"Nazionale",       period:"2006–",     apps:194, goals:28, note:"Finale Mondiale 2018, record presenze Croazia" },
  ]},
  { answer:"Robert Lewandowski", clues:[
    { club:"Lech Poznań",    period:"2008–2010", apps:82, goals:41, note:"Esplode in Polonia, acquistato dal Borussia" },
    { club:"Borussia Dortmund", period:"2010–2014", apps:187, goals:103, note:"2 Bundesliga, finale Champions League 2013" },
    { club:"Bayern Monaco",  period:"2014–2022", apps:374, goals:344, note:"8 Bundesliga, Champions League 2020, 41 gol in una stagione" },
    { club:"Barcellona",     period:"2022–",     apps:100, goals:70,  note:"La Liga 2022-23, gol subito decisivi" },
    { club:"Nazionale",      period:"2008–",     apps:148, goals:82,  note:"Record gol assoluto Polonia" },
  ]},
  { answer:"Karim Benzema", clues:[
    { club:"Lione",          period:"2004–2009", apps:148, goals:66, note:"Esordio in Ligue 1 a 17 anni, 3 titoli francesi" },
    { club:"Real Madrid",    period:"2009–2023", apps:648, goals:354, note:"5 Champions League, 4 La Liga, Pallone d'Oro 2022" },
    { club:"Al-Ittihad",     period:"2023–2024", apps:31,  goals:8,  note:"Arabia Saudita, esperienza difficile" },
    { club:"Nazionale",      period:"2007–2022", apps:97,  goals:37, note:"Mondiale 2018, Euro 2021 quarti" },
  ]},
  { answer:"Neymar Jr.", clues:[
    { club:"Santos",         period:"2009–2013", apps:225, goals:136, note:"Idolo brasiliano, Copa Libertadores 2011" },
    { club:"Barcellona",     period:"2013–2017", apps:186, goals:105, note:"Champions League 2015, tridente MSN con Messi e Suárez" },
    { club:"PSG",            period:"2017–2023", apps:173, goals:118, note:"Trasferimento record 222M, 5 Ligue 1" },
    { club:"Al-Hilal",       period:"2023–2024", apps:7,   goals:1,   note:"Arabia Saudita, infortuni continui" },
    { club:"Nazionale",      period:"2010–",     apps:128, goals:79,  note:"Mondiale 2014 in casa, oro olimpico 2016" },
  ]},
  { answer:"Kylian Mbappé", clues:[
    { club:"Monaco",         period:"2015–2017", apps:69, goals:27,  note:"Esplode a 17 anni, semifinale Champions League 2017" },
    { club:"PSG",            period:"2017–2024", apps:308, goals:256, note:"6 Ligue 1, capocannoniere assoluto PSG" },
    { club:"Real Madrid",    period:"2024–",     apps:50,  goals:30,  note:"Champions League, La Liga" },
    { club:"Nazionale",      period:"2017–",     apps:90,  goals:48,  note:"Mondiale 2018, finale Mondiale 2022" },
  ]},
  { answer:"Niclas Füllkrug", clues:[
    { club:"Werder Brema",         period:"2011–2013", apps:24,  goals:2,  note:"Esordio in Bundesliga a 18 anni" },
    { club:"Greuther Fürth",       period:"2013–2014", apps:24,  goals:6,  note:"Prestito, quaterna contro l'Erzgebirge Aue" },
    { club:"Norimberga",           period:"2014–2016", apps:59,  goals:18, note:"Trascinatore in 2. Bundesliga" },
    { club:"Hannover 96",          period:"2016–2019", apps:80,  goals:24, note:"Promozione in Bundesliga nel 2017" },
    { club:"Werder Brema",         period:"2019–2023", apps:125, goals:49, note:"Capocannoniere Bundesliga 2022-23 con 16 gol" },
    { club:"Borussia Dortmund",    period:"2023–2024", apps:42,  goals:15, note:"Finale Champions League 2024" },
    { club:"West Ham",             period:"2024–2026", apps:29,  goals:3,  note:"Acquistato per 26 milioni" },
    { club:"Milan",                period:"2026–",     apps:12,  goals:1,  note:"Approdo in Serie A a 33 anni" },
    { club:"Nazionale",            period:"2022–",     apps:30,  goals:9,  note:"Gol contro la Spagna al Mondiale 2022" },
  ]},
  { answer:"Bryan Cristante", clues:[
    { club:"Milan",          period:"2011–2014", apps:5,   goals:1,  note:"Esordio in Champions League a 16 anni" },
    { club:"Benfica",        period:"2014–2016", apps:20,  goals:1,  note:"Campionato portoghese vinto nel 2015" },
    { club:"Atalanta",       period:"2017–2018", apps:59,  goals:15, note:"9 gol in Serie A sotto Gasperini" },
    { club:"Roma",           period:"2018–",     apps:352, goals:21, note:"Conference League 2022 con Mourinho" },
    { club:"Nazionale",      period:"2017–",     apps:47,  goals:2,  note:"Campione d'Europa a Euro 2020" },
  ]},
  { answer:"Pedro", clues:[
    { club:"Barcellona",     period:"2008–2015", apps:321, goals:99, note:"3 Champions League, primo a segnare in 6 competizioni nel 2009" },
    { club:"Chelsea",        period:"2015–2020", apps:206, goals:43, note:"Europa League 2019 con gol in finale" },
    { club:"Roma",           period:"2020–2021", apps:40,  goals:6,  note:"Prima esperienza italiana" },
    { club:"Lazio",          period:"2021–",     apps:198, goals:37, note:"Primo giocatore Roma-Lazio dal 1985" },
    { club:"Nazionale",      period:"2008–2016", apps:65,  goals:17, note:"Mondiale 2010 e Euro 2012" },
  ]},
  { answer:"Andrea Cambiaso", clues:[
    { club:"Genoa",          period:"2021–2022", apps:28,  goals:1,  note:"Esordio in Serie A" },
    { club:"Bologna",        period:"2022–2023", apps:34,  goals:0,  note:"Prestito, si impone in Serie A" },
    { club:"Juventus",       period:"2023–",     apps:122, goals:8,  note:"Titolare fisso sotto Thiago Motta" },
    { club:"Nazionale",      period:"2023–",     apps:19,  goals:3,  note:"Esordio in Azzurro nel 2023" },
  ]},
  { answer:"Jonathan David", clues:[
    { club:"Gent",           period:"2018–2020", apps:84,  goals:37, note:"Rivelazione in Belgio, 23 gol in una stagione" },
    { club:"Lilla",          period:"2020–2025", apps:232, goals:109, note:"Ligue 1 2020-21, capocannoniere record del club" },
    { club:"Juventus",       period:"2025–",     apps:38,  goals:7,  note:"Primo grande club europeo a parametro zero" },
    { club:"Nazionale",      period:"2019–",     apps:73,  goals:37, note:"Capocannoniere assoluto della nazionale canadese" },
  ]},
  { answer:"Federico Gatti", clues:[
    { club:"Pavarolo",       period:"2014–2018", apps:86,  goals:15, note:"Dall'Eccellenza, ex operaio edile" },
    { club:"Verbania",       period:"2018–2020", apps:51,  goals:6,  note:"Serie D, ancora lontano dal professionismo" },
    { club:"Frosinone",      period:"2021–2022", apps:35,  goals:5,  note:"Esplode in Serie B, notato dalla Juventus" },
    { club:"Juventus",       period:"2022–",     apps:131, goals:11, note:"Titolare alla prima stagione, carriera da favola" },
    { club:"Nazionale",      period:"2023–",     apps:6,   goals:0,  note:"Convocato da Spalletti" },
  ]},
  { answer:"Gianluca Mancini", clues:[
    { club:"Perugia",        period:"2015–2017", apps:30,  goals:1,  note:"Crescita in Serie B" },
    { club:"Atalanta",       period:"2017–2019", apps:48,  goals:7,  note:"Gasperini lo trasforma in difensore d'élite" },
    { club:"Roma",           period:"2019–",     apps:308, goals:19, note:"Colonna della difesa, Conference League 2022" },
    { club:"Nazionale",      period:"2019–",     apps:18,  goals:2,  note:"Campione d'Europa a Euro 2020" },
  ]},
  { answer:"Donyell Malen", clues:[
    { club:"PSV",            period:"2017–2021", apps:116, goals:55, note:"Rivelazione in Eredivisie, 27 gol nel 2020-21" },
    { club:"Borussia Dortmund", period:"2021–2025", apps:132, goals:39, note:"Finale Champions League 2024" },
    { club:"Aston Villa",    period:"2025–2026", apps:46,  goals:10, note:"Esperienza in Premier League" },
    { club:"Roma",           period:"2026–",     apps:8,   goals:6,  note:"Approdo in Serie A" },
    { club:"Nazionale",      period:"2019–",     apps:49,  goals:13, note:"Presenza fissa negli Oranje" },
  ]},
  { answer:"Mattia Zaccagni", clues:[
    { club:"Verona",         period:"2012–2021", apps:146, goals:15, note:"Trafila dalle serie minori, esplode in Serie A" },
    { club:"Lazio",          period:"2021–",     apps:187, goals:36, note:"Gol decisivo a Euro 2024 contro la Croazia" },
    { club:"Nazionale",      period:"2021–",     apps:13,  goals:1,  note:"Protagonista a Euro 2024" },
  ]},
  { answer:"Alessio Romagnoli", clues:[
    { club:"Roma",           period:"2012–2014", apps:14,  goals:1,  note:"Esordio giovanissimo in Serie A" },
    { club:"Sampdoria",      period:"2014–2015", apps:31,  goals:2,  note:"Prestito, si afferma in Serie A" },
    { club:"Milan",          period:"2015–2022", apps:247, goals:10, note:"Capitano rossonero, pilastro della difesa" },
    { club:"Lazio",          period:"2022–",     apps:155, goals:17, note:"Ritorno a Roma da capitano biancoceleste" },
    { club:"Nazionale",      period:"2016–",     apps:13,  goals:2,  note:"Convocato in Nazionale maggiore" },
  ]},
  { answer:"Davide Frattesi", clues:[
    { club:"Ascoli",         period:"2018–2019", apps:32,  goals:0,  note:"Prima Serie B in prestito" },
    { club:"Empoli",         period:"2019–2020", apps:41,  goals:5,  note:"Prestito, si afferma in Serie B" },
    { club:"Monza",          period:"2020–2021", apps:41,  goals:8,  note:"Promozione in Serie A con Berlusconi" },
    { club:"Sassuolo",       period:"2021–2023", apps:76,  goals:11, note:"Esplode in Serie A, notato dall'Inter" },
    { club:"Inter",          period:"2023–",     apps:76,  goals:15, note:"Specialista dei gol dalla panchina, Scudetto 2024" },
    { club:"Nazionale",      period:"2022–",     apps:33,  goals:8,  note:"Gol decisivi in Nazionale" },
  ]},
  { answer:"Marcus Thuram", clues:[
    { club:"Guingamp",       period:"2017–2019", apps:72,  goals:17, note:"Esplode in Ligue 1, figlio di Lilian" },
    { club:"Borussia M'gladbach", period:"2019–2023", apps:134, goals:44, note:"Consacrazione in Bundesliga" },
    { club:"Inter",          period:"2023–",     apps:130, goals:45, note:"Titolare inamovibile, Scudetto 2024" },
    { club:"Nazionale",      period:"2020–",     apps:31,  goals:2,  note:"Figlio d'arte, Francia" },
  ]},
  { answer:"Manuel Akanji", clues:[
    { club:"Basilea",        period:"2015–2018", apps:58,  goals:7,  note:"Si afferma in Super League svizzera" },
    { club:"Borussia Dortmund", period:"2018–2022", apps:158, goals:4, note:"Pilastro della difesa del BVB" },
    { club:"Manchester City", period:"2022–2025", apps:136, goals:5, note:"Premier League e Champions League 2023" },
    { club:"Inter",          period:"2025–",     apps:36,  goals:2,  note:"Approdo in Serie A" },
    { club:"Nazionale",      period:"2018–",     apps:77,  goals:4,  note:"Titolare fisso degli Elvetici" },
  ]},
  { answer:"Moise Kean", clues:[
    { club:"Juventus",       period:"2016–2019", apps:23,  goals:5,  note:"Esordio in Serie A a 16 anni" },
    { club:"Everton",        period:"2019–2021", apps:39,  goals:7,  note:"Esperienza in Premier League" },
    { club:"PSG",            period:"2020–2021", apps:41,  goals:17, note:"Stagione da protagonista in prestito a Parigi" },
    { club:"Juventus",       period:"2021–2024", apps:123, goals:22, note:"Ritorno a Torino, altalenante" },
    { club:"Fiorentina",     period:"2024–",     apps:74,  goals:34, note:"Rinascita definitiva, capocannoniere viola" },
    { club:"Nazionale",      period:"2018–",     apps:24,  goals:11, note:"Esordio a 19 anni, record di precocità" },
  ]},
  { answer:"Santiago Gimenez", clues:[
    { club:"Cruz Azul",      period:"2019–2022", apps:105, goals:21, note:"Crescita in Messico, figlio di Chaco Gimenez" },
    { club:"Feyenoord",      period:"2022–2025", apps:105, goals:65, note:"Capocannoniere Eredivisie, idolo di Rotterdam" },
    { club:"Milan",          period:"2025–",     apps:30,  goals:7,  note:"Acquistato per 35M, primo grande club europeo" },
    { club:"Nazionale",      period:"2021–",     apps:46,  goals:6,  note:"Titolare con El Tri" },
  ]},
];



// ── HELPERS ─────────────────────────────────────────────────────────────
function seedRandom(s){let x=s;return()=>{x=(x*1664525+1013904223)&0xffffffff;return(x>>>0)/0xffffffff;};}

// todaySeed: YYYYMMDD as number — unique per calendar day
function todaySeed(){const d=new Date();return d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate();}

// seedForDaysAgo(n): seed for n days ago (0=today, 1=yesterday, ...)
function seedForDaysAgo(n){const d=new Date();d.setDate(d.getDate()-n);return d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate();}

// dateForDaysAgo(n): display date string for n days ago
function dateForDaysAgo(n){const d=new Date();d.setDate(d.getDate()-n);return d.toLocaleDateString("it-IT",{day:"numeric",month:"long"});}

// archiveNum(poolSize): today = poolSize (max), yesterday = poolSize-1, etc.
// Archive #1 = poolSize-1 days ago, Archive #poolSize = today
function archiveNum(poolSize){return poolSize;}
// daysAgoForNum(num, poolSize): how many days ago is archive entry #num?
// num=poolSize → 0 days ago (today), num=1 → poolSize-1 days ago
function daysAgoForNum(num,poolSize){return poolSize-num;}
// seedForNum(num, poolSize)
function seedForNum(num,poolSize){return seedForDaysAgo(daysAgoForNum(num,poolSize));}

function shuffle(arr,rng){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function normStr(s){return s.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");}
function normLow(s){return s.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");}
function levenshtein(a,b){
  const m=a.length,n=b.length;
  const dp=Array.from({length:m+1},(_,i)=>Array.from({length:n+1},(_,j)=>i===0?j:j===0?i:0));
  for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)dp[i][j]=a[i-1]===b[j-1]?dp[i-1][j-1]:1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);
  return dp[m][n];
}
function fuzzyMatch(input,answer){
  const i=normLow(input),a=normLow(answer);
  if(i===a)return true;
  // exact match on any word of the answer (es. "Inzaghi" in "F. Inzaghi")
  if(a.split(" ").some(w=>w===i))return true;
  // levenshtein <=1 on full answer or on any word (min 3 chars input)
  if(i.length>=3&&levenshtein(i,a)<=1)return true;
  if(i.length>=3&&a.split(" ").some(w=>w.length>=3&&levenshtein(i,w)<=1))return true;
  return false;
}

// ── STORAGE HELPERS ─────────────────────────────────────────────────────
function todayKey(){const d=new Date();return `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,"0")}${String(d.getDate()).padStart(2,"0")}`;}
// Persistent storage: tries localStorage first, falls back to in-memory (iframe sandbox safe)
const _mem={};
function _get(k){try{const v=localStorage.getItem(k);if(v!=null)return v;}catch(e){}return _mem[k]??null;}
function _set(k,v){try{localStorage.setItem(k,v);}catch(e){}_mem[k]=v;}
function saveResult(gameKey,data){
  try{
    const k=`uq_${gameKey}_${todayKey()}`;
    if(_get(k))return; // already saved today, don't overwrite
    _set(k,JSON.stringify(data));
    // update streak only on first save of the day across all games
    const sk="uq_streak";
    const raw=_get(sk);
    const streak=raw?JSON.parse(raw):{count:0,lastDate:""};
    const today=todayKey();
    if(streak.lastDate===today)return;
    const yest=(()=>{const d=new Date();d.setDate(d.getDate()-1);return `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,"0")}${String(d.getDate()).padStart(2,"0")}`;})();
    const newCount=streak.lastDate===yest?streak.count+1:1;
    _set(sk,JSON.stringify({count:newCount,lastDate:today}));
  }catch(e){}
}
function loadResult(gameKey){
  try{const k=`uq_${gameKey}_${todayKey()}`;const r=_get(k);return r?JSON.parse(r):null;}catch(e){return null;}
}
function loadStreak(){
  try{const r=_get("uq_streak");return r?JSON.parse(r):{count:0,lastDate:""};}catch(e){return{count:0,lastDate:""};}
}

function useCountdown(){
  const[t,sT]=useState("");
  useEffect(()=>{
    function calc(){const now=new Date(),next=new Date();next.setHours(24,0,0,0);const d=next-now;sT(`${String(Math.floor(d/3600000)).padStart(2,"0")}:${String(Math.floor((d%3600000)/60000)).padStart(2,"0")}:${String(Math.floor((d%60000)/1000)).padStart(2,"0")}`);}
    calc();const id=setInterval(calc,1000);return()=>clearInterval(id);
  },[]);
  return t;
}

// ── COLORI / STILI ───────────────────────────────────────────────────────
const US={black:"#111",orange:"#f5e000",bg:"#f4f4f4",border:"#e2e2e2",muted:"#888",green:"#16a34a",greenL:"#dcfce7",red:"#dc2626",redL:"#fee2e2",yellow:"#d97706"};
const T={
  app:{minHeight:"100vh",background:US.bg,fontFamily:"'Helvetica Neue',Arial,sans-serif",animation:"fadeSlideIn 0.35s ease forwards"},
  hdr:{background:US.black,color:"#fff",padding:"13px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`3px solid ${US.orange}`},
  ey:{fontSize:"8px",letterSpacing:"3px",textTransform:"uppercase",color:US.orange,marginBottom:"2px",fontWeight:"700"},
  ht:{fontSize:"17px",fontWeight:"700",margin:0},
  body:{padding:"18px 18px 48px",maxWidth:"620px",margin:"0 auto",boxSizing:"border-box"},
  bk:{background:"none",border:"1.5px solid #444",borderRadius:"4px",color:"#aaa",padding:"5px 11px",fontSize:"9px",letterSpacing:"1px",textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit"},
  pb:{background:US.orange,color:US.black,border:"none",borderRadius:"4px",padding:"9px 16px",fontSize:"10px",letterSpacing:"1px",textTransform:"uppercase",fontWeight:"700",cursor:"pointer",fontFamily:"inherit"},
  sb:{background:"#fff",color:US.black,border:`1.5px solid ${US.black}`,borderRadius:"4px",padding:"8px 16px",fontSize:"10px",letterSpacing:"1px",textTransform:"uppercase",fontWeight:"700",cursor:"pointer",fontFamily:"inherit"},
  lb:{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.muted,marginBottom:"7px",display:"block"},
  ip:{border:`1.5px solid ${US.border}`,borderRadius:"4px",padding:"9px 11px",fontSize:"13px",fontFamily:"inherit",outline:"none",color:US.black,boxSizing:"border-box"},
};

// ── HEADER ───────────────────────────────────────────────────────────────
function dayToDate(num,poolSize){return dateForDaysAgo(daysAgoForNum(num,poolSize));}

function ShareButton({text}){
  const[copied,setCopied]=useState(false);
  function share(){
    try{navigator.clipboard.writeText(text).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);});}
    catch(e){/* fallback */const ta=document.createElement("textarea");ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand("copy");document.body.removeChild(ta);setCopied(true);setTimeout(()=>setCopied(false),2000);}
  }
  return(<button onClick={share} style={{...T.sb,display:"flex",alignItems:"center",gap:"6px",justifyContent:"center",width:"100%",marginTop:"8px",background:copied?US.greenL:"#fff",borderColor:copied?US.green:"#333",color:copied?US.green:US.black}}>
    {copied?"✓ Copiato!":"📤 Condividi risultato"}
  </button>);
}

function DoneScreen({gameKey,day,isToday,onHome,onArchive,children}){
  // children = the result UI to show (passed as function or element)
  const saved=isToday?loadResult(gameKey):null;
  if(saved)return(
    <div style={{...T.body,textAlign:"center",paddingTop:"32px"}}>
      <div style={{fontSize:"11px",color:US.muted,marginBottom:"4px",letterSpacing:"1px",textTransform:"uppercase"}}>Hai già giocato oggi</div>
      {children(saved)}
      {isToday&&onArchive&&<button onClick={onArchive} style={{...T.sb,width:"100%",marginTop:"6px",color:US.black}}>📂 Vai all'archivio</button>}
      <button onClick={onHome} style={{...T.pb,marginTop:"8px",width:"100%"}}>Home</button>
    </div>
  );
  return null; // not done yet — game renders normally
}

function Hdr({title,sub,onHome,archiveNav}){
  return(
    <div style={T.hdr}>
      <div style={{flex:1,minWidth:0}}>
        <div style={T.ey}>Universo Sportivo</div>
        <div style={T.ht}>{title}</div>
        {sub&&<div style={{fontSize:"9px",color:"#777",marginTop:"1px"}}>{sub}</div>}
      </div>
      {archiveNav&&<div style={{display:"flex",alignItems:"center",gap:"4px",marginRight:"10px"}}>
        <button onClick={archiveNav.prev} disabled={archiveNav.day<=1} style={{...T.bk,padding:"5px 10px",fontSize:"12px",opacity:archiveNav.day<=1?0.3:1}}>◀</button>
        <div style={{textAlign:"center",minWidth:"44px"}}>
          <div style={{fontSize:"11px",color:"#fff",fontWeight:"700"}}>#{archiveNav.day}</div>
          <div style={{fontSize:"8px",color:"#888"}}>{dayToDate(archiveNav.day,archiveNav.poolSize)}</div>
        </div>
        <button onClick={archiveNav.next} disabled={archiveNav.day>=archiveNav.max} style={{...T.bk,padding:"5px 10px",fontSize:"12px",opacity:archiveNav.day>=archiveNav.max?0.3:1}}>▶</button>
      </div>}
      {onHome&&<button style={T.bk} onClick={onHome} onMouseEnter={e=>{e.currentTarget.style.color="#fff";e.currentTarget.style.borderColor="#fff";}} onMouseLeave={e=>{e.currentTarget.style.color="#aaa";e.currentTarget.style.borderColor="#444";}}>← Home</button>}
    </div>
  );
}

// ── ARCHIVE WRAPPER ──────────────────────────────────────────────────────
const POOL_SIZES={calciodle:DB.length,wordle:DB.length,hangman:DB.length,valore2:DB.length,carriera:CAREERS.length,rosa:ROSE_LIST.length,lista:12,transfer:15};

const PAGE_SIZE=10;
function ArchiveWrapper({gameKey,children}){
  const poolSize=POOL_SIZES[gameKey]||DB.length;
  const todayN=poolSize;
  const[num,setNum]=useState(Math.max(1,todayN-1));
  // page: which group of 10 we show. page=0 → most recent 10 (excluding today)
  const[page,setPage]=useState(0);
  const seed=seedForNum(num,poolSize);
  const isToday=num===todayN;

  // build chip list for current page (excluding today=todayN)
  // page 0: todayN-1 down to todayN-PAGE_SIZE
  // page 1: todayN-PAGE_SIZE-1 down to todayN-PAGE_SIZE*2
  // chips in ascending order so oldest is leftmost, newest is rightmost
  // ◀ goes to older page (higher page index), ▶ goes to newer page
  const pageStart=todayN-1-page*PAGE_SIZE;
  const pageEnd=Math.max(1,pageStart-PAGE_SIZE+1);
  const chips=[];
  for(let n=pageEnd;n<=pageStart;n++)chips.push(n); // ascending: 2,3,4... newest rightmost
  const hasOlder=pageStart-PAGE_SIZE>=1; // can go to older page
  const hasNewer=page>0;                 // can go to newer page

  const archiveNav={
    day:num,max:todayN,poolSize,
    prev:()=>setNum(n=>Math.max(1,n-1)),
    next:()=>setNum(n=>Math.min(todayN,n+1))
  };

  const chipBar=(
    <div style={{background:"#1a1a1a",padding:"8px 14px",borderBottom:"1px solid #2a2a2a"}}>
      <div style={{display:"flex",alignItems:"center",gap:"4px"}}>
        {hasOlder&&<button onClick={()=>setPage(p=>p+1)} style={{...T.bk,padding:"4px 7px",fontSize:"10px",flexShrink:0}}>◀</button>}
        <div style={{display:"flex",gap:"5px",overflowX:"auto",flex:1,paddingBottom:"2px"}}
          ref={el=>{if(el)el.scrollLeft=el.scrollWidth;}}>
          {chips.map(n=>(
            <div key={n} onClick={()=>setNum(n)}
              style={{flexShrink:0,background:num===n?"#2a2200":"#222",border:`1.5px solid ${num===n?US.orange:"#333"}`,
                borderRadius:"6px",padding:"4px 8px",cursor:"pointer",textAlign:"center",minWidth:"46px"}}>
              <div style={{fontSize:"10px",fontWeight:"700",color:num===n?US.orange:"#ccc"}}>#{n}</div>
              <div style={{fontSize:"7px",color:num===n?US.orange:"#555",marginTop:"1px"}}>{dayToDate(n,poolSize)}</div>
            </div>
          ))}
        </div>
        {hasNewer&&<button onClick={()=>setPage(p=>Math.max(0,p-1))} style={{...T.bk,padding:"4px 7px",fontSize:"10px",flexShrink:0}}>▶</button>}
      </div>
    </div>
  );

  return children({day:num,seed,isToday,archiveNav,chipBar});
}

// ── CALCIODLE ────────────────────────────────────────────────────────────
const COLS=[{key:"role",label:"Ruolo"},{key:"nation",label:"Naz."},{key:"continent",label:"Cont."},{key:"club",label:"Club"},{key:"age",label:"Età"},{key:"value",label:"Val."}];
const CLR={green:{bg:US.green,tx:"#fff"},yellow:{bg:US.yellow,tx:"#fff"},red:{bg:US.red,tx:"#fff"},empty:{bg:"#fff",tx:"#ccc"},active:{bg:"#fffbea",tx:"#bbb"}};
function eC(k,g,t){if(k==="age"){const d=Math.abs(g-t);return d===0?"green":d<=3?"yellow":"red";}if(k==="value"){const d=Math.abs(g-t);return d===0?"green":d<=15?"yellow":"red";}return g===t?"green":"red";}
function aD(k,g,t){if(k!=="age"&&k!=="value")return null;return g===t?null:g<t?"▲":"▼";}
function cS(c){return{flex:1,minWidth:0,borderRadius:"2px",background:CLR[c]?.bg||"#fff",border:`1.5px solid ${CLR[c]?.bg||"#e8e8e8"}`,color:CLR[c]?.tx||"#ccc",fontSize:"8px",textAlign:"center",padding:"4px 2px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"32px",overflow:"hidden"};}

function CalciodleGame({day,seed,isToday,archiveNav,chipBar,onHome,onArchive}){
  const dailyPool=useMemo(()=>shuffle([...DB],seedRandom(seed)),[seed]);
  const target=useMemo(()=>dailyPool[0],[dailyPool]);
  const label=isToday?"🗓 Giornaliero":"📂 Archivio";
  const savedToday=isToday?loadResult("calciodle"):null;
  const[G,sG]=useState([]);const[inp,sI]=useState("");const[sg,sSg]=useState([]);const[ov,sO]=useState(false);const[won,sW]=useState(false);const[mo,sMo]=useState(false);const[animRows,setAnimRows]=useState(new Set());
  useEffect(()=>{sG([]);sI("");sSg([]);sO(false);sW(false);sMo(false);setAnimRows(new Set());},[seed]);
  function normSearch(s){return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");}
  function onI(v){sI(v);if(v.length<2){sSg([]);return;}const q=normSearch(v);const avail=DB.filter(p=>!G.find(x=>x.name===p.name));const bySurname=avail.filter(p=>normSearch(p.surname).includes(q));const byName=avail.filter(p=>normSearch(p.name).includes(q)&&!bySurname.includes(p));sSg([...bySurname,...byName].slice(0,8));}
  function sub(p){
    if(ov)return;
    const ri=G.length;
    const ng=[...G,p];const w=p.name===target.name,o=ng.length>=6;
    sG(ng);sI("");sSg([]);
    // trigger flip animation for this row
    setTimeout(()=>setAnimRows(s=>new Set([...s,ri])),50);
    if(w){sW(true);sO(true);if(isToday)saveResult("calciodle",{won:true,attempts:ng.length});setTimeout(()=>sMo(true),COLS.length*120+600);}
    else if(o){sO(true);if(isToday)saveResult("calciodle",{won:false,attempts:6});setTimeout(()=>sMo(true),COLS.length*120+600);}
  }
  // Flip cell component
  function FlipCell({value,arrow,color,colIdx,rowIdx}){
    const flipped=animRows.has(rowIdx);
    const delay=colIdx*150;
    const bg=CLR[color]?.bg||"#e0e0e0";
    return(
      <div style={{flex:1,minWidth:0,height:"38px",perspective:"400px"}}>
        <div style={{position:"relative",width:"100%",height:"100%",transformStyle:"preserve-3d",transition:`transform 0.7s ease ${delay}ms`,transform:flipped?"rotateX(180deg)":"rotateX(0deg)"}}>
          {/* front — gray placeholder */}
          <div style={{position:"absolute",inset:0,backfaceVisibility:"hidden",background:"#e8e8e8",borderRadius:"3px",display:"flex",alignItems:"center",justifyContent:"center"}}/>
          {/* back — colored result */}
          <div style={{position:"absolute",inset:0,backfaceVisibility:"hidden",transform:"rotateX(180deg)",background:bg,borderRadius:"3px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
            <span style={{fontWeight:"700",fontSize:"8px",color:"#fff",lineHeight:1.2,textAlign:"center",padding:"0 2px"}}>{value}</span>
            {arrow&&<span style={{fontSize:"7px",color:"rgba(255,255,255,0.85)"}}>{arrow}</span>}
          </div>
        </div>
      </div>
    );
  }
  if(savedToday)return(<div style={T.app}><Hdr title="Calciodle" sub={`🗓 Giornaliero · #${day}`} onHome={onHome}/><DoneScreen gameKey="calciodle" day={day} isToday={isToday} onHome={onHome} onArchive={onArchive}>{(s)=><>
    <div style={{fontSize:"48px",fontWeight:"300",color:US.black,lineHeight:1}}>{s.won?"🎉":"😔"}</div>
    <div style={{fontSize:"14px",fontWeight:"700",color:US.black,margin:"8px 0 2px"}}>{s.won?`Trovato in ${s.attempts}/6`:"Non trovato"}</div>
    <div style={{fontSize:"11px",color:US.muted,marginBottom:"12px"}}>{target.name}</div>
    <ShareButton text={`⚽ Calciodle #${day}\n${s.won?"Trovato in "+s.attempts+"/6":"Non trovato"}\nuniverso-quiz-hmix.vercel.app`}/>
  </>}</DoneScreen></div>);
  return(<div style={T.app}><Hdr title="Calciodle" sub={`${label} · #${day}`} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
    <div style={T.body}>
      {/* INPUT PRIMA — sempre visibile su mobile */}
      {!ov&&<div style={{marginBottom:"14px"}}>
        <span style={T.lb}>Inserisci un giocatore ({G.length}/6)</span>
        <div style={{position:"relative"}}>
          <input style={{...T.ip,width:"100%"}} value={inp} onChange={e=>onI(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&sg.length)sub(sg[0]);}} placeholder="Cerca nome..." autoFocus/>
          {sg.length>0&&<div style={{position:"absolute",top:"100%",left:0,right:0,background:"#fff",border:"1.5px solid #e0e0e0",borderRadius:"2px",zIndex:10,boxShadow:"0 4px 12px rgba(0,0,0,0.1)",marginTop:"2px"}}>
            {sg.map((p,i)=><div key={i} onClick={()=>sub(p)} style={{padding:"7px 11px",cursor:"pointer",fontSize:"12px",borderBottom:"1px solid #f5f5f5",display:"flex",justifyContent:"space-between"}} onMouseEnter={e=>e.currentTarget.style.background="#f8f8f6"} onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
              <span>{p.name}</span><span style={{color:"#bbb",fontSize:"10px"}}>{p.club}</span>
            </div>)}
          </div>}
        </div>
      </div>}
      {ov&&<div style={{marginBottom:"12px",padding:"9px 12px",background:won?US.greenL:US.redL,borderRadius:"6px",textAlign:"center",fontSize:"12px",fontWeight:"700",color:won?US.green:US.red}}>{won?`✓ Trovato in ${G.length}/6`:`✗ Era ${target.name}`}</div>}
      {/* LEGENDA */}
      <div style={{display:"flex",gap:"10px",marginBottom:"10px"}}>{[[US.green,"Esatto"],[US.yellow,"Vicino"],[US.red,"Sbagliato"]].map(([c,l])=><div key={c} style={{display:"flex",alignItems:"center",gap:"3px",fontSize:"9px",color:"#999"}}><div style={{width:"8px",height:"8px",borderRadius:"2px",background:c}}/>{l}</div>)}</div>
      {/* GRIGLIA — header + righe indovinati */}
      <div style={{width:"100%"}}>
        <div style={{display:"flex",gap:"3px",marginBottom:"4px",paddingLeft:"52px"}}>{COLS.map(c=><div key={c.key} style={{flex:1,fontSize:"7px",letterSpacing:"1px",textTransform:"uppercase",color:"#bbb",textAlign:"center"}}>{c.label}</div>)}</div>
        {G.map((g,ri)=>(
          <div key={ri} style={{display:"flex",gap:"3px",alignItems:"center",marginBottom:"3px"}}>
            <div style={{width:"50px",fontSize:"8px",color:"#555",textAlign:"right",paddingRight:"5px",flexShrink:0,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{g.name.split(" ").pop()}</div>
            {COLS.map((c,ci)=>{
              const cl=eC(c.key,g[c.key],target[c.key]);
              const ar=aD(c.key,g[c.key],target[c.key]);
              const val=`${g[c.key]}${c.key==="value"?"M":""}`;
              return<FlipCell key={c.key} value={val} arrow={ar} color={cl} colIdx={ci} rowIdx={ri}/>;
            })}
          </div>
        ))}
      </div>
    </div>
    {mo&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:"16px"}} onClick={()=>sMo(false)}><div style={{background:"#fff",borderRadius:"4px",maxWidth:"280px",width:"100%",overflow:"hidden"}} onClick={e=>e.stopPropagation()}><div style={{background:US.black,color:"#fff",padding:"11px 16px"}}><div style={{fontSize:"8px",color:"#888",marginBottom:"2px"}}>{won?`Trovato in ${G.length}`:"Game Over"}</div><div style={{fontSize:"16px"}}>{won?"Complimenti!":"Era..."}</div></div><div style={{padding:"12px 16px"}}><div style={{border:"1.5px solid #e8e8e8",borderRadius:"2px",padding:"9px",marginBottom:"9px"}}><div style={{fontWeight:"700",marginBottom:"3px"}}>{target.name}</div>{[["Club",target.club],["Nazione",target.nation],["Valore",`€${target.value}M`]].map(([k,v])=><div key={k} style={{fontSize:"11px",color:"#777"}}><strong>{k}:</strong> {v}</div>)}</div><button onClick={()=>sMo(false)} style={{...T.pb,width:"100%"}}>Chiudi</button>
              <ShareButton text={`⚽ Calciodle #${day}\n${won?"Trovato in "+G.length+"/6":"Non trovato"}\n${G.map((_,i)=>won&&i===G.length-1?"🟩":"🟥").join("")}\nuniverso-quiz-hmix.vercel.app`}/>{isToday&&onArchive&&<button onClick={onArchive} style={{...T.sb,width:"100%",marginTop:"6px",color:US.black}}>📂 Vai all'archivio</button>}
              {!isToday&&<button onClick={()=>{sG([]);sI("");sSg([]);sO(false);sW(false);sMo(false);setAnimRows(new Set());}} style={{...T.sb,width:"100%",marginTop:"6px",color:US.black}}>🔀 Rigioca</button>}</div></div></div>}
  </div>);
}
function Calciodle({onHome,isDaily,onArchive}){
  if(isDaily){const d=DB.length,s=todaySeed();return<CalciodleGame day={d} seed={s} isToday archiveNav={null} chipBar={null} onHome={onHome} onArchive={onArchive}/>;}
  return<ArchiveWrapper gameKey="calciodle">{({day,seed,isToday,archiveNav,chipBar})=><CalciodleGame day={day} seed={seed} isToday={isToday} archiveNav={archiveNav} chipBar={chipBar} onHome={onHome} onArchive={onArchive}/>}</ArchiveWrapper>;
}

// ── WORDLE COGNOME ───────────────────────────────────────────────────────
function WordleGame({day,seed,isToday,archiveNav,chipBar,onHome,onArchive}){
  const ROUNDS=5,MAX_ATT=6;
  const pool=useMemo(()=>{const daily=shuffle([...DB],seedRandom(seed));return daily.filter(p=>normStr(p.surname).length>=4&&normStr(p.surname).length<=8).slice(1);},[seed]);
  const player=pool[0];
  const word=normStr(player.surname);
  const label=isToday?"🗓 Giornaliero":"📂 Archivio";
  const savedToday=isToday?loadResult("wordle"):null;
  const[attempts,setAttempts]=useState([]);
  const[current,setCurrent]=useState("");
  const[status,setStatus]=useState("playing"); // playing | won | lost
  useEffect(()=>{setAttempts([]);setCurrent("");setStatus("playing");},[seed]);

  function evalGuess(guess){
    const g=normStr(guess).slice(0,word.length).padEnd(word.length," ");
    return g.split("").map((c,i)=>{
      if(c===word[i])return{c,s:"green"};
      if(word.includes(c))return{c,s:"yellow"};
      return{c,s:"gray"};
    });
  }
  function submit(){
    if(status!=="playing")return;
    const g=normStr(current);
    if(g.length!==word.length)return;
    const ev=evalGuess(g);
    const newAttempts=[...attempts,ev];
    setAttempts(newAttempts);
    setCurrent("");
    if(ev.every(x=>x.s==="green")){setStatus("won");if(isToday)saveResult("wordle",{won:true,attempts:newAttempts.length,word});}
    else if(newAttempts.length>=MAX_ATT){setStatus("lost");if(isToday)saveResult("wordle",{won:false,attempts:MAX_ATT,word});}
  }

  const used={};
  attempts.flat().forEach(({c,s})=>{if(!used[c]||used[c]==="gray"||(used[c]==="yellow"&&s==="green"))used[c]=s;});
  const colBg={green:US.green,yellow:US.yellow,gray:"#9ca3af"};

  const[hint,setHint]=useState(false);
  if(savedToday)return(<div style={T.app}><Hdr title="Wordle Cognome" sub={`🗓 Giornaliero · #${day}`} onHome={onHome}/><DoneScreen gameKey="wordle" day={day} isToday={isToday} onHome={onHome} onArchive={onArchive}>{(s)=><>
    <div style={{fontSize:"48px",fontWeight:"300",color:US.black,lineHeight:1}}>{s.won?"🎉":"😔"}</div>
    <div style={{fontSize:"14px",fontWeight:"700",color:US.black,margin:"8px 0 2px"}}>{s.won?`Trovato in ${s.attempts}/6`:"Non trovato"}</div>
    <div style={{fontSize:"11px",color:US.muted,marginBottom:"12px"}}>{word}</div>
    <ShareButton text={`🔤 Wordle #${day}\n${s.won?"Trovato in "+s.attempts+"/6":"Non trovato"}\n${word}\nuniverso-quiz-hmix.vercel.app`}/>
  </>}</DoneScreen></div>);
  return(<div style={T.app}><Hdr title="Wordle Cognome" sub={`${label} · #${day}`} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
    <div style={{...T.body,maxWidth:"400px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10px"}}>
        <span style={{fontSize:"11px",color:"#aaa"}}>{word.length} lettere</span>
        <button onClick={()=>setHint(h=>!h)} style={{background:"none",border:`1px solid ${hint?US.yellow:"#ddd"}`,borderRadius:"4px",padding:"3px 9px",fontSize:"9px",color:hint?US.yellow:"#aaa",cursor:"pointer",fontFamily:"inherit"}}>💡 {hint?"Nascondi":"Indizio"}</button>
      </div>
      {hint&&<div style={{fontSize:"10px",color:"#777",marginBottom:"10px",padding:"6px 10px",background:"#fffbea",border:"1px solid #fde68a",borderRadius:"4px"}}>{player.nation} · {player.role} · {player.club}</div>}
      {/* Grid */}
      <div style={{display:"flex",flexDirection:"column",gap:"5px",marginBottom:"16px",alignItems:"center"}}>
        {Array.from({length:MAX_ATT}).map((_,ri)=>{
          const att=attempts[ri];
          const isActive=ri===attempts.length&&status==="playing";
          const disp=isActive?normStr(current).padEnd(word.length," ").slice(0,word.length).split(""):Array(word.length).fill(" ");
          return(<div key={ri} style={{display:"flex",gap:"5px"}}>
            {Array.from({length:word.length}).map((_,ci)=>{
              const filled=att?att[ci]:null;
              const bg=filled?(colBg[filled.s]||"#e0e0e0"):isActive&&disp[ci].trim()?"#fff":"#e0e0e0";
              const bd=filled?"transparent":isActive&&disp[ci].trim()?`2px solid ${US.black}`:"2px solid #d0d0d0";
              if(filled){
                return(<div key={ci} className="flip-cell" style={{width:"42px",height:"42px"}}>
                  <div className={`flip-inner flipped`} style={{transitionDelay:`${ci*130}ms`}}>
                    <div className="flip-back" style={{background:colBg[filled.s]||"#e0e0e0",color:"#fff",fontSize:"16px"}}>{filled.c}</div>
                  </div>
                </div>);
              }
              return(<div key={ci} style={{width:"42px",height:"42px",borderRadius:"3px",background:bg,border:bd,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",fontWeight:"700",color:US.black}}>{isActive?disp[ci].trim():""}</div>);
            })}
          </div>);
        })}
      </div>
      {/* Tastiera */}
      {status==="playing"&&<div>
        <input value={current} onChange={e=>{const v=e.target.value.toUpperCase().replace(/[^A-Z]/g,"").slice(0,word.length);setCurrent(v);}} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();submit();}}} placeholder={`${word.length} lettere...`} style={{...T.ip,width:"100%",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"3px",textAlign:"center",fontSize:"16px"}} autoFocus/>
        <button onClick={submit} disabled={normStr(current).length!==word.length} style={{...T.pb,width:"100%",opacity:normStr(current).length===word.length?1:0.4}}>Invio</button>
        {/* Tastiera visiva */}
        <div style={{marginTop:"12px"}}>{[["Q","W","E","R","T","Y","U","I","O","P"],["A","S","D","F","G","H","J","K","L"],["Z","X","C","V","B","N","M"]].map((row,ri)=><div key={ri} style={{display:"flex",justifyContent:"center",gap:"3px",marginBottom:"3px"}}>{row.map(k=>{const st=used[k];return<button key={k} onClick={()=>setCurrent(c=>(c.length<word.length?c+k:c))} style={{background:st?(colBg[st]||"#9ca3af"):"#e0e0e0",color:st?"#fff":"#333",border:"none",borderRadius:"3px",padding:"8px 5px",minWidth:"26px",fontSize:"10px",fontWeight:"600",cursor:"pointer",fontFamily:"inherit"}}>{k}</button>;})} </div>)}</div>
      </div>}
      {(status==="won"||status==="lost")&&<div style={{textAlign:"center",padding:"14px",background:status==="won"?US.greenL:US.redL,borderRadius:"6px",color:status==="won"?US.green:US.red}}>
        <div style={{fontSize:"14px",fontWeight:"700",marginBottom:"4px"}}>{status==="won"?"Corretto!":"Era..."}</div>
        <div style={{fontSize:"18px",fontWeight:"700",letterSpacing:"3px"}}>{word}</div>
        <div style={{fontSize:"11px",marginTop:"2px",color:"#666"}}>{player.name} · {player.club}</div>
        <ShareButton text={`🔤 Wordle #${day} — ${word}\n${attempts.map(a=>a.map(x=>x.s==="green"?"🟩":x.s==="yellow"?"🟨":"⬛").join("")).join("\n")}\nuniverso-quiz-hmix.vercel.app`}/>{isToday&&onArchive&&<button onClick={onArchive} style={{...T.sb,width:"100%",marginTop:"6px",color:US.black}}>📂 Vai all'archivio</button>}
        {!isToday&&<button onClick={()=>{setAttempts([]);setCurrent("");setStatus("playing");}} style={{...T.sb,marginTop:"10px",color:US.black}}>🔀 Rigioca</button>}
      </div>}
    </div>
  </div>);
}
function WordleCognome({onHome,isDaily,onArchive}){
  if(isDaily){const d=DB.length,s=todaySeed();return<WordleGame day={d} seed={s} isToday archiveNav={null} chipBar={null} onHome={onHome} onArchive={onArchive}/>;}
  return<ArchiveWrapper gameKey="wordle">{({day,seed,isToday,archiveNav,chipBar})=><WordleGame day={day} seed={seed} isToday={isToday} archiveNav={archiveNav} chipBar={chipBar} onHome={onHome} onArchive={onArchive}/>}</ArchiveWrapper>;
}

// ── IMPICCATO (senza indizi) ─────────────────────────────────────────────
function HangmanGame({day,seed,isToday,archiveNav,chipBar,onHome,onArchive}){
  const M=7;
  const pool=useMemo(()=>{const daily=shuffle([...DB],seedRandom(seed));return daily.filter(p=>normStr(p.surname).length>=4).slice(2);},[seed]);
  const label=isToday?"🗓 Giornaliero":"📂 Archivio";
  const savedToday=isToday?loadResult("hangman"):null;
  const[gu,sGu]=useState(new Set());const[st,sSt]=useState("p");
  useEffect(()=>{sGu(new Set());sSt("p");},[seed]);
  const pl=pool[0],wd=normStr(pl.surname),wr=[...gu].filter(c=>!wd.includes(c)),wc=wr.length,rv=wd.split("").every(c=>gu.has(c));
  useEffect(()=>{if(rv&&st==="p"){sSt("w");if(isToday)saveResult("hangman",{won:true,word:wd});}else if(wc>=M&&st==="p"){sSt("l");if(isToday)saveResult("hangman",{won:false,word:wd});}},[gu]);
  function g(c){if(st!=="p"||gu.has(c))return;sGu(x=>new Set([...x,c]));} 
  const bodyParts=[<circle key="h" cx="50" cy="19" r="8" stroke="#333" strokeWidth="2.5" fill="none"/>,<line key="b" x1="50" y1="27" x2="50" y2="58" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>,<line key="la" x1="50" y1="37" x2="35" y2="49" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>,<line key="ra" x1="50" y1="37" x2="65" y2="49" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>,<line key="ll" x1="50" y1="58" x2="37" y2="75" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>,<line key="rl" x1="50" y1="58" x2="63" y2="75" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>,<line key="rp" x1="50" y1="6" x2="50" y2="11" stroke="#333" strokeWidth="2.5"/>];

  const[hint,setHint]=useState(false);
  if(savedToday)return(<div style={T.app}><Hdr title="Impiccato" sub={`🗓 Giornaliero · #${day}`} onHome={onHome}/><DoneScreen gameKey="hangman" day={day} isToday={isToday} onHome={onHome} onArchive={onArchive}>{(s)=><>
    <div style={{fontSize:"48px",fontWeight:"300",color:US.black,lineHeight:1}}>{s.won?"🎉":"😔"}</div>
    <div style={{fontSize:"14px",fontWeight:"700",color:US.black,margin:"8px 0 2px"}}>{s.won?"Trovato!":"Non trovato"}</div>
    <div style={{fontSize:"11px",color:US.muted,marginBottom:"12px"}}>{s.word}</div>
    <ShareButton text={`🪢 Impiccato #${day}\n${s.won?"Trovato":"Non trovato"}: ${s.word}\nuniverso-quiz-hmix.vercel.app`}/>
  </>}</DoneScreen></div>);
  return(<div style={T.app}><Hdr title="Impiccato" sub={`${label} · #${day}`} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
    <div style={{...T.body,maxWidth:"400px"}}>
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:"6px"}}>
        <button onClick={()=>setHint(h=>!h)} style={{background:"none",border:`1px solid ${hint?US.yellow:"#ddd"}`,borderRadius:"4px",padding:"3px 9px",fontSize:"9px",color:hint?US.yellow:"#aaa",cursor:"pointer",fontFamily:"inherit"}}>💡 {hint?"Nascondi":"Indizio"}</button>
      </div>
      {hint&&<div style={{fontSize:"10px",color:"#777",marginBottom:"6px",padding:"6px 10px",background:"#fffbea",border:"1px solid #fde68a",borderRadius:"4px"}}>{pl.nation} · {pl.role} · {pl.age} anni</div>}
      <div style={{display:"flex",justifyContent:"center",marginBottom:"8px"}}><svg width="100" height="88" viewBox="0 0 100 88"><line x1="12" y1="84" x2="88" y2="84" stroke="#ddd" strokeWidth="2"/><line x1="24" y1="84" x2="24" y2="6" stroke="#ddd" strokeWidth="2"/><line x1="24" y1="6" x2="50" y2="6" stroke="#ddd" strokeWidth="2"/>{bodyParts.slice(0,wc)}</svg></div>
      <div style={{display:"flex",justifyContent:"center",gap:"4px",marginBottom:"14px",flexWrap:"wrap"}}>{wd.split("").map((c,i)=><div key={i} style={{width:"28px",height:"36px",borderBottom:`2.5px solid ${st==="l"&&!gu.has(c)?US.red:US.black}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"17px",fontWeight:"700",color:st==="l"&&!gu.has(c)?US.red:US.black}}>{gu.has(c)||st==="l"?c:""}</div>)}</div>
      <div style={{textAlign:"center",marginBottom:"10px",fontSize:"10px",color:"#999"}}>Errori: <strong style={{color:wc>=5?US.red:"#333"}}>{wc}/{M}</strong></div>
      {st==="p"&&<div>{[["Q","W","E","R","T","Y","U","I","O","P"],["A","S","D","F","G","H","J","K","L"],["Z","X","C","V","B","N","M"]].map((row,ri)=><div key={ri} style={{display:"flex",justifyContent:"center",gap:"2px",marginBottom:"2px"}}>{row.map(k=>{const u=gu.has(k),cr=wd.includes(k)&&u,wr2=!wd.includes(k)&&u;return<button key={k} onClick={()=>g(k)} disabled={u} style={{background:cr?US.green:wr2?US.red:u?"#ccc":"#e8e8e8",color:u?"#fff":"#333",border:"none",borderRadius:"3px",padding:"7px 4px",minWidth:"24px",fontSize:"10px",fontWeight:"600",cursor:u?"default":"pointer",fontFamily:"inherit",opacity:u?0.7:1}}>{k}</button>;})} </div>)}</div>}
      {(st==="w"||st==="l")&&<div style={{textAlign:"center",marginTop:"10px"}}><div style={{padding:"9px",borderRadius:"2px",background:st==="w"?US.greenL:US.redL,color:st==="w"?US.green:US.red,fontSize:"13px",fontWeight:"700",marginBottom:"8px"}}>{st==="w"?"🎉 Trovato!":"💀 Non trovato — "+wd}</div><ShareButton text={`🪢 Impiccato #${day} — ${st==="w"?"Trovato":"Non trovato"} (${wc}/${M} errori)\\n${wd}\\nuniverso-quiz-hmix.vercel.app`}/>{isToday&&onArchive&&<button onClick={onArchive} style={{...T.sb,width:"100%",marginTop:"6px",color:US.black}}>📂 Vai all'archivio</button>}<button onClick={onHome} style={{...T.pb,marginTop:"8px"}}>Home</button></div>}
    </div>
  </div>);
}
function Hangman({onHome,isDaily,onArchive}){
  if(isDaily){const d=DB.length,s=todaySeed();return<HangmanGame day={d} seed={s} isToday archiveNav={null} chipBar={null} onHome={onHome} onArchive={onArchive}/>;}
  return<ArchiveWrapper gameKey="hangman">{({day,seed,isToday,archiveNav,chipBar})=><HangmanGame day={day} seed={seed} isToday={isToday} archiveNav={archiveNav} chipBar={chipBar} onHome={onHome} onArchive={onArchive}/>}</ArchiveWrapper>;
}

// ── CHI VALE DI PIÙ ──────────────────────────────────────────────────────
function ValoreGame({day,seed,isToday,archiveNav,chipBar,onHome,onArchive}){
  const pairs=useMemo(()=>{const rng=seedRandom(seed+300011);const sh=shuffle(DB,rng),p=[];for(let i=0;i<sh.length-1;i+=2)if(sh[i].value!==sh[i+1].value)p.push([sh[i],sh[i+1]]);return p;},[seed]);
  const label=isToday?"🗓 Giornaliero":"📂 Archivio";
  const savedToday=isToday?loadResult("valore2"):null;
  const RR=Math.min(3,pairs.length);
  const[rn,sRn]=useState(0);const[sc,sSc]=useState(0);const[ch,sCh]=useState(null);const[dn,sDn]=useState(false);const[str,sStr]=useState(0);const[best,sBest]=useState(0);
  useEffect(()=>{sRn(0);sSc(0);sCh(null);sDn(false);sStr(0);sBest(0);},[seed]);
  if(savedToday&&isToday)return(<div style={T.app}><Hdr title="Chi Vale di Più?" sub="🗓 Giornaliero" onHome={onHome}/><DoneScreen gameKey="valore2" day={day} isToday={isToday} onHome={onHome} onArchive={onArchive}>{(s)=><><div style={{fontSize:"48px",fontWeight:"300",color:US.black,lineHeight:1}}>{s.score===s.total?"🏆":s.score>0?"👍":"😔"}</div><div style={{fontSize:"14px",fontWeight:"700",color:US.black,margin:"8px 0 2px"}}>{s.score}/{s.total} corretti</div><ShareButton text={`🆚 Chi Vale di Più? #${day}\n${s.score}/${s.total} corretti\nuniverso-quiz-hmix.vercel.app`}/></>}</DoneScreen></div>);
  if(!pairs.length||dn)return(<div style={T.app}><Hdr title="Chi Vale di Più?" onHome={onHome}/><div style={{...T.body,textAlign:"center",paddingTop:"40px"}}><div style={{fontSize:"48px",fontWeight:"300",color:US.black}}>{sc}<span style={{fontSize:"18px"}}> / {RR}</span></div><div style={{fontSize:"12px",color:"#888",marginBottom:"3px"}}>risposte corrette</div><div style={{fontSize:"11px",color:"#aaa",marginBottom:"18px"}}>Serie migliore: {best}</div><ShareButton text={`🆚 Chi Vale di Più? #${day}\n${sc}/${RR} corretti\nuniverso-quiz-hmix.vercel.app`}/>{isToday&&onArchive&&<button onClick={onArchive} style={{...T.sb,width:"100%",marginTop:"6px",color:US.black}}>📂 Vai all'archivio</button>}<button onClick={onHome} style={T.pb}>Home</button></div></div>);
  const[a,b]=pairs[rn],cor=a.value>b.value?a:b;
  function choose(p){if(ch)return;sCh(p);const ok=p.name===cor.name;if(ok){sSc(x=>x+1);const ns=str+1;sStr(ns);sBest(x=>Math.max(x,ns));}else sStr(0);setTimeout(()=>{sCh(null);const nr=rn+1;if(nr>=RR){if(isToday)saveResult("valore2",{score:sc+(ok?1:0),total:RR});sDn(true);}else sRn(nr);},1500);}
  return(<div style={T.app}><Hdr title="Chi Vale di Più?" sub={`${label} · #${day} · ${rn+1}/${RR}`} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
    <div style={{...T.body,maxWidth:"480px"}}>
      <div style={{height:"3px",background:"#e0e0e0",borderRadius:"2px",marginBottom:"16px",overflow:"hidden"}}><div style={{height:"100%",width:`${(rn/RR*100).toFixed(0)}%`,background:US.green,transition:"width 0.3s"}}/></div>
      <div style={{fontSize:"11px",color:"#aaa",textAlign:"center",marginBottom:"12px"}}>Chi ha il valore di mercato più alto?</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>{[a,b].map(p=>{let brd="1.5px solid #e0e0e0",bg="#fff";if(ch){if(p.name===cor.name){brd="2px solid "+US.green;bg=US.greenL;}else if(p.name===ch.name){brd="2px solid "+US.red;bg=US.redL;}}return(<button key={p.name} onClick={()=>choose(p)} style={{background:bg,border:brd,borderRadius:"6px",padding:"14px 10px",cursor:ch?"default":"pointer",textAlign:"center",transition:"all 0.2s",fontFamily:"inherit"}} onMouseEnter={e=>{if(!ch){e.currentTarget.style.borderColor=US.orange;e.currentTarget.style.background="#fffbea";}}} onMouseLeave={e=>{if(!ch){e.currentTarget.style.borderColor="#e0e0e0";e.currentTarget.style.background=bg;}}}><div style={{fontSize:"14px",fontWeight:"700",marginBottom:"3px"}}>{p.name}</div><div style={{fontSize:"10px",color:"#888",marginBottom:"1px"}}>{p.club}</div><div style={{fontSize:"10px",color:"#aaa",marginBottom:"7px"}}>{p.role}</div>{ch?<div style={{fontSize:"17px",fontWeight:"700",color:p.name===cor.name?US.green:US.red}}>€{p.value}M</div>:<div style={{fontSize:"20px",color:"#ddd"}}>?</div>}</button>);})}</div>
      {ch&&<div style={{textAlign:"center",marginTop:"10px",fontSize:"11px",color:ch.name===cor.name?US.green:US.red,fontStyle:"italic"}}>{ch.name===cor.name?"Corretto!":"Sbagliato"} — {cor.name} vale €{cor.value}M</div>}
    </div>
  </div>);
}
function ChiValeDiPiu({onHome,isDaily,onArchive}){
  if(isDaily){const d=DB.length,s=todaySeed();return<ValoreGame day={d} seed={s} isToday archiveNav={null} chipBar={null} onHome={onHome} onArchive={onArchive}/>;}
  return<ArchiveWrapper gameKey="valore2">{({day,seed,isToday,archiveNav,chipBar})=><ValoreGame day={day} seed={seed} isToday={isToday} archiveNav={archiveNav} chipBar={chipBar} onHome={onHome} onArchive={onArchive}/>}</ArchiveWrapper>;
}

// ── CARRIERA ─────────────────────────────────────────────────────────────
function CarreiraGame({day,seed,isToday,archiveNav,chipBar,onHome,onArchive}){
  const player=CAREERS[seed%CAREERS.length];
  const label=isToday?"🗓 Giornaliero":"📂 Archivio";
  const savedToday=isToday?loadResult("carriera"):null;
  const maxC=player.clues.length;
  const[rev,sRev]=useState(1);const[gu,sGu]=useState("");const[st,sSt]=useState("p");const[sc,sSc]=useState(0);const[fin,sFin]=useState(false);const[shownNotes,sShownNotes]=useState(new Set());
  useEffect(()=>{sRev(1);sGu("");sSt("p");sSc(0);sFin(false);sShownNotes(new Set());},[seed]);
  const pts=Math.max(1,maxC+1-rev);
  function sub(){
    const g=gu.trim().toLowerCase(),a=player.answer.toLowerCase();
    const ok=g===a||a.split(" ").some(p=>p.length>3&&g===p)||(g.length>4&&a.includes(g));
    if(ok){sSc(x=>x+pts);sSt("c");}
    else{if(rev<maxC){sRev(x=>x+1);sSt("w");setTimeout(()=>sSt("p"),900);}else sSt("r");}
    sGu("");
  }
  if(savedToday&&isToday)return(<div style={T.app}><Hdr title="Indovina dalla Carriera" sub="🗓 Giornaliero" onHome={onHome}/><DoneScreen gameKey="carriera" day={day} isToday={isToday} onHome={onHome} onArchive={onArchive}>{(s)=><><div style={{fontSize:"48px",fontWeight:"300",color:US.black,lineHeight:1}}>🏆</div><div style={{fontSize:"14px",fontWeight:"700",color:US.black,margin:"8px 0 2px"}}>{s.score} punti</div><ShareButton text={`🏆 Indovina la Carriera #${day}\n${s.score} punti\nuniverso-quiz-hmix.vercel.app`}/></>}</DoneScreen></div>);
  if(fin)return(<div style={T.app}><Hdr title="Indovina dalla Carriera" onHome={onHome}/><div style={{...T.body,textAlign:"center",paddingTop:"40px"}}><div style={{fontSize:"48px",fontWeight:"300",color:US.black}}>{sc}</div><div style={{fontSize:"12px",color:"#888",marginBottom:"18px"}}>punti totali</div><ShareButton text={`🏆 Indovina la Carriera #${day}\n${sc} punti\nuniverso-quiz-hmix.vercel.app`}/>{isToday&&onArchive&&<button onClick={onArchive} style={{...T.sb,width:"100%",marginTop:"6px",color:US.black}}>📂 Vai all'archivio</button>}<button onClick={onHome} style={{...T.pb,marginTop:"8px"}}>Home</button></div></div>);
  return(<div style={T.app}><Hdr title="Indovina dalla Carriera" sub={`${label} · #${day}`} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
    <div style={{...T.body,maxWidth:"520px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10px"}}>
        <div style={{fontSize:"11px",color:"#888"}}>{st==="p"&&<>Vale <strong style={{color:US.black}}>{pts} punt{pts===1?"o":"i"}</strong></>}</div>
        <button onClick={()=>sRev(r=>Math.min(r+1,maxC))} disabled={rev>=maxC||st!=="p"} style={{background:"none",border:`1px solid ${rev<maxC&&st==="p"?US.yellow:"#ddd"}`,borderRadius:"4px",padding:"3px 9px",fontSize:"9px",color:rev<maxC&&st==="p"?US.yellow:"#bbb",cursor:rev<maxC&&st==="p"?"pointer":"default",fontFamily:"inherit"}}>💡 {rev}/{maxC} {rev<maxC&&st==="p"?"→ Prossimo indizio":"indizi"}</button>
      </div>
      {player.clues.slice(0,rev).map((c,i)=>{
        const noteVisible=shownNotes.has(i);
        return(<div key={i} style={{border:"1.5px solid #e0e0e0",borderLeftWidth:i===rev-1?"3px":"1.5px",borderLeftColor:i===rev-1?US.black:"#e0e0e0",borderRadius:"2px",padding:"9px 11px",marginBottom:"5px",background:i===rev-1?"#fafaf8":"#fff"}}>
          {i===rev-1&&rev>1&&<div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.red,marginBottom:"2px",fontWeight:"700"}}>Nuovo indizio</div>}
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:"2px"}}><span style={{fontWeight:"700",fontSize:"13px"}}>{c.club}</span><span style={{fontSize:"10px",color:"#aaa"}}>{c.period}</span></div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1px"}}>
            <div style={{display:"flex",gap:"10px"}}><span style={{fontSize:"10px",color:"#555"}}><strong>{c.apps}</strong> presenze</span><span style={{fontSize:"10px",color:"#555"}}><strong>{c.goals}</strong> gol</span></div>
            {!noteVisible&&<button onClick={()=>sShownNotes(s=>new Set([...s,i]))} style={{background:"none",border:"none",color:"#bbb",fontSize:"8px",cursor:"pointer",fontFamily:"inherit",padding:"0",textDecoration:"underline"}}>💡 nota</button>}
          </div>
          {noteVisible&&<div style={{fontSize:"9px",color:"#888",fontStyle:"italic",marginTop:"2px"}}>{c.note}</div>}
        </div>);
      })}
      <div style={{height:"1px",background:"#e8e8e8",margin:"10px 0"}}/>
      {st!=="c"&&st!=="r"&&<><span style={T.lb}>Chi è questo giocatore?</span><div style={{display:"flex",gap:"7px"}}><input style={{...T.ip,flex:1,border:`1.5px solid ${st==="w"?US.red:"#ddd"}`}} value={gu} onChange={e=>sGu(e.target.value)} onKeyDown={e=>e.key==="Enter"&&gu.trim()&&sub()} placeholder="Scrivi il nome..." autoFocus/><button onClick={sub} disabled={!gu.trim()} style={{...T.pb,opacity:gu.trim()?1:0.4}}>Indovina</button></div>{st==="w"&&<div style={{fontSize:"10px",color:US.red,marginTop:"4px"}}>✗ Errato — {rev<maxC?"nuovo indizio!":"nessun indizio rimasto"}</div>}<div style={{textAlign:"right",marginTop:"5px"}}><button onClick={()=>sSt("r")} style={{background:"none",border:"none",color:"#bbb",fontSize:"9px",cursor:"pointer",fontFamily:"inherit",textDecoration:"underline"}}>Non lo so</button></div></>}
      {st==="c"&&<><div style={{padding:"8px",background:US.greenL,border:"1px solid #bbf7d0",borderRadius:"2px",color:US.green,fontSize:"12px",marginBottom:"9px"}}>✓ Corretto! Era <strong>{player.answer}</strong> — <strong>+{pts} punti</strong></div><div style={{textAlign:"right"}}><button onClick={()=>{if(isToday)saveResult("carriera",{score:sc,done:true});sFin(true);}} style={T.pb}>Risultato →</button></div></>}
      {st==="r"&&<><div style={{padding:"8px",background:"#f8f7f4",border:"1px solid #e0e0e0",borderRadius:"2px",color:"#555",fontSize:"12px",marginBottom:"9px"}}>Era <strong>{player.answer}</strong></div><div style={{textAlign:"right"}}><button onClick={()=>{if(isToday)saveResult("carriera",{score:sc,done:true});sFin(true);}} style={T.pb}>Risultato →</button></div></>}
    </div>
  </div>);
}
function Carriera({onHome,isDaily,onArchive}){
  if(isDaily){const d=CAREERS.length,s=todaySeed();return<CarreiraGame day={d} seed={s} isToday archiveNav={null} chipBar={null} onHome={onHome} onArchive={onArchive}/>;}
  return<ArchiveWrapper gameKey="carriera">{({day,seed,isToday,archiveNav,chipBar})=><CarreiraGame day={day} seed={seed} isToday={isToday} archiveNav={archiveNav} chipBar={chipBar} onHome={onHome} onArchive={onArchive}/>}</ArchiveWrapper>;
}

// ── ROSA QUIZ ─────────────────────────────────────────────────────────────
function TimerRing({seconds,total}){
  const r=32,circ=2*Math.PI*r;
  const color=seconds<=10?US.red:seconds<=20?US.yellow:US.green;
  const frac=Math.min(1,seconds/total);
  return(<svg width="76" height="76" viewBox="0 0 76 76"><circle cx="38" cy="38" r={r} fill="none" stroke="#e0e0e0" strokeWidth="5"/><circle cx="38" cy="38" r={r} fill="none" stroke={color} strokeWidth="5" strokeDasharray={circ} strokeDashoffset={circ*(1-frac)} strokeLinecap="round" transform="rotate(-90 38 38)" style={{transition:"stroke-dashoffset 1s linear,stroke 0.3s"}}/><text x="38" y="43" textAnchor="middle" fontSize="17" fontWeight="700" fill={color} fontFamily="'Helvetica Neue',Arial,sans-serif">{seconds}</text></svg>);
}

function RosaQuizGame({day,seed,isToday,archiveNav,chipBar,onHome,onArchive}){
  const TOTAL=60;
  const squadra=ROSE_LIST[seed%ROSE_LIST.length];
  const label=isToday?"🗓 Giornaliero":"📂 Archivio";
  const savedToday=isToday?loadResult("rosa"):null;
  const BONUS=5;
  const[input,setInput]=useState("");const[found,setFound]=useState([]);const[wrong,setWrong]=useState(null);const[seconds,setSeconds]=useState(TOTAL);const[lastFound,setLastFound]=useState(null);const[done,setDone]=useState(false);const[bonusFlash,setBonusFlash]=useState(false);
  const inputRef=useRef(null);const timerRef=useRef(null);
  useEffect(()=>{setInput("");setFound([]);setWrong(null);setSeconds(TOTAL);setLastFound(null);setDone(false);},[seed]);
  useEffect(()=>{
    if(done)return;
    clearInterval(timerRef.current);
    timerRef.current=setInterval(()=>setSeconds(s=>{if(s<=1){clearInterval(timerRef.current);setDone(true);return 0;}return s-1;}),1000);
    setTimeout(()=>inputRef.current?.focus(),100);
    return()=>clearInterval(timerRef.current);
  },[seed,done]);
  useEffect(()=>{if(done&&isToday)saveResult("rosa",{found:found.length,total:squadra.giocatori.length,nome:squadra.nome,foundNames:found,allNames:squadra.giocatori});},[done]);
  function submit(){
    const v=normLow(input);if(!v)return;
    const match=squadra.giocatori.find(p=>fuzzyMatch(input,p)&&!found.includes(p));
    if(match){setFound(f=>[...f,match]);setLastFound(match);setWrong(null);setInput("");setSeconds(s=>s+BONUS);setBonusFlash(true);setTimeout(()=>{setLastFound(null);setBonusFlash(false);},1200);}
    else{setWrong(input);setInput("");setTimeout(()=>setWrong(null),800);}
    inputRef.current?.focus();
  }
  if(savedToday&&isToday)return(<div style={T.app}><Hdr title="Rosa Quiz" sub="🗓 Giornaliero" onHome={onHome}/><DoneScreen gameKey="rosa" day={day} isToday={isToday} onHome={onHome} onArchive={onArchive}>{(s)=>{
    const fn=s.foundNames||[];const all=s.allNames||[];const ms=all.filter(p=>!fn.includes(p));
    return (<><div style={{fontSize:"48px",fontWeight:"300",color:US.black,lineHeight:1}}>👕</div><div style={{fontSize:"14px",fontWeight:"700",color:US.black,margin:"8px 0 2px"}}>{s.nome}</div><div style={{fontSize:"12px",color:US.muted,marginBottom:"10px"}}>{s.found}/{s.total} trovati ({Math.round(s.found/s.total*100)}%)</div>{fn.length>0&&(<div style={{marginBottom:"10px"}}><div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.green,marginBottom:"5px",fontWeight:"700"}}>✓ Trovati</div><div style={{display:"flex",flexWrap:"wrap",gap:"4px"}}>{fn.map(p=>(<div key={p} style={{background:US.greenL,color:US.green,border:"1px solid #bbf7d0",borderRadius:"4px",padding:"2px 7px",fontSize:"11px",fontWeight:"600"}}>{p}</div>))}</div></div>)}{ms.length>0&&(<div style={{marginBottom:"10px"}}><div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.red,marginBottom:"5px",fontWeight:"700"}}>✗ Mancati</div><div style={{display:"flex",flexWrap:"wrap",gap:"4px"}}>{ms.map(p=>(<div key={p} style={{background:US.redL,color:US.red,border:"1px solid #fecaca",borderRadius:"4px",padding:"2px 7px",fontSize:"11px",fontWeight:"600"}}>{p}</div>))}</div></div>)}<ShareButton text={`👕 Rosa Quiz #${day} — ${s.nome}\\n${s.found}/${s.total} trovati\\nuniverso-quiz-hmix.vercel.app`}/></>);
  }}</DoneScreen></div>);
  if(done){
    const missed=squadra.giocatori.filter(p=>!found.includes(p));
    const pct=Math.round(found.length/squadra.giocatori.length*100);
    const emoji=pct===100?"🏆":pct>=70?"🥇":pct>=40?"👍":"📚";
    return(<div style={T.app}><Hdr title={`Rosa Quiz · ${squadra.nome}`} sub={`${label} · #${day}`} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
      <div style={T.body}>
        <div style={{textAlign:"center",marginBottom:"20px"}}><div style={{fontSize:"36px"}}>{emoji}</div><div style={{fontSize:"50px",fontWeight:"300",color:US.black,lineHeight:1}}>{found.length}<span style={{fontSize:"18px",color:US.muted}}>/{squadra.giocatori.length}</span></div><div style={{fontSize:"11px",color:US.muted,marginTop:"3px"}}>trovati ({pct}%)</div></div>
        {found.length>0&&<div style={{marginBottom:"14px"}}><div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.green,marginBottom:"6px",fontWeight:"700"}}>✓ Trovati</div><div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>{found.map(p=><div key={p} style={{background:US.greenL,color:US.green,border:"1px solid #bbf7d0",borderRadius:"4px",padding:"3px 8px",fontSize:"11px",fontWeight:"600"}}>{p}</div>)}</div></div>}
        {missed.length>0&&<div style={{marginBottom:"18px"}}><div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.red,marginBottom:"6px",fontWeight:"700"}}>✗ Mancati</div><div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>{missed.map(p=><div key={p} style={{background:US.redL,color:US.red,border:"1px solid #fecaca",borderRadius:"4px",padding:"3px 8px",fontSize:"11px",fontWeight:"600"}}>{p}</div>)}</div></div>}
        <div style={{textAlign:"center"}}>
          <ShareButton text={`👕 Rosa Quiz #${day} — ${squadra.nome}\n${found.length}/${squadra.giocatori.length} trovati (${pct}%)\nuniverso-quiz-hmix.vercel.app`}/>
          {isToday&&onArchive&&<button onClick={onArchive} style={{...T.sb,width:"100%",marginTop:"6px",color:US.black}}>📂 Vai all'archivio</button>}
          <button onClick={onHome} style={{...T.pb,marginTop:"8px"}}>Home</button>
        </div>
      </div>
    </div>);
  }
  return(<div style={T.app}><Hdr title={`Rosa Quiz · ${squadra.emoji} ${squadra.nome}`} sub={`${label} · #${day}`} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
    <div style={T.body}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"14px"}}>
        <TimerRing seconds={seconds} total={TOTAL}/>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:"36px",fontWeight:"300",color:US.black,lineHeight:1}}>{found.length}</div>
          <div style={{fontSize:"10px",color:US.muted}}>su {squadra.giocatori.length}</div>
          <button onClick={()=>setDone(true)} style={{marginTop:"6px",background:"none",border:`1px solid ${US.border}`,borderRadius:"4px",padding:"3px 10px",fontSize:"9px",color:US.muted,cursor:"pointer",fontFamily:"inherit"}}>⏹ Termina</button>
        </div>
      </div>
      <div style={{marginBottom:"12px"}}>
        <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} onFocus={e=>setTimeout(()=>e.target.scrollIntoView({behavior:"smooth",block:"center"}),300)} placeholder="Scrivi un cognome..." style={{width:"100%",boxSizing:"border-box",border:`2px solid ${wrong?US.red:lastFound?US.green:US.border}`,borderRadius:"6px",padding:"11px 13px",fontSize:"14px",fontFamily:"inherit",outline:"none",color:US.black,background:wrong?US.redL:lastFound?US.greenL:"#fff",transition:"all 0.2s"}}/>
        {lastFound&&<div style={{fontSize:"11px",color:US.green,marginTop:"4px",fontWeight:"600",display:"flex",alignItems:"center",gap:"8px"}}>✓ {lastFound}<span style={{background:US.green,color:"#fff",borderRadius:"4px",padding:"1px 6px",fontSize:"10px"}}>+{BONUS}s ⏱</span></div>}
        {wrong&&<div style={{fontSize:"11px",color:US.red,marginTop:"4px"}}>✗ "{wrong}" — non trovato</div>}
      </div>
      {found.length>0&&<div><div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.muted,marginBottom:"6px"}}>Trovati</div><div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>{found.map(p=><div key={p} style={{background:US.greenL,color:US.green,border:"1px solid #bbf7d0",borderRadius:"4px",padding:"3px 8px",fontSize:"11px",fontWeight:"600"}}>{p}</div>)}</div></div>}
    </div>
  </div>);
}
function RosaQuiz({onHome,isDaily,onArchive}){
  if(isDaily){const d=ROSE_LIST.length,s=todaySeed();return<RosaQuizGame day={d} seed={s} isToday archiveNav={null} chipBar={null} onHome={onHome} onArchive={onArchive}/>;}
  return<ArchiveWrapper gameKey="rosa">{({day,seed,isToday,archiveNav,chipBar})=><RosaQuizGame day={day} seed={seed} isToday={isToday} archiveNav={archiveNav} chipBar={chipBar} onHome={onHome} onArchive={onArchive}/>}</ArchiveWrapper>;
}


// ── LISTA QUIZ ────────────────────────────────────────────────────────────
const LISTA_CATEGORIES = [
  { id:1, title:"Convocati Italia Mondiale 2006", desc:"Chi erano i 23 di Lippi?",
    answers:["Buffon","Peruzzi","Amelia","Cannavaro","Nesta","Materazzi","Barzagli","Zaccardo","Oddo","Zambrotta","Grosso","De Rossi","Pirlo","Gattuso","Perrotta","Camoranesi","Barone","Totti","Del Piero","Gilardino","Iaquinta","Inzaghi","Toni"] },
  { id:2, title:"Convocati Italia Euro 2020", desc:"Chi erano i 26 di Mancini?",
    answers:["Donnarumma","Meret","Sirigu","Acerbi","Bastoni","Bonucci","Chiellini","Di Lorenzo","Emerson","Florenzi","Spinazzola","Toloi","Barella","Cristante","Jorginho","Locatelli","Pellegrini","Sensi","Verratti","Belotti","Berardi","Bernardeschi","Chiesa","Immobile","Insigne","Raspadori"] },
  { id:3, title:"Capocannonieri Mondiali dal 1990", desc:"Un nome per ogni edizione",
    answers:["Schillaci","Stoichkov","Salenko","Ronaldo","Klose","Morientes","Miroslaw","Klose","Villa","Forlan","Sneijder","Mueller","Mueller","Kane","Mbappe"],
    unique:["Schillaci","Stoichkov","Salenko","Ronaldo","Klose","Morientes","Miroslaw","Villa","Forlan","Sneijder","Mueller","Kane","Mbappe"] },
  { id:4, title:"Capocannonieri Serie A dal 2010/11", desc:"15 stagioni, 15 bomber",
    answers:["Di Natale","Ibrahimovic","Cavani","Immobile","Icardi","Toni","Higuain","Dzeko","Icardi","Immobile","Quagliarella","Immobile","Ronaldo","Immobile","Osimhen","Lautaro","Retegui"],
    unique:["Di Natale","Ibrahimovic","Cavani","Immobile","Icardi","Toni","Higuain","Dzeko","Quagliarella","Ronaldo","Osimhen","Lautaro","Retegui"] },
  { id:5, title:"Vincitori Pallone d'Oro dal 2000", desc:"Solo cognomi, un nome per ogni anno",
    answers:["Figo","Owen","Ronaldo","Nedved","Shevchenko","Ronaldinho","Cannavaro","Kaka","Messi","Messi","Messi","Messi","Ronaldo","Ronaldo","Ronaldo","Ronaldo","Modric","Messi","Messi","Lewandowski","Messi","Benzema","Messi","Messi","Bellingham","Rodri"],
    unique:["Figo","Owen","Ronaldo","Nedved","Shevchenko","Ronaldinho","Cannavaro","Kaka","Messi","Modric","Benzema","Bellingham","Rodri","Lewandowski"] },
  { id:6, title:"Allenatori Scudetto dal 2000", desc:"Chi ha vinto il titolo in panchina?",
    answers:["Eriksson","Lippi","Capello","Ancelotti","Capello","Mancini","Mancini","Mancini","Mourinho","Allegri","Allegri","Allegri","Allegri","Allegri","Sarri","Conte","Pioli","Allegri","Inzaghi","Spalletti","Conte"],
    unique:["Eriksson","Lippi","Capello","Ancelotti","Mancini","Mourinho","Allegri","Sarri","Conte","Pioli","Inzaghi","Spalletti"] },
  { id:7, title:"Top 20 italiani più preziosi", desc:"Fonte: Transfermarkt 2025",
    answers:["Tonali","Bastoni","Barella","Calafiori","Dimarco","Buongiorno","Donnarumma","Kean","Retegui","Esposito","Udogie","Kayode","Cambiaso","Rovella","Frattesi","Palestra","Lucca","Ricci","Scalvini","Scamacca"] },
  { id:8, title:"Top 10 italiani gol in Champions League", desc:"All-time, qualificazioni incluse (Transfermarkt)",
    answers:["Inzaghi","Del Piero","Simone","Altafini","Mazzola","Totti","Inzaghi S","Immobile","Gilardino","Insigne"],
    unique:["Inzaghi","Del Piero","Simone","Altafini","Mazzola","Totti","Immobile","Gilardino","Insigne"] },
  { id:9, title:"Top 20 acquisti più cari della Serie A", desc:"Fonte: Transfermarkt",
    answers:["Ronaldo","Higuain","De Ligt","Vlahovic","Arthur","Osimhen","Lukaku","Koopmeiners","Crespo","Buffon","Douglas Luiz","Bremer","Lozano","Leao","Mendieta","Vieri","Nedved","Joao Mario","Chiesa","Hakimi"] },
  { id:10, title:"Top 20 cessioni più costose della Serie A", desc:"Fonte: Transfermarkt",
    answers:["Lukaku","Pogba","Higuain","Vlahovic","Kvaratskhelia","Hojlund","Zidane","Osimhen","Alisson","Ibrahimovic","Retegui","Hakimi","De Ligt","Kaka","Cancelo","Cavani","Tonali","Pjanic","Koopmeiners","Jorginho"] },
  { id:11, title:"Top 15 italiani gol in Champions League", desc:"I marcatori italiani all-time in UCL",
    answers:["Maldini","Del Piero","Inzaghi","Totti","Vieri","Baggio","Nesta","Gattuso","Cannavaro","Pirlo","Shevchenko","Zola","Buffon","De Rossi","Gilardino"] },
  { id:12, title:"Italiani con triplette nelle top 20 leghe estere (XXI secolo)", desc:"Fonte: Transfermarkt",
    answers:["Toni","Pelle","Balotelli","Napoleoni","Rigano","Zaza","Said","Battocchio","Okaka","Rossi","Grifo"] },
  { id:13, title:"Allenatori della Roma dal 2005", desc:"Tutti i tecnici giallorossi nell'era moderna",
    answers:["Delneri","Conti","Spalletti","Ranieri","Montella","Luis Enrique","Zeman","Andreazzoli","Garcia","Di Francesco","Fonseca","Mourinho","De Rossi","Juric","Gasperini"] },
  { id:14, title:"Allenatori della Juventus dal 2006", desc:"Tutti i tecnici bianconeri dal ritorno in A",
    answers:["Deschamps","Corradini","Ranieri","Ferrara","Zaccheroni","Delneri","Conte","Allegri","Sarri","Pirlo","Montero","Thiago Motta","Tudor","Brambilla","Spalletti"] },
  { id:15, title:"Allenatori del Milan dal 2002", desc:"Tutti i tecnici rossoneri nell'era moderna",
    answers:["Ancelotti","Leonardo","Allegri","Seedorf","Inzaghi F","Mihajlovic","Brocchi","Montella","Gattuso","Giampaolo","Pioli","Fonseca","Conceicao"] },
  { id:16, title:"Allenatori dell'Inter dal 2008", desc:"Tutti i tecnici nerazzurri dell'era moderna",
    answers:["Mourinho","Benitez","Leonardo","Gasperini","Ranieri","Stramaccioni","Mazzarri","Mancini","De Boer","Pioli","Spalletti","Conte","Inzaghi S","Chivu"] },
  { id:17, title:"Allenatori della Lazio dal 2002", desc:"Tutti i tecnici biancocelesti nell'era moderna",
    answers:["Zaccheroni","Mancini","Caso","Papadopulo","Rossi","Ballardini","Reja","Petkovic","Pioli","Inzaghi S","Bielsa","Sarri","Martusciello","Tudor","Baroni"] },
  { id:18, title:"Allenatori del Napoli dal 2003", desc:"Tutti i tecnici azzurri nell'era moderna",
    answers:["Agostinelli","Simoni","Ventura","Reja","Donadoni","Mazzarri","Benitez","Sarri","Ancelotti","Gattuso","Spalletti","Garcia","Calzona","Conte"] },
  { id:19, title:"Allenatori del Bologna dal 2009", desc:"Tutti i tecnici rossoblù nell'era moderna",
    answers:["Papadopulo","Colomba","Malesani","Bisoli","Pioli","Ballardini","Lopez","Rossi","Donadoni","Inzaghi F","Mihajlovic","Vigiani","Thiago Motta","Italiano"] },
  { id:20, title:"Allenatori dell'Atalanta dal 2005", desc:"Tutti i tecnici nerazzurri dell'era moderna",
    answers:["Colantuono","Delneri","Gregucci","Conte","Mutti","Reja","Gasperini","Juric","Palladino"] },
  { id:21, title:"Capocannonieri Serie A dal 2012/13", desc:"15 stagioni, chi ha segnato di più?",
    answers:["Cavani","Immobile","Icardi","Toni","Higuain","Dzeko","Quagliarella","Ronaldo","Osimhen","Lautaro","Retegui"] },
  { id:22, title:"Top 10 presenze con la Nazionale italiana", desc:"I più caps Azzurri di sempre",
    answers:["Buffon","Cannavaro","Maldini","Bonucci","De Rossi","Chiellini","Pirlo","Zoff","Zambrotta","Facchetti"] },
  { id:23, title:"Top 10 capitani con più presenze in Nazionale", desc:"Chi ha indossato più volte la fascia Azzurra?",
    answers:["Buffon","Cannavaro","Maldini","Facchetti","Zoff","Bergomi","Baresi","Donnarumma","Baloncieri","Bonucci","De Vecchi"] },
  { id:24, title:"Top 10 marcatori della Nazionale italiana", desc:"I bomber Azzurri di sempre",
    answers:["Riva","Meazza","Piola","Baggio","Del Piero","Altobelli","Baloncieri","Inzaghi F","Graziani","Vieri"] },
];

// Pool size per lista
const LISTA_POOL = LISTA_CATEGORIES.length;

function ListaQuizGame({day,seed,isToday,archiveNav,chipBar,onHome,onArchive}){
  const TOTAL=90,BONUS=5;
  const cat=LISTA_CATEGORIES[(seed%LISTA_POOL)];
  // use unique answers if defined (for categories with repeated winners)
  const validAnswers=cat.unique||cat.answers;
  const label=isToday?"🗓 Giornaliero":"📂 Archivio";
  const savedToday=isToday?loadResult("lista"):null;
  const[input,setInput]=useState("");
  const[found,setFound]=useState([]);
  const[wrong,setWrong]=useState(null);
  const[seconds,setSeconds]=useState(TOTAL);
  const[lastFound,setLastFound]=useState(null);
  const[done,setDone]=useState(false);
  const inputRef=useRef(null);
  const timerRef=useRef(null);
  useEffect(()=>{setInput("");setFound([]);setWrong(null);setSeconds(TOTAL);setLastFound(null);setDone(false);},[seed]);
  useEffect(()=>{
    if(done)return;
    clearInterval(timerRef.current);
    timerRef.current=setInterval(()=>setSeconds(s=>{if(s<=1){clearInterval(timerRef.current);setDone(true);return 0;}return s-1;}),1000);
    setTimeout(()=>inputRef.current?.focus(),100);
    return()=>clearInterval(timerRef.current);
  },[seed,done]);
  useEffect(()=>{if(done&&isToday)saveResult("lista",{found:found.length,total:validAnswers.length,title:cat.title,foundNames:found,allNames:validAnswers});},[done]);
  function submit(){
    const v=normLow(input);if(!v)return;
    const match=validAnswers.find(p=>fuzzyMatch(input,p)&&!found.includes(p));
    if(match){
      setFound(f=>[...f,match]);setLastFound(match);setWrong(null);setInput("");
      setSeconds(s=>s+BONUS);
      setTimeout(()=>setLastFound(null),1200);
    } else {
      setWrong(input);setInput("");setTimeout(()=>setWrong(null),800);
    }
    inputRef.current?.focus();
  }
  const total=validAnswers.length;
  const pct=Math.round(found.length/total*100);
  if(savedToday&&isToday)return(<div style={T.app}><Hdr title="Lista Quiz" sub="🗓 Giornaliero" onHome={onHome}/><DoneScreen gameKey="lista" day={day} isToday={isToday} onHome={onHome} onArchive={onArchive}>{(s)=>{
    const fn=s.foundNames||[];const all=s.allNames||[];const ms=all.filter(p=>!fn.includes(p));
    return (<><div style={{fontSize:"48px",fontWeight:"300",color:US.black,lineHeight:1}}>📋</div><div style={{fontSize:"13px",fontWeight:"700",color:US.black,margin:"8px 0 2px"}}>{s.title}</div><div style={{fontSize:"12px",color:US.muted,marginBottom:"10px"}}>{s.found}/{s.total} trovati ({Math.round(s.found/s.total*100)}%)</div>{fn.length>0&&(<div style={{marginBottom:"10px"}}><div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.green,marginBottom:"5px",fontWeight:"700"}}>✓ Trovati</div><div style={{display:"flex",flexWrap:"wrap",gap:"4px"}}>{fn.map(p=>(<div key={p} style={{background:US.greenL,color:US.green,border:"1px solid #bbf7d0",borderRadius:"4px",padding:"2px 7px",fontSize:"11px",fontWeight:"600"}}>{p}</div>))}</div></div>)}{ms.length>0&&(<div style={{marginBottom:"10px"}}><div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.red,marginBottom:"5px",fontWeight:"700"}}>✗ Mancati</div><div style={{display:"flex",flexWrap:"wrap",gap:"4px"}}>{ms.map(p=>(<div key={p} style={{background:US.redL,color:US.red,border:"1px solid #fecaca",borderRadius:"4px",padding:"2px 7px",fontSize:"11px",fontWeight:"600"}}>{p}</div>))}</div></div>)}<ShareButton text={`📋 Lista Quiz #${day}\\n${s.title}\\n${s.found}/${s.total} trovati\\nuniverso-quiz-hmix.vercel.app`}/></>);
  }}</DoneScreen></div>);
  if(done){
    const missed=validAnswers.filter(p=>!found.includes(p));
    const emoji=pct===100?"🏆":pct>=70?"🥇":pct>=40?"👍":"📚";
    return(<div style={T.app}><Hdr title="Lista Quiz" sub={`${label} · #${day}`} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
      <div style={T.body}>
        <div style={{marginBottom:"14px",padding:"10px 13px",background:US.black,borderRadius:"6px"}}>
          <div style={{fontSize:"8px",color:US.orange,letterSpacing:"2px",textTransform:"uppercase",marginBottom:"2px"}}>Categoria</div>
          <div style={{fontSize:"13px",fontWeight:"700",color:"#fff"}}>{cat.title}</div>
        </div>
        <div style={{textAlign:"center",marginBottom:"20px"}}>
          <div style={{fontSize:"36px"}}>{emoji}</div>
          <div style={{fontSize:"50px",fontWeight:"300",color:US.black,lineHeight:1}}>{found.length}<span style={{fontSize:"18px",color:US.muted}}>/{total}</span></div>
          <div style={{fontSize:"11px",color:US.muted,marginTop:"3px"}}>trovati ({pct}%)</div>
        </div>
        {found.length>0&&<div style={{marginBottom:"14px"}}><div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.green,marginBottom:"6px",fontWeight:"700"}}>✓ Trovati</div><div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>{found.map(p=><div key={p} style={{background:US.greenL,color:US.green,border:"1px solid #bbf7d0",borderRadius:"4px",padding:"3px 8px",fontSize:"11px",fontWeight:"600"}}>{p}</div>)}</div></div>}
        {missed.length>0&&<div style={{marginBottom:"18px"}}><div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.red,marginBottom:"6px",fontWeight:"700"}}>✗ Mancati</div><div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>{missed.map(p=><div key={p} style={{background:US.redL,color:US.red,border:"1px solid #fecaca",borderRadius:"4px",padding:"3px 8px",fontSize:"11px",fontWeight:"600"}}>{p}</div>)}</div></div>}
        <div style={{textAlign:"center"}}>
          <ShareButton text={`📋 Lista Quiz #${day}\n${cat.title}\n${found.length}/${total} trovati (${pct}%)\nuniverso-quiz-hmix.vercel.app`}/>
          {isToday&&onArchive&&<button onClick={onArchive} style={{...T.sb,width:"100%",marginTop:"6px",color:US.black}}>📂 Vai all'archivio</button>}
          <button onClick={onHome} style={{...T.pb,marginTop:"8px"}}>Home</button>
        </div>
      </div>
    </div>);
  }
  return(<div style={T.app}><Hdr title="Lista Quiz" sub={`${label} · #${day}`} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
    <div style={T.body}>
      <div style={{marginBottom:"12px",padding:"10px 13px",background:US.black,borderRadius:"6px"}}>
        <div style={{fontSize:"8px",color:US.orange,letterSpacing:"2px",textTransform:"uppercase",marginBottom:"2px"}}>Categoria di oggi</div>
        <div style={{fontSize:"13px",fontWeight:"700",color:"#fff"}}>{cat.title}</div>
        <div style={{fontSize:"10px",color:"#888",marginTop:"2px"}}>{cat.desc}</div>
      </div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"14px"}}>
        <TimerRing seconds={seconds} total={TOTAL}/>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:"36px",fontWeight:"300",color:US.black,lineHeight:1}}>{found.length}<span style={{fontSize:"16px",color:US.muted}}>/{total}</span></div>
          <div style={{fontSize:"9px",color:US.yellow,marginTop:"2px"}}>+{BONUS}s per risposta ✓</div>
          <button onClick={()=>setDone(true)} style={{marginTop:"6px",background:"none",border:`1px solid ${US.border}`,borderRadius:"4px",padding:"3px 10px",fontSize:"9px",color:US.muted,cursor:"pointer",fontFamily:"inherit"}}>⏹ Termina</button>
        </div>
      </div>
      <div style={{marginBottom:"12px"}}>
        <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} onFocus={e=>setTimeout(()=>e.target.scrollIntoView({behavior:"smooth",block:"center"}),300)} placeholder="Scrivi un nome..." style={{width:"100%",boxSizing:"border-box",border:`2px solid ${wrong?US.red:lastFound?US.green:US.border}`,borderRadius:"6px",padding:"11px 13px",fontSize:"14px",fontFamily:"inherit",outline:"none",color:US.black,background:wrong?US.redL:lastFound?US.greenL:"#fff",transition:"all 0.2s"}}/>
        {lastFound&&<div style={{fontSize:"11px",color:US.green,marginTop:"4px",fontWeight:"600",display:"flex",alignItems:"center",gap:"8px"}}>✓ {lastFound}<span style={{background:US.green,color:"#fff",borderRadius:"4px",padding:"1px 6px",fontSize:"10px"}}>+{BONUS}s ⏱</span></div>}
        {wrong&&<div style={{fontSize:"11px",color:US.red,marginTop:"4px"}}>✗ "{wrong}" — non in lista</div>}
      </div>
      {found.length>0&&<div><div style={{fontSize:"8px",letterSpacing:"2px",textTransform:"uppercase",color:US.muted,marginBottom:"6px"}}>Trovati</div><div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>{found.map(p=><div key={p} style={{background:US.greenL,color:US.green,border:"1px solid #bbf7d0",borderRadius:"4px",padding:"3px 8px",fontSize:"11px",fontWeight:"600"}}>{p}</div>)}</div></div>}
    </div>
  </div>);
}
function ListaQuiz({onHome,isDaily,onArchive}){
  if(isDaily){const d=LISTA_POOL,s=todaySeed();return<ListaQuizGame day={d} seed={s} isToday archiveNav={null} chipBar={null} onHome={onHome} onArchive={onArchive}/>;}
  return<ArchiveWrapper gameKey="lista">{({day,seed,isToday,archiveNav,chipBar})=><ListaQuizGame day={day} seed={seed} isToday={isToday} archiveNav={archiveNav} chipBar={chipBar} onHome={onHome} onArchive={onArchive}/>}</ArchiveWrapper>;
}

// ── INDOVINA IL TRASFERIMENTO ─────────────────────────────────────────────
const TRANSFERS = [
  {player:"Cristiano Ronaldo",    from:"Real Madrid",      to:"Juventus",       year:2018, fee:117},
  {player:"Paul Pogba",           from:"Juventus",         to:"Manchester Utd", year:2016, fee:105},
  {player:"Romelu Lukaku",        from:"Chelsea",          to:"Inter",          year:2021, fee:115},
  {player:"Gonzalo Higuaín",      from:"Napoli",           to:"Juventus",       year:2016, fee:90},
  {player:"Matthijs de Ligt",     from:"Ajax",             to:"Juventus",       year:2019, fee:86},
  {player:"Victor Osimhen",       from:"Lille",            to:"Napoli",         year:2020, fee:79},
  {player:"Khvicha Kvaratskhelia",from:"Napoli",           to:"PSG",            year:2025, fee:80},
  {player:"Rasmus Højlund",       from:"Atalanta",         to:"Man United",     year:2023, fee:78},
  {player:"Zinédine Zidane",      from:"Juventus",         to:"Real Madrid",    year:2001, fee:77},
  {player:"Dušan Vlahović",       from:"Fiorentina",       to:"Juventus",       year:2022, fee:85},
  {player:"Romelu Lukaku",        from:"Manchester Utd",   to:"Inter",          year:2019, fee:74},
  {player:"Alisson",              from:"Roma",             to:"Liverpool",      year:2018, fee:72},
  {player:"Zlatan Ibrahimović",   from:"Inter",            to:"Barcellona",     year:2009, fee:70},
  {player:"Mateo Retegui",        from:"Atalanta",         to:"Al-Qadsiah",     year:2025, fee:68},
  {player:"Achraf Hakimi",        from:"Inter",            to:"PSG",            year:2021, fee:68},
  {player:"Matthijs de Ligt",     from:"Juventus",         to:"Bayern",         year:2022, fee:67},
  {player:"Kaká",                 from:"Milan",            to:"Real Madrid",    year:2009, fee:67},
  {player:"João Cancelo",         from:"Juventus",         to:"Man City",       year:2019, fee:65},
  {player:"Edinson Cavani",       from:"Napoli",           to:"PSG",            year:2013, fee:64},
  {player:"Sandro Tonali",        from:"Milan",            to:"Newcastle",      year:2023, fee:61},
  {player:"Teun Koopmeiners",     from:"Atalanta",         to:"Juventus",       year:2024, fee:58},
  {player:"Hernán Crespo",        from:"Parma",            to:"Lazio",          year:2000, fee:57},
  {player:"Jorginho",             from:"Napoli",           to:"Chelsea",        year:2018, fee:57},
  {player:"Miralem Pjanić",       from:"Juventus",         to:"Barcellona",     year:2020, fee:60},
  {player:"Gianluigi Buffon",     from:"Parma",            to:"Juventus",       year:2001, fee:53},
  {player:"Bremer",               from:"Torino",           to:"Juventus",       year:2022, fee:51},
  {player:"Ronaldo",              from:"Inter",            to:"Real Madrid",    year:2002, fee:45},
  {player:"Pavel Nedvěd",         from:"Lazio",            to:"Juventus",       year:2001, fee:45},
  {player:"Federico Chiesa",      from:"Fiorentina",       to:"Juventus",       year:2022, fee:44},
  {player:"Andriy Shevchenko",    from:"Milan",            to:"Chelsea",        year:2006, fee:43},
  {player:"Riccardo Calafiori",   from:"Bologna",          to:"Arsenal",        year:2024, fee:43},
  {player:"Achraf Hakimi",        from:"Real Madrid",      to:"Inter",          year:2020, fee:43},
  {player:"Juan Sebastián Verón", from:"Lazio",            to:"Manchester Utd", year:2001, fee:42},
  {player:"Joshua Zirkzee",       from:"Bologna",          to:"Manchester Utd", year:2024, fee:42},
  {player:"Dan Ndoye",            from:"Bologna",          to:"Nott'm Forest",  year:2025, fee:42},
  {player:"Patrick Schick",       from:"Sampdoria",        to:"Roma",           year:2017, fee:42},
  {player:"Mohamed Salah",        from:"Roma",             to:"Liverpool",      year:2017, fee:42},
  {player:"Christian Vieri",      from:"Lazio",            to:"Inter",          year:1999, fee:46},
  {player:"Christian Vieri",      from:"Juventus",         to:"Lazio",          year:1998, fee:28},
  {player:"Ronaldo",              from:"Barcellona",       to:"Inter",          year:1997, fee:26},
  {player:"Gianluca Vialli",      from:"Sampdoria",        to:"Juventus",       year:1992, fee:20},
  {player:"Roberto Baggio",       from:"Fiorentina",       to:"Juventus",       year:1990, fee:12},
];

function TransferGame({day,seed,isToday,archiveNav,chipBar,onHome,onArchive}){
  const tr=TRANSFERS[seed%TRANSFERS.length];
  const label=isToday?"🗓 Giornaliero":"📂 Archivio";
  const savedToday=isToday?loadResult("transfer"):null;
  // 3 fields to guess: fee (±5M), from, year
  // step: 0=fee, 1=from, 2=year, 3=done
  const[step,setStep]=useState(0);
  const[vals,setVals]=useState({fee:"",from:"",year:""});
  const[results,setResults]=useState({});
  const[curInput,setCurInput]=useState("");
  const transferInputRef=useRef(null);
  useEffect(()=>{setStep(0);setVals({fee:"",from:"",year:""});setResults({});setCurInput("");},[seed]);
  useEffect(()=>{setTimeout(()=>transferInputRef.current?.focus(),100);},[step]);
  const FIELDS=[
    {key:"fee",  label:"💰 Cifra (milioni €)",      placeholder:"es. 75",   type:"number"},
    {key:"from", label:"🏟 Squadra di partenza",     placeholder:"es. Fiorentina", type:"text"},
    {key:"year", label:"📅 Anno del trasferimento",  placeholder:"es. 2022", type:"number"},
  ];
  function evalField(key,val){
    if(key==="fee"){const n=parseInt(val);return Math.abs(n-tr.fee)<=5?"green":Math.abs(n-tr.fee)<=15?"yellow":"red";}
    if(key==="from"){return fuzzyMatch(val,tr.from)?"green":"red";}
    if(key==="year"){const n=parseInt(val);return n===tr.year?"green":Math.abs(n-tr.year)===1?"yellow":"red";}
  }
  function submitField(){
    if(!curInput.trim())return;
    const key=FIELDS[step].key;
    const res=evalField(key,curInput);
    setResults(r=>({...r,[key]:res}));
    setVals(v=>({...v,[key]:curInput}));
    setCurInput("");
    if(step<2)setStep(s=>s+1);else{const finalRes={...results,[FIELDS[step].key]:evalField(FIELDS[step].key,curInput)};if(isToday)saveResult("transfer",{score:Object.values(finalRes).filter(v=>v==="green").length,player:tr.player,to:tr.to});setStep(3);}
  }
  const score=Object.values(results).filter(v=>v==="green").length;
  const colMap={green:US.green,yellow:US.yellow,red:US.red};
  return(<div style={T.app}><Hdr title="Indovina il Trasferimento" sub={`${label} · #${day}`} onHome={onHome} archiveNav={archiveNav}/>{chipBar||null}
    <div style={{...T.body,maxWidth:"480px"}}>
      {/* Player card */}
      <div style={{background:US.black,borderRadius:"8px",padding:"14px 16px",marginBottom:"18px"}}>
        <div style={{fontSize:"8px",color:US.orange,letterSpacing:"2px",textTransform:"uppercase",marginBottom:"4px"}}>Il giocatore</div>
        <div style={{fontSize:"20px",fontWeight:"700",color:"#fff",marginBottom:"2px"}}>{tr.player}</div>
        <div style={{fontSize:"12px",color:"#888"}}>→ <strong style={{color:"#fff"}}>{tr.to}</strong></div>
      </div>
      {/* Completed fields */}
      <div style={{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"12px"}}>
        {FIELDS.map(({key,label},i)=>{
          const done=results[key];
          if(i>step&&!done)return null;
          if(i===step&&step<3)return(
            <div key={key}>
              <span style={T.lb}>{label}</span>
              <div style={{display:"flex",gap:"7px"}}>
                <input ref={transferInputRef} type={FIELDS[step].type} value={curInput} onChange={e=>setCurInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&curInput.trim()&&submitField()} placeholder={FIELDS[step].placeholder} style={{...T.ip,flex:1}} autoFocus/>
                <button onClick={submitField} disabled={!curInput.trim()} style={{...T.pb,opacity:curInput.trim()?1:0.4}}>OK</button>
              </div>
            </div>
          );
          if(done)return(
            <div key={key} style={{padding:"8px 11px",borderRadius:"4px",background:done==="green"?US.greenL:done==="yellow"?"#fffbea":US.redL,border:`1.5px solid ${colMap[done]}`}}>
              <div style={{fontSize:"8px",color:colMap[done],fontWeight:"700",textTransform:"uppercase",letterSpacing:"1px",marginBottom:"2px"}}>{label}</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:"13px",fontWeight:"700",color:US.black}}>{vals[key]}{key==="fee"?"M":""}</span>
                <span style={{fontSize:"10px",color:colMap[done],fontWeight:"700"}}>
                  {done==="green"?"✓ Esatto":
                   key==="fee"?`Risposta: €${tr.fee}M`:
                   key==="from"?`Risposta: ${tr.from}`:
                   `Risposta: ${tr.year}`}
                  {done==="yellow"&&(key==="fee"?" (vicino)":key==="year"?" (±1 anno)":"")}
                </span>
              </div>
            </div>
          );
          return null;
        })}
      </div>
      {step===3&&<div style={{textAlign:"center",padding:"12px",background:score===3?US.greenL:score>=1?"#fffbea":US.redL,borderRadius:"6px",color:score===3?US.green:score>=1?US.yellow:US.red,marginTop:"4px"}}>
        <div style={{fontSize:"20px",fontWeight:"700"}}>{score}/3 corretti</div>
        <div style={{fontSize:"11px",marginTop:"4px",color:"#666"}}>{score===3?"Perfetto!":score===2?"Quasi!":score===1?"Ci sei vicino":"Riprova domani"}</div>
        <ShareButton text={`💸 Trasferimento #${day}\n${tr.player} → ${tr.to}\n${["fee","from","year"].map(k=>results[k]==="green"?"✅":results[k]==="yellow"?"🟨":"❌").join(" ")} ${score}/3\nuniverso-quiz-hmix.vercel.app`}/>
        {isToday&&onArchive&&<button onClick={onArchive} style={{...T.sb,width:"100%",marginTop:"6px",color:US.black}}>📂 Vai all'archivio</button>}
        <button onClick={onHome} style={{...T.pb,marginTop:"8px"}}>Home</button>
      </div>}
      {step<3&&<div style={{display:"flex",gap:"10px",marginTop:"10px"}}>{[[US.green,"Esatto"],[US.yellow,"Vicino"],[US.red,"Sbagliato"]].map(([c,l])=><div key={c} style={{display:"flex",alignItems:"center",gap:"3px",fontSize:"9px",color:"#999"}}><div style={{width:"8px",height:"8px",borderRadius:"2px",background:c}}/>{l}</div>)}</div>}
    </div>
  </div>);
}
function IndivinaTransferimento({onHome,isDaily,onArchive}){
  if(isDaily){const d=TRANSFERS.length,s=todaySeed();return<TransferGame day={d} seed={s} isToday archiveNav={null} chipBar={null} onHome={onHome} onArchive={onArchive}/>;}
  return<ArchiveWrapper gameKey="transfer">{({day,seed,isToday,archiveNav,chipBar})=><TransferGame day={day} seed={seed} isToday={isToday} archiveNav={archiveNav} chipBar={chipBar} onHome={onHome} onArchive={onArchive}/>}</ArchiveWrapper>;
}

// ── HOME ──────────────────────────────────────────────────────────────────
const MODES=[
  {key:"calciodle", label:"Calciodle",               icon:"🟩", desc:"Indovina il giocatore"},
  {key:"wordle",    label:"Wordle Cognome",           icon:"🔤", desc:"Indovina il cognome lettera per lettera"},
  {key:"hangman",   label:"Impiccato",                icon:"🪢", desc:"Indovina il cognome"},
  {key:"valore2",   label:"Chi Vale di Più?",         icon:"⚖️", desc:"Confronta i valori di mercato"},
  {key:"carriera",  label:"Indovina la Carriera",     icon:"🔍", desc:"Indovina da club e statistiche"},
  {key:"rosa",      label:"Rosa Quiz",                icon:"👕", desc:"60 secondi per nominare la rosa"},
  {key:"lista",     label:"Lista Quiz",               icon:"📋", desc:"Nomina tutti i nomi della categoria"},
  {key:"transfer",  label:"Indovina il Trasferimento",icon:"💸", desc:"Cifra, squadra e anno del trasferimento"},
];

function Card({m,onDaily,onArchive}){
  const[hv,sHv]=useState(false);
  return(<div style={{background:"#fff",border:`1.5px solid ${hv?US.orange:US.border}`,borderRadius:"8px",padding:"11px",transition:"all 0.15s",display:"flex",flexDirection:"column",gap:"4px",boxShadow:hv?"0 2px 8px rgba(0,0,0,0.07)":"none"}} onMouseEnter={()=>sHv(true)} onMouseLeave={()=>sHv(false)}>
    <div style={{display:"flex",alignItems:"center",gap:"6px"}}><span style={{fontSize:"18px"}}>{m.icon}</span><span style={{fontSize:"12px",fontWeight:"700",color:US.black}}>{m.label}</span></div>
    <span style={{fontSize:"9px",color:US.muted,lineHeight:1.4}}>{m.desc}</span>
    <div style={{display:"flex",gap:"4px",marginTop:"3px"}}>
      <button onClick={()=>onDaily(m.key)} style={{flex:1,background:US.orange,color:US.black,border:"none",borderRadius:"4px",padding:"6px 3px",fontSize:"8px",fontWeight:"700",textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit"}}>🗓 Daily</button>
      <button onClick={()=>onArchive(m.key)} style={{flex:1,background:US.black,color:"#fff",border:"none",borderRadius:"4px",padding:"6px 3px",fontSize:"8px",fontWeight:"700",textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit"}}>📂 Archivio</button>
    </div>
  </div>);
}

function Home({onSelect}){
  const today=new Date().toLocaleDateString("it-IT",{weekday:"long",day:"numeric",month:"long"});
  const countdown=useCountdown();
  const streak=loadStreak();
  return(<div style={{...T.app,paddingBottom:"40px"}}>
    <div style={{background:US.black,color:"#fff",padding:"18px 18px 14px",borderBottom:`3px solid ${US.orange}`}}>
      <div style={{fontSize:"8px",letterSpacing:"3px",textTransform:"uppercase",color:US.orange,marginBottom:"2px",fontWeight:"700"}}>Universo Sportivo</div>
      <div style={{fontSize:"21px",fontWeight:"700",letterSpacing:"-0.5px",marginBottom:"7px"}}>Quiz Calcio</div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"6px"}}>
        <div>
          <div style={{fontSize:"10px",color:"#666",textTransform:"capitalize"}}>{today}</div>
          {streak.count>0&&<div style={{fontSize:"9px",color:US.orange,marginTop:"2px",fontWeight:"700"}}>🔥 Serie: {streak.count} {streak.count===1?"giorno":"giorni"}</div>}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"5px",background:"rgba(255,255,255,0.07)",borderRadius:"6px",padding:"5px 10px"}}>
          <span style={{fontSize:"9px",color:"#555"}}>🔄 refresh in</span>
          <span style={{fontSize:"13px",fontWeight:"700",color:US.orange,fontVariantNumeric:"tabular-nums",letterSpacing:"0.5px"}}>{countdown}</span>
        </div>
      </div>
    </div>
    <div style={{padding:"14px 14px 40px",maxWidth:"620px",margin:"0 auto",boxSizing:"border-box"}}>
      <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"10px"}}><div style={{width:"3px",height:"13px",background:US.orange,borderRadius:"2px"}}/><span style={{fontSize:"9px",fontWeight:"700",letterSpacing:"1.5px",textTransform:"uppercase",color:US.muted}}>Modalità</span></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
        {MODES.map(m=><Card key={m.key} m={m} onDaily={k=>onSelect(k+"_daily")} onArchive={k=>onSelect(k+"_archive")}/>)}
      </div>
      <div style={{marginTop:"12px",padding:"9px 11px",background:"#fff",border:`1px solid ${US.border}`,borderRadius:"6px",fontSize:"9px",color:US.muted,lineHeight:1.6}}>🗓 <strong style={{color:US.black}}>Daily</strong> — sfida unica al giorno &nbsp;·&nbsp; 📂 <strong style={{color:US.black}}>Archivio</strong> — naviga le sfide passate con ◀ ▶</div>
    </div>
  </div>);
}

// ── ROOT ──────────────────────────────────────────────────────────────────
export default function App(){
  useEffect(()=>{
    const s=document.createElement("style");
    s.innerHTML=`
      input,select,textarea{font-size:16px !important;}
      .flip-cell{perspective:300px;}
      .flip-inner{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform 0.65s ease;}
      .flip-inner.flipped{transform:rotateX(360deg);}
      .flip-front,.flip-back{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;border-radius:3px;font-weight:700;}
      .flip-back{backface-visibility:hidden;}
      @keyframes fadeSlideIn{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
      .game-enter{animation:fadeSlideIn 0.35s ease forwards;}
    `;
    document.head.appendChild(s);
    return()=>document.head.removeChild(s);
  },[]);
  const[sc,sSc]=useState("home");
  const home=()=>sSc("home");
  const isDaily=sc.endsWith("_daily");
  const key=sc.replace("_daily","").replace("_archive","");
  if(sc==="home")return<Home onSelect={sSc}/>;
  const goArchive=()=>sSc(key+"_archive");
  if(key==="calciodle")return<Calciodle onHome={home} isDaily={isDaily} onArchive={goArchive}/>;
  if(key==="wordle")return<WordleCognome onHome={home} isDaily={isDaily} onArchive={goArchive}/>;
  if(key==="hangman")return<Hangman onHome={home} isDaily={isDaily} onArchive={goArchive}/>;
  if(key==="valore2")return<ChiValeDiPiu onHome={home} isDaily={isDaily} onArchive={goArchive}/>;
  if(key==="carriera")return<Carriera onHome={home} isDaily={isDaily} onArchive={goArchive}/>;
  if(key==="rosa")return<RosaQuiz onHome={home} isDaily={isDaily} onArchive={goArchive}/>;
  if(key==="lista")return<ListaQuiz onHome={home} isDaily={isDaily} onArchive={goArchive}/>;
  if(key==="transfer")return<IndivinaTransferimento onHome={home} isDaily={isDaily} onArchive={goArchive}/>;
  return<Home onSelect={sSc}/>;
}
