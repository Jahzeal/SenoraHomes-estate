import os
import re
from collections import defaultdict

def scan_website():
    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    issues = defaultdict(list)

    for filename in html_files:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()

            # Check IDs
            ids = re.findall(r'id=["\']([^"\']+)["\']', content)
            id_counts = defaultdict(int)
            for i in ids:
                id_counts[i] += 1
            for i, count in id_counts.items():
                if count > 1:
                    issues['Duplicate IDs'].append(f"{filename}: #{i} used {count} times")

            # Check Links (href)
            links = re.findall(r'href=["\']([^"\']+)["\']', content)
            for link in links:
                if link.startswith(('http', 'https', '#', 'mailto:', 'tel:')):
                    # Check for double protocol
                    if 'https://https://' in link:
                         issues['Malformed Links'].append(f"{filename}: {link}")
                    continue

                # Check local files
                if not os.path.exists(link):
                     issues['Broken Links'].append(f"{filename}: Link to '{link}' not found")

            # Check Images (src)
            images = re.findall(r'src=["\']([^"\']+)["\']', content)
            for img in images:
                if img.startswith(('http', 'https', 'data:')):
                    continue
                if not os.path.exists(img):
                     issues['Broken Images'].append(f"{filename}: Image '{img}' not found")

    return issues

if __name__ == "__main__":
    results = scan_website()
    if not results:
        print("No critical issues found!")
    else:
        for category, items in results.items():
            print(f"\n--- {category} ---")
            for item in items:
                print(f"- {item}")
