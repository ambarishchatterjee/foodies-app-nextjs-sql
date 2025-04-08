import React, { Suspense } from 'react'
import classes from "./page.module.css"
import Link from 'next/link'
import MealsGrid from '@/component/meals/meals-grid'
import { getMeals } from '@/lib/meals'

export async function Meals() {
    const meals = await getMeals()
    return <MealsGrid meals={meals} />
}

export default async function MealsPage() {

    return (
        <>
            <header className={classes.header}>
                <h1>Delicious meals created {' '}
                    <span className={classes.highlight}>by you</span>
                </h1>
                <p>Choose your favourite recipe and cook by yourself, it is easy and fun!</p>
                <p className={classes.cta}>
                    <Link href="/meals/share">
                        Share your favourite recipe
                    </Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
                    <Meals />
                </Suspense>
            </main>
        </>
    )
}
