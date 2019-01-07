# isthis(apple)

Demo app for learning keras and neural nets. Send image and you will get prediction if on your photo is apple or not.

[Check out demo now!](https://prd-ev.github.io/isthis/) (It may take long to load prediction, because container might be asleep 💤 ~ 1 min)

#### Future

User can upload new training data (points). If accuracy increases all users, who uploaded photos this week will get bonus points.

## Configuration

‼️‼️ Change passwords in learn.json and learn/docker-compose.yml

## Run

First build image 🐳

```bash
docker build . -t isthisapple
```

Then run prediction app

```bash
docker run -d -it --rm -v $(pwd):/srv -p 5000:5000 isthisapple gunicorn main:app -b 0.0.0.0:5000
```

And reporting app

```bash
cd learn
docker-compose up
```

And finally start frontend server

```bash
cd ..
npm run start
```

Now visit http://localhost:3000/

## Deployment

Application deploys automatically every commit on master branch on heroku. Frontend app needs to be deployed manually via `npm run deploy` (You need a write access to this repo!). Also reporting app needs to be deployed manually.

## MVP

Minimal viable product

- Can take a photo and send it to backend ✅
- Backend returns prediction, which is displayed ✅
- Admin can upload new training data
- Neural net is re-trained every week

## TO DO

- [x] Taking and sending photo (React)
- [x] Returning prediction (Flask)
- [ ] Task for re-training neural net every week (Celery)
