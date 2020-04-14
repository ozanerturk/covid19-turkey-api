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
