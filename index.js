function TextInputField(props) {
  return (
    <label class={props.class}>
      {props.fieldName}
      <input
        name={props.name}
        type={props.type}
        value={props.displayValue}
        onChange={props.handleChange}
        required
      />
    </label>
  );
}

function SelectField(props) {
  let options = props.options.map((item, index) => {
    return <option key={index}>{item}</option>;
  });
  return (
    <label class={props.class}>
      Select Activity:
      <select
        name="selectedCourse"
        onChange={props.handleChange}
        value={props.selectedCourse}
      >
        {options}
      </select>
    </label>
  );
}

function Checkbox(props) {
  return (
    <label>
      <input
        type="checkbox"
        name={props.name}
        checked={props.checked}
        onChange={props.handleCheck}
      />
      {props.fieldName}
    </label>
  );
}

function CheckBoxes(props) {
  return (
    <div id="restrictions">
      Check all that apply:
      <Checkbox
        name="a"
        fieldName={props.options[0]}
        checked={props.checkboxes[0]}
        handleCheck={props.handleCheck}
      />
      <Checkbox
        name="b"
        fieldName={props.options[1]}
        checked={props.checkboxes[1]}
        handleCheck={props.handleCheck}
      />
      <Checkbox
        name="c"
        fieldName={props.options[2]}
        checked={props.checkboxes[2]}
        handleCheck={props.handleCheck}
      />
    </div>
  );
}

function RegistrationForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <h2>Class Registration</h2>
      <TextInputField
        fieldName="First Name:"
        name="inputFirstName"
        class="inputField"
        displayValue={props.inputFirstName}
        handleChange={props.handleChange}
      />
      <TextInputField
        fieldName="Last Name:"
        name="inputLastName"
        class="inputField"
        displayValue={props.inputLastName}
        handleChange={props.handleChange}
      />
      <SelectField
        class="inputField"
        selectedCourse={props.selectedCourse}
        options={["Science Lab", "Swimming", "Cooking", "Painting"]}
        handleChange={props.handleChange}
      />
      <CheckBoxes
        options={[
          " a) Dietary Restrictions",
          " b) Physical Restrictions",
          " c) Medical Needs",
        ]}
        checkboxes={props.checkboxes}
        handleCheck={props.handleCheck}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

function CourseTable(props) {
  const headers = [
    "Remove",
    "First Name",
    "Last Name",
    "Activity",
    "Restrictions",
  ];
  let tableHeaders = headers.map((header, index) => {
    return <th key={index}>{header}</th>;
  });

  let courses = props.courses.map((item, index) => {
    return (
      <tr name={index} key={index}>
        <td>
          <button class="removeBtn" onClick={props.handleDelete}>
            x
          </button>
        </td>
        <td>{item.firstName}</td>
        <td>{item.lastName}</td>
        <td>{item.activity}</td>
        <td>{item.restrictions}</td>
      </tr>
    );
  });
  return (
    <table>
      <thead>
        <tr>{tableHeaders}</tr>
      </thead>
      <tbody>{courses}</tbody>
    </table>
  );
}

class RegistrationApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFirstName: "",
      inputLastName: "",
      selectedCourse: "Science Lab",
      a: false,
      b: false,
      c: false,
      courses: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCheck(event) {
    this.setState({ [event.target.name]: event.target.checked });
  }

  handleSubmit(event) {
    event.preventDefault();
    // make a course
    let a = this.state.a ? "a" : "";
    let b = this.state.b ? "b" : "";
    let c = this.state.c ? "c" : "";
    let restrictions = a + b + c;
    let registration = {
      firstName: this.state.inputFirstName,
      lastName: this.state.inputLastName,
      activity: this.state.selectedCourse,
      restrictions: restrictions,
    };
    return this.setState({
      courses: [...this.state.courses, registration],
      inputFirstName: "",
      inputLastName: "",
      selectedCourse: "Science Lab",
      a: false,
      b: false,
      c: false,
    });
  }

  handleDelete(event) {
    let tableRow = event.target.parentNode.parentNode;

    let courses = this.state.courses.slice();
    courses.splice(Number(tableRow.getAttribute("name")), 1);

    this.setState({ courses: courses });
  }

  render() {
    return (
      <div id="App">
        <RegistrationForm
          inputFirstName={this.state.inputFirstName}
          inputLastName={this.state.inputLastName}
          selectedCourse={this.state.selectedCourse}
          checkboxes={[this.state.a, this.state.b, this.state.c]}
          // first last name input field value
          handleChange={this.handleChange}
          handleCheck={this.handleCheck}
          handleSubmit={this.handleSubmit}
        />
        <CourseTable
          courses={this.state.courses}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

ReactDOM.render(<RegistrationApp />, document.getElementById("root"));
