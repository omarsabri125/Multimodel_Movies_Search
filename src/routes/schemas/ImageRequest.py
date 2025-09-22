from pydantic import BaseModel
from fastapi import UploadFile, File


class ImageRequest(BaseModel):
    image_file: UploadFile

    @classmethod
    def as_upload(cls, image_file: UploadFile = File(...)):

        return cls(image_file=image_file)
