FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY mino/ mino/
COPY main.py main.py

ENV PYTHONUNBUFFERED=1

CMD ["python", "main.py"]
