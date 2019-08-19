import json
import pandas as pd
import numpy as np
import re
import math

with open('data_computers.json') as f:
    data = json.load(f)
    
    count_good = 0
    count_avg = 0
    count_bad = 0

    good_review = [ 0 for x in range(3160)]
    avg_review =  [ 0 for x in range(3160)]
    bad_review =  [ 0 for x in range(3160)]

    k = 0
    while(k < len(data)):
        for x in data[k]['reviews']:
                x['review_text'] = x['review_text'].lower()
                x['review_text'] = re.sub('[^a-z ]','',x['review_text'])
                if x['review_text']: #in case, the string become empty
                    if x['rating_count'] == '5.0' and count_good < 3160:
                        good_review[count_good] = x['review_text']
                        count_good = count_good + 1
                    elif x['rating_count'] == '4.0' and count_avg < 3160:
                        avg_review[count_avg] = x['review_text']
                        count_avg = count_avg + 1
                    else:
                        if count_bad < 3160:
                            bad_review[count_bad] = x['review_text']
                            count_bad = count_bad + 1
        k = k + 1
# print(count_good) #12912
# print(count_avg) #3623
# print(count_bad) #5572 

n = 0
p = 0
w = 2
h = 3160*3
csv = [[0 for x in range(w)] for y in range(h)]  
while(n < h):
    csv[n][0] = good_review[p]
    csv[n][1] = 1
    csv[n+1][0] = avg_review[p]
    csv[n+1][1] = 0
    csv[n+2][0] = bad_review[p]
    csv[n+2][1] = -1
    n = n + 3
    p = p + 1

df = pd.DataFrame(csv)
df.to_csv(r'review.csv',index=False)
                     
            