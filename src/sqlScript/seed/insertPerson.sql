DROP TABLE IF EXISTS Person
CREATE TABLE Person
(
	P_Id int NOT NULL,
	firstName varChar(60),
	lastName varChar(60),
	PRIMARY KEY (P_Id)
)

INSERT INTO Person (firstName, lastName)
VALUES ('Brandon','Morrison')