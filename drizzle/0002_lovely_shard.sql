CREATE TABLE "airport" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"address" varchar(150) NOT NULL,
	"code" varchar(6) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"cityId" integer NOT NULL,
	CONSTRAINT "airport_code_unique" UNIQUE("code")
);
--> statement-breakpoint
ALTER TABLE "airport" ADD CONSTRAINT "airport_cityId_city_id_fk" FOREIGN KEY ("cityId") REFERENCES "public"."city"("id") ON DELETE cascade ON UPDATE cascade;