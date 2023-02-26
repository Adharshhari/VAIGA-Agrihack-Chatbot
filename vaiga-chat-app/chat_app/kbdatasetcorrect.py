import csv
# import pandas as pd

# data = pd.read_csv('samplekbdataset.csv')
# print(data)
# new_list = []
# new_new_list = list(data)
# print(new_new_list)
# for i in data:
#     new_new_list.append()
# print(new_list)
with open('samplekbdataset.csv') as file:
    fileReader = csv.reader(file, delimiter='\n')
    newList = list()
    for line in fileReader:
        if (line) and (line != "VM47138:3 "):
            newList.append(line)
    print(newList)
