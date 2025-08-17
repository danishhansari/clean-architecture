CREATE TYPE "public"."typeEnum" AS ENUM('business', 'business-economy', 'economy', 'first-class');--> statement-breakpoint
CREATE TABLE "seats" (
	"id" serial PRIMARY KEY NOT NULL,
	"airplaneId" integer NOT NULL,
	"row" integer NOT NULL,
	"col" varchar NOT NULL,
	"type" "typeEnum" DEFAULT 'economy' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "seats" ADD CONSTRAINT "seats_airplaneId_airplanes_id_fk" FOREIGN KEY ("airplaneId") REFERENCES "public"."airplanes"("id") ON DELETE cascade ON UPDATE no action;