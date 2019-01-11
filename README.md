# isthis(apple)

Demo app for learning keras and neural nets. Send image and you will get prediction if on your photo is apple or not.

[Check out demo now!](https://isthisapple.me/) (It may take long to load prediction, because container might be asleep 💤 ~ 1 min)

#### Future

User can upload new training data (points). If accuracy increases all users, who uploaded photos this week will get bonus points.

## Configuration

‼️‼️ We use docker for development. If you want to run on production server with docker change password to redis in docker-compose.yml

## Run

Run the app 🐳

```bash
docker-compose up
```

Wait for front_1 to get link to the app (should be http://localhost:3000)

## Deployment

Application deploys automatically every commit on master branch on heroku. Frontend app needs to be deployed manually via `npm run deploy` (You need a write access to this repo!). Also reporting app needs to be deployed manually.

## MVP

Minimal viable product

- Can take a photo and send it to backend ✅
- Backend returns prediction, which is displayed ✅
- Admin can upload new training data ✅
- Neural net is re-trained every week

## TO DO

- [x] Taking and sending photo (React)
- [x] Returning prediction (Flask)
- [ ] Task for re-training neural net every week (Celery)
