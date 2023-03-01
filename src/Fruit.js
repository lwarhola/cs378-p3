import React from 'react';
import './App.css';

class Fruit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currFruit: "Malus",
            fruits: ["Malus", "Prunus", "Rubus"],
            fruitData: []
        };
        this.HandleChange = this.HandleChange.bind(this);
        this.setStateHandler = this.setStateHandler.bind(this);
        this.setFruitHandler = this.setFruitHandler.bind(this);
        this.UpdateList("Malus");
    }

    AddFruit() {
        console.log(this.state.currFruit);
        fetch('https://fruityvice.com/api/fruit/genus/' + this.state.currFruit)
            .then(data => data.json())
            .then(info => {
                let genus = info[0].genus;
                this.setFruitHandler(genus);
                this.UpdateList(genus);
            })
            .catch(error => {
                if (error) { 
                    alert("This fruit genus does not exist or is spelled incorrectly. Try again.")
                }
             })
    }

    UpdateList(genus) {
        fetch('https://fruityvice.com/api/fruit/genus/' + genus)
            .then(data =>
                data.json()).then((i) => {
                    let fruitData = [];
                    i.map((info) => {
                        return fruitData.push({
                            "genus": info.genus,
                            "name": info.name,
                            "id": info.id,
                            "family": info.family,
                            "order": info.order,
                            "nutritions": {
                                "carbohydrates": info.nutritions.carbohydrates,
                                "protein": info.nutritions.protein,
                                "fat": info.nutritions.fat,
                                "calories": info.nutritions.calories,
                                "sugar": info.nutritions.sugar
                            }
                        }
                        )})
                    this.setStateHandler(fruitData)})
            .catch(error => { 
                if (error) { 
                    alert("Could not find fruit genus, try another.")
                }
            });
    }

    setFruitHandler(fruit) {
        this.state.fruits.push(fruit);
        this.setState({ currFruit: fruit ,fruits: this.state.fruits });
    }

    setStateHandler(fruit) {
        this.setState({ fruitData: fruit });
    }

    HandleChange(event) {
        this.setState({ currFruit: event.target.value });
        if (event.target.id === "button") {
            this.UpdateList(event.target.value);
        } else if (event.target.id === "submit") { 
            this.AddFruit();
        }
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.fruits.map(fruit => <button value={fruit} id="button" onClick={this.HandleChange}>{fruit}</button>)}
                </div>
                <div class="titles">
                    Add Fruit Genus?
                </div>
                <div>
                    <input type='text' id="input" onChange={this.HandleChange}></input>
                    <button id="submit" onClick={this.HandleChange}>Submit</button>
                </div>
                <div class="titles">Fruits</div>
                    {this.state.fruitData.map(fruit => 
                        <div class="row">
                            <div class="fruitName">Fruit: {fruit.name}, Genus: {fruit.genus}</div>
                            <div>ID: {fruit.id}</div>
                            <div>Family: {fruit.family}</div>
                            <div>Order: {fruit.order}</div>
                            <div class="nutrition">Nutritions:</div>
                            <div>Carbs: {fruit.nutritions.carbohydrates}</div>
                            <div>Protein: {fruit.nutritions.protein}</div>
                            <div>Fat: {fruit.nutritions.fat}</div>
                            <div>Calories: {fruit.nutritions.calories}</div>
                            <div>Sugar: {fruit.nutritions.sugar}</div>
                        </div>
                    )}
            </div>

        );
    }
}

export default Fruit;