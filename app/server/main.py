from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from scrapper import scrape_movie_reviews, scrape_movie_reviews_rotten
from helper import trim_and_replace_spaces

app = FastAPI()

class ReviewRequest(BaseModel):
    name: str
    num_pages: int = 2

@app.get("/")
async def read_root():
    return """running fine :_)"""

@app.post("/getReviews")
async def get_reviews(request: ReviewRequest):

    reviews = []

    letterBoxName = trim_and_replace_spaces(request.name)
    letterBoxUrl = f"https://letterboxd.com/film/{letterBoxName}/reviews/by/activity"

    rottenTomotoesName = trim_and_replace_spaces(request.name,'_')
    rottenTomatoesUrl = f"https://www.rottentomatoes.com/m/{rottenTomotoesName}/reviews?type=user"
    try:

        letterBoxreviews = scrape_movie_reviews(url=letterBoxUrl, num_pages=request.num_pages)
        rottenTomatoesReviews = scrape_movie_reviews_rotten(url=rottenTomatoesUrl)

        if not letterBoxreviews and not rottenTomatoesReviews:
            raise HTTPException(status_code=404, detail="No reviews found.")
        reviews.extend(letterBoxreviews)
        reviews.extend(rottenTomatoesReviews)

        return {'reviews': reviews}
        
    except Exception as e:
        # Handle unexpected errors
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    