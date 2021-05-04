import mysql.connector
import requests

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="toor",
  database="website_db"
)
mycursor = mydb.cursor()

mycursor.execute("SELECT * FROM websites_list")

myresult = mycursor.fetchall()

url = "activityportal.techalier.com/welcome.php"

x = requests.get(url)

status_code = x.status_code

sql = "INSERT INTO websites_list (domain_name, status_code) VALUES (%s, %s)"
val = (url, x.status_code)
mycursor.execute(sql, val)

mydb.commit()

print(x.status_code)

for x in myresult:
  print(x)