function Form(props) {
  return (
    <form onSubmit={props.handleClick}>
      <label>
        Item: <input value={props.value} onChange={props.handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

function Table(props) {
  let firstNames = props.names.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item}</td>
      </tr>
    );
  });
  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
        </tr>
      </thead>
      <tbody>{firstNames}</tbody>
    </table>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputField: "",
      firstNames: ["Joey", "Chloe"],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange(event) {
    this.setState({ inputField: event.target.value });
  }
  handleClick(event) {
    event.preventDefault();
    this.setState(
      {
        firstNames: [...this.state.firstNames, this.state.inputField],
        inputField: "",
      },
      console.log(this.state.firstNames)
    );
  }
  render() {
    return (
      <div>
        <Form
          value={this.state.inputField}
          handleChange={this.handleChange}
          handleClick={this.handleClick}
        />
        <Table names={this.state.firstNames} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
