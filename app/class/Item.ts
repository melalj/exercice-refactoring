import { logger } from "@/lib/logger";

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    try {
      for (let i = 0; i < this.items.length; i++) {
        let degradation: number = -1;

        // Once the sell by date has passed, `Quality` degrades twice as fast
        if (this.items[i].sellIn <= 0) {
          degradation = -2;
        }

        // __"Aged Brie"__ actually increases in `Quality` the older it gets
        if (this.items[i].name.toLowerCase() == "aged brie") {
          degradation = +1;
        }

        // __"Sulfuras"__, being a legendary item, never has to be sold or decreases in `Quality`
        if (this.items[i].name.toLowerCase() == "sulfuras") {
          degradation = 0;
        }

        if (this.items[i].name.toLowerCase() == "backstage passes") {
          // `Quality` increases by `2` when there are `10` days or less and by `3` when there are `5` days or less but
          if (this.items[i].sellIn <= 5) {
            degradation = +3;
          } else if (this.items[i].sellIn <= 10) {
            degradation = +2;
          }

          //  `Quality` drops to `0` after the concert
          if (this.items[i].sellIn <= 0) {
            degradation = 0;
            this.items[i].quality = 0;
          }
        }

        // __"Conjured"__ items degrade in `Quality` twice as fast as normal items
        if (this.items[i].name.toLowerCase() == "conjured") {
          degradation = -2;
        }

        // Lower or Heigher value of quality
        this.items[i].quality += degradation;

        //  Maintain the `Quality` of sulfuras at `80`
        if (this.items[i].name.toLowerCase() == "sulfuras") {
          this.items[i].quality = 80;
          // The `Quality` of an item is never more than `50`
        } else if (this.items[i].quality > 50) {
          this.items[i].quality = 50;
        }

        //  The `Quality` of an item is never negative
        if (this.items[i].quality < 0) {
          this.items[i].quality = 0;
        }

        // DEBUG
        //console.log({ degradation });
        //console.log(this.items);

        // Lower value of sellIn
        this.items[i].sellIn--;
      }

      return this.items;
    } catch (error) {
      logger.error(error);
      return null;
    }
  }
}
