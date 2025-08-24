CREATE TABLE "flight" (
	"id" serial PRIMARY KEY NOT NULL,
	"flightNumber" varchar(20) NOT NULL,
	"airplaneId" integer NOT NULL,
	"departureAirportId" varchar NOT NULL,
	"arrivalAirportId" varchar NOT NULL,
	"arrivalTime" date NOT NULL,
	"departureTime" date NOT NULL,
	"price" integer NOT NULL,
	"boardingGate" varchar(50),
	"totalSeats" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "airport" ALTER COLUMN "code" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "flight" ADD CONSTRAINT "flight_airplaneId_airplanes_id_fk" FOREIGN KEY ("airplaneId") REFERENCES "public"."airplanes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "flight" ADD CONSTRAINT "flight_departureAirportId_airport_code_fk" FOREIGN KEY ("departureAirportId") REFERENCES "public"."airport"("code") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "flight" ADD CONSTRAINT "flight_arrivalAirportId_airport_code_fk" FOREIGN KEY ("arrivalAirportId") REFERENCES "public"."airport"("code") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "flightNumber_idx" ON "flight" USING btree ("flightNumber");