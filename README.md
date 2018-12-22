# isthis(apple)

Demo app for learning keras and nueral nets. Send image and you will get prediction if on your photo is apple or not.

#### Future

User can upload new training data (points). If accuracy increases all users, who uploaded photos this week will get bonus points.

## Run

First build image

```bash
docker build . -t isthisapple
```

Then run container

```bash
docker run -it --rm -v $(pwd):/srv -p 5000:5000 isthisapple gunicorn main:app -b 0.0.0.0:5000
```

## MVP

Minimal viable product

- Can take a photo and send it to backend
- Backend returns prediction, which is displayed
- Admin can upload new training data
- Neural net is re-trained every week

## TO DO

- [ ] Taking and sending photo (React)
- [ ] Returning prediction (Flask)
- [ ] Task for re-training neural net every week (Celery)
