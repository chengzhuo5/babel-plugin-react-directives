const A = () => {
  const [data, setData] = useState(0)
  const { a: [b] } = data
  return <input v-model-hook={b}/>
}

const B = () => {
  const [data, setData] = useState([])
  return <input v-model-hook={data[2]}/>
}
