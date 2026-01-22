import os
import sys

try:
    from PIL import Image
except ImportError:
    print("Pillow is not installed. Installing...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pillow"])
    from PIL import Image

def generate_icons(source_path):
    if not os.path.exists(source_path):
        print(f"Error: Source file {source_path} not found.")
        return

    img = Image.open(source_path)
    
    # Ensure it's square
    w, h = img.size
    if w != h:
        print(f"Warning: Source image is not square ({w}x{h}). It will be resized/cropped.")
        # Simple resize for now, assuming the logo is roughly square or centered
    
    # Generate favicon.ico (16, 32, 48)
    img.save("favicon.ico", format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
    print("Generated favicon.ico")

    # Generate Apple Touch Icon (180x180)
    apple = img.resize((180, 180), Image.Resampling.LANCZOS)
    apple.save("apple-touch-icon.png")
    print("Generated apple-touch-icon.png")

    # Generate Android Icon (192x192)
    android192 = img.resize((192, 192), Image.Resampling.LANCZOS)
    android192.save("icon-192.png")
    print("Generated icon-192.png")

    # Generate Android Icon (512x512)
    android512 = img.resize((512, 512), Image.Resampling.LANCZOS)
    android512.save("icon-512.png")
    print("Generated icon-512.png")

if __name__ == "__main__":
    generate_icons("logo-f.png")
