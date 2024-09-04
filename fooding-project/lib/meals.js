import fs from "node:fs";

import sql from "better-sqlite3";
import slugify from "node_modules/slugify/slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  //throw new Error('Loading meals failed.');
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug == ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  // cut off extension and define new file name with slug and extension
  const extension = meal.image.name.split(".").pop();
  const filename = `${meal.slug}.${extension}`;

  // write the image object to a buffer to store it on the filesystem (under the defined path)
  const stream = fs.createWriteStream(`public/images/${filename}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed.");
    }
  });

  // write the path of the image to the meal object (and later to db)
  meal.image = `/images/${filename}`;

  return db.prepare(`
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `).run(meal);
}
