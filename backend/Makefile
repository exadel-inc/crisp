help:
	@echo "usage: make COMMAND [c=[arguments]]"
	@echo ""
	@echo "Commands:"
	@echo "  up                     Up all docker services"
	@echo "  down                   Stop all docker services"
	@echo "  dps                    Show all running containers"

dps:
	@docker ps --format "table {{.ID}}\t{{.Ports}}\t{{.Names}}"

up:
	docker-compose up -d
	make dps

down:
	docker-compose down
