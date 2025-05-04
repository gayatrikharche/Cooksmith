from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DB_PATH = "sqlite:///cooksmith.db"

engine = create_engine(DB_PATH, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()

class TransformedRecipe(Base):
    __tablename__ = "recipes"
    id = Column(Integer, primary_key=True, index=True)
    original_name = Column(String)
    goal = Column(String)
    transformed_text = Column(Text)

class RecipeQnA(Base):
    __tablename__ = "questions"
    id = Column(Integer, primary_key=True, index=True)
    question = Column(Text)
    answer = Column(Text)
    recipe_json = Column(Text)

Base.metadata.create_all(bind=engine)

