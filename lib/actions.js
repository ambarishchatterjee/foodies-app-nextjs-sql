'use server'


import { redirect } from "next/navigation"
import { saveMeal } from "./meals"

export const shareMeal = async (formData) => {

    const isInvalid = (text) => {
        return !text || text === ''
    }

    const meal = {
        creator: formData.get('name'),
        creator_email: formData.get('email'),
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image')
    }
    if (isInvalid(meal.title) || isInvalid(meal.creator) || isInvalid(meal.instructions) || isInvalid(meal.summary) || isInvalid(meal.creator_email) || !meal.creator_email.includes('@') || !meal.image || meal.image.size === 0) {
        throw new Error("Invalid Input");

    }
    await saveMeal(meal)
    redirect('/meals')
}