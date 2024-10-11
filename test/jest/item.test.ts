import { Item, GildedRose } from "@/class/Item";

/**
 * Regular items
 */
describe("Regular items", () => {
  test("Decrease both `SellIn` and `Quality` by 1 at the end of each day", () => {
    // ARRANGE
    const items: Array<Item> = [new Item("Regular Name", 30, 10)];

    // ACT
    const gildedRose = new GildedRose(items);
    const result = gildedRose.updateQuality();

    // ASSERT
    expect(result![0]).not.toBe(null);
    expect(result![0].sellIn).toBe(29);
    expect(result![0].quality).toBe(9);
  });

  test("Once the `SellIn` date has passed, degrade `Quality` twice as fast", () => {
    // ARRANGE
    const items: Array<Item> = [new Item("Regular Name", 0, 10)];

    // ACT
    const gildedRose = new GildedRose(items);
    const result = gildedRose.updateQuality();

    // ASSERT
    expect(result![0]).not.toBe(null);
    expect(result![0].quality).toBe(8);
  });

  test("Ensure that the `Quality` of an item is never negative.", () => {
    // ARRANGE
    const items: Array<Item> = [new Item("Regular Name", 0, 0)];

    // ACT
    const gildedRose = new GildedRose(items);
    const result = gildedRose.updateQuality();

    // ASSERT
    expect(result![0]).not.toBe(null);
    expect(result![0].quality).toBeGreaterThanOrEqual(0);
  });
});

/**
 * Aged Brie
 */
describe("Aged Brie items", () => {
  test("increases in `Quality` the older it gets", () => {
    // ARRANGE
    const items: Array<Item> = [new Item("Aged Brie", 30, 10)];

    // ACT
    const gildedRose = new GildedRose(items);
    const result = gildedRose.updateQuality();

    // ASSERT
    expect(result![0]).not.toBe(null);
    expect(result![0].sellIn).toBe(29);
    expect(result![0].quality).toBe(11);
  });
  test("The `Quality` of an item is never more than `50`", () => {
    // ARRANGE
    const items: Array<Item> = [new Item("Aged Brie", 30, 50)];

    // ACT
    const gildedRose = new GildedRose(items);
    const result = gildedRose.updateQuality();

    // ASSERT
    expect(result![0]).not.toBe(null);
    expect(result![0].sellIn).toBe(29);
    expect(result![0].quality).toBeLessThanOrEqual(50);
  });
});

/**
 * Sulfuras
 */
describe("Sulfuras items", () => {
  test("`Sulfuras` does not decrease in `Quality` && maintained to `80`", () => {
    // ARRANGE
    const items: Array<Item> = [new Item("Sulfuras", 30, 50)];

    // ACT
    const gildedRose = new GildedRose(items);
    const result = gildedRose.updateQuality();

    // ASSERT
    expect(result![0]).not.toBe(null);
    expect(result![0].sellIn).toBe(29);
    expect(result![0].quality).toBe(80);
  });
});

/**
 * Backstage passes
 */
describe("Backstage passes items", () => {
  test("Increase by 2 if `SellIn` is 10 days or less", () => {
    // ARRANGE
    const items: Array<Item> = [new Item("Backstage passes", 10, 10)];

    // ACT
    const gildedRose = new GildedRose(items);
    const result = gildedRose.updateQuality();

    // ASSERT
    expect(result![0]).not.toBe(null);
    expect(result![0].sellIn).toBe(9);
    expect(result![0].quality).toBe(12);
  });
  test("Increase by 3 if `SellIn` is 5 days or less", () => {
    // ARRANGE
    const items: Array<Item> = [new Item("Backstage passes", 5, 10)];

    // ACT
    const gildedRose = new GildedRose(items);
    const result = gildedRose.updateQuality();

    // ASSERT
    expect(result![0]).not.toBe(null);
    expect(result![0].sellIn).toBe(4);
    expect(result![0].quality).toBe(13);
  });
  test("Drop `Quality` to 0 after the concert (when `SellIn` is 0 or less", () => {
    // ARRANGE
    const items: Array<Item> = [new Item("Backstage passes", 0, 10)];

    // ACT
    const gildedRose = new GildedRose(items);
    const result = gildedRose.updateQuality();

    // ASSERT
    expect(result![0]).not.toBe(null);
    expect(result![0].sellIn).toBe(-1);
    expect(result![0].quality).toBe(0);
  });
});

/**
 * Conjured
 */
describe("Conjured items", () => {
  test("Degrade `Quality` twice as fast as normal items", () => {
    // ARRANGE
    const items: Array<Item> = [new Item("Conjured", 30, 10)];

    // ACT
    const gildedRose = new GildedRose(items);
    const result = gildedRose.updateQuality();

    // ASSERT
    expect(result![0]).not.toBe(null);
    expect(result![0].sellIn).toBe(29);
    expect(result![0].quality).toBe(8);
  });
});
