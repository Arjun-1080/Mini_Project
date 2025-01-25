from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from scrapper import scrape_movie_reviews, scrape_movie_reviews_rotten, scrape_movie_details
from helper import trim_and_replace_spaces
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MovieRequest(BaseModel):
    name: str
    num_pages: int = 2

@app.get("/")
async def read_root():
    return """running fine :_)"""

@app.post("/getMovies")
async def get_movies(request: MovieRequest):

    details = []
    reviews = []

    letterBoxName = trim_and_replace_spaces(request.name)
    letterBoxReviewsUrl = f"https://letterboxd.com/film/{letterBoxName}/reviews/by/activity"

    rottenTomotoesName = trim_and_replace_spaces(request.name,'_')
    rottenTomatoesReviewsUrl = f"https://www.rottentomatoes.com/m/{rottenTomotoesName}/reviews?type=user"
    try:

        letterBoxreviews = scrape_movie_reviews(url=letterBoxReviewsUrl, num_pages=request.num_pages)
        rottenTomatoesReviews = scrape_movie_reviews_rotten(url=rottenTomatoesReviewsUrl)

        if not letterBoxreviews and not rottenTomatoesReviews:
            raise HTTPException(status_code=404, detail="No reviews found.")
        reviews.extend(letterBoxreviews)
        reviews.extend(rottenTomatoesReviews)

    except Exception as e:
        # Handle unexpected errors
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    try:
        movieDetails =scrape_movie_details(f"https://www.rottentomatoes.com/m/{rottenTomotoesName}")

        if not movieDetails:
            raise HTTPException(status_code=404, detail="No details found.")
        details.append(movieDetails)

        return { "details": details[0],"reviews": reviews}

    except Exception as e:
        # Handle unexpected errors
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

    
    