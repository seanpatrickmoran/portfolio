import React from 'react'
import Downshift from 'downshift'
import { useCombobox } from 'downshift'
import { matchSorter } from 'match-sorter'
import "./example.css"

export function AboutMe() {
  const links = [
    {id: 'linked-1', category: '', title: 'Github', route: '', href: ''},
    {id: 'linked-2', category: '', title: 'LinkedIn', route: '', href: 'https://github.com/seanpatrickmoran/lariat-web-prototype'},
    {id: 'linked-3', category: '', title: 'Resume', route: '', href: ''},
  // {id: 'linked-6', category: 'Resume', title: '@seanpatrickmoran', route: '', href: '/'},
  ]
  function getlinksFilter(inputValue) {
    const lowerCasedInputValue = inputValue.toLowerCase()

    return function linksFilter(linked) {
      return (
        !inputValue ||
        linked.title.toLowerCase().includes(lowerCasedInputValue) ||
        linked.category.toLowerCase().includes(lowerCasedInputValue)
      )
    }
  }


// class ComboBox extends React.Component{
  function ComboBox() {
    const [items, setItems] = React.useState(links)
    const {
      isOpen,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getInputProps,
      highlightedIndex,
      getItemProps,
      selectedItem,
    } = useCombobox({
      onInputValueChange({inputValue}) {
        setItems(links.filter(getlinksFilter(inputValue)))
      },
      items,
      itemToString(item) {
        return item ? item.title : ''
      },
    })

    return (
      <div style={{width:80}}>
        <div className="w-72 flex flex-col gap-1" style={{width:80}}>
          <label className="w-fit" {...getLabelProps()}>
          </label>
          <div className="flex shadow-sm bg-white gap-0.5" style={{width:80}}>
            <input
              placeholder="About Me"
              className="w-full p-1.5"
              {...getInputProps()}
              style={{width:80}}
            />

          </div>
        </div>
        <div
          className={`AboutMe dropdown ${
            !(isOpen && items.length) && 'hidden'
          }`}
          {...getMenuProps()}
        >
          {isOpen &&
            items.map((item, index) => (
              <div 
                className={(`${highlightedIndex} index bg-blue-300 ddItem
                  ${selectedItem} font-bold py-2 px-3 shadow-sm flex flex-col`
                )}
                key={item.id}
                {...getItemProps({item, index})}
                style={{}}
              >
                <span>{item.title}</span> <span className="text-sm text-gray-700">{item.category}</span>
              </div>
            ))}
        </div>
      </div>
    )
  }
  return <ComboBox />
}

