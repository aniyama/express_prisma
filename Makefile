migrate:
	npx prisma migrate dev --name init

studio:
	npx prisma studio

dev:
	npm run dev

up:
	docker compose up