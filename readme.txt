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

   