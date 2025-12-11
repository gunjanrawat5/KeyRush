from fastapi import FastAPI

# This MUST be named "app" because you're using `main:app`
app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "KeyRush backend is running 🚀"}
