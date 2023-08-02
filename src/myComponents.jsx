import React from 'react'

function Greeting(props){
  const isLoggedIn = props.isLoggedIn
  if(isLoggedIn){
    return <h1>Welcome back!</h1>
  } else {
    return <h1>Please Login In.</h1>
  }
}

function LoggedButton(props){
  return (
    <button onClick={props.onClick}>Login In</button>
  )
}

function LoggoutButton(props){
  return (
    <button onClick={props.onClick}>Login out</button>
  )
}

export class LoginControl extends React.Component {
  constructor(props){
    super(props)
    this.state = { isLoggedIn: false }
    this.handleLoggedClick = this.handleLoggedClick.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  handleLoggedClick(){
    this.setState({ isLoggedIn: true })
  }

  handleLogoutClick(){
    this.setState({ isLoggedIn: false })
  }

  render(){
    const isLoggedIn = this.state.isLoggedIn
    let button
    if(isLoggedIn){
      button = <LoggoutButton onClick={this.handleLogoutClick} />
    } else {
      button = <LoggedButton onClick={this.handleLoggedClick} />
    }
    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    )
  }
}

export function Mailbox(props){
  const unreadMessages = props.unreadMessages
  return (
    <div>
      <h1>Hello</h1>
      { unreadMessages.length > 0 &&
        <h2>You have {unreadMessages.length} unread messages.</h2>
      }
    </div>
  )
}

// ==========================================================
function WarningBanner(props){
  if(!props.warn) return null
  return <div>Warning!</div>
}

export class Page extends React.Component {
  constructor(props){
    super(props)
    this.state = { showWarning: false}
    this.handleToggleClick = this.handleToggleClick.bind(this)
  }

  handleToggleClick(){
    this.setState((state) => ({
      showWarning: !state.showWarning
    }))
  }

  render(){
    const showWarning = this.state.showWarning
    return (
      <div>
        <WarningBanner warn={showWarning} />
        <button onClick={this.handleToggleClick} >Toggle</button>
      </div>
    )
  }
}

// ===================== 【8】表单 ===============================
export class NameForm extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      value: '请撰写一篇关于你喜欢的DOM元素的文章',
      value2: '111'
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event){
    console.log('提交的名字' + this.state.multipleValues)
    event.preventDefault()
  }

  handleChange(event){
    console.log(event.target.value, 'event.target')
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          选择你喜欢的风味：
          <select  multiple={true} value={this.state.multipleValues} onChange={this.handleChange}>
            <option value="grapefruit">葡萄柚</option>
            <option value="lime">酸橙</option>
            <option value="coconut">椰子</option>
            <option value="mango">芒果</option>
          </select>
        </label>
        <input value={this.state.value2}></input>
        <input type="submit" value="提交"></input>
      </form>
    )
  }
}

export class Reservation extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event){
    const target = event.target
    const name = target.name
    const value = name === 'isGoing' ? target.checked : target.value

    this.setState({
      [name]: value
    })
  }

  render(){
    return (
      <form>
        <label>
          参与：
          <input
            type="checkbox"
            name="isGoing"
            checked={this.state.isGoing}
            onChange={this.handleInputChange}></input>
        </label>
        <label>
          来宾人数：
          <input
            name="numberOfGuests"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange}></input>
        </label>
      </form>
    )
  }
}

// ==================== [9] 状态提升 ============================
function BoilingVerdict(props){
  if(props.celsius > 100){
    return <h1>The water can boil.</h1>
  } else {
    return <h1>The water can't boil</h1>
  }
}

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
}

function toCelsius(fahrenheit){
  return (fahrenheit - 32) * 5 / 9
}

function toFahrenheit(celsius){
  return (celsius * 9 / 5) + 32
}

function tryConvert(temperture, convertFunc){
  const input = parseInt(temperture)
  if(isNaN(input)) return ""
  const output =  convertFunc(input)
  const rounded = Math.round(output * 1000) / 1000
  return rounded.toString()
}

class TempertureInput extends React.Component {
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    const scale = this.props.scale
    this.props.onTempertureChange(event.target.value, scale)
  }

  render(){
    const scale = this.props.scale
    const temperture = this.props.temperture
    return (
      <fieldset>
        <legend>Input Temperture {scaleNames[scale]}</legend>
        <input value={temperture} onChange={this.handleChange}></input>
      </fieldset>
    )
  }
}

export class Calculator extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      temperture: '',
      scale: 'c'
    }
    // this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
    // this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
    this.handleTemperatureChange = this.handleTemperatureChange.bind(this)
  }

  // handleCelsiusChange(value){
  //   this.setState({
  //     temperture: value,
  //     scale: 'c'
  //   })
  // }

  // handleFahrenheitChange(value){
  //   this.setState({
  //     temperture: value,
  //     scale: 'f'
  //   })
  // }
  handleTemperatureChange(temperture, scale){
    this.setState({temperture, scale})
  }

  render(){
    const temperture = this.state.temperture
    const celsius = this.state.scale === 'c' ? temperture : tryConvert(temperture, toCelsius)
    const fahrenheit = this.state.scale === 'f' ? temperture : tryConvert(temperture, toFahrenheit)
    return (
      <div>
        <TempertureInput 
          scale="c" 
          temperture={celsius}
          onTempertureChange={this.handleTemperatureChange}/>
        <TempertureInput 
          scale="f"
          temperture={fahrenheit}
          onTempertureChange={this.handleTemperatureChange}/>
        <BoilingVerdict celsius={celsius} />
      </div>
    )
  }
}

// =============== [10] 组合 vs 继承 ===========================
function FancyBorder(props){
  return (
    <div className={'fancyBorder-' + props.color}>
      {props.children}
    </div>
  )
}

function Dialog(props){
  return (
    <FancyBorder>
      <h1 className='dialog-title'>{props.title}</h1>
      <p className='dialog-message'>{props.message}</p>
      {props.children}
    </FancyBorder>
  )
}

export class SignUpDialog extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      login: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
  }

  handleChange(event){
    this.setState({
      login: event.target.value
    })
  }

  handleSignUp(){
    console.log(`Welcome aboard, ${this.state.login}!`)
  }

  render(){
    return (
      <Dialog title="Mars Exploration Program" message="How should we refer to you?">
        <input 
          value={this.state.login}
          onChange={this.handleChange}/>
        <button onClick={this.handleSignUp}>Sign Up</button>
      </Dialog>
    )
  }
}

/**=======================[11] React 哲学 ============================ */

function ProductRow(props){
  const product = props.product
  const name = product.stocked ? product.name : <span style={{color:'red'}}>{product.name}</span>
  const price = product.price
  return (
    <tr>
      <td>{name}</td>
      <td>{price}</td>
    </tr>
  )
}

function ProductCategoryRow(props){
  const category = props.category
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  )
}

class ProductTable extends React.Component {
  render(){
    const products = this.props.products
    const rows = []
    let lastCategory = null
    products.forEach(product => {
      if(product.category !== lastCategory){
        rows.push(
          <ProductCategoryRow 
            category={product.category}
            key={product.category} />
        )
      }
      rows.push(
        <ProductRow 
          product={product}
          key={product.name}/>
      )
      lastCategory = product.category
    })
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    )
  }
}

class SearchBar extends React.Component {
  constructor(props){
    super(props)
    this.handleCheckedChange = this.handleCheckedChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event){
    this.props.onSearchChange(event.target.value)
  }

  handleCheckedChange(event){
    console.log(event)
    this.props.onCheckedChange(event.target.checked)
  }

  render(){
    const input = this.props.input
    const checked = this.props.checked
    return (
      <div>
        <div>
          <input 
            value={input}
            placeholder='Search...'
            onChange={this.handleInputChange}/>
        </div>
        <div>
          <input 
            type="checkbox" 
            id="checkbox"
            checked={checked}
            onChange={this.handleCheckedChange}/>
          <label htmlFor="checkbox">Only show products in stock</label>
        </div>
      </div>
    )
  }
}

export class FilterableProductTable extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      input: '',
      checked: false
    }
    this.handleCheckedChange = this.handleCheckedChange.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  handleSearchChange(input){
    this.setState({input})
  }

  handleCheckedChange(checked){
    this.setState({checked})
  }

  render(){
    const checked = this.state.checked
    const input = this.state.input
    const products = this.props.products
    let filterProducts = checked ? products.filter(product => product.stocked) : products
    if(input !== ''){
      filterProducts = filterProducts.filter(product => product.name.indexOf(input) > -1)
    }
    return (
      <div>
        <SearchBar 
          input={input}
          checked={checked}
          onCheckedChange={this.handleCheckedChange}
          onSearchChange={this.handleSearchChange}/>
        <ProductTable 
          products={filterProducts}/>
      </div>
    )
  }
}
