# CZ-4034

The topic for our assignment will be Review based Amazon Information Retrieval System.


When shopping for a product, the first thing a customer would do is to look up for product information such as ratings and reviews online. We chose to crawl data from Amazon because Amazon is one of the top online marketplaces and has adopted the star-based rating system where the products are rated by customers from a scale of 5 stars being the highest to 1 star being the lowest. The overall star-based rating scores is a good indicator for the customers to contemplate whether to purchase the product or not.

However, the star-based rating score is not always accurate. Research has shown that the text reviews from customers must be taken into account in order to get a more accurate rating. Therefore in order to address this problem, our team have decided to develop an information retrieval system that could rank the products based on customer’s reviews.

In this assignment, we first crawl the necessary data on Amazon using the crawler we built. Before storing the crawled data into Solr, we will perform preprocessing on the crawled data such as product classification, review classification and review summarization. 

Afterward, we will store the preprocessed data into Solr and perform the indexing of the data extracted. Finally, we built the UI before adding additional features that could make the application easy for users to use.

Demo Link - https://www.youtube.com/watch?v=0AJvQt3BLok&t=17s

Read the detailed information about project in Project_report.pdf

------------------------------------------------------------
How to run Search Engine

1. Go to the Terminal
2. CD to the Search_Server
3. Type bin/solr start
4. Put the FrontEnd folder to MAMP or any hosting application. Host the FrontEnd in localhost.
5. Test the Search Engine
6. Type bin/solr stop to stop the server when it is done.

------------------------------------------------------------

Preprocessing

Inside Finalized_Data folder, there are Summarize.py script, which is for text summarisation. convert_price_rating.py file for converting price and rating string to integer.

ScrapData

1. Java -jar WoDeScraper.jar to get the text files containing ASINS.
2. Then Double Click Runner.jar to get the review in JSON format.

Classification

Run two python files "category_processing.py" and "review_preprocessing.py" to get csv file for classification.

Then open Jupyter Notebook to run two ipynb files for classification.
