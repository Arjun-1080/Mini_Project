import requests
from bs4 import BeautifulSoup
import time
import json
from helper import stars_to_float

def scrape_movie_reviews(url, num_pages):
    # Use headers to mimic a browser
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    all_reviews = []
    
    for page in range(1, num_pages + 1):
        # Construct URL for each page
        page_url = f"{url}/page/{page}"
        
        try:
            response = requests.get(page_url, headers=headers)
            response.raise_for_status()  # Raise an exception for bad status codes
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Find all review containers
            review_containers = soup.find_all('div', class_='film-detail-content')
            
            for container in review_containers:
                review_data = {}
                
                # Get username
                user_elem = container.find('strong', class_='name')
                if user_elem:
                    review_data['username'] = user_elem.get_text(strip=True)
                
                # Get rating if exists
                rating_elem = container.find('span', class_='rating')
                if rating_elem:
                    review_data['rating'] = stars_to_float(rating_elem.get_text(strip=True))
                
                # Get review text
                review_elem = container.find('div', class_='body-text')
                if review_elem:
                    review_data['review'] = review_elem.get_text(strip=True)
                
                # Get review date
                date_elem = container.find('span', class_='_nobr')
                if date_elem:
                    review_data['date'] = date_elem.get_text(strip=True)
                
                # Get source
                review_data['source'] = 'LetterBoxd'

                if review_data: 
                    all_reviews.append(review_data)
            
            # print(f"Scraped page {page}, found {len(review_containers)} reviews")
            
        except requests.exceptions.RequestException as e:
            print(f"Error scraping page {page}: {e}")
            continue
    
    return all_reviews

def scrape_movie_reviews_rotten(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    all_reviews = []

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise an exception for bad status codes

        soup = BeautifulSoup(response.text, 'html.parser')
        review_containers = soup.find_all('div', class_="audience-review-row")

        for container in review_containers:
            review_data = {}
            
            # Get username
            name_elem = container.find('a', class_='audience-reviews__name')
            review_data['username'] = name_elem.get_text(strip=True) if name_elem else "N/A"
            
            # Get rating
            rating_elem = container.find('rating-stars-group')
            review_data['rating'] = float(rating_elem.get('score')) if rating_elem and rating_elem.get('score') else "N/A"
            
            # Get review text
            review_elem = container.find('p', class_='audience-reviews__review')
            review_data['review'] = review_elem.get_text(strip=True) if review_elem else "N/A"
            
            # Get review date
            date_elem = container.find('span', class_='audience-reviews__duration')
            review_data['date'] = date_elem.get_text(strip=True) if date_elem else "N/A"
            
            # Add the review source
            review_data['source'] = 'Rotten Tomatoes'
            
            if review_data:  # Only append if some data is present
                all_reviews.append(review_data)
        
        return all_reviews

    except Exception as e:
        return {"detail": f"An error occurred: {str(e)}"}

def scrape_movie_details(url):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')

        prettified_html = soup.prettify().splitlines()
        
     
        first_200_lines = "\n".join(prettified_html[:3000])
        
        print(first_200_lines)
        
        movie_details = {
            "title" : soup.find('h1', id='media-hero-label').find('sr-text').text.strip(),
            "desc": soup.find('rt-text', {'data-qa': 'synopsis-value'}).text.strip() if soup.find('rt-text', {'data-qa': 'synopsis-value'}) else "N/A",
            "poster": soup.find('rt-img', {'alt': 'poster image'})['src'] if soup.find('rt-img', {'alt': 'poster image'}) else "N/A",
            "tomatometer" : (soup.find('rt-text', context="label", slot="criticsScore").text.strip() 
               if soup.find('rt-text', context="label", slot="criticsScore") else "N/A"),
            "popcornmeter" : (soup.find('rt-text', context="label", slot="audienceScore").text.strip() 
               if soup.find('rt-text', context="label", slot="audienceScore") else "N/A"),

        }

        print(movie_details)
        
        return movie_details

    except Exception as e:
        return {"detail": f"An error occurred: {str(e)}"}

__all__ = ['scrape_movie_reviews', 'scrape_movie_reviews_rotten', 'scrape_movie_details']