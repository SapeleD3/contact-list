import React, {Component} from "react"

class App extends Component {
    constructor () {
        super()
        this.state = {
            isLoading: false,
            character: {},
            isLoggedin: true,
            firstName: "",
            lastName: ""
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.setState({isLoading: true})
        fetch("https://swapi.co/api/people/3")
            .then(Response => Response.json())
            .then(data => {
                this.setState({
                    isLoading: false,
                    character: data
                })
            })
    }

    handleClick() {
        this.setState(prevState => {
            return {isLoggedin: !prevState.isLoggedin}
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
 
        const text = ()=> {
            if (this.state.isLoggedin === true){
                return <h1>Logged in</h1>
            } else {
                return <h1>Logged out</h1>
            }
        }

        let buttonText = this.state.isLoggedin === true ? "LOG OUT" : "LOG IN"
        let tx2 = this.state.isLoading === true ? "Loading ....." : this.state.character.name


        return(
            <div>
                {text()}
                <button onClick={ this.handleClick } >{buttonText}</button><br/>
                <h1>{tx2}</h1>
                <form >
                    <input type="text" name="firstName" placeholder="first Name" onChange={this.handleChange}/>
                    <input type="text" name="lastName" placeholder="last Name" onChange={this.handleChange}/>
                    <h1>{this.state.firstName} {this.state.lastName}</h1> 
                </form>
            </div>
        )
    }
}
export default App