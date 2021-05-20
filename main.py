import mysql.connector
import urllib3
import time
import datetime
import random
import string

mydb = mysql.connector.connect(
    host="localhost", user="root", password="toor", database="website_db")
mycursor = mydb.cursor()

global domians

def getDomains():
    global domains
    mycursor.execute("SELECT domain_name FROM websites_list")
    domains = mycursor.fetchall()
    urls = [None] * len(domains)
    for i in range(len(domains)):
        tmp = str(domains[i])
        sliceddomain = tmp[1:-2]
        domains[i] = sliceddomain
        slicedurl = tmp[2:-3]
        urls[i] = slicedurl
    return urls


def getStatus(k):
    urls = getDomains()
    res_code = [None] * len(urls)
    for i in range(len(urls)):
        print(i)
        print(urls[i])
        http = urllib3.PoolManager(timeout=8.0)
        try:
            response = http.request('GET', urls[i], retries=False)
        except urllib3.exceptions.ProtocolError:
            response.status = 900
        except urllib3.exceptions.ConnectTimeoutError:
            res.status = 800
        res_code[i] = str(response.status)
    postStatus(res_code, k, urls)


def postStatus(res_code, k, urls):
    global domains
    column_name = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'AM',
                   'AN', 'AO', 'AP', 'AQ', 'AR', 'AT', 'AU', 'AV', 'AW', 'AX', 'AY', 'AZ', 'BA', 'BB', 'BC', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BK', 'BL', 'BM', 'BN', 'BO', 'BP', 'BQ', 'BR', 'BS', 'BT', 'BU', 'BV', 'BW', 'BX']
    for i in range(len(res_code)):
        sql = "UPDATE websites_list SET {} = {} WHERE domain_name = {};".format(column_name[k], res_code[i], domains[i])
        mycursor.execute(sql)
        print(column_name[k])
    myresult = mycursor.fetchall()
    mydb.commit()

def main(k):
    getStatus(k)
    time.sleep(10)

if __name__ == "__main__":
    k = 0
    while True:
        main(k)
        k=k+1
