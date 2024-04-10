// import { Categories } from "@/types/catalogTypes"
// import SubCategoryFilter from "./subCategoryFilter"
// import styles from './styles.module.scss'
// type Props = {
//     catalog: Categories[]
// }
// const CategoryFilter = ({ catalog }: Props) => {
//     return (
//         <div className={styles.container}>
//             {
//                 catalog.map((category) => {
//                     return (
//                         <div className={styles.categoryList}>
//                             <div key={category.id} className={styles.category}>
//                                 <input 
//                                 type="checkbox" 
//                                 id={category.name} 
//                                 name={category.name}
//                                 className={styles.checkbox} 
//                                 />
//                                 <label htmlFor={category.name} className={styles.label}>{category.name}</label>

//                             </div>
//                             {<SubCategoryFilter subCategories={category.SubCategories} />}
//                         </div>
//                     )
//                 })
//             }
//         </div>
//     )
// }

// export default CategoryFilter