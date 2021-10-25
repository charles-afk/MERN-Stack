import React from 'react'
import {useCategory} from './hooks/useCategory'
interface Categories {
    [index:string]: string | undefined,
    rating?:string,
    series?:string,
    condition?:string,
    language?:string,
    format?:string,
    publisher?:string,
    nonstock?:string
}
interface Comics {
    [index:string]: string | number | undefined,
    product_id?:string,
    name?:string,
    description?:string,
    format?:string,
    instock?:string,
    language?:string,
    picture?:string,
    price?:string | number,
    publisher?:string,
    rating?:string,
    series?:string
}
interface Props {
    category: Categories,
    setCategory: React.Dispatch<React.SetStateAction<Categories>>,
    setComics: React.Dispatch<React.SetStateAction<Comics[]>>,
    comics: Comics[]
}
export const Sidebar: React.FC<Props> = (props) => {
    const {category,setCategory,setComics} = props
    const {handleClick,checked} = useCategory(setCategory,category)
    return (
        <div>
            <nav className="panel">
                <p className="panel-heading">
                    Search Categories
                </p>

                <div className="panel-block is-active">
                    <span className="panel-icon"><i className="fas fa-book" aria-hidden="true"/></span>
                    <span className="rate-title">Average Customer Review:</span>

                    <select className="rate-select" onChange={(e)=>{
                        const selectedNumber=e.target.value
                        setCategory({
                            ...category,
                            rating:selectedNumber
                        })
                    }}>
                         <option value={undefined}>{undefined}</option>
                         <option value="5">5 Stars</option>
                         <option value="4">4 Stars</option>
                         <option value="3">3 Stars</option>
                         <option value="2">2 Stars</option>
                         <option value="1">1 Stars</option>
                    </select>

                </div>


                <div className="panel-block">
                    <span className="panel-icon"><i className="fas fa-book" aria-hidden="true"/></span>
                    <span className="rate-title">Book Series: </span>

                    <select className="rate-select" onChange={(e)=>{
                        const selectedSeries=e.target.value
                        setCategory({
                            ...category,
                            series:selectedSeries
                        })
                    }}>
                         <option value={undefined}>{undefined}</option>
                         <option value="The Avengers">The Avengers</option>
                         <option value="The Brave and the Bold">The Brave and the Bold</option>
                         <option value="Spider-Man">Spider-Man</option>
                    </select>

                </div>

                <div className="panel-block">
                    <span className="panel-icon"><i className="fas fa-book" aria-hidden="true"/></span>
                    <span className="rate-title">Condition: </span>
                    <select className="rate-select" onChange={(e)=>{
                        const selectedCondition=e.target.value
                        setCategory({
                            ...category,
                            condition:selectedCondition
                        })
                    }}>
                         <option value={undefined}>{undefined}</option>
                         <option value="New">New</option>
                         <option value="Used">Used</option>
                         <option value="Bad">Bad</option>
                    </select>
                </div>


                <div className="panel-block">
                    <span className="panel-icon"><i className="fas fa-book" aria-hidden="true"/></span>
                    <span className="rate-title">Book Language: </span>
                    <select className="rate-select" onChange={(e)=>{
                        const selectedLanguage=e.target.value
                        setCategory({
                            ...category,
                            language:selectedLanguage
                        })
                    }}>
                         <option value={undefined}>{undefined}</option>
                         <option value="English">English</option>
                         <option value="Spanish">Spanish</option>
                         <option value="Korean">Korean</option>
                    </select>
                </div>


                <div className="panel-block">
                    <span className="panel-icon"><i className="fas fa-code-branch" aria-hidden="true"/></span>
                    <span className="rate-title">Format: </span>
                    <select className="rate-select" onChange={(e)=>{
                        const selectedFormat=e.target.value
                        setCategory({
                            ...category,
                            format:selectedFormat
                        })
                    }}>
                         <option value={undefined}>{undefined}</option>
                         <option value="Paper">Paper</option>
                         <option value="Hard Cover">Hard Cover</option>
                         <option value="eBook">eBook</option>
                    </select>
                </div>


                <div className="panel-block">
                    <span className="panel-icon"><i className="fas fa-code-branch" aria-hidden="true"/></span>
                    <span className="rate-title">Publisher: </span>
                    <select className="rate-select" onChange={(e)=>{
                        const selectedPublisher=e.target.value
                        setCategory({
                            ...category,
                            publisher:selectedPublisher
                        })
                    }}>
                         <option value={undefined}>{undefined}</option>
                         <option value="Marvel">Marvel</option>
                         <option value="DC Comics">DC Comics</option>
                    </select>
                </div>


                <label className="panel-block">
                    <input type="checkbox" checked={checked} onChange={handleClick}/>
                    <span className="rate-title"></span>Include Out of Stock
                </label>


                <div className="panel-block">
                    <button className="button is-link is-outlined is-fullwidth" onClick={()=>{
                        Object.keys(category).forEach(key => 
                            category[key] === undefined && delete category[key])

                        Object.keys(category).forEach(key => 
                            category[key] === "" && delete category[key])
                        
                        fetch('/categories/choice', {  
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', }, 
                            body: JSON.stringify(category),
                        }).then(response => response.json())
                            .then(data => setComics(data))
                            .catch((error) => console.error('Error:', error) );
                    }}>
                    Search
                    </button>
                </div>
            </nav>
        </div>
    )
}
