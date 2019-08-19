 from nltk.corpus import stopwords
from nltk.cluster.util import cosine_distance
import numpy as np
import networkx as nx
import json
import re
import math

def sentence_similarity(sent1, sent2, stopwords=None):
    if stopwords is None:
        stopwords = []
 
    sent1 = [w.lower() for w in sent1]
    sent2 = [w.lower() for w in sent2]
 
    all_words = list(set(sent1 + sent2))
 
    vector1 = [0] * len(all_words)
    vector2 = [0] * len(all_words)
 
    # build the vector for the first sentence
    for w in sent1:
        if w in stopwords:
            continue
        vector1[all_words.index(w)] += 1
 
    # build the vector for the second sentence
    for w in sent2:
        if w in stopwords:
            continue
        vector2[all_words.index(w)] += 1
        
    if(math.isnan(cosine_distance(vector1,vector2))):
        return 0
    return 1 - cosine_distance(vector1, vector2)
 
def build_similarity_matrix(sentences, stop_words):
    # Create an empty similarity matrix
    similarity_matrix = np.zeros((len(sentences), len(sentences)))
 
    for idx1 in range(len(sentences)):
        for idx2 in range(len(sentences)):
            if idx1 == idx2: #ignore if both are same sentences
                continue 
            similarity_matrix[idx1][idx2] = sentence_similarity(sentences[idx1], sentences[idx2], stop_words)

    return similarity_matrix

with open('data_video.json','r+') as f:
    data = json.load(f)
    stop_words = stopwords.words('english')
    summarize_text = []
    sentences = []
    k = 0
    while(k < len(data)):
        count = 0
        for x in data[k]['reviews']:
            bulk_review = x['review_text'].split('. ')
            for review in bulk_review:
                review = re.sub('[^0-9A-Za-z\']+', ' ', review)
                r = review.split(" ")
                if(len(r) > 2):
                    sentences.append(r)
                if(count > 100):
                    break
                count = count + 1    
        sentences.append(['No','Review'])
        sentences.pop()
        sentence_similarity_martix = build_similarity_matrix(sentences, stop_words)
        sentence_similarity_graph = nx.from_numpy_array(sentence_similarity_martix)
        scores = nx.pagerank(sentence_similarity_graph)
        ranked_sentence = sorted(((scores[i],s) for i,s in enumerate(sentences)), reverse=True)
        sen_length = len(ranked_sentence)  
        for i in range(5):
            if(i < sen_length):
                summarize_text.append(" ".join(ranked_sentence[i][1]))
        summary = ". ".join(summarize_text)
        data[k]['summary'] = summary
        k = k + 1
        sentences = []
        summarize_text = []
        print(k)
    
    f.seek(0, 0)
    f.write(json.dumps(data))
    f.truncate()


print("Done!")
#print("Summarize Text: \n", ". ".join(summarize_text))
