const A = () => {
  const [data, setData] = useState(0)
  return <input v-model-hook={data}/>
}

const B = () => {
  const data = useState(0)
  return <input v-model-hook={data[0]}/>
}
