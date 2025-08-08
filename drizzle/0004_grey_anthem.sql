ALTER TABLE "airport" DROP CONSTRAINT "airport_cityId_city_id_fk";
--> statement-breakpoint
ALTER TABLE "airport" ADD CONSTRAINT "airport_cityId_city_id_fk" FOREIGN KEY ("cityId") REFERENCES "public"."city"("id") ON DELETE cascade ON UPDATE no action;