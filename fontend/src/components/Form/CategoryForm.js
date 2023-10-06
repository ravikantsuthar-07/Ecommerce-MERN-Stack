import React from 'react'

const CategoryForm = ({handleSubmit, value, setValue}) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" className="form-control" value={value} onChange={(e)=>setValue(e.target.value)} placeholder='Enter New Category'/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CategoryForm
