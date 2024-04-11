FROM python:3 AS dev-backend

VOLUME ["/app"]
WORKDIR /app

COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "main.py"]

FROM python:3 AS prod-backend

COPY . .

CMD [ "python", "main.py"]
