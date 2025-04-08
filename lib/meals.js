import sql from 'better-sqlite3'
import slugify from 'slugify'
import xss from 'xss'
import fs from 'node:fs'

const db = sql('meals.db')

export async function getMeals() {
    //console.log(db);

    await new Promise((resolve) => setTimeout(resolve, 2000))

    return db.prepare('SELECT * FROM meals').all()
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true })
    meal.instuctions = xss(meal.instuctions)
    const extension = meal.image.name.split('.').pop()
    const filename = `${meal.slug}.${meal.extension}`

    const stream = fs.createWriteStream(`public/images/${filename}`)
    const bufferedImage = await meal.image.arrayBuffer()

    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error("Can not upload meal image")
        }

    })

    meal.image = `/images/${filename}`

    db.prepare(`
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
        `).run(meal)
}