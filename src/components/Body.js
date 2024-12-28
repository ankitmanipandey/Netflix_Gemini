import React from 'react'
import Login from './Login'
import Browse from './Browse'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MovieInsights from './MovieInsights'

export default function Body() {
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/browse",
            element: <Browse />
        },
        {
            path: "trailer/:id",
            element: <MovieInsights />
        }
    ])
    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}
