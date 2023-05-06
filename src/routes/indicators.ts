import axios from "axios";
import cheerio from "cheerio";
import express, { Request, Response } from "express";
import { format } from "date-fns";
const router = express.Router();

// /api/indicators?minImpact=｛impactLevel}&date=｛date}
// impactLevel: int
// date: string (yyyy-MM-dd)

router.get("/", async (req: Request, res: Response) => {
  try {
    const date = req.query.date as string || format(new Date(), "yyyy-MM-dd");
    console.log(date);
    const minImpact = parseInt(req.query.minImpact as string) || 1;
    const url = "https://fx.minkabu.jp/indicators?date=" + date;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const indicators: any[] = [];
    
    $("table.tbl-border.tbl-fixed.tbl-alternate")
      .first()
      .find("tbody tr.fs-s")
      .each((_idx, el) => {
        const time = $(el).find("td.eilist__time span").text().trim();
        const country = $(el).find("a.flexbox img").attr("alt");
        const name = $(el).find("a.flexbox p.fbd").text().trim();
        let impacts = 0;
        $(el)
          .find("td.eilist__star img.i-star")
          .each((_idx, starEl) => {
            const starAlt = $(starEl).attr("alt") || "";
            if (starAlt.includes("fill")) {
              impacts++;
            }
          });
        /*
        const movement = $(el).find("td.eilist__move span").text().trim();
        const dataValue = $(el)
          .find("td.eilist__data:nth-child(6) span")
          .first()
          .text()
          .trim();
        const forecast = $(el)
          .find("td.eilist__data:nth-child(7) span")
          .text()
          .trim();
        const previous = $(el)
          .find("td.eilist__data:nth-child(8) span")
          .text()
          .trim();
        */

        if (impacts >= minImpact) {
          indicators.push({
            country,
            name,
            time,
            impacts,
            // movement,
            // dataValue,
            // forecast,
            // previous,
          });
        }
      });
    res.json(indicators);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
