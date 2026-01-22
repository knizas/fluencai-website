#!/bin/bash

SOURCE="logo-f.png"

if [ ! -f "$SOURCE" ]; then
    echo "Error: $SOURCE not found"
    exit 1
fi

echo "Generating icons from $SOURCE..."

# Generate standard favicon (32x32) - saving as .ico for compatibility (safari/chrome handle png in ico fine mostly, but better to use png ext in html)
# We will generate pngs and update html to use them
sips -z 32 32 "$SOURCE" --out "favicon-32x32.png"

# Generate Apple Touch Icon (180x180)
sips -z 180 180 "$SOURCE" --out "apple-touch-icon.png"

# Generate Android Icons
sips -z 192 192 "$SOURCE" --out "icon-192.png"
sips -z 512 512 "$SOURCE" --out "icon-512.png"

# Create a favicon.ico by copying the 32x32 png (meh, but works for modern browsers if mime type is ok, or we just rely on the png links)
cp "favicon-32x32.png" "favicon.ico"

echo "Done."
