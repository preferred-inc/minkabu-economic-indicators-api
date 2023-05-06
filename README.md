# minkabu-economic-indicators-api
api to get (scraping) economic-indicators from "minkabu"

## How to use

### package install
```
yarn
```

### run (dev)
```
yarn dev
```

### access
access for `http://localhost:3000/api/indicators?date={date}&minImpact={impact}` .

#### parameter

- `date` : string(YYYY-MM-DD)
  Which date and time economic indicators are retrieved.
- `impact` : int(1~5)
  What level of economic indicators do you get
  
