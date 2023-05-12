import React, { useState, useEffect } from 'react'

export default function Form(props) {

    // Destructure all incoming props
    const {categories, inputValues, handleChange, handleClick} = props

    // Map over the categories prop and render each category value and name as an option dropdown
    const categoryOptions = categories.map(category => {
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
                <label name="number" className="form--label">Choose your number of questions</label>
                <input
                    type="number"
                    min="1"
                    max="50"
                    className="form-control"
                    name="number"
                    value={inputValues.number}
                    onChange={handleChange}
                />
                <label name="category" className="form--label">Choose your category</label>
                <select
                    className="form-control"
                    name="category"
                    value={inputValues.category}
                    onChange={handleChange}
                >
                    {categoryOptions}
                </select>
                <label name="difficulty" className="form--label">Set your difficulty level</label>
                <select
                    className="form-control"
                    name="difficulty"
                    value={inputValues.difficulty}
                    onChange={handleChange}
                >
                    <option value="any">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <label name="category" className="form--label">Choose your total questions</label>
                <select
                    className="form-control"
                    name="type"
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
