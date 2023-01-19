# L'Atelier Technical Test Project

## Run application

Install project dependencies:

```bash
npm install
```

Create .env file:
```bash
cp .env.defaults .env
```

Run local server:
```bash
npm start       
```

## Run tests
```bash
ENV=test npm run test
```

### API Documentation

Route | Method | Query String | Body | Description
-|-|-|-|-
`/players` | get | - | - | Sort players list 
`/players/id/:id` | get | - | - | Retrieve player's profile by id
`/players/stats` | get | - | - | Retrieve players stats
