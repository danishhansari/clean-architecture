CREATE TYPE "public"."statusEnum" AS ENUM('booked', 'cancelled', 'pending', 'initiated');--> statement-breakpoint
CREATE TABLE "booking" (
	"id" serial PRIMARY KEY NOT NULL,
	"flightId" integer NOT NULL,
	"userId" integer NOT NULL,
	"totalCost" integer NOT NULL,
	"status" "statusEnum" DEFAULT 'initiated' NOT NULL,
	"noOfSeats" integer DEFAULT 1 NOT NULL
);
