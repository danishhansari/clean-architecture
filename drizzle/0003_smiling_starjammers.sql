CREATE UNIQUE INDEX "id_idx" ON "airplanes" USING btree ("id");--> statement-breakpoint
CREATE INDEX "airport_idx" ON "airport" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "code_idx" ON "airport" USING btree ("code");