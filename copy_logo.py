import shutil
import os

source = "/Users/kenzaalaouisosse/.gemini/antigravity/brain/4591c108-de5a-46ec-b7f1-18f20cd150c5/uploaded_image_1769077431747.png"
destination = "/Users/kenzaalaouisosse/Desktop/Thèse - Kenza ALAOUI SOSSÉ/Autre/F - App/F - Home Website/logo-f.png"

try:
    shutil.copy2(source, destination)
    print("Successfully copied logo to logo-f.png")
except Exception as e:
    print(f"Error copying file: {e}")
