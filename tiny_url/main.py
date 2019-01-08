class Codec:
    """
    - init an array to simulation database incremental IDs on incoming records
    - hash the database record ID(array index) with base62
    beats 29.54% on leetcode
    """

    def __init__(self):
        self.arr = []

    def encode(self, longUrl):
        """Encodes a URL to a shortened URL.
        :type longUrl: str
        :rtype: str
        """
        self.arr.append(longUrl)
        hashval = self.numToBase62(len(self.arr)-1)
        return "http://tinyurl.com/"+hashval

    def numToBase62(self, num):
        """
        encode 0-9 to [A-Za-z0-9]
        """
        base62 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        hashval = ""
        while True:
            # add the new hash to the front
            hashval = base62[num % 62] + hashval
            num /= 62
            if num == 0:
                break
        return hashval

    def decode(self, shortUrl):
        """Decodes a shortened URL to its original URL.
        :type shortUrl: str
        :rtype: str
        """
        shatters = shortUrl.split("/")
        return self.arr[self.base62ToNum(shatters[-1])]

    def base62ToNum(self, s):
        # optimization: use hashtable instead of array.index() to lookup
        base62 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        num = 0
        for ss in s:
            # 99 = 1*62+37
            num = num*62 + base62.index(ss)
        return num


# Your Codec object will be instantiated and called as such:
codec = Codec()
tinyurl = codec.encode("http://calvinchankf.com")
print(tinyurl)
longurl = codec.decode(tinyurl)
print(longurl)
tinyurl = codec.encode("https://www.linkedin.com/in/calvinchankf/")
print(tinyurl)
longurl = codec.decode(tinyurl)
print(longurl)


nn = codec.numToBase62(0)
print(nn)
nn = codec.numToBase62(1)
print(nn)
nn = codec.numToBase62(99)
print(nn)
nn = codec.numToBase62(999)
print(nn)
dd = codec.base62ToNum(nn)
print(dd)
