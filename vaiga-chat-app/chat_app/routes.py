# import requests
from chat_app import app
from flask import render_template, jsonify
from googletrans import Translator
from chat_app.modelss import chatbot_response
import csv

@app.route('/')
def home_page():
    return render_template('index.html')


@app.route('/chat/<string:message>', methods=['GET', 'POST'])
def chat(message):
    translator = Translator()
    translated = translator.translate(message, dest='en').text
    return jsonify({"message": "hello "+translated})


@app.route('/<string:message>')
def respose(message):

   
    # translating user query to english
    translator = Translator()
    translated = translator.translate(message, dest='en').text
    print(translated)

    match = match_location(message)

    if(match):
        return jsonify({"message": " "+match})
    else:
   # match = match_keywords(translated)
    # matched_location_index = match_locations()
    # if matched_location_index > 0:
    #     return jsonify({"message": "you can buy tools from ......"})
    # # else produce result and translate back to english
    # else:
        data = chatbot_response(translated)
        # print(data)
        resposeData = translator.translate(data, dest='ml').text
        print(resposeData)
        return jsonify({"message": " "+resposeData})


# if match found return



def match_location(location):

    splitted = location.lower().split(" ")
    # print(splitted)
    with open('chat_app/kbcontactinfo.csv') as csvfile:
        csvreader = csv.reader(csvfile)
        for row in csvreader:
            # print(row[0])
            for word in splitted:
                if(row[0].lower() == word):
                    return row[1]
        return False



 

