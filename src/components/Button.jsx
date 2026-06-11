// Functional component using arrow function
const Button = ({ title, onClick, className = "" }) => {
  return (
    <button className={className} onClick={onClick}>
      {title}
    </button>
  )
}

export default Button