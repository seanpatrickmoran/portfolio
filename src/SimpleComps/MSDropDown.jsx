import React, { Component } from 'react'
import Downshift from 'downshift';

export class MSDropDown extends Component {
  constructor(props) {
    super(props)
    this.choices = []

    this.state = {
      selectedDropItem: ''
    }

    this.onChange = this.onChange.bind(this)
    this.handleChange = this.props.handleChange.bind(this)
  }

  componentDidMount(){
    this.props.choices.forEach((x) => {
        this.choices.push({name: x})
    })
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.choices != this.props.choices){
      this.choices=[]
      console.log('hello!')
      this.props.choices.forEach((x) => {
          this.choices.push({name: x})
      })
    }
  }

  onChange(selectedDropItem) {
    this.setState({ selectedDropItem: selectedDropItem.name })
    this.handleChange([this.props.tag,selectedDropItem.name])
  }

  render() {
    return (
      <Downshift  onChange={this.onChange} 
                  selectedItem={this.state.selectedDropItem} 
                  itemToString={choices => (choices ? choices.name : '')}>

        {({ 
            isOpen, 
            getToggleButtonProps,
            getItemProps, 
            highlightedIndex, 
            selectedItem: dsSelectedItem, 
            getLabelProps,
         }) => (

          <div>
            <button   id={`${this.props.id}-button`} 
                      className="dropdown-button" {...getToggleButtonProps()}
                      style = {{border: "none"}}>
              {this.state.selectedDropItem !== '' ? this.state.selectedDropItem : `${this.props.tag}`}
            </button>
            <div style={{ position: 'relative' }}>

              {isOpen ? (
                <div  id={`${this.props.id}-dropdown`} 
                      className="downshift-dropdown">

                  {this.choices.map((item, index) => (
                      <div
                        id={`${this.props.id}-item`}
                        className="dropdown-item"
                        {...getItemProps({ 
                          key: index, index, item 
                        })}
                        style={{
                          fontWeight: dsSelectedItem === item ? 'bold' : 'normal',
                        }}>
                        {item.name}
                      </div>
                    ))}
                </div>
              ) : null}

            </div>
          </div>
        )}

      </Downshift>
    )
  }
}

