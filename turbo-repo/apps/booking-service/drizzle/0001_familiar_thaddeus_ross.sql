ALTER TABLE "booking" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "booking" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;