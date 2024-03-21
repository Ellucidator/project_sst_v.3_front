import { Categories } from "@/types/catalogTypes"

type Props = {

    catalog: Categories[]
}
const FiltersOptions = ({catalog}:Props) => {

    return (
        <>
            {
                catalog.map((category)=>{

                    return(
                        <>
                            <div key={category.id}>
                                <input type="checkbox" id={category.name} name={category.name} />
                                <label htmlFor={category.name}>{category.name}</label>
                            </div>
                            {category.SubCategories.map((subCategory)=>{
                                return(
                                    <>
                                        <div key={`${category.name}-${subCategory.id}`}>
                                            <input type="checkbox" name={subCategory.name} id={subCategory.name} />
                                            <label htmlFor={subCategory.name}>{subCategory.name}</label>
                                        </div>
                                    </>
                                )
                            })}
                        </>
                    )
                })
            }
        </>
    )
}

export default FiltersOptions