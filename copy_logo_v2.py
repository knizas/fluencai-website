import shutil
import os

# Note: Using the path exactly as provided in the workspace info
source = "/Users/kenzaalaouisosse/.gemini/antigravity/brain/4591c108-de5a-46ec-b7f1-18f20cd150c5/uploaded_image_1769077431747.png"
destination = "logo-f.png"

try:
    shutil.copy2(source, destination)
    print(f"Successfully copied logo to {os.path.abspath(destination)}")
except Exception as e:
    print(f"Error copying file: {e}")
