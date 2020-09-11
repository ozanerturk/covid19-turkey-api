# covid19-turkey-api  ![Node.js CI](https://github.com/ozanerturk/covid19-turkey-api/workflows/Node.js%20CI/badge.svg?branch=master&event=schedule)

![Image of Application](/assets/web.png)

### [Website](https://ozanerturk.github.io/covid19-turkey-api/)

## Datasets

### [JSON](https://raw.githubusercontent.com/ozanerturk/covid19-turkey-api/master/dataset/timeline.json)

### [CSV](https://raw.githubusercontent.com/ozanerturk/covid19-turkey-api/master/dataset/timeline.csv)

![Telegram Channel](/assets/telegram.png)
### [Telegram (Join Telegram channel for recent updates)🦠Covid19 Turkey Report](https://t.me/Covid19TurkeyReport) 
https://t.me/Covid19TurkeyReport

~Bu uygulama her 5 dakikada bir [T.C. Sağlık Bakanlığı Korona Tablosu](https://covid19.saglik.gov.tr/covid19api?getir=sondurum) adresindeki~  bilgiler ile verisetlerini günceller. Uygulama doğrudan Github Actions üzerinde çalışır. [dataset](dataset) klasörünün içinde güncel data JSON ve CSV olarak barınmaktadır.~~ 

Artık bakanlık'da bilgileri geliştirdikleri api üzerinden alıyor. Bu depo da bakanlığın baktığı api'yi kullanmaktadır.
- Son durum: https://covid19.saglik.gov.tr/covid19api?getir=sondurum
- Liste: https://covid19.saglik.gov.tr/covid19api?getir=liste

Geriye dönük bilgiler aşağıdaki kaynaklar kullanılarak elde edilmiştir.

-----

*This application updates data sets by retrieving data from  the api of Turkish Ministry of Health ~~pulling data from the website of the [Turkish Ministry of Health](https://covid19.saglik.gov.tr/covid19api?getir=sondurum)~~ every 5 minutes. Application works directly over Github Actions. Most recent data can be found in [dataset](dataset) folder in JSON and CSV format.*

Now Turkish Ministry of Health using their api to retrieve data. This repository now using the same api endpoints.
- Recent status: https://covid19.saglik.gov.tr/covid19api?getir=sondurum
- List: https://covid19.saglik.gov.tr/covid19api?getir=liste

*Historical data has been obtained from the datasources listed below.*

-----

**Other APIs related to COVID-19:**

* [https://covid-19-apis.postman.com](https://covid-19-apis.postman.com)

**Kaynaklar/Resources:**

* [T.C. Sağlık Bakanlığı Korona Tablosu](https://covid19.saglik.gov.tr)
* [Türkiye Cumhuriyeti Sağlık Bakanı - Minister of Health of the Republic of Turkey](https://twitter.com/drfahrettinkoca)
* [COVID-19 Türkiye Web Portalı (TÜBİTAK)](https://covid19.tubitak.gov.tr/turkiyede-durum)

<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text"><a rel="cc:attributionURL" property="dct:title" href="https://ozanerturk.github.io/covid19-turkey-api/">COVID19-Turkey-API</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/ozanerturk/">Ozan Ertürk</a> is licensed under <a rel="license" href="https://creativecommons.org/publicdomain/zero/1.0">CC CC0 1.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" /><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/zero.svg?ref=chooser-v1" /></a></p>
