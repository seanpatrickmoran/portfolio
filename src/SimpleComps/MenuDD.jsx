import React from 'react'
import Downshift from 'downshift'
import { useCombobox } from 'downshift'
import { matchSorter } from 'match-sorter'
import "./example.css"

// export function MenuDD() {
//   const links = [
//     {id: 'linked-1', category: '', title: 'New Window', route: '', href: ''},
//     {id: 'linked-2', category: '', title: 'Upload', route: '', href: 'https://github.com/seanpatrickmoran/lariat-web-prototype'},
//     {id: 'linked-3', category: '', title: 'Close', route: '', href: ''},
//     {id: 'linked-4', category: '', title: 'Download', route: '', href: ''},
//     // {id: 'linked-5', category: 'Bioinformatics', title: 'Quagga', route: '', href: ''},
//     // {id: 'linked-6', category: ul'Resume', title: '@seanpatrickmoran', route: '', href: ''},
//   ]
//   function getlinksFilter(inputValue) {
//     const lowerCasedInputValue = inputValue.toLowerCase()

//     return function linksFilter(linked) {
//       return (
//         !inputValue ||
//         linked.title.toLowerCase().includes(lowerCasedInputValue) ||
//         linked.category.toLowerCase().includes(lowerCasedInputValue)
//       )
//     }
//   }


// // class ComboBox extends React.Component{
//   function ComboBox() {
//     const [items, setItems] = React.useState(links)
//     const {
//       isOpen,
//       getToggleButtonProps,
//       getLabelProps,
//       getMenuProps,
//       getInputProps,
//       highlightedIndex,
//       getItemProps,
//       selectedItem,
//     } = useCombobox({
//       onInputValueChange({inputValue}) {
//         setItems(links.filter(getlinksFilter(inputValue)))
//       },
//       items,
//       itemToString(item) {
//         return item ? item.title : ''
//       },
//     })

//     return (
//       <div style={{width:80}}>
//         <div className="w-72 flex flex-col gap-1" style={{width:80}}>
//           <label className="w-fit" {...getLabelProps()} style={{width:80}}>
//           </label>
//           <div className="flex shadow-sm bg-white gap-0.5" style={{width:80}}>
//             <input
//               placeholder="Menu"
//               className="w-full p-1.5"
//               {...getInputProps()}
//               style={{width:80}}
//             />

//           </div>
//         </div>
//         <div
//           className={`menuDD dropdown ${
//             !(isOpen && items.length) && 'hidden'
//           }`}
//           {...getMenuProps()}
//         >
//           {isOpen &&
//             items.map((item, index) => (
//               <p
//                 className={(`${highlightedIndex} index bg-blue-300 ddItem
//                   ${selectedItem} font-bold py-2 px-3 shadow-sm flex flex-col`
//                 )}
//                 key={item.id}
//                 {...getItemProps({item, index})}
//               >
//                 <span>{item.title}</span> <span className="text-sm text-gray-700">{item.category}</span>
//               </p>
//             ))}
//         </div>
//       </div>
//     )
//   }
//   return <ComboBox />
// }



export class MenuDD extends React.Component {
  constructor(props) {
    super(props);

    this.items = [
    {id: 'linked-1', category: '', title: 'New Window', route: '', href: ''},
    {id: 'linked-2', category: '', title: 'Upload', route: '', href: ''},
    {id: 'linked-3', category: '', title: 'Close', route: '', href: ''},
    {id: 'linked-4', category: '', title: 'Download', route: '', href: ''},
    this.inputOnChange = this.inputOnChange.bind(this),
    // this.handleChange = this.props.handleChange.bind(this)
    ]
  }


  inputOnChange(event) {
    if (!event.title) {
      return
    }
    this.props.toggleSearchInput(event.title)
  }


  render() {
    const { prompt, items, ...rest } = this.props;
    return (
      <Downshift {...rest}
        onChange={this.inputOnChange}
        itemToString={entry => (entry ? entry.title : '')}>
        {({
          getLabelProps,
          getInputProps,
          getItemProps,
          getMenuProps,
          isOpen,
          toggleMenu,
          highlightedIndex,
          selectedItem, 

        }) => {
          return (
            <span>
              <div className="w-72 flex flex-col gap-1" style={{width:80}}>
                <label className="w-fit" {...getLabelProps()} style={{width:80}}>
                </label>
                <div className="flex shadow-sm bg-white gap-0.5" style={{width:80}}>
                  <input
                    
                    className="w-full p-1.5"
                    onClick={toggleMenu}
                    {...getInputProps({placeholder: "Debug",
                                       onChange: this.inputOnChange})}
                    style={{width:80}}
                  />
                </div>
              </div>
              <div
                className={`menuDD dropdown ${
                  !(isOpen && this.items.length) && 'hidden'
                }`}
                {...getMenuProps()}
              >
                {isOpen ? (
                  <span>
                    {this.items.map((item,index) => (
                    <p  className={(`${highlightedIndex} index bg-blue-300 ddItem
                        ${selectedItem} font-bold py-2 px-3 shadow-sm flex flex-col`
                        )}
                        key={item.id}
                        {...getItemProps({key: item.title, item, index})}
                    >

                      <span>{item.title}</span> <span className="text-sm text-gray-700">{item.category}</span>
                    </p>
                    ))}
                  </span>
                ) : null}
              </div>
            </span>
          );
        }}
      </Downshift>
    );
  }
}
