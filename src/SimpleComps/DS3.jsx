import React, { Component } from 'react'
import Downshift from 'downshift';
import { matchSorter } from 'match-sorter'


const ArrowIcon = ({isOpen}) => (
  <svg
    viewBox="0 0 20 20"
    preserveAspectRatio="none"
    width={16}
    fill="transparent"
    stroke="#979797"
    strokeWidth="1.1px"
    transform={isOpen ? 'rotate(180)' : null}
  >
    <path d="M1,6 L10,15 L19,6" />
  </svg>
)



// class DSWrapper extends React.Component {
//   constructor(props) {
//       super(props)
//   }
// }






// class DS_DropDown extends React.Component {
//   constructor(props) {
//       super(props)
//   }


















export class DownshiftThree extends Component {
  constructor(props) {
    super(props)
    this.choices = [
      { name: 'Harry Potter' },
      { name: 'Net Moves' },
      { name: 'Half of a yellow sun' },
      { name: 'The Da Vinci Code' },
      { name: 'Born a crime' },
    ];
  }

  state = {selectedItem: ""}


  stateReducer = (state, changes) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.keyDownEnter:
      case Downshift.stateChangeTypes.clickItem:
        return {
          ...changes,
          highlightedIndex: state.highlightedIndex,
          isOpen: true,
          inputValue: '',
        }
      default:
        return changes
    }
  }

  handleSelection = (selectedItem, downshift) => {
    const callOnChange = () => {
      const {onSelect, onChange} = this.props
      const {selectedItem} = this.state
    }
  }


  componentDidUpdate(prevProps, prevState){
    if(this.state.selection!=prevState.selection){
      this.setState({selection: document.querySelector(".menu-context").value})
      console.log()
    }
  }


 getItems = filter => {
    return filter
      ? matchSorter(this.choices, filter, {
          keys: ['name'],
        })
      : this.choices
  }  

  render() {
    return (
      <Downshift  
                  // onChange={this.onChange} 
          onChange={this.handleSelection}
          stateReducer={this.stateReducer}
          selectedItem={null}
          itemToString={choices => (choices ? choices.name : '')}>

        {({ isOpen, 
            getInputProps,
            inputValue,
            getToggleButtonProps, 
            getItemProps, 
            highlightedIndex,
            getMenuProps,
            selectedItem,
            getLabelProps }) => (

          <div>
{/*              <button
                aria-label={'toggle menu'}
                className="px-2"
                type="button"
                {...getToggleButtonProps()}
              >
                {isOpen ? <>&#8593;</> : <>&#8595;</>}
              </button>   */}     
              <div className="row-container">
                <div
                  {...getToggleButtonProps({
                    // prevents the menu from immediately toggling
                    // closed (due to our custom click handler above).
                    onClick(event) {
                      event.stopPropagation()
                    },
                  })}
                >
                  <ArrowIcon isOpen={isOpen} />
                </div>



{/*              <input
                placeholder="Menu"
                className="menu-context"
                {...getInputProps()}
                value={this.state.selection !== '' ? this.state.selection : ''}
                // onClick={() => {isOpen = !isOpen}}
                >
              </input>*/}
                  <input
                    {...getInputProps({
                      ref: this.input,
                      onKeyDown(event) {
                        if (event.key === 'Backspace' && !inputValue) {
                          removeItem(selectedItems[selectedItems.length - 1])
                        }
                      },
                    })}
                    placeholder={
                      selectedItem.length < 1 ? `Menu` : ''
                    }
                  />



            </div>

              <div {...getMenuProps({isOpen})}>
                {isOpen
                  ? this.getItems(inputValue).map((item, index) => (
                      <div
                        key={item.id}
                        {...getItemProps({
                          item,
                          index,
                          isActive: highlightedIndex === index,
                          isSelected: selectedItem.includes(item),
                        })}
                      >
                        {item.name}
                      </div>
                    ))
                  : null}
              </div>
{/*            <div style={{ position: 'relative' }}>
              {isOpen ? (
                <div className="downshift-dropdown">
                  {
                    // map through all the choices and render them
                    this.choices.map((item, index) => (
                      <div
                        className="dropdown-item"
                        {...getItemProps({ key: index, index, item })}
                        style={{
                          width: 280,
                          backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                          fontWeight: dsSelectedItem === item ? 'bold' : 'normal',
                        }}>
                        {item.name}
                      </div>
                    ))
                  }
                </div>
              ) : null}
            </div>*/}
          </div>
        )}
      </Downshift>
    )
  }
}