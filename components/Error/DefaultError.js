export default function ErrorMessage(props) {
  return (
    <strong className="text-red-900 font-normal text-[13px]" style={props.style}>
      {props.text}
    </strong>
  )
}
