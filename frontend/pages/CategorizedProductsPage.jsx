
import { Suspense, use, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import CategoryDetails from "../components/CategoryDetails";
// const categorizedProductsPromise = async ({ slug }) => {

//     const res = await fetch(`http://127.0.0.1:8000/api/categories/${slug}/`)
//     if (!res.ok) {
//         throw new Error('Category fetch failed')
//     }
//     const data = await res.json()
//     return data
// }


const CategorizedProductsPage = () => {
    const { slug } = useParams()
    console.log("Current slug:", slug);
    const [category, setCategory] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchCategory = async () => {
            setLoading(true)
            setError("")
            try {
                const res = await fetch(`${import.meta.env.VITE_DJANGO_BASE_URL}/api/categories/${slug}/`)
                if (!res.ok) {
                    throw new Error('Category fetch Failed')
                }
                const data = await res.json()
                setCategory(data)

            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }

        }
        fetchCategory()
    }, [slug])
    if (loading) return 'Loading Category page.....'
    if (error) return <p>{error}</p>;
    if (!category) return null;


    return (
 
            <CategoryDetails category={category}></CategoryDetails>
  
    )
}




export default CategorizedProductsPage;