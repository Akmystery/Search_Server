import json
import pandas as pd
import numpy as np

# with open('test.json') as f:
#     data = json.load(f)
#     k = 0
#     w = 2
#     h = len(data)
#     csv = [[0 for x in range(w)] for y in range(h)] 
#     while(k < len(data)):
#         # csv[k][0] = data[k]['summary'] + data[k]['name']
#         csv[k][0] = data[k]['name']
#         csv[k][1] = data[k]['category']
#         k = k + 1

# df = pd.DataFrame(csv)
# df.to_csv(r'tt.csv',index=False)
    

f_video = open('data_video.json')
f_computer = open('data_computers.json')
f_toys = open('data_toys.json')

data_video = json.load(f_video)
data_computer = json.load(f_computer)
data_toys = json.load(f_toys)

i = 0
k = 0
w = 2
h = 1400*3
csv = [[0 for x in range(w)] for y in range(h)] 
while(k < h):
    csv[k][0] = data_video[i]['name']
    csv[k][1] = data_video[i]['category']
    csv[k+1][0] = data_computer[i]['name']
    csv[k+1][1] = data_computer[i]['category']
    csv[k+2][0] = data_toys[i]['name']
    csv[k+2][1] = data_toys[i]['category']
    k = k + 3
    i = i + 1

df = pd.DataFrame(csv)
df.to_csv(r'tt.csv',index=False)