import requests
from bs4 import BeautifulSoup
import time

def scrape_movie_rating(url):
    # Use headers to mimic a browser
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    # time.sleep(2)
    
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    reviews = soup.find('div', id='content')
    print(reviews)

scrape_movie_rating("https://letterboxd.com/film/3-idiots/reviews/by/activity")