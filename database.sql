CREATE TABLE to_do(
	"id" SERIAL PRIMARY KEY NOT NULL,
	"task" VARCHAR (250) NOT NULL,
	"published" DATE,
  	"status" VARCHAR (80) DEFAULT 'Not Complete'
);