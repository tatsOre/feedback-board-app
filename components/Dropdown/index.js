import { useEffect, useRef, useState } from "react";

// to make it more reusable: we can make items an object with label/value
// { most-upvotes: "UPVOTES_DESC", "least-upvotes": "UPVOTES_ASC" }


const Dropdown = ({ label, items, selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const me = useRef(); // To hide the list when outside is clicked

  useEffect(() => {
    const handleOutsideClick = ({ target }) => {
      // contains from browser API
      if (isOpen && me.current && !me.current.contains(target))
        setIsOpen(false);
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isOpen]);

  const handleToggleButton = () => setIsOpen(!isOpen);

  const handleButtonKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      const listItems = event.target.nextElementSibling.children;
      listItems[highlightedIndex].focus();
    }
  };

  const handleOptionOnClick = (index) => {
    setSelected(items[index]);
    setIsOpen(!isOpen);
  };

  const handleOptionKeyDown = (event, index) => {
    let newIndex;
    switch (event.key) {
      case "Enter":
        setSelected(items[index]);
        setIsOpen(!isOpen);

      case "ArrowDown":
        newIndex = index === items.length - 1 ? index : index + 1;
        setHighlightedIndex(newIndex);
        const nextItem = event.target.nextElementSibling;
        if (nextItem) nextItem.focus();

      case "ArrowUp":
        newIndex = index === 0 ? index : index - 1;
        setHighlightedIndex(newIndex);
        const prevItem = event.target.previousElementSibling;
        if (prevItem) prevItem.focus();

      default:
        return;
    }
  };

  return (
    <div ref={me}>
      <label
        id="dropdown-label"
        htmlFor="dropdown-toggle-button"
        className="block"
      >
        {label}
      </label>
      <button
        type="button"
        id="dropdown-toggle-button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="dropdown-label dropdown-toggle-button"
        onClick={handleToggleButton}
        onKeyDown={handleButtonKeyDown}
        className="bg-indigo-medium text-white p-4"
      >
        {selected}
      </button>
      {isOpen && (
        <ul
          className="focus:bg-indigo-light"
          id="dropdown-menu"
          role="listbox"
          aria-labelledby="dropdown-label"
          // was tabIndex="-1"
        >
          {items.map((option, index) => (
            <li
              className={`${
                items[index] === selected ? "font-bold" : "font-regular"
              } ${
                index === highlightedIndex && items[index] !== selected
                  ? "font-italic"
                  : ""
              } hover:bg-red focus:bg-red`}
              role="option"
              tabIndex="0"
              aria-selected={items[index] === selected}
              id={`category-option-${option}`}
              onClick={() => handleOptionOnClick(index)}
              onKeyDown={(e) => handleOptionKeyDown(e, index)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
