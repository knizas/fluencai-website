
import os

files = [
    "/Users/kenzaalaouisosse/Desktop/Thèse - Kenza ALAOUI SOSSÉ/Autre/F - App/F - Home Website/app-builder.html",
    "/Users/kenzaalaouisosse/Desktop/Thèse - Kenza ALAOUI SOSSÉ/Autre/F - App/F - Home Website/voice.html"
]

target_bad_string = '<link rel="icon" type="image/svg+xml" <link rel="icon" type="image/png" href="logo-f.png">'
replacement = '  <link rel="icon" type="image/png" href="logo-f.png">\n'

for path in files:
    try:
        with open(path, "r") as f:
            lines = f.readlines()
        
        modified = False
        for i, line in enumerate(lines):
            if target_bad_string in line:
                lines[i] = replacement
                modified = True
        
        if modified:
            with open(path, "w") as f:
                f.writelines(lines)
            print(f"Fixed {path}")
        else:
            print(f"No malformed line found in {path}")
            
    except Exception as e:
        print(f"Error processing {path}: {e}")
