
import os

files = [
    {
        "path": "/Users/kenzaalaouisosse/Desktop/Thèse - Kenza ALAOUI SOSSÉ/Autre/F - App/F - Home Website/app-builder.html",
        "favicon_start_line": 10,  # 1-based in view_file, so 0-based index 9
        "favicon_lines_count": 2
    },
    {
        "path": "/Users/kenzaalaouisosse/Desktop/Thèse - Kenza ALAOUI SOSSÉ/Autre/F - App/F - Home Website/voice.html",
        "favicon_start_line": 17, # 1-based 17 -> 0-based 16
        "favicon_lines_count": 2
    }
]

new_line = '  <link rel="icon" type="image/png" href="logo-f.png">\n'

for item in files:
    try:
        with open(item["path"], "r") as f:
            lines = f.readlines()
        
        # Check if the lines look like what we expect (heuristic)
        idx = item["favicon_start_line"] - 1
        if "data:image/svg+xml" in lines[idx] or "data:image/svg+xml" in lines[idx+1]:
             # Replace the two lines with the new one
             lines[idx] = new_line
             lines[idx+1] = "" # effectively delete the second line
             
             with open(item["path"], "w") as f:
                 f.writelines(lines)
             print(f"Updated {item['path']}")
        else:
            print(f"Skipped {item['path']} - content did not match expected pattern at line {item['favicon_start_line']}")
            print(f"Line {idx}: {lines[idx]}")
            print(f"Line {idx+1}: {lines[idx+1]}")

    except Exception as e:
        print(f"Error processing {item['path']}: {e}")
