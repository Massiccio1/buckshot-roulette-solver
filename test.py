import http.client

conn = http.client.HTTPSConnection("api.waifu.pics")

payload = "{'exclude\': []}"

conn.request("POST", "/many/sfw/wink", payload)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))