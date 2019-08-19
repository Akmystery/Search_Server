import json
import re
import math

# with open('data_beauty.json','r+') as f:
#     data = json.load(f)
#     k = 0
#     while(k < len(data)):
#             s = data[k]['price']
#             s = re.sub('[^0-9.]','',s)
#             try:
#                  data[k]['price'] = float(s)
#             except:
#                  data[k]['price'] = math.nan
#             rating_5 = data[k]['ratings']['5 star']
#             rating_5 = re.sub('[^0-9]','',rating_5)
#             data[k]['ratings']['5 star'] = int(rating_5)
#             rating_4 = data[k]['ratings']['4 star']
#             rating_4 = re.sub('[^0-9]','',rating_4)
#             data[k]['ratings']['4 star'] = int(rating_4)
#             k = k + 1
#             print(k)
#     f.seek(0, 0)
#     f.write(json.dumps(data))
#     f.truncate()    

with open('data_video.json','r+') as f:
     data = json.load(f)
     k = 0
     while(k < len(data)):
          if(data[k]['price'] == 0.0):
               data[k]['price'] = math.nan
          k = k + 1
          print(k)
     f.seek(0, 0)
     f.write(json.dumps(data))
     f.truncate()   