import urllib3, time


def getStatus(url):
    http = urllib3.PoolManager(timeout=5.0)
    try:
        startTime = time.time()
        r = http.request('GET', url, retries=False)
        response = r.status
    except urllib3.exceptions.ConnectTimeoutError as e:
        response = e
    except urllib3.exceptions.ProtocolError as e:
        response = e
    except urllib3.exceptions.ReadTimeoutError as e:
        response = "599"
    except urllib3.exceptions.MaxRetryError as e:
        response = "900"  # timeout
    except urllib3.exceptions.URLSchemeUnknown as e:
        response = "901"  # urlschemeerror
    except urllib3.exceptions.SSLError as e:
        response = "902"  # sslerror
    except urllib3.exceptions.NewConnectionError as e:
        response = "903"  # blockederror
    currentTime = time.time()
    conTime = currentTime*1000 - startTime*1000
    postStatus(response, url, conTime)


def postStatus(response, url, conTime):
    print(response, url, conTime)


if __name__ == '__main__':
    while True:
        list = ["https://parjanyamodi.com/", "ftp://google.com", "https://goole.com", "https://instagram.com/",
            "https://campus.bmsce.ac.in/student", "https://1337x.is/"]
        for i in range(len(list)):
            getStatus(list[i])
        time.sleep(10)
        print('''
        
        
        
        
        
        ''')

