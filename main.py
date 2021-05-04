import mysql.connector
import requests
import threading
import datetime
import random
import string
global domains
global column_name
mydb = mysql.connector.connect(
    host="localhost", user="root", password="toor", database="website_db")
mycursor = mydb.cursor()

def createColumnname():
    global column_name
    column_name = [None] * 100
    sample_string = 'pqrstuvwxy'
    for i in range(100):
        column_name[i] = ''.join((random.choice(sample_string)) for x in range(4))

def getDomains():
    global domains
    mycursor.execute("SELECT domain_name FROM websites_list")
    domains = mycursor.fetchall()
    print(domains)
    print(domains[0])
    urls = [None] * len(domains)
    for i in range(len(domains)):
        tmp = str(domains[i])
        sliceddomain = tmp[1:-2]
        domains[i] = sliceddomain
        slicedurl = tmp[2:-3]
        urls[i] = slicedurl
    return urls


def getStatus(urls, k):
    res_code = [None] * len(urls)
    for i in range(len(urls)):
        print(i)
        print(urls[i])
        response = requests.get(urls[i])
        res_code[i] = str(response.status_code)

    postStatus(res_code, k)


def postStatus(res_code, k):
    global domains
    sql = "ALTER table websites_list ADD COLUMN {} VARCHAR(255)".format(column_name[k])
    mycursor.execute(sql)
    for i in range(len(domains)):
        sql = "UPDATE websites_list SET {} = {};".format(column_name[k], res_code[i])
        print(res_code[i])
        mycursor.execute(sql)
    myresult = mycursor.fetchall()
    mydb.commit()


if __name__ == "__main__":
    createColumnname()
    for i in range(100):
        urls = getDomains()
        getStatus(urls, i)
