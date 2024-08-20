deploy:
	bun run build
	firebase deploy
test:
	bun run test