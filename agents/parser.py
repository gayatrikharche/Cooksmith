import re

def parse_recipe_text(raw_text: str) -> dict:
    lines = raw_text.strip().splitlines()
    data = {
        "title": None,
        "ingredients": [],
        "steps": [],
        "prep_time": None,
        "cook_time": None,
        "makes": None,
        "nutrition": {}
    }

    section = None
    for line in lines:
        line = line.strip()

        if not line:
            continue

        if not data["title"]:
            data["title"] = line
            continue

        if re.search(r"ingredients", line, re.IGNORECASE):
            section = "ingredients"
            continue
        elif re.search(r"directions|instructions", line, re.IGNORECASE):
            section = "steps"
            continue
        elif re.search(r"nutrition facts", line, re.IGNORECASE):
            section = "nutrition"
            continue
        elif re.search(r"prep time|cooking time|makes", line, re.IGNORECASE):
            section = "meta"

        if section == "ingredients":
            data["ingredients"].append(line)
        elif section == "steps":
            data["steps"].append(line)
        elif section == "meta":
            if "prep" in line.lower():
                data["prep_time"] = line
            elif "cook" in line.lower():
                data["cook_time"] = line
            elif "make" in line.lower():
                data["makes"] = line
        elif section == "nutrition":
            match = re.match(r"(.*?):\s*(.*)", line)
            if match:
                key, value = match.groups()
                data["nutrition"][key.strip().lower()] = value.strip()

    return data

