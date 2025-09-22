from pydantic import BaseModel


class TextSearch(BaseModel):

    text: str
