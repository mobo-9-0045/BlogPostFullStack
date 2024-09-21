.PHONY: up down re clean

all : up

down:
	@docker-compose -f docker-compose.yml down
up:
	@docker-compose -f docker-compose.yml up --build

fclean :
	@docker system prune --all --volumes &> /dev/null ; true
re : clean up