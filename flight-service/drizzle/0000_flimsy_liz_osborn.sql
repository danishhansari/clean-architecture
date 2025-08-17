CREATE TABLE "airplanes" (
	"id" serial PRIMARY KEY NOT NULL,
	"modelNumber" varchar(80) NOT NULL,
	"capacity" integer DEFAULT 0,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
