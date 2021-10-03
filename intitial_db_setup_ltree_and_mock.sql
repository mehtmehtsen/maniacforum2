CREATE EXTENSION IF NOT EXISTS ltree;

-- add ltree path column to msgs
ALTER TABLE msgs ADD path ltree; 

-- create users
INSERT INTO users VALUES (DEFAULT, 'mat', 'ketchup', 'Marius', 'Tippkämper', 'tippkaemper@posteo.de', FALSE, 'Bochon', 'https://www.komeht.de', 'Nibbles', 'Rogue Lite z.B.', 'Schwitz', '', '', '', '', '', '', CURRENT_TIMESTAMP, '{}', true);

-- create boards
INSERT INTO boards VALUES (DEFAULT, 'Smalltalk', 'Diskussionen rund um die Welt der Videospiele.', NULL, NULL);
INSERT INTO boards VALUES (DEFAULT, 'For Sale', 'Private Kleinanzeigen: An- und Verkauf gebrauchter Spiele', NULL, NULL);
INSERT INTO boards VALUES (DEFAULT, 'Tech''n''Cheats', 'Umbau-Lösungen, Anschluss-Probleme, Computerprobleme, Spielehilfen, Kaufberatung', NULL, NULL);
INSERT INTO boards VALUES (DEFAULT, 'OT', 'Ohne Tiefgang - der tägliche Schwachsinn', NULL, NULL);
INSERT INTO boards VALUES (DEFAULT, 'Filme & Serien', 'Alles wofür 24 fps reichen', NULL, NULL);
INSERT INTO boards VALUES (DEFAULT, 'Corona', 'Alles zum Thema Corona-Virus und Covid-19', NULL, NULL);
INSERT INTO boards VALUES (DEFAULT, 'Online', 'Alles rund um Onlinespiele', NULL, NULL);

-- create threads/msgs
INSERT INTO msgs VALUES       (1, 1, 1, NULL, NULL, CURRENT_TIMESTAMP, 'YouTube etc empfehlenswerte Videogamefilmchen', 'Vorgänger: LINK', FALSE, CURRENT_TIMESTAMP, '1');
  INSERT INTO msgs VALUES     (1, 2, 1, 1, 1, CURRENT_TIMESTAMP, 'Re: YouTube etc empfehlenswerte Videogamefilmchen', 'Ein super Youtube-Video', FALSE, CURRENT_TIMESTAMP, '1.2');
    INSERT INTO msgs VALUES   (1, 3, 1, 2, 1, CURRENT_TIMESTAMP, 'Danke für dieses Video', 'Es gefiel.', FALSE, CURRENT_TIMESTAMP, '1.2.3');
      INSERT INTO msgs VALUES (1, 4, 1, 3, 1, CURRENT_TIMESTAMP, 'Mir nicht /nt', '', FALSE, CURRENT_TIMESTAMP, '1.2.3.4');
      INSERT INTO msgs VALUES (1, 5, 1, 3, 1, CURRENT_TIMESTAMP, 'Mir auch /nt', '', FALSE, CURRENT_TIMESTAMP, '1.2.3.5');
  INSERT INTO msgs VALUES     (1, 6, 1, 1, 1, CURRENT_TIMESTAMP, 'Typ macht Hades-Speedrun auf dem Klo', 'Hades ist nämlich ein gutes Spiel', FALSE, CURRENT_TIMESTAMP, '1.6');

INSERT INTO msgs VALUES       (1, 7, 1, NULL, NULL, CURRENT_TIMESTAMP, 'Ich zocke gerade', 'Also ich zock gerade gar nix.', FALSE, CURRENT_TIMESTAMP, '7');
  INSERT INTO msgs VALUES     (1, 8, 1, 7, 1, CURRENT_TIMESTAMP, 'Hades', 'Auf dem Klo', FALSE, CURRENT_TIMESTAMP, '7.8');
    INSERT INTO msgs VALUES   (1, 11, 1, 8, 1, CURRENT_TIMESTAMP, 'WTF', 'BIST DU DAS MIT DEM SPEEDRUN?!1elf', FALSE, CURRENT_TIMESTAMP, '7.8.11');
  INSERT INTO msgs VALUES     (1, 9, 1, 7, 1, CURRENT_TIMESTAMP, 'Minesweeper', 'Ist aber nicht so gut.', FALSE, CURRENT_TIMESTAMP, '7.9');
    INSERT INTO msgs VALUES     (1, 12, 1, 9, 1, CURRENT_TIMESTAMP, 'Find ich auch', 'LOL, natürlich ist das gut!1', FALSE, CURRENT_TIMESTAMP, '7.9.12');
  INSERT INTO msgs VALUES     (1, 10, 1, 7, 1, CURRENT_TIMESTAMP, 'Diablo EINS', 'Die anderen geben mir nix. ¯\_(ツ)_/¯', FALSE, CURRENT_TIMESTAMP, '7.10');
    INSERT INTO msgs VALUES     (1, 13, 1, 10, 1, CURRENT_TIMESTAMP, 'Re: Diablo EINS', 'Ah, a man of culture!', FALSE, CURRENT_TIMESTAMP, '7.10.13');


-- -- create some threads
-- ---- smalltalk
-- INSERT INTO threads VALUES (1, DEFAULT, MSGID, false, false, AUTHORID, AUTHORNAME, false, 'YouTube etc empfehlenswerte Videogamefilmchen', CURRENT_TIMESTAMP, MSGID, MSGTIMESTAMP);
-- INSERT INTO threads VALUES (1, DEFAULT, MSGID, false, false, AUTHORID, AUTHORNAME, false, 'Ich zocke gerade', CURRENT_TIMESTAMP, MSGID, MSGTIMESTAMP);
-- INSERT INTO threads VALUES (1, DEFAULT, MSGID, false, false, AUTHORID, AUTHORNAME, false, 'Ori [XONE/PC/SWI]', CURRENT_TIMESTAMP, MSGID, MSGTIMESTAMP);
-- INSERT INTO threads VALUES (1, DEFAULT, MSGID, false, false, AUTHORID, AUTHORNAME, false, 'Hades - Diablo/Rogue-like in der griechischen Unterwelt', CURRENT_TIMESTAMP, MSGID, MSGTIMESTAMP);
-- ---- ot
-- INSERT INTO threads VALUES (4, DEFAULT, MSGID, false, false, AUTHORID, AUTHORNAME, false, 'Dinge, die ihr schon immer mal erklärt haben wolltet', CURRENT_TIMESTAMP, MSGID, MSGTIMESTAMP);
-- INSERT INTO threads VALUES (4, DEFAULT, MSGID, false, false, AUTHORID, AUTHORNAME, false, 'Was ich noch sagen wollte', CURRENT_TIMESTAMP, MSGID, MSGTIMESTAMP);
-- INSERT INTO threads VALUES (4, DEFAULT, MSGID, false, false, AUTHORID, AUTHORNAME, false, 'Wie Schuppen von den Augen', CURRENT_TIMESTAMP, MSGID, MSGTIMESTAMP);
