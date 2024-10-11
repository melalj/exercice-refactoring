// Imports
import * as dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
import { logger } from "@/lib/logger";
import { Item, GildedRose } from "@/class/Item";

// Catch unhandled Errors
process.on("uncaughtException", (error) => {
  if (process.env.NODE_ENV == "production") {
    // TODO: Do something
    logger.log("error", error);
  } else if (process.env.NODE_ENV == "staging") {
    // TODO: Do something
    logger.log("error", error);
  } else if (process.env.NODE_ENV == "development") {
    logger.log("error", error);
  } else {
    // TODO: Do something
    logger.log("error", error);
  }
});

// const items: Array<Item> = [
//   new Item("aged brie", 30, 10),
//   new Item("name 01", 30, 10),
//   new Item("name 02", 30, 20),
// ];

// console.log("OLD VALUES", items);
// const gildedRose = new GildedRose(items);
// console.log("NEW VALUES", gildedRose.updateQuality());
