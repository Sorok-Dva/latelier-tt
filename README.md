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
`/player/list` | get | - | - | Sort players list 
`/player/id/:id` | get | - | - | Retrieve player's profile by id
`/player/stats` | get | - | - | Retrieve players stats
