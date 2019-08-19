import json

count = 0
with open('data_sports.json') as f:
    data = json.load(f)

print(len(data))

