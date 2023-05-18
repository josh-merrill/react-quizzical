export default function Form(props) {

  const { categories, inputValues, handleChange, handleClick } = props

  const categoryOptions = categories.map((category) => {
      return (
        <option 
          key={category.id} 
          value={category.id}>
          {category.name}
        </option>
      )
    })
  
    return (
        <section className="form--section">
            <h1 className="welcome--title">Quizzical</h1>
            <p className="welcome--desc">Challenge your mind, expand your knowledge.</p>
            <div className="input-form">
                <label htmlFor="number" name="number" className="form--label">Choose your number of questions</label>
                <input
                  id="number"
                    type="number"
                    min="1"
                    max="50"
                    className="form-control"
                    name="number"
                    value={inputValues.number}
                    onChange={handleChange}
                />
                <label htmlFor="category" name="category" className="form--label">Choose your category</label>
                <select
                    id="category"
                    name="category"
                    className="form-control"
                    value={inputValues.category}
                    onChange={handleChange}
                >
                    {categoryOptions}
                </select>
                <label htmlFor="difficulty" name="difficulty" className="form--label">Set your difficulty level</label>
                <select
                    id="difficulty"
                    name="difficulty"
                    className="form-control"
                    value={inputValues.difficulty}
                    onChange={handleChange}
                >
                    <option value="any">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <label htmlFor="type" name="category" className="form--label">Choose your question type</label>
                <select
                    id="type"
                    name="type"
                    className="form-control"
                    value={inputValues.type}
                    onChange={handleChange}
                >
                    <option value="any">Any Type</option>
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">True / False</option>
                </select>
                <button className="button--large" onClick={handleClick}>
                    Start Quiz
                </button>
            </div>
        </section>
    )
}
