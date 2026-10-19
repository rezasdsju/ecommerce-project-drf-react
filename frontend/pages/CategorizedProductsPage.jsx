
import { Suspense, use } from "react";

import { useParams } from "react-router-dom";
import CategoryDetails from "../components/CategoryDetails";
const categorizedProductsPromise = async ({slug}) => {

    const res = await fetch(`http://127.0.0.1:8000/api/categories/${slug}/`)
    if (!res.ok){
        throw new Error('Category fetch failed')
    }
    const data = await res.json()
    return data
}


const CategorizedProductsPage =  () => {
    const {slug} = useParams()
    const promise = categorizedProductsPromise({slug})

    return (
        <Suspense fallback='Loading Categorized Products data'>
            <CategoryDetails categorizedProductsPromise={promise}></CategoryDetails>
        </Suspense>
    )
}




export default CategorizedProductsPage;