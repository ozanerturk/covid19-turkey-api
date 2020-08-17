# covid19-turkey-api  ![Node.js CI](https://github.com/ozanerturk/covid19-turkey-api/workflows/Node.js%20CI/badge.svg?branch=master&event=schedule)

![Image of Application](https://raw.githubusercontent.com/capan/covid19-turkey-api/master/assets/Screenshot%20from%202020-04-12%2021-44-44.png)

### [Website](https://ozanerturk.github.io/covid19-turkey-api/)

## Datasets

### [JSON](https://raw.githubusercontent.com/ozanerturk/covid19-turkey-api/master/dataset/timeline.json)

### [CSV](https://raw.githubusercontent.com/ozanerturk/covid19-turkey-api/master/dataset/timeline.csv)

Bu uygulama her 5 dakikada bir [T.C. Sağlık Bakanlığı Korona Tablosu](https://covid19.saglik.gov.tr) adresindeki bilgiler ile verisetlerini günceller. Uygulama doğrudan Github Actions üzerinde çalışır. [dataset](dataset) klasörünün içinde güncel data JSON ve CSV olarak barınmaktadır.

Geriye dönük bilgiler aşağıdaki kaynaklar kullanılarak elde edilmiştir.

-----

*This application updates data sets by pulling data from the website of the [Turkish Ministry of Health](https://covid19.saglik.gov.tr) every 5 minutes. Application works directly over Github Actions. Most recent data can be found in [dataset](dataset) folder in JSON and CSV format.*

*Historical data has been obtained from the datasources listed below.*

-----

**Other APIs related to COVID-19:**

* [https://covid-19-apis.postman.com](https://covid-19-apis.postman.com)

**Kaynaklar/Resources:**

* [T.C. Sağlık Bakanlığı Korona Tablosu](https://covid19.saglik.gov.tr)
* [Türkiye Cumhuriyeti Sağlık Bakanı - Minister of Health of the Republic of Turkey](https://twitter.com/drfahrettinkoca)
* [COVID-19 Türkiye Web Portalı (TÜBİTAK)](https://covid19.tubitak.gov.tr/turkiyede-durum)

<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text"><a rel="cc:attributionURL" property="dct:title" href="https://ozanerturk.github.io/covid19-turkey-api/">COVID19-Turkey-API</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/ozanerturk/">Ozan Ertürk</a> is licensed under <a rel="license" href="https://creativecommons.org/publicdomain/zero/1.0">CC CC0 1.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" /><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc0.svg?ref=chooser-v1" /></a></p>
