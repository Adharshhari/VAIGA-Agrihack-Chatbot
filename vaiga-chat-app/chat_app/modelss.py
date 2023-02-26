import pandas as pd
import numpy as np
import nltk
import random
from sklearn.svm import LinearSVC
from nltk.classify.scikitlearn import SklearnClassifier
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import joblib


def chatbot_response(user_input):
    # data = pd.read_csv('chat_app/dataset.csv')
    data = pd.read_csv('chat_app/jnewfile2.csv')

    vectorizer = TfidfVectorizer()
    X = vectorizer.fit_transform(data['question'].values.astype('U'))
    # Train the model and assign to a variable
    clf = LinearSVC()
    clf.fit(X, data['answer'])
    joblib.dump(clf, 'chatbot_model.joblib')
    input_vec = vectorizer.transform([user_input])
    predicted = clf.predict(input_vec)
    response = predicted[0]
    return response


# user_input = 'What are the different types of soil found?'
# print(chatbot_response(user_input))
