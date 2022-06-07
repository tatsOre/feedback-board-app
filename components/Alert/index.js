import { useAlert } from '../../context/AlertProvider'

export default function Alert() {
  const { alert, resetAlert } = useAlert()
  return (
    <div className={`alert ${alert.type}`}>
      {alert.active && <AlertTimer resetAlert={resetAlert} />}
      <p>{alert.text}</p>
    </div>
  )
}

const AlertTimer = ({ resetAlert }) => {
  setTimeout(() => {
    resetAlert()
  }, 4000)
}
