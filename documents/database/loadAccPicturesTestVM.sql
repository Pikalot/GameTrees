-- To have this work, make sure your mysql main dir has proper my.cnf, if not create the file:
    -- [mysqld]
    -- secure_file_priv=""
    -- max_allowed_packet=16M
-- Have the a dir called mysql-files with all of your photos
-- Then run the code below

INSERT INTO Photos (pid, add_date)
VALUES 
    (1803989619, NOW());
INSERT INTO AccPhotos (apid, image, uid)
VALUES(1803989619, LOAD_FILE('/home/pikalot0/Uploads/tuan.jpeg'), 1);

INSERT INTO Photos (pid, add_date)
VALUES 
    (3564330554, NOW());
INSERT INTO AccPhotos (apid, image, uid)
VALUES(3564330554, LOAD_FILE('/home/pikalot0/Uploads/sand.webp'), 2);
INSERT INTO Photos (pid, add_date)
VALUES 
    (1309098117, NOW());
INSERT INTO AccPhotos (apid, image, uid)
VALUES(1309098117, LOAD_FILE('/home/pikalot0/Uploads/aman.jpg'), 3);

INSERT INTO Photos (pid, add_date)
VALUES 
    (1260550007, NOW());
INSERT INTO AccPhotos (apid, image, uid)
VALUES(1260550007, LOAD_FILE('/home/pikalot0/Uploads/kirby.jpeg'), 4);

INSERT INTO Photos (pid, add_date)
VALUES 
    (4012708477, NOW());
INSERT INTO AccPhotos (apid, image, uid)
VALUES(4012708477, LOAD_FILE('/home/pikalot0/Uploads/steven.jpg'), 5);

INSERT INTO Photos (pid, add_date)
VALUES 
    (2030201243, NOW());
INSERT INTO AccPhotos (apid, image, uid)
VALUES(2030201243, LOAD_FILE('/home/pikalot0/Uploads/joker.webp'), 7);

INSERT INTO Photos (pid, add_date)
VALUES 
    (744636978, NOW());
INSERT INTO AccPhotos (apid, image, uid)
VALUES(744636978, LOAD_FILE('/home/pikalot0/Uploads/mario.jpeg'), 8);

INSERT INTO Photos (pid, add_date)
VALUES 
    (425205287, NOW());
INSERT INTO AccPhotos (apid, image, uid)
VALUES(425205287, LOAD_FILE('/home/pikalot0/Uploads/link.webp'), 9);

INSERT INTO Photos (pid, add_date)
VALUES 
    (1246026773, NOW());
INSERT INTO AccPhotos (apid, image, uid)
VALUES(1246026773, LOAD_FILE('/home/pikalot0/Uploads/samus.png'), 10);

INSERT INTO Photos (pid, add_date)
VALUES 
    (1338518310, NOW());
INSERT INTO AccPhotos (apid, image, uid)
VALUES(1338518310, LOAD_FILE('/home/pikalot0/Uploads/sonic.jpg'), 11);

INSERT INTO Photos (pid, add_date)
VALUES 
    (1800524849, NOW());
INSERT INTO AccPhotos (apid, image, uid)
VALUES(1800524849, LOAD_FILE('/home/pikalot0/Uploads/laura.jpg'), 12);

INSERT INTO Photos (pid, add_date)
VALUES 
    (1071358815, NOW());
INSERT INTO AccPhotos (apid, image, uid)
VALUES(1071358815, LOAD_FILE('/home/pikalot0/Uploads/cloud.webp'), 13);


INSERT INTO Photos (pid, add_date)
VALUES 
    (2233968785, NOW());
INSERT INTO AccPhotos (apid, image, uid)
VALUES(2233968785, LOAD_FILE('/home/pikalot0/Uploads/kratos.webp'), 14);

INSERT INTO Photos (pid, add_date)
VALUES 
    (13861510757, NOW());
INSERT INTO AccPhotos (apid, image, uid)
VALUES(13861510757, LOAD_FILE('/home/pikalot0/Uploads/chief.jpg'), 15);

INSERT INTO Photos (pid, add_date)
VALUES 
    (2977887953, NOW());
INSERT INTO AccPhotos (apid, image, uid)
VALUES(2977887953, LOAD_FILE('/home/pikalot0/Uploads/geralt.jpg'), 16);

INSERT INTO Photos (pid, add_date)
VALUES 
    (1159943183, NOW());
INSERT INTO AccPhotos (apid, image, uid)
VALUES(1159943183, LOAD_FILE('/home/pikalot0/Uploads/arthur.jpg'), 17);
