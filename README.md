# GUIDELINE SETUP ENVIROMENT

## API STACK

- NestJS Framework - [https://docs.nestjs.com/](https://docs.nestjs.com/)
- Prisma - [https://www.prisma.io/docs/](https://www.prisma.io/docs/)
- nodejs - v17.9.0
- npm - 8.5.5

<!-- Install library -->
npm install

## Using docker setup database
docker-compose up -d

<!-- init table database -->
npx prisma migrate dev --name init

<!-- Generate prisma schema -->
npx prisma generate

<!-- Run api -->
npm run start:dev

### Documentation api swagger
http://localhost:3000/api

# other documentation in docs folder